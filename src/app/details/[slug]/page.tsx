'use client';

import { ModernNavigation } from '../../components/ModernNavigation';
import { ModernFooter } from '../../components/ModernFooter';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Car, 
  Star,
  Phone,
  Mail,
  ArrowLeft
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function PropertyDetailsPage() {
  // Mock property data - in real app, fetch from API using slug
  const property = {
    id: '1',
    title: 'Luxury Beachfront Villa with Ocean Views',
    description: 'This stunning beachfront villa offers the perfect blend of luxury and comfort. Located in the exclusive Punta Maroma area, this property features breathtaking ocean views, private beach access, and world-class amenities. The open-concept design seamlessly connects indoor and outdoor living spaces, creating an ideal setting for entertaining or relaxing with family.',
    price: '$2,500,000',
    period: '/ Total',
    location: 'Punta Maroma, Cancún, Quintana Roo',
    beds: 4,
    baths: 4,
    area: '450 m²',
    lotArea: '800 m²',
    parking: 3,
    yearBuilt: 2020,
    propertyType: 'Villa',
    operationType: 'For Sale',
    featured: true,
    images: [
      '/img/houses/1.jpg',
      '/img/houses/2.jpg',
      '/img/houses/3.jpg',
      '/img/houses/s1.jpg',
      '/img/houses/s2.jpg',
    ],
    amenities: [
      'Private Beach Access',
      'Infinity Pool',
      'Gourmet Kitchen',
      'Home Theater',
      'Wine Cellar',
      'Garden',
      'Security System',
      'Smart Home Technology',
      'Air Conditioning',
      'High-Speed Internet'
    ],
    tags: ['Beachfront', 'Luxury', 'Ocean View', 'Private Pool', 'Investment']
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <main className="min-h-screen bg-white">
      <ModernNavigation />
      
      {/* Breadcrumb */}
      <div className="pt-20 pb-6 bg-gray-50">
        <div className="container mx-auto px-4">
          <Link 
            href="/listings"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Properties
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-20">
        {/* Property Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-4">
            {property.featured && (
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                <Star className="w-3 h-3 fill-current" />
                Featured
              </span>
            )}
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
              {property.operationType}
            </span>
            <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
              {property.propertyType}
            </span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {property.title}
          </motion.h1>

          <motion.div variants={itemVariants} className="flex items-center gap-2 text-gray-600 mb-6">
            <MapPin className="w-5 h-5 text-blue-600" />
            <span className="text-lg">{property.location}</span>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-baseline gap-2 mb-6">
            <span className="text-4xl font-bold text-gray-900">{property.price}</span>
            <span className="text-xl text-gray-600">{property.period}</span>
          </motion.div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <div className="relative h-96 rounded-2xl overflow-hidden">
                    <Image
                      src={property.images[0]}
                      alt={property.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                {property.images.slice(1, 5).map((image, index) => (
                  <div key={index} className="relative h-48 rounded-2xl overflow-hidden">
                    <Image
                      src={image}
                      alt={`${property.title} - Image ${index + 2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Property Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-2xl shadow-lg p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Property Details</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Bed className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{property.beds}</div>
                  <div className="text-gray-600">Bedrooms</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Bath className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{property.baths}</div>
                  <div className="text-gray-600">Bathrooms</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Square className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{property.area}</div>
                  <div className="text-gray-600">Built Area</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Car className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{property.parking}</div>
                  <div className="text-gray-600">Parking</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Lot Area</h3>
                  <p className="text-gray-600">{property.lotArea}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Year Built</h3>
                  <p className="text-gray-600">{property.yearBuilt}</p>
                </div>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-2xl shadow-lg p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Description</h2>
              <p className="text-gray-600 leading-relaxed text-lg">{property.description}</p>
            </motion.div>

            {/* Amenities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Amenities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-600">{amenity}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Contact Agent */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-2xl shadow-lg p-6 mb-8 sticky top-24"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Agent</h3>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-16 h-16">
                  <Image
                    src="/img/agent.jpg"
                    alt="Real Estate Agent"
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Carlos Rodriguez</h4>
                  <p className="text-gray-600">Senior Real Estate Agent</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <a
                  href="tel:+529981234567"
                  className="flex items-center gap-3 w-full px-4 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>
                <a
                  href="mailto:info@taloonstudio.com"
                  className="flex items-center gap-3 w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors duration-200"
                >
                  <Mail className="w-5 h-5" />
                  Send Email
                </a>
              </div>

              <div className="text-center text-sm text-gray-500">
                <p>Response time: Usually within 1 hour</p>
              </div>
            </motion.div>

            {/* Property Tags */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Property Tags</h3>
              <div className="flex flex-wrap gap-2">
                {property.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <ModernFooter />
    </main>
  );
}
