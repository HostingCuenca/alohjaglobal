'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function GlobalPage() {
  const [language, setLanguage] = useState<'es' | 'en'>('es')

  const markets = [
    { country: 'Japón', countryEn: 'Japan' },
    { country: 'Corea del Sur', countryEn: 'South Korea' },
    { country: 'China', countryEn: 'China' },
    { country: 'Singapur', countryEn: 'Singapore' },
    { country: 'Taiwán', countryEn: 'Taiwan' },
    { country: 'Emiratos Árabes Unidos', countryEn: 'United Arab Emirates' },
    { country: 'Estados Unidos', countryEn: 'United States' },
    { country: 'Colombia', countryEn: 'Colombia' },
    { country: 'Perú', countryEn: 'Peru' },
    { country: 'Alemania', countryEn: 'Germany' }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation language={language} setLanguage={setLanguage} />

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Alohja Global
          </h1>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            {language === 'es'
              ? 'Llevamos el café premium de Ecuador a mercados internacionales, conectando culturas y sabores alrededor del mundo. Nuestra presencia global refleja nuestro compromiso con la calidad y la excelencia.'
              : 'We bring premium Ecuadorian coffee to international markets, connecting cultures and flavors around the world. Our global presence reflects our commitment to quality and excellence.'
            }
          </p>
        </div>

        {/* Global Reach Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-black text-center mb-12">
            {language === 'es' ? 'Nuestros Mercados' : 'Our Markets'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {markets.map((market, index) => (
              <div key={index} className="text-center bg-amber-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-gray-400 text-xs">Flag</span>
                </div>
                <h3 className="font-semibold text-black">
                  {language === 'es' ? market.country : market.countryEn}
                </h3>
              </div>
            ))}
          </div>
        </section>

        {/* Logistics Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-black text-center mb-12">
            {language === 'es' ? 'Cadena de Suministro Global' : 'Global Supply Chain'}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center bg-white border border-gray-200 rounded-lg p-8">
              <div className="w-16 h-16 bg-yellow-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2L3 7v11h4v-6h6v6h4V7l-7-5z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-4">
                {language === 'es' ? 'Origen' : 'Origin'}
              </h3>
              <p className="text-gray-700">
                {language === 'es'
                  ? 'Fincas familiares en las montañas de Ecuador, cultivando café bajo sombra en armonía con la naturaleza.'
                  : 'Family farms in the mountains of Ecuador, growing coffee under shade in harmony with nature.'
                }
              </p>
            </div>

            <div className="text-center bg-white border border-gray-200 rounded-lg p-8">
              <div className="w-16 h-16 bg-yellow-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-4">
                {language === 'es' ? 'Logística' : 'Logistics'}
              </h3>
              <p className="text-gray-700">
                {language === 'es'
                  ? 'Transporte multimodal: aéreo, terrestre y marítimo para garantizar la frescura y calidad del producto.'
                  : 'Multimodal transport: air, land and maritime to guarantee product freshness and quality.'
                }
              </p>
            </div>

            <div className="text-center bg-white border border-gray-200 rounded-lg p-8">
              <div className="w-16 h-16 bg-yellow-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-4">
                {language === 'es' ? 'Distribución' : 'Distribution'}
              </h3>
              <p className="text-gray-700">
                {language === 'es'
                  ? 'Red de distribución global que llega a consumidores exigentes en mercados internacionales premium.'
                  : 'Global distribution network reaching demanding consumers in premium international markets.'
                }
              </p>
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section className="text-center bg-green-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-black mb-6">
            {language === 'es' ? 'Certificaciones y Calidad' : 'Certifications and Quality'}
          </h2>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed mb-8">
            {language === 'es'
              ? 'Nuestro compromiso con la calidad se refleja en cada paso del proceso, desde el cultivo hasta la taza. Cumplimos con los más altos estándares internacionales para ofrecer café de especialidad auténtico.'
              : 'Our commitment to quality is reflected in every step of the process, from cultivation to cup. We meet the highest international standards to offer authentic specialty coffee.'
            }
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Organic', 'Fair Trade', 'Rainforest Alliance', 'SCA'].map((cert, index) => (
              <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="w-12 h-12 bg-gray-200 rounded mx-auto mb-2"></div>
                <p className="text-sm font-medium text-black">{cert}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer language={language} />
    </div>
  )
}