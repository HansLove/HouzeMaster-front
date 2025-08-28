import Papa from 'papaparse';
import { IPropertyCard, Property } from '../types/property';
import { usePropertyStore } from '../stores/propertyStore';

const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTcC2iDfeGYUXk8W6iZiQ7VtQlI3zXxn7V2puxu12bAx7wWXc-r12W518YHVxLsZj7vaTfgUmL0YJBp/pub?gid=0&single=true&output=csv';

export class EnhancedPropertyService {
  static async fetchProperties(): Promise<Property[]> {
    try {
      const response = await fetch(CSV_URL, {
        // Add cache headers for better performance
        headers: {
          'Cache-Control': 'max-age=300', // 5 minutes
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const csvText = await response.text();
      const result = Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        transform: (value, field) => {
          // Transform specific fields
          switch (field) {
            case 'price':
              return parseFloat(value) || 0;
            case 'bedrooms':
            case 'bathrooms':
            case 'parking_spaces':
            case 'built_area_m2':
            case 'lot_area_m2':
            case 'year_built':
            case 'images_count':
              return parseInt(value) || 0;
            case 'lat':
            case 'lng':
              return parseFloat(value) || 0;
            case 'featured':
              return value.toLowerCase() === 'verdadero' || value.toLowerCase() === 'true';
            case 'amenities':
            case 'tags':
              return value ? value.split(',').map(item => item.trim()) : [];
            default:
              return value;
          }
        }
      });

      if (result.errors.length > 0) {
        console.warn('CSV parsing warnings:', result.errors);
      }

      return result.data as Property[];
    } catch (error) {
      console.error('Error fetching properties:', error);
      throw error;
    }
  }

  static transformToPropertyCard(property: Property): IPropertyCard {
    const getImageUrl = (property: Property): string => {
      // Try to get the first available image
      if (property.image1_url && property.image1_url !== '#ERROR!') {
        return property.image1_url;
      }
      if (property.image2_url && property.image2_url !== '#ERROR!') {
        return property.image2_url;
      }
      if (property.image3_url && property.image3_url !== '#ERROR!') {
        return property.image3_url;
      }
      // Fallback to local image
      return '/img/houses/1.jpg';
    };

    const formatPrice = (price: number, currency: string): string => {
      if (currency === 'USD') {
        return `$${price.toLocaleString()}`;
      } else if (currency === 'MXN') {
        return `$${price.toLocaleString()}`;
      }
      return `${price.toLocaleString()} ${currency}`;
    };

    const getPricePeriod = (period: string): string => {
      if (period === 'per_month') return '/ Month';
      if (period === 'per_week') return '/ Week';
      if (period === 'per_day') return '/ Day';
      return '/ Total';
    };

    const getOperationType = (type: string): string => {
      if (type === 'sale') return 'For Sale';
      if (type === 'rent') return 'For Rent';
      return type;
    };

    return {
      id: property.listing_id,
      image: getImageUrl(property),
      authorImage: '/img/agent.jpg',
      type: getOperationType(property.operation_type),
      title: property.title,
      location: `${property.neighborhood}, ${property.city}`,
      beds: property.bedrooms,
      baths: property.bathrooms,
      area: `${property.built_area_m2} m²`,
      price: formatPrice(property.price, property.currency),
      period: getPricePeriod(property.price_period),
      description: property.description,
      amenities: property.amenities,
      tags: property.tags,
      featured: property.featured,
      slug: property.slug
    };
  }

  static async getPropertiesWithCache(): Promise<IPropertyCard[]> {
    const store = usePropertyStore.getState();
    
    // Check if cache is valid and we have cached properties
    if (store.isCacheValid() && store.cachedProperties.length > 0) {
      console.log('Using cached properties for fast loading');
      return store.cachedProperties;
    }

    try {
      store.setLoading(true);
      store.setError(null);
      
      const properties = await this.fetchProperties();
      const propertyCards = properties
        .filter(property => property.status === 'published')
        .map(property => this.transformToPropertyCard(property))
        .sort((a, b) => {
          // Featured properties first, then by date
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });

      // Update store with all properties
      store.setAllProperties(propertyCards);
      
      // Update cache with top 10 properties
      store.updateCache(propertyCards);
      
      return store.cachedProperties;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error fetching properties';
      store.setError(errorMessage);
      console.error('Error in getPropertiesWithCache:', error);
      
      // Return cached properties if available, even if expired
      if (store.cachedProperties.length > 0) {
        console.log('Returning expired cache due to error');
        return store.cachedProperties;
      }
      
      throw error;
    } finally {
      store.setLoading(false);
    }
  }

  static async refreshProperties(): Promise<void> {
    const store = usePropertyStore.getState();
    store.clearCache();
    await this.getPropertiesWithCache();
  }

  static getCachedProperties(): IPropertyCard[] {
    return usePropertyStore.getState().cachedProperties;
  }

  static getFeaturedProperties(): IPropertyCard[] {
    return usePropertyStore.getState().getFeaturedProperties();
  }

  static searchProperties(query: string): IPropertyCard[] {
    const store = usePropertyStore.getState();
    const { allProperties } = store;
    
    if (!query.trim()) return allProperties;
    
    const searchTerm = query.toLowerCase();
    return allProperties.filter(property => 
      property.title.toLowerCase().includes(searchTerm) ||
      property.description.toLowerCase().includes(searchTerm) ||
      property.location.toLowerCase().includes(searchTerm) ||
      property.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }

  static filterProperties(filters: {
    propertyType?: string;
    operationType?: string;
    minPrice?: number;
    maxPrice?: number;
    minBedrooms?: number;
    maxBedrooms?: number;
    city?: string;
    featured?: boolean;
  }): IPropertyCard[] {
    const store = usePropertyStore.getState();
    const { allProperties } = store;
    
    return allProperties.filter(property => {
      // Property type filter
      if (filters.propertyType && !property.type.toLowerCase().includes(filters.propertyType.toLowerCase())) {
        return false;
      }

      // Operation type filter
      if (filters.operationType && !property.type.toLowerCase().includes(filters.operationType.toLowerCase())) {
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
  }
}
