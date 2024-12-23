import React, { createContext, useState, useContext } from 'react';
import en from './locales/en.json';
import fr from './locales/fr.json';
import ar from './locales/ar.json';

const LanguageContext = createContext();

const translations = { en, fr, ar };

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');

    const translate = (key) => translations[language][key] || key;

    return (
        <LanguageContext.Provider value={{ language, setLanguage, translate }}>
            <div className={language === 'ar' ? 'arabic-text' : ''}>
                {children}
            </div>
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
