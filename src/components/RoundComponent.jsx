import { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import { useBlockchainStore } from "./useBlockchainStore";
import { useWallet } from "./useWallet";
import { ethers } from "ethers";
import { useAppKitAccount } from "@reown/appkit/react";

import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import ProgressBar from "./ui/progress"
import { SpaceIcon as Alien, Rocket, Zap, DollarSign, Trophy, Clock, Wallet, Users, Sun, Moon, HelpCircle, ExternalLink } from 'lucide-react'


const formatTime = (timeInSeconds) => {
  const days = Math.floor(timeInSeconds / (24 * 60 * 60));
  const hours = Math.floor((timeInSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((timeInSeconds % (60 * 60)) / 60);
  const seconds = timeInSeconds % 60;

  // Build the formatted time string conditionally
  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0 || parts.length === 0) parts.push(`${seconds}s`); // Include seconds always if no other parts

  return parts.join(' '); // Join all non-zero parts with a space
};


const ROUND_DURATION = 60 * 60 * 24 // 1 day in seconds
const BETTING_DURATION = 60 * 60; // 1 hour in seconds

const RoundComponent = () => {
    const { contract, bets, wallet } = useBlockchainStore();
    const { loadBlockchainData } = useWallet();
    const { isConnected } = useAppKitAccount();

    const [timers, setTimers] = useState({ timeSinceStart: '', timeLeftForBetting: '' });
    const [progress, setProgress] = useState({updatedProgressRound:0, updatedProgressBetting:0});
    const { translate } = useLanguage();

    useEffect(() => {
        loadBlockchainData(); // Ensure the contract is initialized
    }, [isConnected]);

    useEffect(() => {
        const updateTimers = () => {
            const now = Math.floor(Date.now() / 1000);
            const elapsedTime = now - Number(contract.roundStartTime);
            // Set text timers
            const timeSinceStart = formatTime(elapsedTime);
            const bettingTimeRemaining = BETTING_DURATION - elapsedTime;
            const timeLeftForBetting = bettingTimeRemaining > 0 ? formatTime(bettingTimeRemaining) : 'closed';
            setTimers({ timeSinceStart, timeLeftForBetting });

            // Set progress bars
            const progressRound = (elapsedTime / ROUND_DURATION) * 100;
            const progressBetting = (elapsedTime / BETTING_DURATION) * 100; // Calculate percentage
            // Ensure the progress is between 0 and 100
            const updatedProgressRound = Math.min(Math.max(progressRound, 0), 100);
            const updatedProgressBetting = Math.min(Math.max(progressBetting, 0), 100);
            setProgress({updatedProgressRound, updatedProgressBetting});

        };

        const timerInterval = setInterval(updateTimers, 1000);
        return () => clearInterval(timerInterval); // Clean up interval on component unmount
    }, [contract.roundStartTime]);

    const toDecimal = (number) => {
        return Number(number) / 10 ** 8
    }

    const truncateAddress = (address) => { return `${address.slice(0, 5)}...${address.slice(-6)}`; };
    const getPrizePool = () => {return ((Number(contract.n_bets) * 0.01) + Number(ethers.formatEther(contract.seedAmount)));}


    return (
        <div className="w-full max-w-md mx-auto p-6 bg-gray-800 text-black rounded-lg shadow-lg mb-6">
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
                <Card className="bg-gray-800 border-gray-700  overflow-hidden">
                    <CardHeader>
                        <CardTitle className="flex items-center text-blue-400">
                            <Alien className="mr-2" color="#60A5FA" /> {translate('round')} # {contract.currentRound.toString()}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 p-6">
                      <div className="flex justify-between items-center">
                        <span className="flex items-center"><Trophy className="mr-2 text-yellow-400" color="#FBBF24" /> {translate('prizepool')}</span>
                        <span className="text-1xl font-bold text-yellow-400">{getPrizePool()} {wallet.currency}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="flex items-center"><Zap className="mr-2 text-green-400" color="#34D399" /> {translate('seedAmount')}</span>
                        <span className="text-sm text-green-400">{ethers.formatEther(contract.seedAmount).toString()} {wallet.currency}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="flex items-center"><DollarSign className="mr-2 text-cyan-400" color="#22D3EE" /> {translate('currentPrice')}</span>
                        <span className="text-1xl font-bold text-cyan-400">${toDecimal(contract.current_price).toString()}</span>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="flex items-center"><Clock className="mr-2 text-orange-400" color="#FB923C" /> {translate('bettingTimeLeft')}</span>
                          <span className="text-orange-400">{translate(timers.timeLeftForBetting)}</span>
                        </div>
                        <ProgressBar progress={progress.updatedProgressBetting} color="#FB923C" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="flex items-center"><Clock className="mr-2 text-pink-400" color="#F472B6" /> {translate('timeSinceRoundStart')}</span>
                          <span className="text-pink-400">{timers.timeSinceStart}</span>
                        </div>
                        <ProgressBar progress={progress.updatedProgressRound} color="#F472B6" />
                      </div>
                        {contract.roundWinner &&(
                      <div className="flex justify-between items-center">
                        <span className="flex items-center"><Trophy className="mr-2 text-yellow-400" color="#FBBF24" /> {translate('previousWinner')}</span>
                        <span className="text-yellow-400">{truncateAddress(contract.roundWinner.toString())}</span>
                      </div>)
                        }
                    </CardContent>
                </Card>)
            }
        </div >
    );
};

export default RoundComponent;
