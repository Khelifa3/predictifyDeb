import { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import { useBlockchainStore } from "./useBlockchainStore";
import { useWallet } from "./useWallet";
import { ethers } from "ethers";
import { useAppKitAccount } from "@reown/appkit/react";



const formatTime = (timeInSeconds) => {
    const days = Math.floor(timeInSeconds / (24 * 60 * 60));
    const hours = Math.floor((timeInSeconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((timeInSeconds % (60 * 60)) / 60);
    const seconds = timeInSeconds % 60;
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};

const BETTING_END_TIME = 60 * 60; // 1 hour in seconds

const RoundComponent = () => {
    const { contract, bets, wallet } = useBlockchainStore();
    const { loadBlockchainData } = useWallet();
    const { isConnected } = useAppKitAccount();

    const [timers, setTimers] = useState({ timeSinceStart: '', timeLeftForBetting: '' });
    const { translate } = useLanguage();

    useEffect(() => {
        loadBlockchainData(); // Ensure the contract is initialized
    }, [isConnected]);

    useEffect(() => {
        const updateTimers = () => {
            const now = Math.floor(Date.now() / 1000);
            const elapsedTime = now - Number(contract.roundStartTime);

            const timeSinceStart = formatTime(elapsedTime);
            const bettingTimeRemaining = BETTING_END_TIME - elapsedTime;
            const timeLeftForBetting = bettingTimeRemaining > 0 ? formatTime(bettingTimeRemaining) : 'closed';

            setTimers({ timeSinceStart, timeLeftForBetting });
        };

        const timerInterval = setInterval(updateTimers, 1000);
        return () => clearInterval(timerInterval); // Clean up interval on component unmount
    }, [contract.roundStartTime]);

    const toDecimal = (number) => {
        return Number(number) / 10 ** 8
    }

    const truncateAddress = (address) => { return `${address.slice(0, 5)}...${address.slice(-6)}`; };

    return (
        <div className="w-full max-w-md mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-lg mb-6">
            {/* Contract message */}
            <p>{contract.message}</p>
            {/* Loading animation */}
            {contract.isFetching && (<div
                className="float-right inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
                <span
                    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                >Loading...</span>
            </div>)}
            {/* Round Information */}
            {contract.roundStartTime && (
                <>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold">
                            {translate('currentRound')}: {contract.currentRound.toString()}
                        </h2>
                    </div>
                    {/* Number of bets */}
                    <div className="price-info mt-4 mb-6 p-4 bg-gray-700 rounded-lg space-y-2">
                        <div className="flex justify-between">
                            <span className="font-bold">{translate('seedAmount')}:</span>
                            <span className="text-white-500">{ethers.formatEther(contract.seedAmount).toString()} {wallet.currency}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-bold">{translate('betCount')}:</span>
                            <span className="text-white -500">{contract.n_bets.toString()}</span>
                        </div>

                        {/* Price Information */}
                        <div className="flex justify-between">
                            <span className="font-bold">{translate('currentPrice')}:</span>
                            <span className="text-white-500">{toDecimal(contract.current_price).toString()} $</span>
                        </div>
                        {/* Timer Information */}
                        <p className="flex justify-between">
                            <span className="font-bold">{translate('timeSinceRoundStart')}:</span>
                            <span>{timers.timeSinceStart}</span>
                        </p>
                        <p className="flex justify-between">
                            <span className="font-bold">{translate('bettingTimeLeft')}:</span>
                            <span className={timers.timeLeftForBetting === "closed" ? "text-red-500" : "text-green-500"}>{translate(timers.timeLeftForBetting)}</span>
                        </p>
                    </div>
                    {/*Previous round winner */}
                    {contract.roundWinner && (
                        <div className="price-info mt-4 mb-6 p-4 bg-gray-700 rounded-lg space-y-2">
                            <div className="flex justify-between">
                                <span className="font-bold">{translate('previousWinner')}:</span>
                                <span className="text-green-500">{truncateAddress(contract.roundWinner.toString())}</span>
                            </div>
                        </div>)}
                </>)
            }
        </div >
    );
};

export default RoundComponent;
