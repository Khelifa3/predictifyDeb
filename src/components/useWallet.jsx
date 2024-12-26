// hooks/useWallet.js
import { ethers } from "ethers";
import contract from ".././chain-info/contract.json";
import __local__ from ".././chain-info/__local__.json";
import { useAppKitProvider, useAppKitAccount } from "@reown/appkit/react";
import { useBlockchainStore } from "./useBlockchainStore";

export const useWallet = () => {
    const { setWallet, setContract, setUi, setBets } = useBlockchainStore.getState();
    const { address, isConnected } = useAppKitAccount();
    const { walletProvider } = useAppKitProvider("eip155");
    const chainId = "97"; // Testnet ID
    const bsctest_url = "https://bsc-testnet.bnbchain.org"
    // Contract Actions
    const loadBlockchainData = async () => {
        setContract({ message: "Loading round data..", isFetching: true });
        const contractAddress = contract["contract_address"];
        const abi = __local__["contractTypes"]["Predictify"]["abi"];
        let providerInstance;
        try {
            if (!isConnected) {
                providerInstance = new ethers.JsonRpcProvider(bsctest_url)
            }
            else {
                providerInstance = new ethers.BrowserProvider(walletProvider);
                const contractInstance = new ethers.Contract(contractAddress, abi, providerInstance);
                setContract({ contractInstance });
                const balance = await providerInstance.getBalance(address);
                const pendingWithdrawal = await contractInstance.pendingWithdrawals(address);
                // Update Zustand store
                setWallet({
                    connected: true,
                    address,
                    network: chainId,
                    balance: ethers.formatEther(balance), // Convert to ETH format
                    currency: "tBNB",
                    pendingWithdrawal: pendingWithdrawal,
                    error: null,
                });
            }
        } catch (error) {
            console.log(error);
            setContract({ message: "Error fetching round data.", isFetching: false });
        }

        try {
            const contractInstance = new ethers.Contract(contractAddress, abi, providerInstance);
            setContract({ contractInstance });
            const [current_price, currentRound, roundStartTime, n_bets, seedAmount] = await Promise.all([
                contractInstance.getPrice(),
                contractInstance.currentRound(),
                contractInstance.roundStartTime(),
                contractInstance.getBetCount(),
                contractInstance.seedAmount(),
            ]);

            let all_bets = [];
            try {
                setWallet({ predictedPrice: null });
                for (let i = 0; i < n_bets; i++) {
                    const bet = await contractInstance.currentRoundBets(i);
                    if (isConnected && bet[0].toLowerCase() == address.toLowerCase()) { // Account own bet
                        setWallet({ predictedPrice: bet[1].toString() });
                    }
                    all_bets.push({ bettor: bet[0], predictedPrice: bet[1].toString() });
                }
                // Order from the highest price to lowest
                all_bets.sort(function (a, b) { return b.predictedPrice - a.predictedPrice });
                setBets({ all_bets });
            } catch (err) {
                console.error("Failed to fetch bets:", err);
            }
            let roundWinner = null;
            if (currentRound > 1) {   // no previous round winner for first round
                roundWinner = await contractInstance.roundWinners(Number(currentRound) - 1);
            }
            setContract({

                contractInstance, currentRound, roundStartTime, current_price,
                n_bets, seedAmount, roundWinner, message: null, isFetching: false

            });
        } catch (error) {
            console.log(error);
            setContract({ message: "Error fetching round data. " + error, isFetching: false });
        }
    };

    const handleTransaction = async (transactionFunc, onSuccessMessage) => {
        setWallet({ isFetching: true });
        try {
            const providerInstance = new ethers.BrowserProvider(walletProvider);
            const signer = await providerInstance.getSigner();
            const transaction = await transactionFunc(signer);
            const receipt = await transaction.wait();
            if (receipt.status === 1) {
                await loadBlockchainData();
                setUi({ message: 'Transaction done : ' + onSuccessMessage });
            }
        } catch (error) {
            console.error(error);
            setUi({ message: 'Transaction failed : ' + error.reason });
        } finally {
            setWallet({ isFetching: false });
        }
    };

    const handlePredictionSubmit = async (contractInstance, price, amount) => {
        if (!price || isNaN(price) || Number(price) <= 0) {
            setUi({ message: 'Please enter a valid price.' });
            return;
        }
        price = price * 10 ** 8
        handleTransaction(
            async (signer) => contractInstance.connect(signer).placeBet(price, { value: ethers.parseEther(amount) }),
            'Bet placed successfully!'
        );
    };

    const handleEndRound = async (contractInstance) => {
        handleTransaction(
            async (signer) => contractInstance.connect(signer).endRound(),
            'New turn started!'
        );
    };

    const handleWithdraw = async (contractInstance) => {
        handleTransaction(
            async (signer) => contractInstance.connect(signer).withdrawWinnings(),
            'Withdrawal successful'
        );
    };

    return { handleWithdraw, handleEndRound, handlePredictionSubmit, loadBlockchainData };
};
