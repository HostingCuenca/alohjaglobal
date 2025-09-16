'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function SustainabilityPage() {
  const [language, setLanguage] = useState<'es' | 'en'>('es')
  const [batchNumber, setBatchNumber] = useState('')

  return (
    <div className="min-h-screen bg-white">
      <Navigation language={language} setLanguage={setLanguage} />

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
                placeholder={language === 'es' ? 'Número de lote' : 'Batch number'}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-6 py-2 rounded-lg transition-colors">
                {language === 'es' ? 'Buscar' : 'Search'}
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
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {language === 'es' ? 'Número de lote' : 'Batch number'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {batchNumber || '-'}
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {language === 'es' ? 'Origen' : 'Origin'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Paltas-Olmedo-Vilcabamba-Cariamanga-chaguarpamba-Portovelo-Piñas-Nanegal-Pacto-Nanegalito
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {language === 'es' ? 'Caficultor' : 'Coffee Farmer'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Pablo Quezada - Armando Ramirez - Ivan Ramirez - Elauterio Fajardo - Edita Collaguazo - Mercy Espinosa - Victoria Fajardo - Luis Fajardo - Melo Fajardo
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {language === 'es' ? 'Fecha de cosecha' : 'Harvest date'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    -
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {language === 'es' ? 'Tipo de secado' : 'Drying type'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {language === 'es' ? 'Natural – honey - Lavado' : 'Natural – honey – washed'}
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {language === 'es' ? 'Traslado a Quito' : 'Transfer to Quito'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {language === 'es' ? 'aéreo-terrestre-marítimo' : 'Air-Land-maritime'}
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {language === 'es' ? 'Almacenamiento temporal' : 'Temporary storage'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    -
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {language === 'es' ? 'Tipo de tostado' : 'Type of roasting'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {language === 'es' ? 'tueste claro – tueste medio- tueste medio oscuro – tueste oscuro' : 'light roast – medium roast – medium dark roast – dark roast'}
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {language === 'es' ? 'Empacado' : 'Packed'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    -
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {language === 'es' ? 'Traslado a embarque' : 'Transfer to boarding'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {language === 'es' ? 'aéreo-terrestre-marítimo' : 'Air-Land-maritime'}
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {language === 'es' ? 'País de destino' : 'Country of destination'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Japón - Corea del Sur - China - Singapur - Taiwán - Emiratos Árabes Unidos - Estados Unidos - Colombia - Perú - Alemania
                  </td>
                </tr>
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