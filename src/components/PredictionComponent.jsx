import React from 'react';
import HeaderComponent from './HeaderComponent';
import WalletComponent from './WalletComponent';
import RoundComponent from './RoundComponent';
import EventsComponent from './EventsComponent';
import CurrentBetsComponent from './CurrentBetsComponent';
import Footer from './FooterComponent';
import { useLanguage } from '../LanguageContext'


const PredictionComponent = () => {
    const { translate } = useLanguage();

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-4 space-y-6">
            <div className="container mx-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                    <HeaderComponent />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <RoundComponent />
                        <WalletComponent />
                        <EventsComponent />
                        <CurrentBetsComponent />
                        </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default PredictionComponent;