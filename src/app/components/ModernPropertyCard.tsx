'use client';

import { motion } from 'framer-motion';
import { Heart, MapPin, Bed, Bath, Square, Star, Eye } from 'lucide-react';
import { IPropertyCard } from '@/types/property';
import { useState } from 'react';
import Link from 'next/link';

interface ModernPropertyCardProps {
  property: IPropertyCard;
  index?: number;
  className?: string;
}

export function ModernPropertyCard({ property, index = 0, className = '' }: ModernPropertyCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    hover: { 
      y: -8,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const imageVariants = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden ${className}`}
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <motion.img
          src={property.image}
          alt={property.title}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Featured Badge */}
        {property.featured && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute top-4 left-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1"
          >
            <Star className="w-3 h-3 fill-current" />
            Featured
          </motion.div>
        )}

        {/* Like Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleLike}
          className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-700 hover:text-red-500 p-2 rounded-full shadow-lg transition-all duration-200"
        >
          <Heart 
            className={`w-5 h-5 transition-all duration-200 ${
              isLiked ? 'fill-red-500 text-red-500' : ''
            }`} 
          />
        </motion.button>

        {/* Property Type Badge */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
          {property.type}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-gray-900">
              {property.price}
            </span>
            <span className="text-sm text-gray-500 font-medium">
              {property.period}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
          {property.title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-600 mb-4">
          <MapPin className="w-4 h-4 text-blue-500" />
          <span className="text-sm">{property.location}</span>
        </div>

        {/* Property Details */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1 text-gray-600">
            <Bed className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium">{property.beds}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <Bath className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium">{property.baths}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <Square className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium">{property.area}</span>
          </div>
        </div>

        {/* Tags */}
        {property.tags && property.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {property.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Action Button */}
        <Link href={`/details/${property.slug}`}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 group-hover:shadow-lg"
          >
            <Eye className="w-4 h-4" />
            View Details
          </motion.button>
        </Link>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-200 transition-all duration-300 pointer-events-none" />
    </motion.div>
  );
}
