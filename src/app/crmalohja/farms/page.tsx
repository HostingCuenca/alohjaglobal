'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import CMSSidebar from '@/components/cms/CMSSidebar'
import CMSHeader from '@/components/cms/CMSHeader'

interface Farm {
  id: string
  farmer_id: string
  name: string
  total_area_hectares: string
  coffee_area_hectares: string
  altitude_min: number
  altitude_max: number
  soil_type: string
  shade_percentage: number
  processing_method: string
  farmer_name: string
  farmer_code: string
  created_at: string
}

interface User {
  id: string
  username: string
  role: string
}

export default function FarmsPage() {
  const [farms, setFarms] = useState<Farm[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterFarmer, setFilterFarmer] = useState('all')
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('cms_token')
    if (!token) {
      router.push('/crmalohja')
      return
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      setUser(payload)
      loadFarms()
    } catch {
      router.push('/crmalohja')
    }
  }, [router])

  const loadFarms = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/farms')
      const data = await response.json()

      if (data.success) {
        setFarms(data.farms)
      }
    } catch (error) {
      console.error('Error loading farms:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteFarm = async (farmId: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta finca?')) {
      return
    }

    try {
      const response = await fetch(`/api/farms/${farmId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        loadFarms()
      }
    } catch (error) {
      console.error('Error deleting farm:', error)
    }
  }

  const filteredFarms = farms.filter(farm => {
    const matchesSearch =
      farm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farm.farmer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farm.farmer_code.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFarmer = filterFarmer === 'all' || farm.farmer_id === filterFarmer

    return matchesSearch && matchesFarmer
  })

  // Get unique farmers for filter
  const uniqueFarmers = farms.reduce((acc: any[], farm) => {
    if (!acc.find(f => f.farmer_id === farm.farmer_id)) {
      acc.push({
        farmer_id: farm.farmer_id,
        farmer_name: farm.farmer_name,
        farmer_code: farm.farmer_code
      })
    }
    return acc
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex">
        <CMSSidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando fincas...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <CMSSidebar />

      <div className="flex-1 flex flex-col">
        <CMSHeader user={user} />

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8 flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Fincas</h1>
                <p className="text-gray-600 mt-2">Gestión de fincas y propiedades</p>
              </div>

              <button
                onClick={() => router.push('/crmalohja/farms/new')}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
              >
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Nueva Finca
                </div>
              </button>
            </div>

            {/* Filters */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar por nombre de finca o agricultor..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <svg
                    className="absolute left-3 top-3.5 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              <select
                value={filterFarmer}
                onChange={(e) => setFilterFarmer(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="all">Todos los agricultores</option>
                {uniqueFarmers.map((farmer) => (
                  <option key={farmer.farmer_id} value={farmer.farmer_id}>
                    {farmer.farmer_name} ({farmer.farmer_code})
                  </option>
                ))}
              </select>
            </div>

            {/* Farms Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Finca
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Agricultor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Área (ha)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Altitud (m)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Procesamiento
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sombra
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredFarms.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                          {searchTerm ? 'No se encontraron fincas' : 'No hay fincas registradas'}
                        </td>
                      </tr>
                    ) : (
                      filteredFarms.map((farm) => (
                        <tr key={farm.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {farm.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {farm.soil_type || 'N/A'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {farm.farmer_name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {farm.farmer_code}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              Total: {parseFloat(farm.total_area_hectares || '0').toFixed(1)} ha
                            </div>
                            <div className="text-sm text-gray-500">
                              Café: {parseFloat(farm.coffee_area_hectares || '0').toFixed(1)} ha
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {farm.altitude_min && farm.altitude_max
                              ? `${farm.altitude_min} - ${farm.altitude_max}m`
                              : 'N/A'
                            }
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {farm.processing_method || 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {farm.shade_percentage ? `${farm.shade_percentage}%` : 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={() => router.push(`/crmalohja/farms/${farm.id}`)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                Ver
                              </button>
                              <button
                                onClick={() => router.push(`/crmalohja/farms/${farm.id}/edit`)}
                                className="text-green-600 hover:text-green-900"
                              >
                                Editar
                              </button>
                              <button
                                onClick={() => deleteFarm(farm.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                Eliminar
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-2xl font-bold text-gray-900">{farms.length}</div>
                <div className="text-sm text-gray-500">Total Fincas</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-2xl font-bold text-green-600">
                  {uniqueFarmers.length}
                </div>
                <div className="text-sm text-gray-500">Agricultores</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-2xl font-bold text-blue-600">
                  {farms.reduce((acc, f) => acc + parseFloat(f.total_area_hectares || '0'), 0).toFixed(1)} ha
                </div>
                <div className="text-sm text-gray-500">Área Total</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-2xl font-bold text-amber-600">
                  {farms.reduce((acc, f) => acc + parseFloat(f.coffee_area_hectares || '0'), 0).toFixed(1)} ha
                </div>
                <div className="text-sm text-gray-500">Área de Café</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}