'use client';

import { useState } from 'react';
import { FaFilter, FaSearch, FaTimes, FaSlidersH, FaMapMarkerAlt, FaHome, FaDollarSign, FaBed } from 'react-icons/fa';

interface PropertyFiltersProps {
  onFiltersChange: (filters: PropertyFilters) => void;
  filters: PropertyFilters;
}

export interface PropertyFilters {
  search: string;
  propertyType: string;
  operationType: string;
  minPrice: string;
  maxPrice: string;
  minBedrooms: string;
  maxBedrooms: string;
  city: string;
  featured: boolean;
}

const defaultFilters: PropertyFilters = {
  search: '',
  propertyType: '',
  operationType: '',
  minPrice: '',
  maxPrice: '',
  minBedrooms: '',
  maxBedrooms: '',
  city: '',
  featured: false,
};

export default function PropertyFilters({ onFiltersChange, filters }: PropertyFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterChange = (key: keyof PropertyFilters, value: string | boolean) => {
    const newFilters = { ...filters, [key]: value };
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    onFiltersChange(defaultFilters);
  };

  const hasActiveFilters = Object.values(filters).some(value => 
    value !== '' && value !== false
  );

  const activeFiltersCount = Object.values(filters).filter(value => 
    value !== '' && value !== false
  ).length;

  return (
    <div className="bg-white rounded-3xl shadow-soft border border-neutral-100 p-6 mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center">
            <FaSlidersH className="text-primary-600 text-xl" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-neutral-900">Filtros Inteligentes</h3>
            <p className="text-neutral-600 text-sm">Refina tu búsqueda para encontrar la propiedad perfecta</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {hasActiveFilters && (
            <div className="flex items-center space-x-2">
              <span className="bg-primary-100 text-primary-700 text-sm font-medium px-3 py-1 rounded-full">
                {activeFiltersCount} activo{activeFiltersCount !== 1 ? 's' : ''}
              </span>
              <button
                onClick={clearFilters}
                className="text-sm text-neutral-500 hover:text-neutral-700 flex items-center space-x-1 transition-colors"
              >
                <FaTimes className="text-xs" />
                <span>Limpiar todo</span>
              </button>
            </div>
          )}
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 flex items-center space-x-2 ${
              isOpen 
                ? 'bg-primary-600 text-white shadow-glow' 
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            <FaFilter className="text-sm" />
            <span>{isOpen ? 'Ocultar' : 'Mostrar'} Filtros</span>
          </button>
        </div>
      </div>

      {/* Filters Content */}
      {isOpen && (
        <div className="space-y-6 animate-slide-up">
          {/* Search Bar */}
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 text-lg" />
            <input
              type="text"
              placeholder="Buscar propiedades por ubicación, características o palabras clave..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-lg bg-neutral-50 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Main Filters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Property Type */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-700 flex items-center space-x-2">
                <FaHome className="text-primary-500" />
                <span>Tipo de Propiedad</span>
              </label>
              <select
                value={filters.propertyType}
                onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              >
                <option value="">Todos los tipos</option>
                <option value="apartment">Departamento</option>
                <option value="house">Casa</option>
                <option value="condo">Condo</option>
                <option value="townhouse">Townhouse</option>
                <option value="loft">Loft</option>
              </select>
            </div>

            {/* Operation Type */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-700 flex items-center space-x-2">
                <FaDollarSign className="text-primary-500" />
                <span>Operación</span>
              </label>
              <select
                value={filters.operationType}
                onChange={(e) => handleFilterChange('operationType', e.target.value)}
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              >
                <option value="">Todas las operaciones</option>
                <option value="sale">En Venta</option>
                <option value="rent">En Renta</option>
              </select>
            </div>

            {/* City */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-700 flex items-center space-x-2">
                <FaMapMarkerAlt className="text-primary-500" />
                <span>Ciudad</span>
              </label>
              <input
                type="text"
                placeholder="Ingresa ciudad..."
                value={filters.city}
                onChange={(e) => handleFilterChange('city', e.target.value)}
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Bedrooms */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-700 flex items-center space-x-2">
                <FaBed className="text-primary-500" />
                <span>Recámaras</span>
              </label>
              <select
                value={filters.minBedrooms}
                onChange={(e) => handleFilterChange('minBedrooms', e.target.value)}
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              >
                <option value="">Cualquier cantidad</option>
                <option value="1">1+ recámaras</option>
                <option value="2">2+ recámaras</option>
                <option value="3">3+ recámaras</option>
                <option value="4">4+ recámaras</option>
                <option value="5">5+ recámaras</option>
              </select>
            </div>
          </div>

          {/* Price Range */}
          <div className="bg-neutral-50 rounded-2xl p-6">
            <h4 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center space-x-2">
              <FaDollarSign className="text-primary-500" />
              <span>Rango de Precio</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Precio mínimo
                </label>
                <input
                  type="number"
                  placeholder="Precio mínimo..."
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Precio máximo
                </label>
                <input
                  type="number"
                  placeholder="Precio máximo..."
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* Featured Only */}
          <div className="flex items-center justify-center">
            <label className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.featured}
                onChange={(e) => handleFilterChange('featured', e.target.checked)}
                className="w-5 h-5 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded-lg transition-colors"
              />
              <span className="text-lg font-medium text-neutral-700 group-hover:text-neutral-900 transition-colors">
                Solo propiedades destacadas
              </span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
