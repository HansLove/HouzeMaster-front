import { useEffect, useMemo } from 'react';
import { usePropertyStore } from '../stores/propertyStore';
import { EnhancedPropertyService } from '../services/enhancedPropertyService';
import { IPropertyCard } from '../types/property';

export interface UseEnhancedPropertiesReturn {
  // Fast cached properties (max 10)
  cachedProperties: IPropertyCard[];
  // All properties
  allProperties: IPropertyCard[];
  // Loading states
  isLoading: boolean;
  error: string | null;
  // Actions
  refetch: () => Promise<void>;
  refreshCache: () => Promise<void>;
  searchProperties: (query: string) => IPropertyCard[];
  filterProperties: (filters: PropertyFilters) => IPropertyCard[];
  getFeaturedProperties: () => IPropertyCard[];
  // Cache info
  isCacheValid: boolean;
  lastFetchTime: number;
}

export interface PropertyFilters {
  search?: string;
  propertyType?: string;
  operationType?: string;
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  maxBedrooms?: number;
  city?: string;
  featured?: boolean;
}

export function useEnhancedProperties(): UseEnhancedPropertiesReturn {
  const {
    cachedProperties,
    allProperties,
    isLoading,
    error,
    isInitialized,
    lastFetchTime,
    setLoading,
    setError,
    isCacheValid: storeIsCacheValid,
  } = usePropertyStore();

  // Initialize properties on mount
  useEffect(() => {
    if (!isInitialized) {
      const initializeProperties = async () => {
        try {
          await EnhancedPropertyService.getPropertiesWithCache();
        } catch (err) {
          console.error('Error initializing properties:', err);
        }
      };
      
      initializeProperties();
    }
  }, [isInitialized]);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      await EnhancedPropertyService.getPropertiesWithCache();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error fetching properties';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const refreshCache = async () => {
    try {
      await EnhancedPropertyService.refreshProperties();
    } catch (err) {
      console.error('Error refreshing cache:', err);
    }
  };

  const searchProperties = (query: string): IPropertyCard[] => {
    return EnhancedPropertyService.searchProperties(query);
  };

  const filterProperties = (filters: PropertyFilters): IPropertyCard[] => {
    return EnhancedPropertyService.filterProperties(filters);
  };

  const getFeaturedProperties = (): IPropertyCard[] => {
    return EnhancedPropertyService.getFeaturedProperties();
  };

  const isCacheValid = storeIsCacheValid();

  return {
    cachedProperties,
    allProperties,
    isLoading,
    error,
    refetch,
    refreshCache,
    searchProperties,
    filterProperties,
    getFeaturedProperties,
    isCacheValid,
    lastFetchTime,
  };
}

// Hook for filtered properties with search
export function useFilteredProperties(filters: PropertyFilters) {
  const { allProperties, isLoading } = useEnhancedProperties();

  const filteredProperties = useMemo(() => {
    if (!allProperties.length) return [];
    
    return allProperties.filter(property => {
      // Search filter
      if (filters.search && !property.title.toLowerCase().includes(filters.search.toLowerCase()) &&
          !property.description.toLowerCase().includes(filters.search.toLowerCase()) &&
          !property.location.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }

      // Property type filter
      if (filters.propertyType && !property.type.toLowerCase().includes(filters.propertyType.toLowerCase())) {
        return false;
      }

      // City filter
      if (filters.city && !property.location.toLowerCase().includes(filters.city.toLowerCase())) {
        return false;
      }

      // Price filters
      if (filters.minPrice) {
        const propertyPrice = parseFloat(property.price.replace(/[^0-9.]/g, ''));
        if (propertyPrice < filters.minPrice) return false;
      }

      if (filters.maxPrice) {
        const propertyPrice = parseFloat(property.price.replace(/[^0-9.]/g, ''));
        if (propertyPrice > filters.maxPrice) return false;
      }

      // Bedroom filters
      if (filters.minBedrooms && property.beds < filters.minBedrooms) {
        return false;
      }

      if (filters.maxBedrooms && property.beds > filters.maxBedrooms) {
        return false;
      }

      // Featured filter
      if (filters.featured && !property.featured) {
        return false;
      }

      return true;
    });
  }, [allProperties, filters]);

  return {
    filteredProperties,
    isLoading,
    totalCount: allProperties.length,
    filteredCount: filteredProperties.length,
  };
}
