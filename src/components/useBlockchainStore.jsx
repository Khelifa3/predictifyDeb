// stores/blockchainStore.js
import { create } from "zustand";


export const useBlockchainStore = create((set, get) => ({
    wallet: {
        connected: false,
        address: null,
        network: null,
        balance: null,
        currency: "tBNB",
        pendingWithdrawal: 0,
        predictedPrice: null,
        error: null,
        isFetching: false,
    },
    contract: {
        contractInstance: null,
        currentRound: null,
        roundStartTime: null,
        current_price: null,
        n_bets: null,
        seedAmount: null,
        roundWinner: null,
        message: null,
        isFetching: false,
    },
    bets: {
        all_bets: null
    },
    ui: {
        message: "",
        isLoading: false,
    },
    // Actions to set states
    setWallet: (wallet) => set((state) => ({ wallet: { ...state.wallet, ...wallet } })),
    setContract: (contract) => {
        set((state) => ({ contract: { ...state.contract, ...contract } }));
    },
    setBets: (bets) => set((state) => ({ bets: { ...state.bets, ...bets } })),
    setUi: (ui) => set((state) => ({ ui: { ...state.ui, ...ui } })),

}));
