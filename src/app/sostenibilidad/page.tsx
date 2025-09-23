'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function SustainabilityPage() {
  const [language, setLanguage] = useState<'es' | 'en'>('es')
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

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
            {language === 'es' ? 'Sostenibilidad' : 'Sustainability'}
          </h1>
        </div>

        {/* Batch Tracking Section */}
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

        {/* Batch Information Table */}
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

        {/* Sustainability Message */}
        <div className="text-center bg-green-50 rounded-lg p-8">
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            {language === 'es'
              ? 'Cada taza que tomas, está conectada a una agricultura sostenible. Bajo el abrigo de los bosques naturales de Ecuador, nuestras prácticas priorizan el equilibrio ecológico, la regeneración de suelos y el uso responsable de los recursos.'
              : 'Every cup you drink, is connected to sustainable agriculture. Under the shelter of Ecuador\'s natural forests, our practices prioritize ecological balance, soil regeneration, and responsible use of resources.'
            }
          </p>
        </div>
      </div>

      <Footer language={language} />
    </div>
  )
}