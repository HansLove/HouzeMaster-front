'use client';

import { useState, useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Globe, ChevronDown, Loader2 } from 'lucide-react';

const languages = [
  { code: 'es', flag: '🇲🇽' },
  { code: 'en', flag: '🇺🇸' }
];

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations();

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];
  
  const getLanguageName = (code: string) => {
    return code === 'es' ? t('language.spanish') : t('language.english');
  };

  const handleLanguageChange = (newLocale: string) => {
    if (newLocale === locale) {
      setIsOpen(false);
      return;
    }

    startTransition(() => {
      try {
        // Create the new path by replacing the locale in the current pathname
        const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
        
        // Use router.push for navigation with shallow routing for faster transitions
        router.push(newPath, { scroll: false });
        setIsOpen(false);
      } catch (error) {
        console.error('Error changing language:', error);
        // Fallback: reload the page with the new locale
        window.location.href = pathname.replace(`/${locale}`, `/${newLocale}`);
      }
    });
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Globe className="w-4 h-4" />
        )}
        <span className="text-sm font-medium">{currentLanguage.flag}</span>
        <span className="hidden sm:inline text-sm">{getLanguageName(currentLanguage.code)}</span>
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          className="absolute top-full right-0 mt-2 w-48 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-200/20 overflow-hidden z-50"
        >
          {languages.map((language) => (
            <motion.button
              key={language.code}
              whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
              onClick={() => handleLanguageChange(language.code)}
              disabled={isPending}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                locale === language.code 
                  ? 'text-blue-600 bg-blue-50/50' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              <span className="text-lg">{language.flag}</span>
              <span className="font-medium">{getLanguageName(language.code)}</span>
              {locale === language.code && !isPending && (
                <motion.div
                  layoutId="activeLanguage"
                  className="ml-auto w-2 h-2 bg-blue-600 rounded-full"
                />
              )}
              {isPending && language.code !== locale && (
                <Loader2 className="ml-auto w-4 h-4 animate-spin text-gray-400" />
              )}
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}