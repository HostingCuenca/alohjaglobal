'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import CMSSidebar from '@/components/cms/CMSSidebar'
import CMSHeader from '@/components/cms/CMSHeader'

interface Farmer {
  id: string
  farmer_code: string
  first_name: string
  last_name: string
  full_name: string
  email: string
  phone: string
  province_name: string
  municipality: string
  years_experience: number
  is_active: boolean
  created_at: string
}

export default function FarmersPage() {
  const [farmers, setFarmers] = useState<Farmer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')
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
      loadFarmers()
    } catch (error) {
      router.push('/crmalohja')
    }
  }, [router])

  const loadFarmers = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/farmers')
      const data = await response.json()
      
      if (data.success) {
        setFarmers(data.farmers)
      }
    } catch (error) {
      console.error('Error loading farmers:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteFarmer = async (farmerId: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este agricultor?')) {
      return
    }

    try {
      const response = await fetch(`/api/farmers/${farmerId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        loadFarmers()
      }
    } catch (error) {
      console.error('Error deleting farmer:', error)
    }
  }

  const filteredFarmers = farmers.filter(farmer =>
    farmer.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    farmer.farmer_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    farmer.province_name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex">
        <CMSSidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando agricultores...</p>
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
                <h1 className="text-3xl font-bold text-gray-900">Agricultores</h1>
                <p className="text-gray-600 mt-2">Gestión de productores de café</p>
              </div>
              
              <button
                onClick={() => router.push('/crmalohja/farmers/new')}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
              >
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Nuevo Agricultor
                </div>
              </button>
            </div>

            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar por nombre, código o provincia..."
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

            {/* Farmers Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Agricultor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Código
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Provincia
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Experiencia
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredFarmers.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                          {searchTerm ? 'No se encontraron agricultores' : 'No hay agricultores registrados'}
                        </td>
                      </tr>
                    ) : (
                      filteredFarmers.map((farmer) => (
                        <tr key={farmer.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {farmer.full_name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {farmer.email}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {farmer.farmer_code}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {farmer.province_name || 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {farmer.years_experience} años
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                farmer.is_active
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {farmer.is_active ? 'Activo' : 'Inactivo'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={() => router.push(`/crmalohja/farmers/${farmer.id}`)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                Ver
                              </button>
                              <button
                                onClick={() => router.push(`/crmalohja/farmers/${farmer.id}/edit`)}
                                className="text-green-600 hover:text-green-900"
                              >
                                Editar
                              </button>
                              <button
                                onClick={() => deleteFarmer(farmer.id)}
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
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-2xl font-bold text-gray-900">{farmers.length}</div>
                <div className="text-sm text-gray-500">Total Agricultores</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-2xl font-bold text-green-600">
                  {farmers.filter(f => f.is_active).length}
                </div>
                <div className="text-sm text-gray-500">Activos</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-2xl font-bold text-amber-600">
                  {Math.round(farmers.reduce((acc, f) => acc + f.years_experience, 0) / farmers.length) || 0}
                </div>
                <div className="text-sm text-gray-500">Promedio Experiencia (años)</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}