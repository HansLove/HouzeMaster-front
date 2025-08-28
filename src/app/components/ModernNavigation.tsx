'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Menu, X, Home, Building2, Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export function ModernNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navVariants:Variants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const menuVariants:Variants = {
    hidden: { opacity: 0, x: '100%' },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      x: '100%',
      transition: { duration: 0.3, ease: "easeIn" }
    }
  };

  const menuItemVariants:Variants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, delay: i * 0.1, ease: "easeOut" }
    })
  };

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Properties', href: '/listings', icon: Building2 },
    { name: 'About', href: '/about', icon: Building2 },
    { name: 'Contact', href: '/contact', icon: Phone },
  ];

  return (
    <>
      {/* Main Navigation */}
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200/50' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10">
                <Image
                  src="/logo.png"
                  alt="Taloon Studio"
                  fill
                  className="object-contain group-hover:scale-110 transition-transform duration-200"
                />
              </div>
              <div className="hidden md:block">
                <h1 className={`text-xl font-bold transition-colors duration-300 ${
                  // isScrolled ? 'text-gray-900' : 'text-white'
                  isScrolled ? 'text-gray-900' : 'text-gray-400'
                }`}>
                  Taloon Studio
                </h1>
                <p className={`text-sm transition-colors duration-300 ${
                  isScrolled ? 'text-gray-600' : 'text-gray-300'
                }`}>
                  Premium Real Estate
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 group ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50' 
                      : 'text-white hover:text-blue-200 hover:bg-white/10'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                href="/contact"
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  isScrolled
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                    : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                }`}
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(true)}
              className={`lg:hidden p-2 rounded-xl transition-all duration-200 ${
                isScrolled 
                  ? 'text-gray-700 hover:bg-gray-100' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <Menu className="w-6 h-6" />
            </button>
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
            <div 
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu Content */}
            <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="relative w-8 h-8">
                      <Image
                        src="/logo.png"
                        alt="Taloon Studio"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">Taloon Studio</h2>
                      <p className="text-sm text-gray-600">Premium Real Estate</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                  >
                    <X className="w-6 h-6 text-gray-600" />
                  </button>
                </div>

                {/* Menu Items */}
                <nav className="space-y-2">
                  {navItems.map((item, i) => (
                    <motion.div
                      key={item.name}
                      custom={i}
                      variants={menuItemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Contact Info */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">Contact Us</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-600">
                      <Phone className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">+52 998 123 4567</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <Mail className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">info@taloonstudio.com</span>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="mt-8">
                  <Link
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl font-semibold text-center block hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
