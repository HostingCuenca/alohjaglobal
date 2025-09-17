'use client'

import { useState } from 'react'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function BatchesPage() {
  const [language, setLanguage] = useState<'es' | 'en'>('es')
  const [selectedBatch, setSelectedBatch] = useState<string>('AR000147')
  const [searchValue, setSearchValue] = useState<string>('')
  const [searchResult, setSearchResult] = useState<any>(null)

  // Sample batch data based on your structure
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
      process: "Lavado"
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
      process: "Honey"
    },
    {
      batch_id: "MG000369",
      variety: "Bourbon Rosado",
      farmer: "María González",
      harvest_date: "2025-06-10",
      drying_method: "Washed",
      transport_mode: "Vía terrestre",
      roast_date: "2025-09-12",
      pack_date: "2025-09-12",
      distribution_date: "2025-09-13",
      retail_date: "2025-09-14",
      province: "PICHINCHA",
      farm: "La Esperanza",
      altitude: "2,000 - 2,200 msnm",
      process: "Lavado"
    }
  ]

  const getProvinceMap = (province: string) => {
    const maps: { [key: string]: string } = {
      'LOJA': '/assets/mapaspng/mapaecuadorLOJA.png',
      'ELORO': '/assets/mapaspng/mapaecuadorELORO.png',
      'PICHINCHA': '/assets/mapaspng/mapaecuadorPICHINCHA.png'
    }
    return maps[province] || '/assets/mapaspng/ilustracioncafe.png'
  }

  const handleSearch = () => {
    if (searchValue.trim()) {
      const foundBatch = sampleBatches.find(batch => 
        batch.batch_id.toLowerCase() === searchValue.toLowerCase().trim()
      )
      if (foundBatch) {
        setSelectedBatch(foundBatch.batch_id)
        setSearchResult(foundBatch)
      } else {
        setSearchResult(null)
        alert(language === 'es' 
          ? 'Lote no encontrado. Prueba con: AR000147, PQ000258, o MG000369' 
          : 'Batch not found. Try: AR000147, PQ000258, or MG000369')
      }
    }
  }

  const getCurrentBatch = () => sampleBatches.find(batch => batch.batch_id === selectedBatch) || sampleBatches[0]

  // Icons for each field (using simple emojis for now)
  const getFieldIcon = (field: string) => {
    const icons: { [key: string]: string } = {
      batch_id: "📋",
      variety: "🌱",
      farmer: "👨‍🌾",
      harvest_date: "🗓️",
      drying_method: "☀️",
      transport_mode: "🚛",
      roast_date: "🔥",
      pack_date: "📦",
      distribution_date: "🚚",
      retail_date: "🏪"
    }
    return icons[field] || "📍"
  }

  const currentBatch = getCurrentBatch()

  return (
    <div className="min-h-screen bg-white">
      <Navigation language={language} setLanguage={setLanguage} />

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
            {language === 'es' ? 'Trazabilidad de Lotes' : 'Batch Traceability'}
          </h1>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            {language === 'es'
              ? 'Rastrea el viaje completo de tu café desde la finca hasta tu taza. Cada lote cuenta una historia única de calidad y origen.'
              : 'Track the complete journey of your coffee from farm to cup. Every batch tells a unique story of quality and origin.'
            }
          </p>
        </div>

        {/* Search Section */}
        <section className="mb-8">
          <div className="bg-amber-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-black text-center mb-6">
              {language === 'es' ? 'Buscar Lote por Código' : 'Search Batch by Code'}
            </h2>
            <div className="max-w-md mx-auto">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder={language === 'es' ? 'Ej: AR000147, PQ000258, MG000369' : 'Ex: AR000147, PQ000258, MG000369'}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black font-medium"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button 
                  onClick={handleSearch}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg transition-colors whitespace-nowrap"
                >
                  {language === 'es' ? 'Buscar' : 'Search'}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Test Batch Selection */}
        <section className="mb-12">
          <div className="bg-green-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-black text-center mb-6">
              {language === 'es' ? 'O Selecciona un Lote para Probar' : 'Or Select a Batch to Test'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {sampleBatches.map((batch) => (
                <button
                  key={batch.batch_id}
                  onClick={() => setSelectedBatch(batch.batch_id)}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                    selectedBatch === batch.batch_id
                      ? 'border-yellow-500 bg-yellow-50 shadow-lg transform scale-105'
                      : 'border-gray-200 bg-white hover:border-yellow-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">📋</span>
                    <span className="font-bold text-lg text-black">{batch.batch_id}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700 mb-1">
                    <span>👨‍🌾</span>
                    <span className="font-medium">{batch.farmer}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <span>📍</span>
                    <span className="font-medium">{batch.province.replace(/([A-Z])/g, ' $1').trim()}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Main Batch Information */}
        <section className="mb-12">
          <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-green-700 px-8 py-6 text-white">
              <div className="flex items-center gap-4">
                <span className="text-3xl">📋</span>
                <div>
                  <h3 className="text-2xl font-bold">
                    {language === 'es' ? 'Lote:' : 'Batch:'} {currentBatch.batch_id}
                  </h3>
                  <p className="opacity-90">
                    {currentBatch.farm} • {currentBatch.province}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h4 className="font-bold text-xl text-black mb-4 flex items-center gap-2">
                    <span>🌱</span>
                    {language === 'es' ? 'Información Básica' : 'Basic Information'}
                  </h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span>{getFieldIcon('batch_id')}</span>
                        <span className="font-medium text-gray-800">
                          {language === 'es' ? 'Número de Lote' : 'Batch Number'}
                        </span>
                      </div>
                      <span className="font-bold text-green-700">{currentBatch.batch_id}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span>{getFieldIcon('variety')}</span>
                        <span className="font-medium text-gray-800">
                          {language === 'es' ? 'Variedad' : 'Variety'}
                        </span>
                      </div>
                      <span className="font-bold text-gray-900">{currentBatch.variety}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span>{getFieldIcon('farmer')}</span>
                        <span className="font-medium text-gray-800">
                          {language === 'es' ? 'Caficultor' : 'Coffee Farmer'}
                        </span>
                      </div>
                      <span className="font-bold text-gray-900">{currentBatch.farmer}</span>
                    </div>
                  </div>
                </div>

                {/* Process Information */}
                <div className="space-y-4">
                  <h4 className="font-bold text-xl text-black mb-4 flex items-center gap-2">
                    <span>⚙️</span>
                    {language === 'es' ? 'Proceso' : 'Process'}
                  </h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span>{getFieldIcon('harvest_date')}</span>
                        <span className="font-medium text-gray-800">
                          {language === 'es' ? 'Cosecha' : 'Harvest'}
                        </span>
                      </div>
                      <span className="font-bold text-gray-900">{currentBatch.harvest_date}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span>{getFieldIcon('drying_method')}</span>
                        <span className="font-medium text-gray-800">
                          {language === 'es' ? 'Secado' : 'Drying'}
                        </span>
                      </div>
                      <span className="font-bold text-gray-900">{currentBatch.drying_method}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span>{getFieldIcon('transport_mode')}</span>
                        <span className="font-medium text-gray-800">
                          {language === 'es' ? 'Traslado' : 'Transport'}
                        </span>
                      </div>
                      <span className="font-bold text-gray-900">{currentBatch.transport_mode}</span>
                    </div>
                  </div>
                </div>

                {/* Distribution Information */}
                <div className="space-y-4">
                  <h4 className="font-bold text-xl text-black mb-4 flex items-center gap-2">
                    <span>📦</span>
                    {language === 'es' ? 'Distribución' : 'Distribution'}
                  </h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span>{getFieldIcon('roast_date')}</span>
                        <span className="font-medium text-gray-800">
                          {language === 'es' ? 'Tostado' : 'Roasted'}
                        </span>
                      </div>
                      <span className="font-bold text-gray-900">{currentBatch.roast_date}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span>{getFieldIcon('pack_date')}</span>
                        <span className="font-medium text-gray-800">
                          {language === 'es' ? 'Empacado' : 'Packed'}
                        </span>
                      </div>
                      <span className="font-bold text-gray-900">{currentBatch.pack_date}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span>{getFieldIcon('retail_date')}</span>
                        <span className="font-medium text-gray-800">Retail</span>
                      </div>
                      <span className="font-bold text-gray-900">{currentBatch.retail_date}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Province Map */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h4 className="font-bold text-xl text-black mb-6 flex items-center gap-2">
                  <span>🗺️</span>
                  {language === 'es' ? 'Origen - Provincia de' : 'Origin - Province of'} {currentBatch.province.replace(/([A-Z])/g, ' $1').trim()}
                </h4>
                <div className="grid md:grid-cols-3 gap-8 items-start">
                  {/* Map Image */}
                  <div className="md:col-span-1">
                    <div className="w-full max-w-xs mx-auto">
                      <div className="relative aspect-square bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                        <Image
                          src={getProvinceMap(currentBatch.province)}
                          alt={`Mapa de ${currentBatch.province}`}
                          fill
                          className="object-contain p-4"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Map Information */}
                  <div className="md:col-span-2 space-y-4">
                    <div className="bg-green-50 rounded-lg p-6">
                      <h5 className="font-bold text-lg text-green-800 mb-4 flex items-center gap-2">
                        <span>📍</span>
                        {language === 'es' ? 'Información de Ubicación' : 'Location Information'}
                      </h5>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-green-700">
                            {language === 'es' ? 'Provincia:' : 'Province:'}
                          </span>
                          <span className="font-bold text-green-900">
                            {currentBatch.province.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-green-700">
                            {language === 'es' ? 'Finca:' : 'Farm:'}
                          </span>
                          <span className="font-bold text-green-900">{currentBatch.farm}</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-green-700">
                            {language === 'es' ? 'Altitud:' : 'Altitude:'}
                          </span>
                          <span className="font-bold text-green-900">{currentBatch.altitude}</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-green-700">
                            {language === 'es' ? 'Proceso:' : 'Process:'}
                          </span>
                          <span className="font-bold text-green-900">{currentBatch.process}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-yellow-50 rounded-lg p-4">
                      <p className="text-sm text-yellow-800 leading-relaxed">
                        <span className="font-semibold">
                          {language === 'es' ? '💡 Dato curioso:' : '💡 Fun fact:'}
                        </span>
                        {language === 'es' 
                          ? ' Ecuador es uno de los pocos países donde se puede cultivar café durante todo el año gracias a su ubicación ecuatorial.'
                          : ' Ecuador is one of the few countries where coffee can be grown year-round thanks to its equatorial location.'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sustainability Message */}
        <section className="text-center bg-green-50 rounded-xl p-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-3xl">🌱</span>
            <h3 className="text-2xl font-bold text-black">
              {language === 'es' ? 'Agricultura Sostenible' : 'Sustainable Agriculture'}
            </h3>
          </div>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            {language === 'es'
              ? 'Cada taza que tomas está conectada a una agricultura sostenible. Bajo el abrigo de los bosques naturales de Ecuador, nuestras prácticas priorizan el equilibrio ecológico y el desarrollo comunitario.'
              : 'Every cup you drink is connected to sustainable agriculture. Under the shelter of Ecuador\'s natural forests, our practices prioritize ecological balance and community development.'
            }
          </p>
        </section>
      </div>

      <Footer language={language} />
    </div>
  )
}