'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
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
  latitude: number
  longitude: number
  soil_type: string
  shade_percentage: number
  irrigation_system: string
  processing_method: string
  municipality: string
  farm_images: any[]
  farmer_name: string
  farmer_code: string
  created_at: string
  updated_at: string
}

interface User {
  id: string
  username: string
  role: string
}

export default function FarmViewPage() {
  const [farm, setFarm] = useState<Farm | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()
  const params = useParams()
  const farmId = params.id as string

  useEffect(() => {
    const token = localStorage.getItem('cms_token')
    if (!token) {
      router.push('/crmalohja')
      return
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      setUser(payload)
      loadFarm()
    } catch {
      router.push('/crmalohja')
    }
  }, [router])

  const loadFarm = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/farms/${farmId}`)
      const data = await response.json()

      if (data.success) {
        setFarm(data.farm)
      } else {
        console.error('Error loading farm:', data.error)
      }
    } catch (error) {
      console.error('Error loading farm:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex">
        <CMSSidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando finca...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!farm) {
    return (
      <div className="min-h-screen bg-gray-100 flex">
        <CMSSidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Finca no encontrada</h2>
            <button
              onClick={() => router.push('/crmalohja/farms')}
              className="text-green-600 hover:text-green-900"
            >
              Volver a fincas
            </button>
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
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => router.push('/crmalohja/farms')}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{farm.name}</h1>
                  <p className="text-gray-600 mt-1">Finca de {farm.farmer_name}</p>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => router.push(`/crmalohja/farms/${farm.id}/edit`)}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
                >
                  Editar Finca
                </button>
              </div>
            </div>

            {/* Basic Information */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Información Básica</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Agricultor</label>
                  <div className="text-sm text-gray-900">
                    <div className="font-medium">{farm.farmer_name}</div>
                    <div className="text-gray-500">Código: {farm.farmer_code}</div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la Finca</label>
                  <p className="text-sm text-gray-900">{farm.name}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Municipio</label>
                  <p className="text-sm text-gray-900">{farm.municipality || 'No especificado'}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Método de Procesamiento</label>
                  <p className="text-sm text-gray-900">
                    {farm.processing_method === 'washed' ? 'Lavado' :
                     farm.processing_method === 'natural' ? 'Natural' :
                     farm.processing_method === 'honey' ? 'Honey' :
                     farm.processing_method === 'mixed' ? 'Mixto' :
                     farm.processing_method || 'No especificado'}
                  </p>
                </div>
              </div>
            </div>

            {/* Area Information */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Información de Área</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Área Total</label>
                  <p className="text-sm text-gray-900">
                    {parseFloat(farm.total_area_hectares || '0').toFixed(1)} hectáreas
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Área de Café</label>
                  <p className="text-sm text-gray-900">
                    {parseFloat(farm.coffee_area_hectares || '0').toFixed(1)} hectáreas
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Altitud Mínima</label>
                  <p className="text-sm text-gray-900">{farm.altitude_min || 0} metros</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Altitud Máxima</label>
                  <p className="text-sm text-gray-900">{farm.altitude_max || 0} metros</p>
                </div>
              </div>
            </div>

            {/* Agricultural Information */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Información Agrícola</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Suelo</label>
                  <p className="text-sm text-gray-900">{farm.soil_type || 'No especificado'}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Porcentaje de Sombra</label>
                  <p className="text-sm text-gray-900">{farm.shade_percentage || 0}%</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sistema de Riego</label>
                  <p className="text-sm text-gray-900">{farm.irrigation_system || 'No especificado'}</p>
                </div>
              </div>
            </div>

            {/* Location Information */}
            <div className="bg-gray-50 rounded-lg shadow p-6 mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Ubicación (Aproximada por Seguridad)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Latitud (Centro de Provincia)</label>
                  <p className="text-sm text-gray-900">{farm.latitude?.toFixed(6) || 'No disponible'}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Longitud (Centro de Provincia)</label>
                  <p className="text-sm text-gray-900">{farm.longitude?.toFixed(6) || 'No disponible'}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                Por motivos de seguridad, se utilizan las coordenadas del centro de la provincia en lugar de la ubicación exacta de la finca.
              </p>
            </div>

            {/* System Information */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Información del Sistema</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Creación</label>
                  <p className="text-sm text-gray-900">{formatDate(farm.created_at)}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Última Actualización</label>
                  <p className="text-sm text-gray-900">{formatDate(farm.updated_at)}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ID de Finca</label>
                  <p className="text-xs text-gray-500 font-mono">{farm.id}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ID de Agricultor</label>
                  <p className="text-xs text-gray-500 font-mono">{farm.farmer_id}</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}