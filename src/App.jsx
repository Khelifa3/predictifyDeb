import React from 'react';
import PredictionComponent from './components/PredictionComponent.jsx';
import { LanguageProvider, useLanguage } from './LanguageContext.jsx';


import { createAppKit } from '@reown/appkit/react'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { bscTestnet, mainnet } from '@reown/appkit/networks'

// 1. Get projectId
const projectId = 'aa31e737c0c58783ad1d0dfdf3c21840';

// 2. Set the networks
const networks = [bscTestnet, mainnet];

// 3. Create a metadata object - optional
const metadata = {
  name: 'Predectify',
  description: 'AppKit Example',
  url: 'https://reown.com/appkit', // origin must match your domain & subdomain
  icons: ['https://assets.reown.com/reown-profile-pic.png']
}

// 4. Create an AppKit instance
createAppKit({
  adapters: [new EthersAdapter()],
  networks,
  metadata,
  projectId,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  },
  featuredWalletIds: [
    "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96" // metamask
  ]
})


const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <select onChange={(e) => setLanguage(e.target.value)} value={language}>
      <option value="en">English</option>
      <option value="fr">Français</option>
      <option value="ar">العربية</option>
    </select>
  );
};

const App = () => {
  return (

    < LanguageProvider >
      <div>
        <LanguageSwitcher />
        <PredictionComponent />
      </div>
    </LanguageProvider >
  );
}
export default App;
