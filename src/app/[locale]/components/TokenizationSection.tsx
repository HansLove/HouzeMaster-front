'use client';

import { motion, Variants } from 'framer-motion';
import { Zap, Shield, TrendingUp, Users, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function TokenizationSection() {
  const t = useTranslations('tokenization');
  
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
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const benefits = [
    {
      icon: Users,
      title: t('benefits.fractionalOwnership'),
      description: t('benefits.fractionalOwnershipDesc'),
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600"
    },
    {
      icon: TrendingUp,
      title: t('benefits.increasedLiquidity'),
      description: t('benefits.increasedLiquidityDesc'),
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      iconColor: "text-green-600"
    },
    {
      icon: Shield,
      title: t('benefits.lowerBarriers'),
      description: t('benefits.lowerBarriersDesc'),
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600"
    },
    {
      icon: Zap,
      title: t('benefits.transparency'),
      description: t('benefits.transparencyDesc'),
      color: "from-orange-500 to-yellow-500",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600"
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
              {t('title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('subtitle')}
            </p>
          </motion.div>

          {/* What is Tokenization Section */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 md:p-12 mb-20"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-8"
              >
                <Zap className="w-10 h-10 text-white" />
              </motion.div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                {t('whatIsTokenization')}
              </h3>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                {t('tokenizationDesc')}
              </p>
            </div>
          </motion.div>

          {/* Benefits Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                  className={`w-16 h-16 ${benefit.bgColor} rounded-2xl flex items-center justify-center mb-6`}
                >
                  <benefit.icon className={`w-8 h-8 ${benefit.iconColor}`} />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 md:p-12 text-center text-white"
          >
            <h3 className="text-3xl font-bold mb-6">
{t('interestedInTokenization')}
            </h3>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              {t('getInTouch')}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleWhatsAppClick}
              className="bg-white text-purple-600 py-4 px-8 rounded-2xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-3 mx-auto"
            >
              <ArrowRight className="w-5 h-5" />
              {t('exploreTokenization')}
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
