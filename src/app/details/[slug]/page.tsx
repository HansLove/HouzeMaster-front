'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { FaBath, FaBed, FaCar, FaMapMarkerAlt, FaTag, FaStar, FaExclamationTriangle } from 'react-icons/fa';
import { PropertyService } from '../../../services/propertyService';
import { Property } from '../../../types/property';

export default function PropertyDetails() {
  const params = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const properties = await PropertyService.fetchProperties();
        const foundProperty = properties.find(p => p.slug === params.slug);
        
        if (foundProperty) {
          setProperty(foundProperty);
        } else {
          setError('Property not found');
        }
      } catch (err) {
        setError('Error loading property');
        console.error('Error fetching property:', err);
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      fetchProperty();
    }
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FaExclamationTriangle className="text-red-500 text-6xl mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Property Not Found</h1>
          <p className="text-gray-600 mb-4">{error || 'The property you are looking for does not exist.'}</p>
          <a
            href="/"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number, currency: string): string => {
    if (currency === 'USD') {
      return `$${price.toLocaleString()}`;
    } else if (currency === 'MXN') {
      return `$${price.toLocaleString()}`;
    }
    return `${price.toLocaleString()} ${currency}`;
  };

  const getPricePeriod = (period: string): string => {
    if (period === 'per_month') return 'per Month';
    if (period === 'per_week') return 'per Week';
    if (period === 'per_day') return 'per Day';
    return 'Total';
  };

  const getOperationType = (type: string): string => {
    if (type === 'sale') return 'For Sale';
    if (type === 'rent') return 'For Rent';
    return type;
  };

  const getImageUrl = (property: Property): string => {
    if (property.image1_url && property.image1_url !== '#ERROR!') {
      return property.image1_url;
    }
    if (property.image2_url && property.image2_url !== '#ERROR!') {
      return property.image2_url;
    }
    if (property.image3_url && property.image3_url !== '#ERROR!') {
      return property.image3_url;
    }
    return '/img/houses/1.jpg';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{property.title}</h1>
              <p className="text-gray-600 mt-1">
                <FaMapMarkerAlt className="inline mr-2" />
                {property.address_line1}, {property.neighborhood}, {property.city}, {property.state}
              </p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-blue-600">
                {formatPrice(property.price, property.currency)}
              </div>
              <div className="text-gray-600">{getPricePeriod(property.price_period)}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Main Image */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              <img
                src={getImageUrl(property)}
                alt={property.title}
                className="w-full h-96 object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/img/houses/1.jpg';
                }}
              />
              {property.featured && (
                <div className="absolute top-4 left-4">
                  <span className="bg-yellow-500 text-white text-sm font-bold px-3 py-1 rounded-full flex items-center">
                    <FaStar className="mr-1" />
                    Featured
                  </span>
                </div>
              )}
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Details</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <FaBed className="text-blue-600 text-2xl mx-auto mb-2" />
                  <div className="text-lg font-semibold">{property.bedrooms}</div>
                  <div className="text-sm text-gray-600">Bedrooms</div>
                </div>
                <div className="text-center">
                  <FaBath className="text-blue-600 text-2xl mx-auto mb-2" />
                  <div className="text-lg font-semibold">{property.bathrooms}</div>
                  <div className="text-sm text-gray-600">Bathrooms</div>
                </div>
                <div className="text-center">
                  <FaCar className="text-blue-600 text-2xl mx-auto mb-2" />
                  <div className="text-lg font-semibold">{property.parking_spaces}</div>
                  <div className="text-sm text-gray-600">Parking</div>
                </div>
                <div className="text-center">
                  <FaTag className="text-blue-600 text-2xl mx-auto mb-2" />
                  <div className="text-lg font-semibold">{property.built_area_m2}</div>
                  <div className="text-sm text-gray-600">m² Built</div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">{property.description}</p>
              </div>

              {property.amenities && property.amenities.length > 0 && (
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Amenities</h3>
                  <div className="flex flex-wrap gap-2">
                    {property.amenities.map((amenity, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {property.tags && property.tags.length > 0 && (
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {property.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Property Info Card */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Information</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium">{property.property_type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Operation:</span>
                  <span className="font-medium">{getOperationType(property.operation_type)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Condition:</span>
                  <span className="font-medium capitalize">{property.condition}</span>
                </div>
                {property.year_built && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Year Built:</span>
                    <span className="font-medium">{property.year_built}</span>
                  </div>
                )}
                {property.lot_area_m2 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lot Area:</span>
                    <span className="font-medium">{property.lot_area_m2} m²</span>
                  </div>
                )}
                {property.floor && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Floor:</span>
                    <span className="font-medium">{property.floor}</span>
                  </div>
                )}
                {property.unit && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Unit:</span>
                    <span className="font-medium">{property.unit}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              
              <div className="space-y-3">
                {property.contact_phone && (
                  <div>
                    <span className="text-gray-600 block text-sm">Phone:</span>
                    <a href={`tel:${property.contact_phone}`} className="text-blue-600 hover:text-blue-800">
                      {property.contact_phone}
                    </a>
                  </div>
                )}
                {property.contact_email && (
                  <div>
                    <span className="text-gray-600 block text-sm">Email:</span>
                    <a href={`mailto:${property.contact_email}`} className="text-blue-600 hover:text-blue-800">
                      {property.contact_email}
                    </a>
                  </div>
                )}
                {property.agent_id && (
                  <div>
                    <span className="text-gray-600 block text-sm">Agent ID:</span>
                    <span className="font-medium">{property.agent_id}</span>
                  </div>
                )}
              </div>

              {property.lead_form_url && (
                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors mt-4">
                  Contact Agent
                </button>
              )}
            </div>

            {/* Location Card */}
            {property.lat && property.lng && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
                <div className="text-sm text-gray-600">
                  <p><strong>Address:</strong></p>
                  <p>{property.address_line1}</p>
                  {property.address_line2 && <p>{property.address_line2}</p>}
                  <p>{property.neighborhood}, {property.city}</p>
                  <p>{property.state}, {property.country}</p>
                  {property.postal_code && <p>{property.postal_code}</p>}
                </div>
                <div className="mt-4 text-xs text-gray-500">
                  <p>Coordinates: {property.lat}, {property.lng}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
