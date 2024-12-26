import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useLanguage } from '../LanguageContext'; // Import useLanguage
import { useBlockchainStore } from "./useBlockchainStore";
import { useWallet } from "./useWallet";
import { useAppKitAccount } from "@reown/appkit/react";

import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { SpaceIcon as Alien, Rocket, Zap, DollarSign, Trophy, Clock, Wallet, Users, Sun, Moon, HelpCircle, ExternalLink } from 'lucide-react'


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
        // Call the function to handle the withdraw submission
        await handleWithdraw(contract.contractInstance);
    };


    useEffect(() => {
    }, [ui.message]);

    const truncateAddress = (address) => { return `${address.slice(0, 5)}...${address.slice(-6)}`; };
    const toDecimal = (number) => {
        return Number(number) / 10 ** 8
    }
    return (
        <div className="w-full max-w-md mx-auto p-6 bg-gray-800 text-black rounded-lg shadow-lg mb-6" >
            <Card className="bg-gray-800 border-gray-700 overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-400">
                <Wallet className="mr-2" color="#60A5FA" /> {translate("wallet")}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 p-6">
                <w3m-button />
              {isConnected && (
                <>

                  <div className="flex justify-between items-center">
                    <span className="text-cyan-400">{translate('predictedPrice')}</span>
                    <span className="text-cyan-400">{wallet.predictedPrice ? "$"+toDecimal(wallet.predictedPrice) : translate("notset")}</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-4">
                    <Input
                      type="number"
                      placeholder={translate('enterPrice')}
                      className="bg-gray-700 border-gray-600 text-inherit"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    <Button onClick={() => placeBet()} className="bg-blue-600 hover:bg-blue-700">
                      {translate('placeBet')} 0.01 tBNB
                    </Button>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-green-400">{translate('pendingWithdrawal')}</span>
                    <span className="text-green-400">{ethers.formatEther(wallet.pendingWithdrawal)} {wallet.currency}</span>

                  </div>
                  <Button onClick={withdraw} variant="secondary" className="w-full bg-green-600 hover:bg-green-700 mt-2">
                    {translate('withdraw')}
                  </Button>

                  <Button onClick={endRound} variant="secondary" className="w-full bg-purple-600 hover:bg-purple-700 mt-2">
                    {translate('endTurn')}
                  </Button>
                </>)}
            </CardContent>
                {wallet.isFetching && <div
                    className="float-right inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status">
                    <span
                        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                    >Loading...</span>
                </div>}
                {ui.message && <div className="message">{ui.message}</div>}
            </Card>
        </div>
    );
};

export default WalletComponent;