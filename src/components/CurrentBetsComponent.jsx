import { useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import { useBlockchainStore } from "./useBlockchainStore";
import { useWallet } from "./useWallet";
import { ethers } from "ethers";
import { useAppKitAccount } from "@reown/appkit/react";

import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
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

                      <CardContent className="p-6">

                        <div className="overflow-x-auto rounded-lg shadow-lg bg-gray-900">
                          <table className="w-full text-center border-collapse border-spacing-0">
                            <thead>
                              <tr className="bg-gray-800 text-black">
                                <th className="p-4 text-lg font-bold border-b border-gray-700">
                                  {translate("account")}
                                </th>
                                <th className="p-4 text-lg font-bold border-b border-gray-700">
                                  {translate("prediction")}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {bets.all_bets.map((bet, index) => (
                                <tr
                                  key={index}
                                  className={`${index % 2 === 0 ? "bg-gray-800" : "bg-gray-900"}`}
                                >
                                  <td className="p-4 text-purple-400 font-medium border-b border-gray-700">
                                    {truncateAddress(bet.bettor)}
                                  </td>
                                  <td className="p-4 text-cyan-400 font-bold border-b border-gray-700">
                                    ${toDecimal(bet.predictedPrice)}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                       </CardContent>
                    </Card>
                </>)
            }
        </div >
    );
};

export default CurrentBetsComponent;
