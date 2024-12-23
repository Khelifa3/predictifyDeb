import { useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import { useBlockchainStore } from "./useBlockchainStore";
import { useWallet } from "./useWallet";
import { ethers } from "ethers";
import { useAppKitAccount } from "@reown/appkit/react";



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
            {/* Round Information */}
            {contract.roundStartTime && (
                <>
                    {/* Liste of the current round bets */}
                    <div className="price-info mt-4 mb-6 p-4 bg-gray-700 rounded-lg space-y-2">
                        <div className="flex justify-between">
                            <span className="font-bold">{translate('betCount')}:</span>
                            <span className="text-green-500">{contract.n_bets.toString()}</span>
                        </div>
                        <table className="w-full text-left border-collapse table-auto bg-gray-800 rounded-md overflow-hidden shadow-md">
                            <thead className="bg-gray-700 text-gray-300">
                                <tr>
                                    <th className="px-4 py-2">{translate('account')}</th>
                                    <th className="px-4 py-2">{translate('prediction')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bets.all_bets.map((bet, index) => (
                                    <tr
                                        key={index}
                                        className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'}
                                    >
                                        <td className="px-4 py-2 font-medium text-gray-300">
                                            {truncateAddress(bet.bettor)}
                                        </td>
                                        <td className="px-4 py-2 text-green-400">
                                            {toDecimal(bet.predictedPrice)} $
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </>)
            }
        </div >
    );
};

export default CurrentBetsComponent;
