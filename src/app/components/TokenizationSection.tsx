'use client';

import { motion, Variants } from 'framer-motion';
import { Shield, TrendingUp, MessageCircle, ArrowRight, CheckCircle, Lightbulb } from 'lucide-react';

export function TokenizationSection() {
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

  const concepts = [
    {
      icon: Lightbulb,
      title: "What is Property Tokenization?",
      description: "Tokenization converts real estate into digital tokens that can be bought, sold, or traded on blockchain platforms.",
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-600"
    },
    {
      icon: Shield,
      title: "How It Works",
      description: "Your land investment is divided into digital tokens, each representing a fraction of the property's value.",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600"
    },
    {
      icon: TrendingUp,
      title: "Potential Benefits",
      description: "Explore possibilities for increased liquidity, fractional ownership, and new ways to build value.",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      iconColor: "text-green-600"
    }
  ];

  const benefits = [
    "Increased liquidity for your land investment",
    "Fractional ownership opportunities",
    "Potential for easier buying and selling",
    "Access to global investment markets",
    "Transparent and secure transactions",
    "New ways to build and generate value"
  ];

  const steps = [
    {
      step: "1",
      title: "Initial Investment",
      description: "Start with land purchase starting from 450K MXN"
    },
    {
      step: "2",
      title: "Evaluation Process",
      description: "We assess tokenization potential and options"
    },
    {
      step: "3",
      title: "Guidance & Setup",
      description: "Professional guidance on tokenization process"
    },
    {
      step: "4",
      title: "Explore Possibilities",
      description: "Discover new ways to build and potentially generate value"
    }
  ];

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/527223493064', '_blank');
  };

  return (
    <section id="tokenization" className="py-20 bg-white">
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
              Property <span className="text-gradient-primary">Tokenization</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Explore new possibilities in land investment. We provide guidance on property tokenization 
              to help you discover innovative ways to build and potentially generate value.
            </p>
          </motion.div>

          {/* Concepts Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          >
            {concepts.map((concept, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-100"
              >
                <div className={`w-16 h-16 ${concept.bgColor} rounded-2xl flex items-center justify-center mb-6`}>
                  <concept.icon className={`w-8 h-8 ${concept.iconColor}`} />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{concept.title}</h3>
                <p className="text-gray-600 leading-relaxed">{concept.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Process Steps */}
          <motion.div
            variants={itemVariants}
            className="mb-20"
          >
            <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
              How We Guide You Through Tokenization
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                    {step.step}
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h4>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Benefits Section */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 md:p-12 mb-20"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Benefits List */}
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-8">
                  Potential Benefits of Tokenization
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

              {/* Important Note */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-yellow-600" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">Important to Know</h4>
                </div>
                
                <div className="space-y-4 text-gray-600">
                  <p>
                    <strong>No Guarantees:</strong> We don&apos;t promise guaranteed returns. 
                    Tokenization involves exploring possibilities and potential benefits.
                  </p>
                  <p>
                    <strong>Professional Guidance:</strong> We provide guidance and help you 
                    explore options available in the market.
                  </p>
                  <p>
                    <strong>Clear Communication:</strong> We explain benefits without exaggeration, 
                    focusing on what&apos;s possible rather than what&apos;s guaranteed.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            variants={itemVariants}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 md:p-12 text-white">
              <h3 className="text-3xl font-bold mb-6">
                Ready to Explore Tokenization Possibilities?
              </h3>
              <p className="text-xl mb-8 text-purple-100 max-w-3xl mx-auto">
                Contact us to discuss how property tokenization might work for your land investment. 
                We&apos;ll help you explore the options available and guide you through the possibilities.
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleWhatsAppClick}
                className="bg-white text-purple-600 py-4 px-8 rounded-2xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-3 mx-auto"
              >
                <MessageCircle className="w-6 h-6" />
                Contact via WhatsApp
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <p className="text-purple-200 mt-4">
                +52 722 349 3064 • Professional guidance available
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
