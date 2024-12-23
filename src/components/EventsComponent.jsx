import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import networkMapping from ".././chain-info/deployments/map.json";
import BitcoinUpDown from ".././chain-info/contracts/BitcoinUpDown.json";
import { useWallet } from "./useWallet";

const EventsComponent = () => {
    const chainId = "97"; // Testnet ID
    const contractAddress = networkMapping[chainId]["BitcoinUpDown"][0];
    const { abi } = BitcoinUpDown;
    const bsctest_url = "https://bsc-testnet.bnbchain.org"
    const { loadBlockchainData } = useWallet();

    useEffect(() => {
        // Initialize ethers provider
        const providerInstance = new ethers.JsonRpcProvider(bsctest_url)
        const setupEventListener = async () => {
            try {
                // Initialize contract
                const contract = new ethers.Contract(contractAddress, abi, providerInstance);

                // Listen for the event
                contract.on("RoundStarted", (roundId, startTime) => {
                    console.log("New round started:", { roundId, startTime });
                    loadBlockchainData()

                });
                contract.on("BetPlaced", (roundId, bettor, predictedPrice) => {
                    console.log("BetPlaced:", { roundId, bettor, predictedPrice });
                    loadBlockchainData();
                });
                contract.on("RoundEnded", (roundId, actualPrice, winner) => {
                    console.log("endRound:", { roundId, actualPrice, winner });
                    loadBlockchainData();
                });
                contract.on("WinningsWithdrawn", (winner, amount) => {
                    console.log("WinningsWithdrawn:", { winner, amount });
                    loadBlockchainData();
                });
            } catch (error) {
                console.error("Error setting up event listener:", error);
            }
        };

        setupEventListener();

        // Cleanup the event listener when component unmounts
        return () => {
            providerInstance.removeAllListeners("RoundStarted");
            providerInstance.removeAllListeners("BetPlaced");
            providerInstance.removeAllListeners("RoundEnded");
            providerInstance.removeAllListeners("WinningsWithdrawn");
        };
    }, []);

    return (
        <>
        </>
    );
};

export default EventsComponent;
