'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Menu, X, Home, Building2, CreditCard, Zap, MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { LanguageSwitcher } from './LanguageSwitcher';

export function ModernNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const t = useTranslations('navigation');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['why-houze-master', 'payment-options', 'tokenization'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      setActiveSection(currentSection || '');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navVariants: Variants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  const menuVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: -20 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      y: -20,
      transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  const menuItemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, delay: i * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }
    })
  };

  const navItems = [
    { name: t('home'), href: '/', icon: Home, shortName: t('home') },
    { name: t('whyUs'), href: '#why-houze-master', icon: Building2, shortName: t('whyUs') },
    { name: t('payments'), href: '#payment-options', icon: CreditCard, shortName: t('payments') },
    { name: t('tokenization'), href: '#tokenization', icon: Zap, shortName: t('tokenization') },
  ];

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Main Navigation */}
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-2xl shadow-2xl border-b border-gray-200/20' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative w-8 h-8 lg:w-10 lg:h-10">
                  <Image
                    src="/logo.png"
                    alt="Houze Master"
                    fill
                    className="object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="hidden sm:block">
                  <h1 className={`text-lg lg:text-xl font-bold transition-colors duration-300 ${
                    isScrolled ? 'text-gray-900' : 'text-white'
                  }`}>
                    Houze Master
                  </h1>
                  <p className={`text-xs lg:text-sm transition-colors duration-300 ${
                    isScrolled ? 'text-gray-600' : 'text-gray-300'
                  }`}>
                    {t('landInvestment')}
                  </p>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <motion.div
                    key={item.name}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                  >
                    <button
                      onClick={() => handleNavClick(item.href)}
                      className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 group ${
                        isScrolled 
                          ? (isActive 
                              ? 'text-blue-600 bg-blue-50/80' 
                              : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/50')
                          : (isActive 
                              ? 'text-blue-200 bg-white/20' 
                              : 'text-white/90 hover:text-white hover:bg-white/10')
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span className="font-medium text-sm">{item.name}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl -z-10"
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </button>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA Section */}
            <div className="flex items-center gap-3">
              {/* Language Switcher */}
              <LanguageSwitcher />

              {/* WhatsApp CTA - More sophisticated */}
              <motion.button
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('https://wa.me/527223493064', '_blank')}
                className={`hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                  isScrolled
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg hover:shadow-xl hover:from-green-700 hover:to-emerald-700'
                    : 'bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20'
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                <span className="hidden md:inline">{t('connect')}</span>
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                className={`lg:hidden p-2.5 rounded-xl transition-all duration-300 ${
                  isScrolled 
                    ? 'text-gray-700 hover:bg-gray-100/80' 
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <Menu className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu Content */}
            <motion.div 
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white/95 backdrop-blur-2xl shadow-2xl border-l border-gray-200/20"
            >
              <div className="p-6 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200/50">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10">
                      <Image
                        src="/logo.png"
                        alt="Houze Master"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">Houze Master</h2>
                      <p className="text-sm text-gray-600">{t('landInvestment')}</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(false)}
                    className="p-2.5 rounded-xl hover:bg-gray-100/80 transition-colors duration-200"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </motion.button>
                </div>

                {/* Menu Items */}
                <nav className="flex-1 space-y-1">
                  {navItems.map((item, i) => {
                    const isActive = activeSection === item.href.replace('#', '');
                    return (
                      <motion.div
                        key={item.name}
                        custom={i}
                        variants={menuItemVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <button
                          onClick={() => handleNavClick(item.href)}
                          className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all duration-200 ${
                            isActive 
                              ? 'text-blue-600 bg-blue-50/80 border border-blue-200/50' 
                              : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/50'
                          }`}
                        >
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.name}</span>
                          {isActive && (
                            <motion.div
                              layoutId="mobileActiveIndicator"
                              className="ml-auto w-2 h-2 bg-blue-600 rounded-full"
                              transition={{ duration: 0.3 }}
                            />
                          )}
                        </button>
                      </motion.div>
                    );
                  })}
                </nav>

                {/* Contact Section */}
                <div className="mt-8 pt-6 border-t border-gray-200/50">
                  <div className="bg-gradient-to-br from-gray-50 to-blue-50/50 rounded-2xl p-4 mb-4">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">{t('readyToExplore')}</h3>
                    <p className="text-xs text-gray-600 mb-4">
                      {t('connectDescription')}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        window.open('https://wa.me/527223493064', '_blank');
                        setIsOpen(false);
                      }}
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-4 rounded-xl font-medium text-sm transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      {t('connectViaWhatsApp')}
                    </motion.button>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-xs text-gray-500">+52 722 349 3064</p>
                    <p className="text-xs text-gray-400 mt-1">{t('professionalGuidance')}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
