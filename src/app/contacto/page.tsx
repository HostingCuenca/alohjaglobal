'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function ContactPage() {
  const [language, setLanguage] = useState<'es' | 'en'>('es')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    contactMethod: 'whatsapp'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleWhatsAppSubmit = () => {
    setIsSubmitting(true)

    const message = language === 'es'
      ? `¡Hola! Me comunico desde el sitio web de Alohja Coffee:

*Nombre:* ${formData.name}
*Email:* ${formData.email}
*Teléfono:* ${formData.phone}
${formData.company ? `*Empresa:* ${formData.company}` : ''}
*Asunto:* ${formData.subject}

*Mensaje:*
${formData.message}

¡Espero su pronta respuesta!`
      : `Hello! I'm contacting you from the Alohja Coffee website:

*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${formData.phone}
${formData.company ? `*Company:* ${formData.company}` : ''}
*Subject:* ${formData.subject}

*Message:*
${formData.message}

Looking forward to your prompt response!`

    const whatsappNumber = '593999999999' // Tu número de WhatsApp
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`

    window.open(whatsappUrl, '_blank')

    setTimeout(() => {
      setIsSubmitting(false)
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
        contactMethod: 'whatsapp'
      })
    }, 1000)
  }

  const subjects = [
    { es: 'Consulta General', en: 'General Inquiry' },
    { es: 'Pedido de Productos', en: 'Product Order' },
    { es: 'Información de Precios', en: 'Pricing Information' },
    { es: 'Distribución/Mayoreo', en: 'Distribution/Wholesale' },
    { es: 'Alianzas Comerciales', en: 'Business Partnerships' },
    { es: 'Visita a Fincas', en: 'Farm Visits' },
    { es: 'Certificaciones', en: 'Certifications' },
    { es: 'Otro', en: 'Other' }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation language={language} setLanguage={setLanguage} />

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
            {language === 'es' ? 'Contáctanos' : 'Contact Us'}
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            {language === 'es'
              ? 'Estamos aquí para ayudarte. Envíanos tu consulta y nos pondremos en contacto contigo lo antes posible.'
              : 'We\'re here to help. Send us your inquiry and we\'ll get back to you as soon as possible.'
            }
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-black mb-6">
              {language === 'es' ? 'Envíanos un mensaje' : 'Send us a message'}
            </h2>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'es' ? 'Nombre *' : 'Name *'}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder={language === 'es' ? 'Tu nombre completo' : 'Your full name'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'es' ? 'Email *' : 'Email *'}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder={language === 'es' ? 'tu@email.com' : 'you@email.com'}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'es' ? 'Teléfono' : 'Phone'}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder={language === 'es' ? '+593 999 999 999' : '+593 999 999 999'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'es' ? 'Empresa' : 'Company'}
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder={language === 'es' ? 'Nombre de tu empresa' : 'Your company name'}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'es' ? 'Asunto *' : 'Subject *'}
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                >
                  <option value="">
                    {language === 'es' ? 'Selecciona un asunto' : 'Select a subject'}
                  </option>
                  {subjects.map((subject, index) => (
                    <option key={index} value={language === 'es' ? subject.es : subject.en}>
                      {language === 'es' ? subject.es : subject.en}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'es' ? 'Mensaje *' : 'Message *'}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none"
                  placeholder={language === 'es'
                    ? 'Cuéntanos cómo podemos ayudarte...'
                    : 'Tell us how we can help you...'
                  }
                />
              </div>

              <button
                type="button"
                onClick={handleWhatsAppSubmit}
                disabled={!formData.name || !formData.email || !formData.subject || !formData.message || isSubmitting}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                    <span>
                      {language === 'es' ? 'Enviar por WhatsApp' : 'Send via WhatsApp'}
                    </span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Phone & Email */}
            <div className="bg-gradient-to-br from-green-50 to-yellow-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-black mb-6">
                {language === 'es' ? 'Teléfonos y Correos' : 'Phone & Email'}
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-green-700 mb-2">
                    {language === 'es' ? 'Ventas' : 'Sales'}
                  </p>
                  <div className="flex items-center space-x-3 mb-1">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                    </svg>
                    <span className="text-gray-700">+593 962573519</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-700">ventas@alohjaglobal.com</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm font-semibold text-green-700 mb-2">
                    {language === 'es' ? 'Gerencia' : 'Management'}
                  </p>
                  <div className="flex items-center space-x-3 mb-1">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                    </svg>
                    <span className="text-gray-700">+593 984699055</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-700">gerencia@alohjaglobal.com</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Addresses */}
            <div className="bg-amber-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-black mb-6">
                {language === 'es' ? 'Direcciones' : 'Addresses'}
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-amber-700 mb-2">
                    {language === 'es' ? 'Oficinas' : 'Offices'}
                  </p>
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-gray-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-gray-700">
                      Av. Río Amazonas 3461<br />
                      Quito 170135, Ecuador
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm font-semibold text-amber-700 mb-2">
                    {language === 'es' ? 'Planta' : 'Plant'}
                  </p>
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-gray-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-gray-700">
                      Bellavista de Calderón<br />
                      Quito, Ecuador
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm font-semibold text-amber-700 mb-2">
                    {language === 'es' ? 'Sitio Web' : 'Website'}
                  </p>
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    <a href="https://alohjaglobal.com" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 hover:underline">
                      alohjaglobal.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-black mb-4">
                {language === 'es' ? '¿Por qué elegirnos?' : 'Why choose us?'}
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-2">
                  <span className="text-yellow-600 font-bold">✓</span>
                  <span>
                    {language === 'es'
                      ? 'Café 100% ecuatoriano de origen único'
                      : '100% Ecuadorian single-origin coffee'
                    }
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-yellow-600 font-bold">✓</span>
                  <span>
                    {language === 'es'
                      ? 'Trazabilidad completa del grano a la taza'
                      : 'Complete traceability from bean to cup'
                    }
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-yellow-600 font-bold">✓</span>
                  <span>
                    {language === 'es'
                      ? 'Comercio directo con agricultores'
                      : 'Direct trade with farmers'
                    }
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-yellow-600 font-bold">✓</span>
                  <span>
                    {language === 'es'
                      ? 'Prácticas sostenibles y orgánicas'
                      : 'Sustainable and organic practices'
                    }
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer language={language} />
    </div>
  )
}