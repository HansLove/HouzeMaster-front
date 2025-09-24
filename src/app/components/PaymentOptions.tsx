'use client';

import { motion, Variants } from 'framer-motion';
import { DollarSign, Bitcoin, CreditCard, MessageCircle, CheckCircle, ArrowRight } from 'lucide-react';

export function PaymentOptions() {
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

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const paymentMethods = [
    {
      icon: DollarSign,
      title: "Traditional Payments",
      subtitle: "Mexican Pesos (MXN)",
      description: "Secure bank transfers and traditional financing options available",
      features: [
        "Bank transfers",
        "Traditional financing",
        "Secure transactions",
        "Local currency"
      ],
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      borderColor: "border-blue-200"
    },
    {
      icon: Bitcoin,
      title: "Bitcoin Payments",
      subtitle: "Cryptocurrency Option",
      description: "Accept Bitcoin payments for land investments with secure processing",
      features: [
        "Bitcoin accepted",
        "Secure crypto processing",
        "Real-time conversion",
        "Digital wallet friendly"
      ],
      color: "from-orange-500 to-yellow-500",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
      borderColor: "border-orange-200"
    },
    {
      icon: CreditCard,
      title: "USDT Payments",
      subtitle: "Stablecoin Option",
      description: "USDT (Tether) payments for stable value cryptocurrency transactions",
      features: [
        "USDT accepted",
        "Stable value",
        "Fast processing",
        "Low volatility"
      ],
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      borderColor: "border-green-200"
    }
  ];

  const benefits = [
    "Flexible payment options to suit your preferences",
    "Secure processing for all payment methods",
    "Real-time conversion rates for cryptocurrencies",
    "Professional guidance on payment selection",
    "No hidden fees or additional charges",
    "Transparent pricing in all currencies"
  ];

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/527223493064', '_blank');
  };

  return (
    <section id="payment-options" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Flexible <span className="text-gradient-primary">Payment Options</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We help you explore payment possibilities that work for you. 
              Choose from traditional payments, Bitcoin, or USDT options.
            </p>
          </motion.div>

          {/* Payment Methods Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          >
            {paymentMethods.map((method, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-gray-200"
              >
                <div className={`w-16 h-16 ${method.bgColor} rounded-2xl flex items-center justify-center mb-6`}>
                  <method.icon className={`w-8 h-8 ${method.iconColor}`} />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{method.title}</h3>
                <p className="text-lg font-semibold text-gray-600 mb-4">{method.subtitle}</p>
                <p className="text-gray-600 mb-6 leading-relaxed">{method.description}</p>
                
                <ul className="space-y-3">
                  {method.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          {/* Benefits Section */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-lg"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Benefits List */}
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-8">
                  Why Our Payment Options Work
                </h3>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="flex items-center gap-4"
                    >
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700 text-lg">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA Section */}
              <div className="text-center">
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 mb-8">
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">
                    Ready to Explore Payment Options?
                  </h4>
                  <p className="text-gray-600 mb-6">
                    Contact us via WhatsApp to discuss which payment method works best for your investment goals.
                  </p>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleWhatsAppClick}
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-4 px-8 rounded-2xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-3 mx-auto"
                  >
                    <MessageCircle className="w-6 h-6" />
                    Contact via WhatsApp
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </div>

                <div className="text-sm text-gray-500">
                  <p>+52 722 349 3064</p>
                  <p>Available for consultation and guidance</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Price Transparency */}
          <motion.div
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white">
              <h3 className="text-3xl font-bold mb-4">Price Transparency</h3>
              <p className="text-xl mb-6">
                All prices start from <span className="font-bold text-2xl">450K MXN</span>
              </p>
              <p className="text-blue-100">
                Clear pricing with no hidden fees. Explore available lots and payment options with full transparency.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
