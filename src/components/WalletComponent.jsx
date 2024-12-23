import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useLanguage } from '../LanguageContext'; // Import useLanguage
import { useBlockchainStore } from "./useBlockchainStore";
import { useWallet } from "./useWallet";
import { useAppKitAccount } from "@reown/appkit/react";

const WalletComponent = () => {
    const { ui, wallet, contract } = useBlockchainStore();
    const { handlePredictionSubmit, handleEndRound, handleWithdraw } = useWallet();
    const { translate } = useLanguage(); // Use translate function
    const [price, setPrice] = useState('');
    const { isConnected } = useAppKitAccount();

    const placeBet = async () => {
        // Call the function to handle the bet submission
        await handlePredictionSubmit(contract.contractInstance, price, "0.01");
    };
    const endRound = async () => {
        // Call the function to handle the bet submission
        await handleEndRound(contract.contractInstance);
    };
    const withdraw = async () => {
        // Call the function to handle the bet submission
        await handleWithdraw(contract.contractInstance);
    };


    useEffect(() => {
    }, [ui.message]);

    const truncateAddress = (address) => { return `${address.slice(0, 5)}...${address.slice(-6)}`; };
    const toDecimal = (number) => {
        return Number(number) / 10 ** 8
    }
    return (
        <div className="w-full max-w-md mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-md" >
            {isConnected ? (<div>
                <h2 className="text-2xl font-semibold mb-4">{translate('wallet')}</h2>
                {wallet.connected ? (
                    <div className="mb-4">
                        <div className="mb-4">
                            <w3m-button />
                        </div>
                        {wallet.predictedPrice ? (
                            <p className="text-lg">
                                <span className="font-bold">{translate('predictedPrice')}:</span> {toDecimal(wallet.predictedPrice)} $
                            </p>) : (
                            <div className="flex flex-col items-center mb-4 space-x-2">
                                <div className="w-full flex flex-row space-x-2 mb-2">
                                    <input
                                        type="text"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        placeholder={translate('enterPrice')}
                                        className="flex-grow p-2 rounded bg-gray-700 text-white placeholder-gray-400"
                                    />
                                </div>
                                <div className="flex flex-row space-x-2 mb-2">
                                    <button
                                        onClick={() => { placeBet(); }}
                                        className="flex-row py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-200"
                                    >
                                        {translate('placeBet')} 0.01 tBNB
                                    </button>
                                </div>
                            </div>)}

                        {wallet.pendingWithdrawal > 0 && (
                            <div className="mb-4 p-4 bg-gray-800 rounded-lg">
                                <h3 className="text-xl font-semibold mb-2">{translate('pendingWithdrawal')}</h3>
                                <p>{ethers.formatEther(wallet.pendingWithdrawal)} {wallet.currency}</p>
                                <button
                                    onClick={withdraw}
                                    className="w-full py-2 mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-200"
                                >
                                    {translate('withdraw')}
                                </button>
                            </div>
                        )}

                        {/* End Round Button */}
                        <button
                            onClick={endRound}
                            className="w-full py-2 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
                        >
                            {translate('endTurn')}
                        </button>

                    </div>
                ) : (
                    <></>
                )
                }
                {wallet.isFetching && <div
                    className="float-right inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status">
                    <span
                        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                    >Loading...</span>
                </div>}
            </div>) : <div>
                <p>Connect your wallet to use  the DApp</p>
                <w3m-button />
            </div>}
            {ui.message && <div className="message">{ui.message}</div>}
        </div>
    );
};

export default WalletComponent;