'use client';

import { motion } from 'framer-motion';
import { ModernPropertyCard } from './ModernPropertyCard';
import { useEnhancedProperties } from '@/hooks/useEnhancedProperties';
import { RefreshCw, TrendingUp, Zap, Home } from 'lucide-react';

export function ModernListings() {
  const { 
    cachedProperties, 
    allProperties, 
    isLoading, 
    error, 
    refetch, 
    refreshCache,
    isCacheValid,
    lastFetchTime 
  } = useEnhancedProperties();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const formatTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return 'More than a day ago';
  };

  if (error) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto">
            <h3 className="text-xl font-semibold text-red-800 mb-2">Error Loading Properties</h3>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={refetch}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            <span className="text-blue-600 font-semibold">Premium Properties</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Featured Properties
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium properties in the most desirable locations
          </p>
        </motion.div>

        {/* Cache Status & Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-12 max-w-4xl mx-auto"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className={`w-3 h-3 rounded-full ${isCacheValid ? 'bg-green-500' : 'bg-yellow-500'}`} />
              <div>
                <p className="font-semibold text-gray-900">
                  {isCacheValid ? 'Using Fast Cache' : 'Cache Expired'}
                </p>
                <p className="text-sm text-gray-500">
                  {cachedProperties.length} properties loaded • {formatTimeAgo(lastFetchTime)}
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={refreshCache}
                className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors duration-200"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh Cache
              </button>
              <button
                onClick={refetch}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-200"
              >
                <Zap className="w-4 h-4" />
                Reload All
              </button>
            </div>
          </div>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="inline-flex items-center gap-3">
              <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <span className="text-lg text-gray-600">Loading premium properties...</span>
            </div>
          </motion.div>
        )}

        {/* Properties Grid */}
        {!isLoading && cachedProperties.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {cachedProperties.map((property, index) => (
              <ModernPropertyCard
                key={property.id}
                property={property}
                index={index}
              />
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {!isLoading && cachedProperties.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Home className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Properties Found</h3>
              <p className="text-gray-600 mb-6">
                We couldn&apos;t find any properties matching your criteria. Try adjusting your search or check back later.
              </p>
              <button
                onClick={refetch}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-colors duration-200"
              >
                Refresh Properties
              </button>
            </div>
          </motion.div>
        )}

        {/* View All Properties Button */}
        {cachedProperties.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-16"
          >
            <div className="inline-flex items-center gap-2 text-gray-600 mb-4">
              <span>Showing {cachedProperties.length} of {allProperties.length} properties</span>
            </div>
            <p className="text-sm text-gray-500">
              Fast loading enabled • Properties cached for optimal performance
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
