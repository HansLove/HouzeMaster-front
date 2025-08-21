'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaSearch, FaMapMarkerAlt, FaHome, FaHeart } from 'react-icons/fa';

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [, setIsSearchFocused] = useState(false);

  const heroImages = [
    '/img/celestehome1.jpg',
    '/img/houses/1.jpg',
    '/img/houses/2.jpg',
    '/img/houses/3.jpg',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images with Fade Transition */}
      {heroImages.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={image}
            alt={`Luxury property ${index + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/70 via-neutral-900/50 to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 container-responsive text-center text-white">
        <div className="animate-fade-in">
          {/* Brand */}
          <div className="mb-8">
            <h1 className="text-6xl lg:text-8xl font-serif font-bold mb-4">
              <span className="text-gradient-accent">Houze</span>
              <span className="text-white">Master</span>
            </h1>
            <p className="text-xl lg:text-2xl text-neutral-200 font-light max-w-2xl mx-auto leading-relaxed">
              Descubre propiedades excepcionales que transforman sueños en realidad
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto mb-12">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <FaSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-neutral-400 text-xl" />
                <input
                  type="text"
                  placeholder="Buscar propiedades por ubicación, tipo o características..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="w-full pl-16 pr-6 py-5 text-lg bg-white/95 backdrop-blur-sm text-neutral-900 rounded-2xl border-2 border-transparent focus:border-primary-400 focus:outline-none transition-all duration-300 shadow-soft"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 btn-primary py-3 px-8"
                >
                  Buscar
                </button>
              </div>
            </form>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                <FaHome className="text-4xl mx-auto mb-4 text-accent-400" />
                <div className="text-3xl font-bold text-white mb-2">500+</div>
                <div className="text-neutral-200">Propiedades</div>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                <FaMapMarkerAlt className="text-4xl mx-auto mb-4 text-accent-400" />
                <div className="text-3xl font-bold text-white mb-2">25+</div>
                <div className="text-neutral-200">Ciudades</div>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                <FaHeart className="text-4xl mx-auto mb-4 text-accent-400" />
                <div className="text-3xl font-bold text-white mb-2">1000+</div>
                <div className="text-neutral-200">Clientes Felices</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      {/* Image Indicators */}
      <div className="absolute bottom-8 right-8 flex space-x-3">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImageIndex
                ? 'bg-white scale-125'
                : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </section>
  );
}