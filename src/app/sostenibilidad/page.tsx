'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function SustainabilityPage() {
  const [language, setLanguage] = useState<'es' | 'en'>('es')
  const [activeTab, setActiveTab] = useState('sustainability')
  const [batchNumber, setBatchNumber] = useState('')
  const [batchData, setBatchData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [searchPerformed, setSearchPerformed] = useState(false)

  // Sample batch data similar to lotes page
  const sampleBatches = [
    {
      batch_id: "AR000147",
      variety: "Typica Mejorada",
      farmer: "Armando Ramirez",
      harvest_date: "2025-08-15",
      drying_method: "Natural",
      transport_mode: "Vía terrestre",
      roast_date: "2025-09-20",
      pack_date: "2025-09-20",
      distribution_date: "2025-09-20",
      retail_date: "2025-09-20",
      province: "LOJA",
      farm: "Finca El Mirador",
      altitude: "1,200 - 1,400 msnm",
      process: "Lavado",
      origin: "Paltas-Olmedo-Vilcabamba",
      farmers_list: "Armando Ramirez",
      drying_types: "Natural",
      transfer_to_quito: "terrestre",
      storage: "Bodega Quito Central",
      roast_types: "tueste claro - tueste medio",
      packed: "2025-09-20",
      transfer_to_shipping: "terrestre-marítimo",
      destination_country: "Japón - Estados Unidos"
    },
    {
      batch_id: "PQ000258",
      variety: "Gesha",
      farmer: "Pablo Quezada",
      harvest_date: "2025-07-20",
      drying_method: "Honey",
      transport_mode: "Vía aérea",
      roast_date: "2025-09-15",
      pack_date: "2025-09-15",
      distribution_date: "2025-09-16",
      retail_date: "2025-09-17",
      province: "ELORO",
      farm: "Gran Chaparral",
      altitude: "1,500 - 1,800 msnm",
      process: "Honey",
      origin: "Portovelo-Piñas",
      farmers_list: "Pablo Quezada - Ivan Ramirez",
      drying_types: "Honey - Lavado",
      transfer_to_quito: "aéreo",
      storage: "Bodega Quito Norte",
      roast_types: "tueste medio - tueste medio oscuro",
      packed: "2025-09-15",
      transfer_to_shipping: "aéreo-marítimo",
      destination_country: "Corea del Sur - Singapur"
    }
  ]

  const loadBatchData = async (batchId: string) => {
    setIsLoading(true)
    setSearchPerformed(true)

    try {
      // Try to fetch from API first
      const response = await fetch(`/api/public/batches?batch_id=${batchId}`)
      const data = await response.json()

      if (data.success && data.batch) {
        setBatchData(data.batch)
      } else {
        // Fallback to sample data
        const foundBatch = sampleBatches.find(batch =>
          batch.batch_id.toLowerCase() === batchId.toLowerCase().trim()
        )

        if (foundBatch) {
          setBatchData(foundBatch)
        } else {
          setBatchData(null)
        }
      }
    } catch (error) {
      console.error('Error loading batch data:', error)
      // Try sample data on error
      const foundBatch = sampleBatches.find(batch =>
        batch.batch_id.toLowerCase() === batchId.toLowerCase().trim()
      )
      setBatchData(foundBatch || null)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = () => {
    if (batchNumber.trim()) {
      loadBatchData(batchNumber.trim())
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation language={language} setLanguage={setLanguage} />

      {/* Sustainability Video Section */}
      <section className="bg-black">
        <div className="w-full">
          <div className="aspect-video bg-gray-900">
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster="/assets/fotosinicio/foto paisaje.jpg"
            >
              <source src="https://blog.torisoftt.com/videos/sostenibilidad.mp4" type="video/mp4" />
              {language === 'es'
                ? 'Tu navegador no soporta el elemento de video.'
                : 'Your browser does not support the video element.'
              }
            </video>
          </div>
        </div>
      </section>

      {/* NEW DESIGN - TABS STRUCTURE */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
            {language === 'es' ? 'Sostenibilidad' : 'Sustainability'}
          </h1>
        </div>

        {/* Tabs Navigation */}
        <div className="flex flex-wrap justify-center mb-8 bg-gray-100 rounded-lg p-2">
          {[
            { key: 'sustainability', es: 'Sostenibilidad', en: 'Sustainability' },
            { key: 'certifications', es: 'Certificaciones', en: 'Certifications' },
            { key: 'traceability', es: 'Trazabilidad', en: 'Traceability' },
            { key: 'policies', es: 'Políticas', en: 'Policies' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                activeTab === tab.key
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-orange-500'
              }`}
            >
              {language === 'es' ? tab.es : tab.en}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'sustainability' && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {language === 'es' ? 'Nuestras Acciones en Sostenibilidad' : 'Our Sustainability Actions'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: language === 'es' ? 'Mitigación cambio climático' : 'Climate Change Mitigation',
                  content: language === 'es'
                    ? 'Implementamos prácticas agrícolas sostenibles que ayudan a reducir las emisiones de gases de efecto invernadero.'
                    : 'We implement sustainable agricultural practices that help reduce greenhouse gas emissions.'
                },
                {
                  title: language === 'es' ? 'Carbono neutro' : 'Carbon Neutral',
                  content: language === 'es'
                    ? 'Trabajamos hacia la neutralidad de carbono en toda nuestra cadena de producción.'
                    : 'We work towards carbon neutrality throughout our entire production chain.'
                },
                {
                  title: language === 'es' ? 'Premios y galardones' : 'Awards and Recognition',
                  content: language === 'es'
                    ? 'Información sobre reconocimientos por ser completada próximamente.'
                    : 'Information about recognition to be completed soon.'
                },
                {
                  title: language === 'es' ? 'Bonos de carbono' : 'Carbon Credits',
                  content: language === 'es'
                    ? 'Participamos en programas de bonos de carbono para compensar nuestra huella ambiental.'
                    : 'We participate in carbon credit programs to offset our environmental footprint.'
                }
              ].map((item, index) => (
                <div key={index} className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">{item.title}</h3>
                  <p className="text-gray-700">{item.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'certifications' && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {language === 'es' ? 'Certificaciones' : 'Certifications'}
            </h2>
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📜</div>
              <p className="text-gray-600 text-lg">
                {language === 'es'
                  ? 'Las certificaciones se publicarán próximamente a medida que las obtengamos.'
                  : 'Certifications will be published soon as we obtain them.'
                }
              </p>
            </div>
          </div>
        )}

        {activeTab === 'traceability' && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {language === 'es' ? 'Trazabilidad' : 'Traceability'}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {language === 'es' ? '¿Qué es la trazabilidad?' : 'What is traceability?'}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {language === 'es'
                    ? 'La trazabilidad es la capacidad de seguir y documentar el recorrido de nuestro café desde la finca hasta tu taza. Cada lote tiene un código único que te permite conocer su origen, proceso y calidad.'
                    : 'Traceability is the ability to track and document the journey of our coffee from farm to cup. Each batch has a unique code that allows you to know its origin, process and quality.'
                  }
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {language === 'es'
                    ? 'Con nuestro sistema de trazabilidad, garantizamos transparencia total en cada etapa del proceso, desde el agricultor que cultivó los granos hasta el momento en que llega a tus manos.'
                    : 'With our traceability system, we guarantee total transparency at every stage of the process, from the farmer who grew the beans to the moment it reaches your hands.'
                  }
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-100 to-yellow-100 p-6 rounded-lg">
                <div className="text-center">
                  <div className="text-6xl mb-4">🌱➡️☕</div>
                  <p className="text-sm text-gray-600">
                    {language === 'es' ? 'Imagen animada de trazabilidad aquí' : 'Animated traceability image here'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'policies' && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {language === 'es' ? 'Nuestras Políticas' : 'Our Policies'}
            </h2>
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {language === 'es' ? 'Política de Sostenibilidad' : 'Sustainability Policy'}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {language === 'es'
                    ? 'Estamos comprometidos con prácticas sostenibles que protejan el medio ambiente y apoyen a nuestras comunidades cafeteras. Nuestras políticas incluyen el uso responsable de recursos naturales, la protección de la biodiversidad y el desarrollo de nuestros agricultores.'
                    : 'We are committed to sustainable practices that protect the environment and support our coffee communities. Our policies include responsible use of natural resources, biodiversity protection and the development of our farmers.'
                  }
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {language === 'es' ? 'Política de Calidad' : 'Quality Policy'}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {language === 'es'
                    ? 'Mantenemos los más altos estándares de calidad en toda nuestra cadena de producción, desde la selección de granos hasta el empaque final, garantizando la excelencia en cada taza.'
                    : 'We maintain the highest quality standards throughout our production chain, from bean selection to final packaging, guaranteeing excellence in every cup.'
                  }
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {language === 'es' ? 'Política de Comercio Justo' : 'Fair Trade Policy'}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {language === 'es'
                    ? 'Garantizamos precios justos para nuestros agricultores y promovemos condiciones laborales dignas en todas nuestras operaciones, contribuyendo al desarrollo económico y social de las comunidades rurales.'
                    : 'We guarantee fair prices for our farmers and promote decent working conditions in all our operations, contributing to the economic and social development of rural communities.'
                  }
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-amber-50 rounded-lg p-8 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-black mb-4">
              {language === 'es'
                ? 'Ingresa el número de lote y sigue de cerca la ruta de tu café favorito.'
                : 'Enter the batch number and closely follow the route of your favorite coffee.'
              }
            </h2>
            <div className="max-w-md mx-auto flex gap-4">
              <input
                type="text"
                value={batchNumber}
                onChange={(e) => setBatchNumber(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={language === 'es' ? 'Número de lote' : 'Batch number'}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <button
                onClick={handleSearch}
                disabled={isLoading}
                className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 text-black font-medium px-6 py-2 rounded-lg transition-colors"
              >
                {isLoading ? (language === 'es' ? 'Buscando...' : 'Searching...') : (language === 'es' ? 'Buscar' : 'Search')}
              </button>
            </div>
          </div>
        </div>

        <div className="text-center bg-green-50 rounded-lg p-8">
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            {language === 'es'
              ? 'Cada taza que tomas, está conectada a una agricultura sostenible. Bajo el abrigo de los bosques naturales de Ecuador, nuestras prácticas priorizan el equilibrio ecológico, la regeneración de suelos y el uso responsable de los recursos.'
              : 'Every cup you drink, is connected to sustainable agriculture. Under the shelter of Ecuador\'s natural forests, our practices prioritize ecological balance, soil regeneration, and responsible use of resources.'
            }
          </p>
        </div>
      </div>

      {/* Batch Results Section */}
      {(batchData || searchPerformed) && (
        <div className="max-w-7xl mx-auto px-4 py-16">
          {batchData ? (
            <div className="bg-white rounded-lg shadow-xl p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {language === 'es' ? 'Información del Lote' : 'Batch Information'}
                </h3>
                <p className="text-lg font-semibold text-orange-600">#{batchData.batch_id}</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Batch Details Table */}
                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">
                    {language === 'es' ? 'Detalles del Lote' : 'Batch Details'}
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="space-y-3">
                      {[
                        { label: language === 'es' ? 'Variedad' : 'Variety', value: batchData.variety },
                        { label: language === 'es' ? 'Agricultor' : 'Farmer', value: batchData.farmer },
                        { label: language === 'es' ? 'Finca' : 'Farm', value: batchData.farm },
                        { label: language === 'es' ? 'Provincia' : 'Province', value: batchData.province },
                        { label: language === 'es' ? 'Altitud' : 'Altitude', value: batchData.altitude },
                        { label: language === 'es' ? 'Proceso' : 'Process', value: batchData.process },
                        { label: language === 'es' ? 'Fecha de Cosecha' : 'Harvest Date', value: batchData.harvest_date },
                        { label: language === 'es' ? 'Método de Secado' : 'Drying Method', value: batchData.drying_method },
                        { label: language === 'es' ? 'Fecha de Tostado' : 'Roast Date', value: batchData.roast_date },
                        { label: language === 'es' ? 'Destino' : 'Destination', value: batchData.destination_country }
                      ].map((item, index) => (
                        <div key={index} className="flex justify-between py-2 border-b border-gray-200 last:border-b-0">
                          <span className="font-medium text-gray-700">{item.label}:</span>
                          <span className="text-gray-900">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Journey Timeline */}
                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">
                    {language === 'es' ? 'Viaje del Café' : 'Coffee Journey'}
                  </h4>
                  <div className="space-y-4">
                    {[
                      { step: language === 'es' ? 'Cosecha' : 'Harvest', date: batchData.harvest_date, icon: '🌱' },
                      { step: language === 'es' ? 'Secado' : 'Drying', date: batchData.harvest_date, icon: '☀️' },
                      { step: language === 'es' ? 'Transporte a Quito' : 'Transport to Quito', date: batchData.pack_date, icon: '🚛' },
                      { step: language === 'es' ? 'Tostado' : 'Roasting', date: batchData.roast_date, icon: '🔥' },
                      { step: language === 'es' ? 'Empaque' : 'Packaging', date: batchData.pack_date, icon: '📦' },
                      { step: language === 'es' ? 'Distribución' : 'Distribution', date: batchData.distribution_date, icon: '🚢' }
                    ].map((step, index) => (
                      <div key={index} className="flex items-center space-x-4 p-3 bg-orange-50 rounded-lg">
                        <div className="text-2xl">{step.icon}</div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800">{step.step}</p>
                          <p className="text-sm text-gray-600">{step.date}</p>
                        </div>
                        <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">❌</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {language === 'es' ? 'Lote no encontrado' : 'Batch not found'}
              </h3>
              <p className="text-gray-600">
                {language === 'es'
                  ? 'Verifica el número de lote e intenta nuevamente.'
                  : 'Please verify the batch number and try again.'
                }
              </p>
            </div>
          )}
        </div>
      )}

      <Footer language={language} />
    </div>
  )
}

/* COMMENTED OLD VERSION FOR BACKUP
<div className="max-w-7xl mx-auto px-4 py-16">
  <div className="text-center mb-12">
    <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
      {language === 'es' ? 'Sostenibilidad' : 'Sustainability'}
    </h1>
  </div>

        <div className="bg-amber-50 rounded-lg p-8 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-black mb-4">
              {language === 'es'
                ? 'Ingresa el número de lote y sigue de cerca la ruta de tu café favorito.'
                : 'Enter the batch number and closely follow the route of your favorite coffee.'
              }
            </h2>
            <div className="max-w-md mx-auto flex gap-4">
              <input
                type="text"
                value={batchNumber}
                onChange={(e) => setBatchNumber(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={language === 'es' ? 'Número de lote' : 'Batch number'}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <button
                onClick={handleSearch}
                disabled={isLoading}
                className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 text-black font-medium px-6 py-2 rounded-lg transition-colors"
              >
                {isLoading ? (language === 'es' ? 'Buscando...' : 'Searching...') : (language === 'es' ? 'Buscar' : 'Search')}
              </button>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-bold text-black text-center mb-8">
            {language === 'es' ? 'Aprende todo sobre tu café favorito' : 'Learn all about your favorite coffee'}
          </h3>

          <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === 'es' ? 'Parámetro' : 'Parameter'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === 'es' ? 'Información' : 'Information'}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {searchPerformed && !batchData && !isLoading && (
                  <tr>
                    <td colSpan={2} className="px-6 py-8 text-center">
                      <div className="text-gray-500">
                        <p className="text-lg font-medium mb-2">
                          {language === 'es' ? 'Lote no encontrado' : 'Batch not found'}
                        </p>
                        <p className="text-sm">
                          {language === 'es'
                            ? 'No se encontró información para el número de lote ingresado'
                            : 'No information found for the entered batch number'
                          }
                        </p>
                      </div>
                    </td>
                  </tr>
                )}

                {!searchPerformed && (
                  <tr>
                    <td colSpan={2} className="px-6 py-8 text-center">
                      <div className="text-gray-400">
                        <p className="text-lg font-medium mb-2">
                          {language === 'es' ? 'Ingresa un número de lote' : 'Enter a batch number'}
                        </p>
                        <p className="text-sm">
                          {language === 'es'
                            ? 'Busca información detallada sobre tu café favorito'
                            : 'Search for detailed information about your favorite coffee'
                          }
                        </p>
                      </div>
                    </td>
                  </tr>
                )}

                {batchData && (
                  <>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {language === 'es' ? 'Número de lote' : 'Batch number'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {batchData.batch_id}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {language === 'es' ? 'Variedad' : 'Variety'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {batchData.variety || '-'}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {language === 'es' ? 'Caficultor' : 'Coffee Farmer'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {batchData.farmers_list || batchData.farmer || '-'}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {language === 'es' ? 'Provincia' : 'Province'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {batchData.province || '-'}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {language === 'es' ? 'Finca' : 'Farm'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {batchData.farm || '-'}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {language === 'es' ? 'Altitud' : 'Altitude'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {batchData.altitude || '-'}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {language === 'es' ? 'Origen' : 'Origin'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {batchData.origin || '-'}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {language === 'es' ? 'Proceso' : 'Process'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {batchData.process || '-'}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {language === 'es' ? 'Fecha de cosecha' : 'Harvest date'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {batchData.harvest_date || '-'}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {language === 'es' ? 'Tipo de secado' : 'Drying type'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {batchData.drying_types || batchData.drying_method || '-'}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {language === 'es' ? 'Traslado a Quito' : 'Transfer to Quito'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {batchData.transfer_to_quito || '-'}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {language === 'es' ? 'Almacenamiento temporal' : 'Temporary storage'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {batchData.storage || '-'}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {language === 'es' ? 'Tipo de tostado' : 'Type of roasting'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {batchData.roast_types || '-'}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {language === 'es' ? 'Empacado' : 'Packed'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {batchData.packed || batchData.pack_date || '-'}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {language === 'es' ? 'Traslado a embarque' : 'Transfer to boarding'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {batchData.transfer_to_shipping || '-'}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {language === 'es' ? 'País de destino' : 'Country of destination'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {batchData.destination_country || '-'}
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center bg-green-50 rounded-lg p-8">
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            {language === 'es'
              ? 'Cada taza que tomas, está conectada a una agricultura sostenible. Bajo el abrigo de los bosques naturales de Ecuador, nuestras prácticas priorizan el equilibrio ecológico, la regeneración de suelos y el uso responsable de los recursos.'
              : 'Every cup you drink, is connected to sustainable agriculture. Under the shelter of Ecuador\'s natural forests, our practices prioritize ecological balance, soil regeneration, and responsible use of resources.'
            }
          </p>
  </div>
</div>
END OF COMMENTED VERSION */