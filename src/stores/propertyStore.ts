import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { IPropertyCard } from '../types/property';

interface PropertyState {
  // Cached properties (max 10 for fast loading)
  cachedProperties: IPropertyCard[];
  // All properties from API
  allProperties: IPropertyCard[];
  // Loading states
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;
  // Cache management
  lastFetchTime: number;
  cacheExpiryTime: number; // 5 minutes
  // Actions
  setCachedProperties: (properties: IPropertyCard[]) => void;
  setAllProperties: (properties: IPropertyCard[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addToCache: (property: IPropertyCard) => void;
  removeFromCache: (propertyId: string) => void;
  clearCache: () => void;
  updateCache: (properties: IPropertyCard[]) => void;
  isCacheValid: () => boolean;
  getFeaturedProperties: () => IPropertyCard[];
  getPropertiesByType: (type: string) => IPropertyCard[];
  getPropertiesByCity: (city: string) => IPropertyCard[];
}

const CACHE_LIMIT = 10;
const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes

export const usePropertyStore = create<PropertyState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        cachedProperties: [],
        allProperties: [],
        isLoading: false,
        isInitialized: false,
        error: null,
        lastFetchTime: 0,
        cacheExpiryTime: CACHE_EXPIRY,

        // Actions
        setCachedProperties: (properties) => {
          set({ cachedProperties: properties.slice(0, CACHE_LIMIT) });
        },

        setAllProperties: (properties) => {
          set({ 
            allProperties: properties,
            isInitialized: true,
            lastFetchTime: Date.now()
          });
        },

        setLoading: (loading) => set({ isLoading: loading }),

        setError: (error) => set({ error }),

        addToCache: (property) => {
          const { cachedProperties } = get();
          const newCache = [property, ...cachedProperties.filter(p => p.id !== property.id)];
          set({ cachedProperties: newCache.slice(0, CACHE_LIMIT) });
        },

        removeFromCache: (propertyId) => {
          const { cachedProperties } = get();
          set({ 
            cachedProperties: cachedProperties.filter(p => p.id !== propertyId) 
          });
        },

        clearCache: () => set({ cachedProperties: [] }),

        updateCache: (properties) => {
          // Prioritize featured properties and recent ones
          const sortedProperties = properties
            .sort((a, b) => {
              if (a.featured && !b.featured) return -1;
              if (!a.featured && b.featured) return 1;
              return 0;
            })
            .slice(0, CACHE_LIMIT);
          
          set({ cachedProperties: sortedProperties });
        },

        isCacheValid: () => {
          const { lastFetchTime, cacheExpiryTime } = get();
          return Date.now() - lastFetchTime < cacheExpiryTime;
        },

        getFeaturedProperties: () => {
          const { allProperties } = get();
          return allProperties.filter(p => p.featured);
        },

        getPropertiesByType: (type) => {
          const { allProperties } = get();
          return allProperties.filter(p => p.type.toLowerCase().includes(type.toLowerCase()));
        },

        getPropertiesByCity: (city) => {
          const { allProperties } = get();
          return allProperties.filter(p => 
            p.location.toLowerCase().includes(city.toLowerCase())
          );
        },
      }),
      {
        name: 'property-cache',
        partialize: (state) => ({
          cachedProperties: state.cachedProperties,
          lastFetchTime: state.lastFetchTime,
        }),
      }
    ),
    {
      name: 'property-store',
    }
  )
);
