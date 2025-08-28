'use client';

import { ModernNavigation } from '../components/ModernNavigation';
import { ModernFooter } from '../components/ModernFooter';
import { motion, Variants } from 'framer-motion';
import { 
  Building2, 
  Award, 
  Globe, 
  Heart, 
  Shield, 
  Target,
  TrendingUp
} from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants:Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const stats = [
    { number: '500+', label: 'Properties Sold', icon: Building2 },
    { number: '1000+', label: 'Happy Clients', icon: Heart },
    { number: '25+', label: 'Prime Locations', icon: Globe },
    { number: '15+', label: 'Years Experience', icon: Award },
  ];

  const values = [
    {
      icon: Shield,
      title: 'Trust & Integrity',
      description: 'We build lasting relationships based on transparency, honesty, and ethical business practices.'
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for excellence in every transaction, ensuring the highest quality service for our clients.'
    },
    {
      icon: Heart,
      title: 'Client Focus',
      description: 'Our clients are at the heart of everything we do, and their satisfaction is our top priority.'
    },
    {
      icon: TrendingUp,
      title: 'Innovation',
      description: 'We embrace new technologies and innovative approaches to deliver exceptional real estate experiences.'
    }
  ];

  const team = [
    {
      name: 'Carlos Rodriguez',
      role: 'Founder & CEO',
      image: '/img/agent.jpg',
      description: 'With over 15 years in luxury real estate, Carlos has built Taloon Studio into a premier brand.'
    },
    {
      name: 'Maria Santos',
      role: 'Head of Sales',
      image: '/img/agent.jpg',
      description: 'Maria specializes in high-end properties and has closed deals worth over $50M in the region.'
    },
    {
      name: 'Alejandro Torres',
      role: 'Property Consultant',
      image: '/img/agent.jpg',
      description: 'Alejandro brings deep local knowledge and international experience to every client interaction.'
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      <ModernNavigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              About <span className="text-gradient-primary">Taloon Studio</span>
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 mb-8 leading-relaxed"
            >
              We are a premier real estate agency specializing in luxury properties across Mexico&apos;s most 
              beautiful destinations. Our commitment to excellence and personalized service has made us 
              the trusted choice for discerning clients worldwide.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-8"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Founded in 2009, Taloon Studio began with a simple vision: to provide exceptional 
                real estate services in Mexico&apos;s most desirable locations. What started as a small 
                family business has grown into a respected agency serving clients from around the world.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We&apos;ve built our reputation on trust, integrity, and an unwavering commitment to 
                client satisfaction. Every property we represent is carefully selected to meet our 
                high standards of quality and location.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Today, we continue to expand our portfolio while maintaining the personal touch 
                that has made us successful. Our team of experienced professionals is dedicated 
                to helping you find your perfect property in paradise.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative w-full h-96 rounded-2xl overflow-hidden">
                <Image
                  src="/img/celestehome1.jpg"
                  alt="Taloon Studio Office"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl">
                <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
                <div className="text-gray-600">Years of Excellence</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core principles guide everything we do and shape the way we serve our clients
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our experienced professionals are dedicated to providing you with exceptional service 
              and expert guidance throughout your real estate journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative w-24 h-24 mx-auto mb-6">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                <p className="text-gray-600 leading-relaxed">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Find Your Dream Property?
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Let our experienced team guide you through the process of finding and acquiring 
              your perfect property in Mexico&apos;s most beautiful locations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg"
              >
                Get Started Today
              </a>
              <a
                href="/listings"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-200"
              >
                View Properties
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <ModernFooter />
    </main>
  );
}