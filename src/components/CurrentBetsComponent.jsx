import { useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import { useBlockchainStore } from "./useBlockchainStore";
import { useWallet } from "./useWallet";
import { ethers } from "ethers";
import { useAppKitAccount } from "@reown/appkit/react";

import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Progress } from "./ui/progress"
import { SpaceIcon as Alien, Rocket, Zap, DollarSign, Trophy, Clock, Wallet, Users, Sun, Moon, HelpCircle, ExternalLink } from 'lucide-react'



const CurrentBetsComponent = () => {
    const { contract, bets, wallet } = useBlockchainStore();
    const { loadBlockchainData } = useWallet();
    const { isConnected } = useAppKitAccount();

    const { translate } = useLanguage();

    useEffect(() => {
        loadBlockchainData(); // Ensure the contract is initialized
    }, [isConnected]);

    const toDecimal = (number) => {
        return Number(number) / 10 ** 8
    }

    const truncateAddress = (address) => { return `${address.slice(0, 5)}...${address.slice(-6)}`; };

    return (
        <div className="w-full max-w-md mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-lg mb-6 mt-6">
            {contract.roundStartTime && (
                <>
                    {/* Liste of the current round bets */}
                    <Card className="bg-gray-800 border-gray-700 overflow-hidden">
                      <CardHeader>
                        <CardTitle className="flex items-center text-blue-400">
                          <Users className="mr-2" color="#60A5FA" /> {translate('betCount')}: {contract.n_bets.toString()}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4 p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {bets.all_bets.map((bet, index) => (
                            <div key={index} className="bg-gray-700 p-3 rounded-lg">
                              <div className="text-purple-400 truncate">{truncateAddress(bet.bettor)}</div>
                              <div className="text-cyan-400 font-bold">${toDecimal(bet.predictedPrice)}</div>
                            </div>
                          ))}
                        </div>
                       </CardContent>
                    </Card>
                </>)
            }
        </div >
    );
};

export default CurrentBetsComponent;
