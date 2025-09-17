'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import CMSSidebar from '@/components/cms/CMSSidebar'
import CMSHeader from '@/components/cms/CMSHeader'

interface Batch {
  batch_id: string
  harvest_date: string
  processing_method: string
  drying_method: string
  transport_mode: string
  roast_date: string
  pack_date: string
  status: string
  farmer_name: string
  farmer_code: string
  farm_name: string
  variety_name: string
  province_name: string
  province_code: string
  green_weight_kg: number
  final_weight_kg: number
}

export default function BatchesPage() {
  const [batches, setBatches] = useState<Batch[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
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
      loadBatches()
    } catch (error) {
      router.push('/crmalohja')
    }
  }, [router])

  const loadBatches = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/batches')
      const data = await response.json()
      
      if (data.success) {
        setBatches(data.batches)
      }
    } catch (error) {
      console.error('Error loading batches:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteBatch = async (batchId: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este lote?')) {
      return
    }

    try {
      const response = await fetch(`/api/batches/${batchId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        loadBatches()
      }
    } catch (error) {
      console.error('Error deleting batch:', error)
    }
  }

  const filteredBatches = batches.filter(batch => {
    const matchesSearch = 
      batch.batch_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.farmer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.farmer_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.variety_name.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || batch.status === filterStatus
    
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'sold':
        return 'bg-blue-100 text-blue-800'
      case 'expired':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Activo'
      case 'sold':
        return 'Vendido'
      case 'expired':
        return 'Expirado'
      default:
        return status
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex">
        <CMSSidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando lotes...</p>
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
                <h1 className="text-3xl font-bold text-gray-900">Lotes de Café</h1>
                <p className="text-gray-600 mt-2">Gestión de lotes y trazabilidad</p>
              </div>
              
              <button
                onClick={() => router.push('/crmalohja/batches/new')}
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
              >
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Nuevo Lote
                </div>
              </button>
            </div>

            {/* Filters */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar por código, agricultor o variedad..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
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
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="all">Todos los estados</option>
                <option value="active">Activo</option>
                <option value="sold">Vendido</option>
                <option value="expired">Expirado</option>
              </select>
            </div>

            {/* Batches Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Código Lote
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Agricultor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Variedad
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fecha Cosecha
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Procesamiento
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Peso (kg)
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
                    {filteredBatches.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                          {searchTerm ? 'No se encontraron lotes' : 'No hay lotes registrados'}
                        </td>
                      </tr>
                    ) : (
                      filteredBatches.map((batch) => (
                        <tr key={batch.batch_id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {batch.batch_id}
                            </div>
                            <div className="text-sm text-gray-500">
                              {batch.province_code}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {batch.farmer_name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {batch.farmer_code}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {batch.variety_name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(batch.harvest_date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{batch.processing_method}</div>
                            <div className="text-sm text-gray-500">{batch.drying_method}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              Verde: {batch.green_weight_kg || 'N/A'}
                            </div>
                            <div className="text-sm text-gray-500">
                              Final: {batch.final_weight_kg || 'N/A'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(batch.status)}`}
                            >
                              {getStatusText(batch.status)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={() => router.push(`/crmalohja/batches/${batch.batch_id}`)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                Ver
                              </button>
                              <button
                                onClick={() => router.push(`/crmalohja/batches/${batch.batch_id}/edit`)}
                                className="text-green-600 hover:text-green-900"
                              >
                                Editar
                              </button>
                              <button
                                onClick={() => deleteBatch(batch.batch_id)}
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
                <div className="text-2xl font-bold text-gray-900">{batches.length}</div>
                <div className="text-sm text-gray-500">Total Lotes</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-2xl font-bold text-green-600">
                  {batches.filter(b => b.status === 'active').length}
                </div>
                <div className="text-sm text-gray-500">Activos</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-2xl font-bold text-blue-600">
                  {batches.filter(b => b.status === 'sold').length}
                </div>
                <div className="text-sm text-gray-500">Vendidos</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-2xl font-bold text-amber-600">
                  {batches.reduce((acc, b) => acc + (b.green_weight_kg || 0), 0).toFixed(1)} kg
                </div>
                <div className="text-sm text-gray-500">Peso Total Verde</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}