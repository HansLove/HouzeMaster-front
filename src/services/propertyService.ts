import Papa from 'papaparse';
import { Property, PropertyCard } from '../types/property';

const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTcC2iDfeGYUXk8W6iZiQ7VtQlI3zXxn7V2puxu12bAx7wWXc-r12W518YHVxLsZj7vaTfgUmL0YJBp/pub?gid=0&single=true&output=csv';

export class PropertyService {
  static async fetchProperties(): Promise<Property[]> {
    try {
      const response = await fetch(CSV_URL);
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

  static transformToPropertyCard(property: Property): PropertyCard {
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
      authorImage: '/img/agent.jpg', // Default agent image
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

  static async getPropertiesForDisplay(): Promise<PropertyCard[]> {
    try {
      const properties = await this.fetchProperties();
      return properties
        .filter(property => property.status === 'published')
        .map(property => this.transformToPropertyCard(property))
        .sort((a, b) => {
          // Featured properties first, then by date
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
    } catch (error) {
      console.error('Error getting properties for display:', error);
      throw error;
    }
  }
}
