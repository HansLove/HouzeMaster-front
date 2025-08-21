import { useState, useEffect, useMemo } from 'react';
// import { PropertyCard } from '../types/property';
import { PropertyService } from '../services/propertyService';
import { PropertyFilters } from '../app/components/property-filters';
import { IPropertyCard } from '@/types/property';

export interface UsePropertiesReturn {
  properties: IPropertyCard[];
  filteredProperties: IPropertyCard[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  filters: PropertyFilters;
  setFilters: (filters: PropertyFilters) => void;
  clearFilters: () => void;
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

export function useProperties(): UsePropertiesReturn {
  const [properties, setProperties] = useState<IPropertyCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<PropertyFilters>(defaultFilters);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await PropertyService.getPropertiesForDisplay();
      setProperties(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error fetching properties';
      setError(errorMessage);
      console.error('Error in useProperties:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const refetch = async () => {
    await fetchProperties();
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
  };

  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      // Search filter
      if (filters.search && !property.title.toLowerCase().includes(filters.search.toLowerCase()) &&
          !property.description.toLowerCase().includes(filters.search.toLowerCase()) &&
          !property.location.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }

      // Property type filter - we'll need to add this to PropertyCard interface or handle differently
      // For now, we'll skip this filter until we add property_type to PropertyCard

      // Operation type filter
      if (filters.operationType && property.type !== getOperationType(filters.operationType)) {
        return false;
      }

      // City filter
      if (filters.city && !property.location.toLowerCase().includes(filters.city.toLowerCase())) {
        return false;
      }

      // Price filters
      if (filters.minPrice) {
        const minPrice = parseFloat(filters.minPrice);
        const propertyPrice = parseFloat(property.price.replace(/[^0-9.]/g, ''));
        if (propertyPrice < minPrice) return false;
      }

      if (filters.maxPrice) {
        const maxPrice = parseFloat(filters.maxPrice);
        const propertyPrice = parseFloat(property.price.replace(/[^0-9.]/g, ''));
        if (propertyPrice > maxPrice) return false;
      }

      // Bedroom filters
      if (filters.minBedrooms && property.beds < parseInt(filters.minBedrooms)) {
        return false;
      }

      if (filters.maxBedrooms && property.beds > parseInt(filters.maxBedrooms)) {
        return false;
      }

      // Featured filter
      if (filters.featured && !property.featured) {
        return false;
      }

      return true;
    });
  }, [properties, filters]);

  const getOperationType = (type: string): string => {
    if (type === 'sale') return 'For Sale';
    if (type === 'rent') return 'For Rent';
    return type;
  };

  return {
    properties,
    filteredProperties,
    loading,
    error,
    refetch,
    filters,
    setFilters,
    clearFilters
  };
}
