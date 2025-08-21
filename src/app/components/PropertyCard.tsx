// import { PropertyCard } from "@/types/property";
import { IPropertyCard } from "@/types/property";
import Image from "next/image";
import { useState } from "react";
import { FaBath, FaBed, FaHeart, FaShare, FaEye, FaMapMarkerAlt } from "react-icons/fa";



interface PropertyCardProps {
    property: IPropertyCard;
    onLeadCapture: () => void;
}
  
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export  function PropertyCar({ property, onLeadCapture }: PropertyCardProps) {
    const [isLiked, setIsLiked] = useState(false);
    const [imageError, setImageError] = useState(false);
  
    // Fallback image if the main image fails to load
    const fallbackImage = '/img/houses/1.jpg';
    
    const handleImageError = () => {
      setImageError(true);
    };

    console.log(property);
  
    return (
      <div className="group">
        <div className="card hover-lift">
          {/* Image Section */}
          <div className="relative aspect-video overflow-hidden">
            {!imageError ? (
              <Image
                src={property.image}
                alt={property.title}
                width={1920}
                height={1080}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                onError={handleImageError}
                priority={false}
              />
            ) : (
              <Image
                src={fallbackImage}
                alt={property.title}
                width={1920}
                height={1080}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                priority={false}
              />
            )}
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                  isLiked 
                    ? 'bg-primary-500 text-white shadow-glow' 
                    : 'bg-white/90 text-neutral-600 hover:bg-white hover:scale-110'
                }`}
              >
                <FaHeart className={`text-sm ${isLiked ? 'fill-current' : ''}`} />
              </button>
              <button className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-neutral-600 hover:bg-white hover:scale-110 transition-all duration-200">
                <FaShare className="text-sm" />
              </button>
            </div>
  
            {/* Featured Badge */}
            {property.featured && (
              <div className="absolute top-4 left-4">
                <span className="bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center shadow-soft">
                  <FaHeart className="mr-1 text-xs" />
                  Destacada
                </span>
              </div>
            )}
  
            {/* Property Type Badge */}
            <div className="absolute bottom-4 left-4">
              <span className="bg-white/90 backdrop-blur-sm text-neutral-800 text-sm font-semibold px-3 py-1 rounded-full">
                {property.type}
              </span>
            </div>
          </div>
  
          {/* Content Section */}
          <div className="p-6">
            {/* Title and Location */}
            <div className="mb-4">
              <h3 className="text-xl font-bold text-neutral-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                {property.title}
              </h3>
              <div className="flex items-center text-neutral-600 text-sm">
                <FaMapMarkerAlt className="mr-2 text-primary-500" />
                <span>{property.location}</span>
              </div>
            </div>
  
            {/* Description */}
            {property.description && (
              <p className="text-neutral-600 mb-4 line-clamp-2">
                {property.description}
              </p>
            )}
  
            {/* Property Features */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-neutral-700">
                  <FaBed className="mr-2 text-primary-500" />
                  <span className="font-semibold">{property.beds}</span>
                  <span className="text-sm text-neutral-500 ml-1">rec</span>
                </div>
                <div className="flex items-center text-neutral-700">
                  <FaBath className="mr-2 text-primary-500" />
                  <span className="font-semibold">{property.baths}</span>
                  <span className="text-sm text-neutral-500 ml-1">baños</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-neutral-500">Área</div>
                <div className="font-semibold text-neutral-900">{property.area}</div>
              </div>
            </div>
  
            {/* Amenities */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {property.amenities.slice(0, 3).map((amenity, index) => (
                    <span
                      key={index}
                      className="bg-primary-50 text-primary-700 text-xs px-3 py-1 rounded-full border border-primary-200"
                    >
                      {amenity}
                    </span>
                  ))}
                  {property.amenities.length > 3 && (
                    <span className="bg-neutral-100 text-neutral-600 text-xs px-3 py-1 rounded-full">
                      +{property.amenities.length - 3} más
                    </span>
                  )}
                </div>
              </div>
            )}
  
            {/* Price and Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
              <div>
                <div className="text-2xl font-bold text-primary-600">{property.price}</div>
                <div className="text-sm text-neutral-500">{property.period}</div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => window.open(`/details/${property.slug}`, '_blank')}
                  className="btn-secondary px-4 py-2 text-sm flex items-center"
                >
                  <FaEye className="mr-2" />
                  Ver
                </button>
                <button
                  onClick={onLeadCapture}
                  className="btn-primary px-4 py-2 text-sm flex items-center"
                >
                  <FaHeart className="mr-2" />
                  Interés
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }