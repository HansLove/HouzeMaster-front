'use client';

import { useState } from 'react';
import { FaBath, FaBed, FaSpinner, FaExclamationTriangle, FaHeart, FaShare, FaEye, FaMapMarkerAlt } from "react-icons/fa";
import { useProperties } from "../../hooks/useProperties";
import type { PropertyCard } from "../../types/property";
import PropertyFilters from "./property-filters";
import LeadCapture from "./lead-capture";

export default function Listings() {
  const { filteredProperties, loading, error, refetch, filters, setFilters } = useProperties();
  const [selectedProperty, setSelectedProperty] = useState<PropertyCard | null>(null);
  const [showLeadModal, setShowLeadModal] = useState(false);

  if (loading) {
    return (
      <section className="section-padding bg-gradient-to-br from-neutral-50 to-white">
        <div className="container-responsive">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 rounded-full mb-6">
              <FaSpinner className="animate-spin text-primary-600 text-3xl" />
            </div>
            <h2 className="text-4xl font-serif font-bold text-neutral-900 mb-4">
              Descubriendo propiedades excepcionales
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Estamos cargando las mejores opciones para ti
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section-padding bg-gradient-to-br from-neutral-50 to-white">
        <div className="container-responsive">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-error-100 rounded-full mb-6">
              <FaExclamationTriangle className="text-error-600 text-3xl" />
            </div>
            <h2 className="text-4xl font-serif font-bold text-neutral-900 mb-4">
              Oops, algo salió mal
            </h2>
            <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
              {error}
            </p>
            <button
              onClick={refetch}
              className="btn-primary text-lg px-8 py-4"
            >
              Intentar nuevamente
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="section-padding bg-gradient-to-br from-neutral-50 to-white">
        <div className="container-responsive">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl lg:text-6xl font-serif font-bold text-neutral-900 mb-6">
              <span className="text-gradient-primary">Propiedades</span> Destacadas
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Explora nuestra colección curada de propiedades excepcionales, diseñadas para satisfacer los estándares más altos de calidad y estilo
            </p>
          </div>

          {/* Filters */}
          <PropertyFilters onFiltersChange={setFilters} filters={filters} />

          {/* Results Count */}
          <div className="mb-8 text-center">
            <p className="text-lg text-neutral-600">
              Mostrando <span className="font-semibold text-primary-600">{filteredProperties.length}</span> propiedades
            </p>
          </div>

          {filteredProperties.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-neutral-100 rounded-full mb-6">
                <FaHeart className="text-neutral-400 text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                No encontramos propiedades que coincidan con tus filtros
              </h3>
              <p className="text-neutral-600 mb-8 max-w-md mx-auto">
                Intenta ajustar tus criterios de búsqueda o contacta con nosotros para una consulta personalizada
              </p>
              <button
                onClick={() => setFilters({
                  search: '',
                  propertyType: '',
                  operationType: '',
                  minPrice: '',
                  maxPrice: '',
                  minBedrooms: '',
                  maxBedrooms: '',
                  city: '',
                  featured: false,
                })}
                className="btn-secondary text-lg px-8 py-4"
              >
                Limpiar Filtros
              </button>
            </div>
          ) : (
            <div className="grid-properties">
              {filteredProperties.map((property) => (
                <PropertyCard 
                  key={property.id} 
                  property={property}
                  onLeadCapture={() => {
                    setSelectedProperty(property);
                    setShowLeadModal(true);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lead Capture Modal */}
      {showLeadModal && selectedProperty && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => setShowLeadModal(false)}
              className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full shadow-soft flex items-center justify-center text-neutral-600 hover:text-neutral-900 transition-colors z-10"
            >
              ×
            </button>
            <LeadCapture
              propertyId={selectedProperty.id}
              propertyTitle={selectedProperty.title}
              isModal={true}
              onClose={() => setShowLeadModal(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}

interface PropertyCardProps {
  property: PropertyCard;
  onLeadCapture: () => void;
}

function PropertyCard({ property, onLeadCapture }: PropertyCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div className="group">
      <div className="card hover-lift">
        {/* Image Section */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={property.image}
            alt={property.title}
            className={`w-full h-full object-cover transition-all duration-700 ${
              isImageLoaded ? 'scale-100' : 'scale-110'
            } group-hover:scale-110`}
            onLoad={() => setIsImageLoaded(true)}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/img/houses/1.jpg';
            }}
          />
          
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
  