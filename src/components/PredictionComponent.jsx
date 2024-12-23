import React from 'react';
import WalletComponent from './WalletComponent';
import RoundComponent from './RoundComponent';
import EventsComponent from './EventsComponent';
import CurrentBetsComponent from './CurrentBetsComponent';
import Footer from './FooterComponent';
import { useLanguage } from '../LanguageContext'


const PredictionComponent = () => {
    const { translate } = useLanguage();

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center p-6">
            <h1 className="text-4xl font-bold mb-8 animate-fade-in">{translate('title')}</h1>
            <RoundComponent />
            <WalletComponent />
            <EventsComponent />
            <CurrentBetsComponent />
            <Footer />
        </div>

    );
};

export default PredictionComponent;