'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import CMSSidebar from '@/components/cms/CMSSidebar'
import CMSHeader from '@/components/cms/CMSHeader'

interface Farmer {
  id: string
  farmer_code: string
  full_name: string
  province_name: string
}

interface Province {
  id: number
  name: string
  code: string
}

interface User {
  id: string
  username: string
  role: string
}

interface FarmFormData {
  farmer_id: string
  name: string
  total_area_hectares: number
  coffee_area_hectares: number
  altitude_min: number
  altitude_max: number
  latitude: number
  longitude: number
  soil_type: string
  shade_percentage: number
  irrigation_system: string
  processing_method: string
  municipality: string
}

const PROVINCE_COORDINATES = {
  'LOJA': { lat: -4.0079, lng: -79.2113 },
  'ELORO': { lat: -3.5889, lng: -79.9606 },
  'PICHINCHA': { lat: -0.1807, lng: -78.4678 }
}

export default function EditFarmPage() {
  const [formData, setFormData] = useState<FarmFormData>({
    farmer_id: '',
    name: '',
    total_area_hectares: 0,
    coffee_area_hectares: 0,
    altitude_min: 0,
    altitude_max: 0,
    latitude: 0,
    longitude: 0,
    soil_type: '',
    shade_percentage: 0,
    irrigation_system: '',
    processing_method: 'washed',
    municipality: ''
  })

  const [farmers, setFarmers] = useState<Farmer[]>([])
  const [provinces, setProvinces] = useState<Province[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [errors, setErrors] = useState<any>({})
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
      loadInitialData()
    } catch {
      router.push('/crmalohja')
    }
  }, [router])

  const loadInitialData = async () => {
    try {
      setIsLoading(true)

      const [farmResponse, farmersResponse, provincesResponse] = await Promise.all([
        fetch(`/api/farms/${farmId}`),
        fetch('/api/farmers'),
        fetch('/api/provinces')
      ])

      const farmData = await farmResponse.json()
      const farmersData = await farmersResponse.json()
      const provincesData = await provincesResponse.json()

      if (farmData.success) {
        const farm = farmData.farm
        setFormData({
          farmer_id: farm.farmer_id,
          name: farm.name,
          total_area_hectares: parseFloat(farm.total_area_hectares || '0'),
          coffee_area_hectares: parseFloat(farm.coffee_area_hectares || '0'),
          altitude_min: farm.altitude_min || 0,
          altitude_max: farm.altitude_max || 0,
          latitude: farm.latitude || 0,
          longitude: farm.longitude || 0,
          soil_type: farm.soil_type || '',
          shade_percentage: farm.shade_percentage || 0,
          irrigation_system: farm.irrigation_system || '',
          processing_method: farm.processing_method || 'washed',
          municipality: farm.municipality || ''
        })
      }

      if (farmersData.success) {
        setFarmers(farmersData.farmers)
      }

      if (provincesData.success) {
        setProvinces(provincesData.provinces)
      }
    } catch (error) {
      console.error('Error loading initial data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateFormData = (field: keyof FarmFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))

    if (field === 'farmer_id' && value) {
      const selectedFarmer = farmers.find(f => f.id === value)
      if (selectedFarmer) {
        const province = provinces.find(p => p.name === selectedFarmer.province_name)
        if (province && PROVINCE_COORDINATES[province.code as keyof typeof PROVINCE_COORDINATES]) {
          const coords = PROVINCE_COORDINATES[province.code as keyof typeof PROVINCE_COORDINATES]
          setFormData(prev => ({
            ...prev,
            latitude: coords.lat,
            longitude: coords.lng
          }))
        }
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setErrors({})

    try {
      const response = await fetch(`/api/farms/${farmId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        router.push(`/crmalohja/farms/${farmId}`)
      } else {
        setErrors(data.errors || { general: 'Error al actualizar la finca' })
      }
    } catch (error) {
      console.error('Error updating farm:', error)
      setErrors({ general: 'Error de conexión' })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex">
        <CMSSidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando...</p>
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
                  onClick={() => router.push(`/crmalohja/farms/${farmId}`)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Editar Finca</h1>
                  <p className="text-gray-600 mt-1">Modificar información de la finca</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.general && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  {errors.general}
                </div>
              )}

              {/* Basic Information */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Información Básica</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Agricultor *
                    </label>
                    <select
                      value={formData.farmer_id}
                      onChange={(e) => updateFormData('farmer_id', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    >
                      <option value="">Seleccionar agricultor...</option>
                      {farmers.map((farmer) => (
                        <option key={farmer.id} value={farmer.id}>
                          {farmer.full_name} ({farmer.farmer_code}) - {farmer.province_name}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                      Las coordenadas se actualizarán automáticamente basadas en la provincia del agricultor
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre de la Finca *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => updateFormData('name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                      placeholder="Ej: Gran Chaparral"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Municipio
                    </label>
                    <input
                      type="text"
                      value={formData.municipality}
                      onChange={(e) => updateFormData('municipality', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Ej: Portovelo"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Método de Procesamiento
                    </label>
                    <select
                      value={formData.processing_method}
                      onChange={(e) => updateFormData('processing_method', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="washed">Lavado</option>
                      <option value="natural">Natural</option>
                      <option value="honey">Honey</option>
                      <option value="mixed">Mixto</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Area Information */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Información de Área</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Área Total (hectáreas)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.total_area_hectares}
                      onChange={(e) => updateFormData('total_area_hectares', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Área de Café (hectáreas)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.coffee_area_hectares}
                      onChange={(e) => updateFormData('coffee_area_hectares', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Altitud Mínima (metros)
                    </label>
                    <input
                      type="number"
                      value={formData.altitude_min}
                      onChange={(e) => updateFormData('altitude_min', parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Altitud Máxima (metros)
                    </label>
                    <input
                      type="number"
                      value={formData.altitude_max}
                      onChange={(e) => updateFormData('altitude_max', parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      min="0"
                    />
                  </div>
                </div>
              </div>

              {/* Agricultural Information */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Información Agrícola</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Suelo
                    </label>
                    <input
                      type="text"
                      value={formData.soil_type}
                      onChange={(e) => updateFormData('soil_type', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Ej: Franco arcilloso"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Porcentaje de Sombra (%)
                    </label>
                    <input
                      type="number"
                      value={formData.shade_percentage}
                      onChange={(e) => updateFormData('shade_percentage', parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      min="0"
                      max="100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sistema de Riego
                    </label>
                    <input
                      type="text"
                      value={formData.irrigation_system}
                      onChange={(e) => updateFormData('irrigation_system', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Ej: Goteo, Aspersión, Natural"
                    />
                  </div>
                </div>
              </div>

              {/* Location Information (Read-only for security) */}
              <div className="bg-gray-50 rounded-lg shadow p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Ubicación (Aproximada por Seguridad)</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Latitud (Centro de Provincia)
                    </label>
                    <input
                      type="number"
                      step="0.000001"
                      value={formData.latitude}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Longitud (Centro de Provincia)
                    </label>
                    <input
                      type="number"
                      step="0.000001"
                      value={formData.longitude}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Por motivos de seguridad, se utilizan las coordenadas del centro de la provincia en lugar de la ubicación exacta de la finca.
                </p>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => router.push(`/crmalohja/farms/${farmId}`)}
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  disabled={isSaving}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md disabled:bg-green-400"
                >
                  {isSaving ? 'Actualizando...' : 'Actualizar Finca'}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}