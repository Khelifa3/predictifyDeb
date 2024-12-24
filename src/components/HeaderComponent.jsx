import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';

const HeaderComponent = () => {
    const { translate } = useLanguage();
    return (
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            {translate('title')}
          </h1>
        </header>
        );
};

export default HeaderComponent;
