import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { useBlockchainStore } from "./useBlockchainStore";

const FooterComponent = () => {
    const { translate } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const { contract } = useBlockchainStore();
    const contract_address = contract.contractInstance ? contract.contractInstance.target : null;
    return (
        <footer className="bg-gray-800 text-white py-5 px-5 mt-6">
            <div className="max-w-3xl mx-auto">

                {/* How-To Collapsible Section */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    aria-expanded={isOpen}
                    aria-controls="how-to-content"
                    className="w-full text-left text-xl font-bold py-3 px-4 bg-gray-900 rounded-md focus:outline-none hover:bg-gray-700 flex items-center justify-between transition duration-300 ease-in-out"
                >
                    {translate('howTo')}
                    <span className="ml-2">
                        {isOpen ? '-' : '+'}
                    </span>
                </button>

                {isOpen && (
                    <div
                        id="how-to-content"
                        className="mt-4 p-4 bg-gray-700 rounded-md space-y-4 text-sm leading-relaxed transition-all duration-300 ease-in-out"
                    >   {/* General */}
                        <div>
                            <strong>{translate('general')}</strong>
                            <p>{translate('description')}</p>
                        </div>
                        {/* Step 1 */}
                        <div>
                            <strong>{translate('howToStep1Title')}</strong>
                            <p>{translate('howToStep1Description')}</p>
                        </div>
                        {/* Step 2 */}
                        <div>
                            <strong>{translate('howToStep2Title')}</strong>
                            <p>{translate('howToStep2Description')}</p>
                        </div>
                        {/* Step 3 */}
                        <div>
                            <strong>{translate('howToStep3Title')}</strong>
                            <p>{translate('howToStep3Description')}</p>
                        </div>
                        {/* Step 4 */}
                        <div>
                            <strong>{translate('howToStep4Title')}</strong>
                            <p>{translate('howToStep4Description')}</p>
                        </div>
                        {/* Step 5 */}
                        {
                            <div>
                                <strong>{translate('howToStep5Title')}</strong>
                                <p>{translate('howToStep5Description')}</p>
                            </div>
                        }
                    </div>
                )}
            </div>

            {/* Contract Address Link */}
            <div className="mt-4 text-center">
                <a
                    href={`https://testnet.bscscan.com/address/${contract_address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline transition duration-200"
                >
                    {translate('viewContract')}
                </a>
            </div>
        </footer>
    );
};

export default FooterComponent;
