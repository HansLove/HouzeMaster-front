'use client';

import { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaHome, FaHeart, FaArrowRight, FaCheck } from 'react-icons/fa';

interface LeadFormData {
  name: string;
  email: string;
  phone: string;
  propertyInterest: string;
  budget: string;
  timeline: string;
  message: string;
}

interface LeadCaptureProps {
  propertyId?: string;
  propertyTitle?: string;
  isModal?: boolean;
  onClose?: () => void;
}

export default function LeadCapture({ propertyId, propertyTitle, isModal = false, onClose }: LeadCaptureProps) {
  const [language, setLanguage] = useState<'es' | 'en'>('es');
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    email: '',
    phone: '',
    propertyInterest: '',
    budget: '',
    timeline: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const translations = {
    es: {
      title: 'Encuentra tu hogar ideal',
      subtitle: 'Déjanos ayudarte a encontrar la propiedad perfecta',
      name: 'Nombre completo',
      email: 'Correo electrónico',
      phone: 'Teléfono',
      propertyInterest: 'Tipo de propiedad',
      budget: 'Presupuesto',
      timeline: '¿Cuándo planeas comprar?',
      message: 'Mensaje adicional',
      submit: 'Enviar consulta',
      success: '¡Consulta enviada exitosamente!',
      successSubtitle: 'Nos pondremos en contacto contigo pronto',
      close: 'Cerrar',
      propertySpecific: 'Interesado en esta propiedad',
      selectOption: 'Selecciona una opción',
      budgetOptions: [
        'Menos de $100,000 USD',
        '$100,000 - $250,000 USD',
        '$250,000 - $500,000 USD',
        '$500,000 - $1,000,000 USD',
        'Más de $1,000,000 USD'
      ],
      timelineOptions: [
        'Inmediatamente',
        'En los próximos 3 meses',
        'En los próximos 6 meses',
        'En el próximo año',
        'Solo explorando opciones'
      ],
      propertyTypes: [
        'Casa',
        'Departamento',
        'Condo',
        'Terreno',
        'Oficina',
        'Local comercial'
      ]
    },
    en: {
      title: 'Find Your Dream Home',
      subtitle: 'Let us help you find the perfect property',
      name: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      propertyInterest: 'Property Type',
      budget: 'Budget Range',
      timeline: 'When do you plan to buy?',
      message: 'Additional Message',
      submit: 'Send Inquiry',
      success: 'Inquiry sent successfully!',
      successSubtitle: 'We\'ll get back to you soon',
      close: 'Close',
      propertySpecific: 'Interested in this property',
      selectOption: 'Select an option',
      budgetOptions: [
        'Less than $100,000 USD',
        '$100,000 - $250,000 USD',
        '$250,000 - $500,000 USD',
        '$500,000 - $1,000,000 USD',
        'More than $1,000,000 USD'
      ],
      timelineOptions: [
        'Immediately',
        'Within 3 months',
        'Within 6 months',
        'Within a year',
        'Just exploring options'
      ],
      propertyTypes: [
        'House',
        'Apartment',
        'Condo',
        'Land',
        'Office',
        'Commercial Space'
      ]
    }
  };

  const t = translations[language];

  const handleInputChange = (field: keyof LeadFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        propertyInterest: '',
        budget: '',
        timeline: '',
        message: ''
      });
      if (onClose) onClose();
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <div className="text-center p-8">
        <div className="w-16 h-16 bg-success-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaCheck className="text-white text-2xl" />
        </div>
        <h3 className="text-2xl font-bold text-neutral-900 mb-2">{t.success}</h3>
        <p className="text-neutral-600">{t.successSubtitle}</p>
      </div>
    );
  }

  return (
    <div className={`${isModal ? 'w-full max-w-2xl' : 'w-full'} bg-white rounded-3xl shadow-soft overflow-hidden`}>
      {/* Header */}
      <div className="gradient-primary p-8 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-transparent"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2">{t.title}</h2>
          <p className="text-primary-100">{t.subtitle}</p>
          
          {/* Language Toggle */}
          <div className="flex justify-center mt-4 space-x-2">
            <button
              onClick={() => setLanguage('es')}
              className={`px-4 py-2 rounded-xl transition-all duration-200 ${
                language === 'es' 
                  ? 'bg-white text-primary-600 font-medium' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              ES
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-4 py-2 rounded-xl transition-all duration-200 ${
                language === 'en' 
                  ? 'bg-white text-primary-600 font-medium' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Property Interest (if specific property) */}
          {propertyId && (
            <div className="bg-primary-50 border border-primary-200 rounded-2xl p-4">
              <div className="flex items-center space-x-3">
                <FaHome className="text-primary-600 text-xl" />
                <div>
                  <p className="text-sm text-primary-800 font-medium">{t.propertySpecific}</p>
                  <p className="text-primary-700">{propertyTitle}</p>
                </div>
              </div>
            </div>
          )}

          {/* Name and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                {t.name} *
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="input-field pl-10"
                  placeholder={t.name}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                {t.email} *
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="input-field pl-10"
                  placeholder={t.email}
                />
              </div>
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              {t.phone}
            </label>
            <div className="relative">
              <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="input-field pl-10"
                placeholder={t.phone}
              />
            </div>
          </div>

          {/* Property Type and Budget */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                {t.propertyInterest}
              </label>
              <select
                value={formData.propertyInterest}
                onChange={(e) => handleInputChange('propertyInterest', e.target.value)}
                className="input-field"
              >
                <option value="">{t.selectOption}</option>
                {t.propertyTypes.map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                {t.budget}
              </label>
              <select
                value={formData.budget}
                onChange={(e) => handleInputChange('budget', e.target.value)}
                className="input-field"
              >
                <option value="">{t.selectOption}</option>
                {t.budgetOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Timeline */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              {t.timeline}
            </label>
            <select
              value={formData.timeline}
              onChange={(e) => handleInputChange('timeline', e.target.value)}
              className="input-field"
            >
              <option value="">{t.selectOption}</option>
              {t.timelineOptions.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              {t.message}
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              rows={4}
              className="input-field resize-none"
              placeholder="Cuéntanos más sobre lo que buscas..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <div className="loading-dots">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <span>Enviando...</span>
              </>
            ) : (
              <>
                <span>{t.submit}</span>
                <FaArrowRight className="text-sm" />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-neutral-500">
            Al enviar este formulario, aceptas recibir comunicaciones de HouzeMaster
          </p>
        </div>
      </div>
    </div>
  );
}
