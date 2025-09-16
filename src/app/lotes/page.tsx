'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function BatchesPage() {
  const [language, setLanguage] = useState<'es' | 'en'>('es')

  return (
    <div className="min-h-screen bg-white">
      <Navigation language={language} setLanguage={setLanguage} />

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
            {language === 'es' ? 'Lotes' : 'Batches'}
          </h1>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            {language === 'es'
              ? 'Cada lote cuenta una historia única. Rastrea el viaje completo de tu café desde la finca hasta tu taza.'
              : 'Every batch tells a unique story. Track the complete journey of your coffee from farm to cup.'
            }
          </p>
        </div>

        {/* Batch Search Section */}
        <section className="mb-16">
          <div className="bg-amber-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-black mb-4">
              {language === 'es'
                ? 'Ingresa el número de lote y sigue de cerca la ruta de tu café favorito.'
                : 'Enter the batch number and closely follow the route of your favorite coffee.'
              }
            </h2>
            <div className="max-w-md mx-auto">
              <input
                type="text"
                placeholder={language === 'es' ? 'Número de lote' : 'Batch number'}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 mb-4"
              />
              <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-3 px-6 rounded-lg transition-colors">
                {language === 'es' ? 'Buscar Lote' : 'Search Batch'}
              </button>
            </div>
          </div>
        </section>

        {/* Sample Batch Information */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-black text-center mb-8">
            {language === 'es' ? 'Aprende todo sobre tu café favorito' : 'Learn all about your favorite coffee'}
          </h2>

          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-6 py-4">
              <h3 className="text-lg font-semibold text-black">
                {language === 'es' ? 'Ejemplo de Lote: ALH-2024-001' : 'Sample Batch: ALH-2024-001'}
              </h3>
            </div>

            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-black mb-4">
                    {language === 'es' ? 'Información del Origen' : 'Origin Information'}
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        {language === 'es' ? 'Origen:' : 'Origin:'}
                      </span>
                      <span className="font-medium">Portovelo</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        {language === 'es' ? 'Caficultor:' : 'Coffee Farmer:'}
                      </span>
                      <span className="font-medium">Pablo Quezada</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        {language === 'es' ? 'Finca:' : 'Farm:'}
                      </span>
                      <span className="font-medium">Gran Chaparral</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        {language === 'es' ? 'Variedad:' : 'Variety:'}
                      </span>
                      <span className="font-medium">Gesha</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-black mb-4">
                    {language === 'es' ? 'Proceso y Trazabilidad' : 'Process and Traceability'}
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        {language === 'es' ? 'Cosechado:' : 'Harvested:'}
                      </span>
                      <span className="font-medium">15/03/2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        {language === 'es' ? 'Tipo de secado:' : 'Drying type:'}
                      </span>
                      <span className="font-medium">
                        {language === 'es' ? 'Natural' : 'Natural'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        {language === 'es' ? 'Tipo de tostado:' : 'Roast type:'}
                      </span>
                      <span className="font-medium">
                        {language === 'es' ? 'Tueste medio' : 'Medium roast'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        {language === 'es' ? 'Empacado:' : 'Packed:'}
                      </span>
                      <span className="font-medium">22/03/2024</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-black mb-4">
                  {language === 'es' ? 'Viaje del Producto' : 'Product Journey'}
                </h4>
                <div className="flex flex-wrap gap-4">
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    ✓ {language === 'es' ? 'Cosechado' : 'Harvested'}
                  </div>
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    ✓ {language === 'es' ? 'Procesado' : 'Processed'}
                  </div>
                  <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                    ✓ {language === 'es' ? 'Tostado' : 'Roasted'}
                  </div>
                  <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                    ✓ {language === 'es' ? 'Empacado' : 'Packed'}
                  </div>
                  <div className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                    → {language === 'es' ? 'En tránsito' : 'In transit'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sustainability Message */}
        <section className="text-center bg-green-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-black mb-4">
            {language === 'es' ? 'Agricultura Sostenible' : 'Sustainable Agriculture'}
          </h3>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            {language === 'es'
              ? 'Cada taza que tomas, está conectada a una agricultura sostenible. Bajo el abrigo de los bosques naturales de Ecuador, nuestras prácticas priorizan el equilibrio ecológico, la regeneración de suelos y el uso responsable de los recursos.'
              : 'Every cup you drink, is connected to sustainable agriculture. Under the shelter of Ecuador\'s natural forests, our practices prioritize ecological balance, soil regeneration, and responsible use of resources.'
            }
          </p>
        </section>
      </div>

      <Footer language={language} />
    </div>
  )
}