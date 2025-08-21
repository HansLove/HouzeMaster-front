'use client';

import { useState } from 'react';
import { FaSpinner, FaExclamationTriangle, FaHeart } from "react-icons/fa";
import { useProperties } from "../../hooks/useProperties";
import type { IPropertyCard } from "../../types/property";
import PropertyFilters from "./property-filters";
import LeadCapture from "./lead-capture";
import { PropertyCar } from './PropertyCard';
// import Image from 'next/image';

export default function Listings() {
  const { filteredProperties, loading, error, refetch, filters, setFilters } = useProperties();
  const [selectedProperty, setSelectedProperty] = useState<IPropertyCard | null>(null);
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
                <PropertyCar
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

  