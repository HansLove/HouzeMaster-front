'use client';

import { motion, Variants } from 'framer-motion';
import { CreditCard, Bitcoin, DollarSign, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function PaymentOptions() {
  const t = useTranslations('paymentOptions');
  
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

  const paymentMethods = [
    {
      icon: DollarSign,
      title: t('traditionalPayment'),
      description: t('traditionalPaymentDesc'),
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600"
    },
    {
      icon: Bitcoin,
      title: t('bitcoinPayment'),
      description: t('bitcoinPaymentDesc'),
      color: "from-orange-500 to-yellow-500",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600"
    },
    {
      icon: CreditCard,
      title: t('usdtPayment'),
      description: t('usdtPaymentDesc'),
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      iconColor: "text-green-600"
    }
  ];

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/527223493064', '_blank');
  };

  return (
    <section id="payment-options" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
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

          {/* Payment Methods Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            {paymentMethods.map((method, index) => (
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
                  transition={{ delay: index * 0.2, type: "spring", stiffness: 200 }}
                  className={`w-16 h-16 ${method.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6`}
                >
                  <method.icon className={`w-8 h-8 ${method.iconColor}`} />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                  {method.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed mb-6">
                  {method.description}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-3 px-6 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {t('learnMore')}
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-8 md:p-12 text-center text-white"
          >
            <h3 className="text-3xl font-bold mb-6">
              ¿Listo para explorar tus opciones de pago?
            </h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              {t('contactForDetails')}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleWhatsAppClick}
              className="bg-white text-blue-600 py-4 px-8 rounded-2xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-3 mx-auto"
            >
              <ArrowRight className="w-5 h-5" />
              {t('contactForDetails')}
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
