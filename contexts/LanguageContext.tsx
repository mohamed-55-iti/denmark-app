'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, TranslationKey, t } from '@/lib/i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  tr: (key: TranslationKey) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  tr: (key) => key,
  isRTL: false,
});

const VALID_LANGUAGES: Language[] = ['en', 'da', 'sv', 'no', 'ar'];
const RTL_LANGUAGES: Language[] = ['ar'];

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem('lang') as Language;
      if (stored && VALID_LANGUAGES.includes(stored)) {
        setLanguageState(stored);
      }
    } catch {
      // localStorage not available
    }
  }, []);

  const isRTL = RTL_LANGUAGES.includes(language);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL, mounted]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('lang', lang);
    } catch {
      // localStorage not available
    }
  };

  const tr = (key: TranslationKey) => t(language, key);

  if (!mounted) return <>{children}</>;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, tr, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}