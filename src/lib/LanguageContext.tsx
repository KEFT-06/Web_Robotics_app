import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Language = 'FR' | 'EN';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (fr: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('FR');

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'FR' ? 'EN' : 'FR'));
  };

  const t = (fr: string, en: string) => (lang === 'FR' ? fr : en);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
