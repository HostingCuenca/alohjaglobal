'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import CMSSidebar from '@/components/cms/CMSSidebar'
import CMSHeader from '@/components/cms/CMSHeader'

interface Farmer {
  id: string
  farmer_code: string
  full_name: string
  province_name: string
}

interface Farm {
  id: string
  name: string
  farmer_id: string
}

interface Variety {
  id: number
  name: string
}

interface User {
  id: string
  username: string
  role: string
}

interface BatchFormData {
  batch_id: string
  farmer_id: string
  farm_id: string
  variety_id: number
  harvest_date: string
  harvest_season: string
  harvest_method: string
  harvest_notes: string
  processing_method: string
  drying_method: string
  fermentation_time: number
  drying_time: number
  transport_mode: string
  warehouse_location: string
  green_weight_kg: number
  moisture_content: number
  screen_size: string
  defect_count: number
  cupping_score: number
  cupping_notes: string
  status: string
}

export default function NewBatchPage() {
  const [formData, setFormData] = useState<BatchFormData>({
    batch_id: '',
    farmer_id: '',
    farm_id: '',
    variety_id: 0,
    harvest_date: '',
    harvest_season: 'main',
    harvest_method: 'selective',
    harvest_notes: '',
    processing_method: 'washed',
    drying_method: 'sun',
    fermentation_time: 0,
    drying_time: 0,
    transport_mode: 'via_terrestre',
    warehouse_location: '',
    green_weight_kg: 0,
    moisture_content: 0,
    screen_size: '',
    defect_count: 0,
    cupping_score: 0,
    cupping_notes: '',
    status: 'active'
  })

  const [farmers, setFarmers] = useState<Farmer[]>([])
  const [farms, setFarms] = useState<Farm[]>([])
  const [varieties, setVarieties] = useState<Variety[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [errors, setErrors] = useState<any>({})
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
      loadInitialData()
    } catch {
      router.push('/crmalohja')
    }
  }, [router])

  const loadInitialData = async () => {
    try {
      setIsLoading(true)

      // Load farmers, farms, and varieties in parallel
      const [farmersResponse, varietiesResponse] = await Promise.all([
        fetch('/api/farmers'),
        fetch('/api/varieties')
      ])

      const farmersData = await farmersResponse.json()
      const varietiesData = await varietiesResponse.json()

      if (farmersData.success) {
        setFarmers(farmersData.farmers)
      }

      if (varietiesData.success) {
        setVarieties(varietiesData.varieties)
      }
    } catch (error) {
      console.error('Error loading initial data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const loadFarms = async (farmerId: string) => {
    try {
      const response = await fetch(`/api/farms?farmer_id=${farmerId}`)
      const data = await response.json()

      if (data.success) {
        setFarms(data.farms)
      }
    } catch (error) {
      console.error('Error loading farms:', error)
    }
  }

  const generateBatchId = (farmerCode: string) => {
    const timestamp = Date.now().toString().slice(-6)
    return `${farmerCode}${timestamp}`
  }

  const updateFormData = (field: keyof BatchFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))

    // Auto-generate batch_id when farmer changes
    if (field === 'farmer_id' && value) {
      const selectedFarmer = farmers.find(f => f.id === value)
      if (selectedFarmer) {
        const newBatchId = generateBatchId(selectedFarmer.farmer_code)
        setFormData(prev => ({ ...prev, batch_id: newBatchId }))
        loadFarms(value)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setErrors({})

    try {
      const response = await fetch('/api/batches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        router.push('/crmalohja/batches')
      } else {
        setErrors(data.errors || { general: 'Error al crear el lote' })
      }
    } catch (error) {
      console.error('Error creating batch:', error)
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
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
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
                  onClick={() => router.push('/crmalohja/batches')}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Nuevo Lote</h1>
                  <p className="text-gray-600 mt-1">Crear un nuevo lote de café</p>
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    >
                      <option value="">Seleccionar agricultor...</option>
                      {farmers.map((farmer) => (
                        <option key={farmer.id} value={farmer.id}>
                          {farmer.full_name} ({farmer.farmer_code}) - {farmer.province_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Finca *
                    </label>
                    <select
                      value={formData.farm_id}
                      onChange={(e) => updateFormData('farm_id', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                      disabled={!formData.farmer_id}
                    >
                      <option value="">Seleccionar finca...</option>
                      {farms.map((farm) => (
                        <option key={farm.id} value={farm.id}>
                          {farm.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Código de Lote *
                    </label>
                    <input
                      type="text"
                      value={formData.batch_id}
                      onChange={(e) => updateFormData('batch_id', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                      placeholder="Ej: AR000147"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Variedad de Café *
                    </label>
                    <select
                      value={formData.variety_id}
                      onChange={(e) => updateFormData('variety_id', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    >
                      <option value={0}>Seleccionar variedad...</option>
                      {varieties.map((variety) => (
                        <option key={variety.id} value={variety.id}>
                          {variety.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Harvest Information */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Información de Cosecha</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fecha de Cosecha *
                    </label>
                    <input
                      type="date"
                      value={formData.harvest_date}
                      onChange={(e) => updateFormData('harvest_date', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Temporada
                    </label>
                    <select
                      value={formData.harvest_season}
                      onChange={(e) => updateFormData('harvest_season', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="main">Principal</option>
                      <option value="mitaca">Mitaca</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Método de Cosecha
                    </label>
                    <select
                      value={formData.harvest_method}
                      onChange={(e) => updateFormData('harvest_method', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="selective">Selectiva</option>
                      <option value="strip">En masa</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Peso Verde (kg)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.green_weight_kg}
                      onChange={(e) => updateFormData('green_weight_kg', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      min="0"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notas de Cosecha
                  </label>
                  <textarea
                    value={formData.harvest_notes}
                    onChange={(e) => updateFormData('harvest_notes', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Condiciones de cosecha, observaciones..."
                  />
                </div>
              </div>

              {/* Processing Information */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Procesamiento</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Método de Procesamiento *
                    </label>
                    <select
                      value={formData.processing_method}
                      onChange={(e) => updateFormData('processing_method', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    >
                      <option value="washed">Lavado</option>
                      <option value="natural">Natural</option>
                      <option value="honey">Honey</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Método de Secado *
                    </label>
                    <select
                      value={formData.drying_method}
                      onChange={(e) => updateFormData('drying_method', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    >
                      <option value="sun">Sol</option>
                      <option value="mechanical">Mecánico</option>
                      <option value="african_beds">Camas Africanas</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tiempo de Fermentación (horas)
                    </label>
                    <input
                      type="number"
                      value={formData.fermentation_time}
                      onChange={(e) => updateFormData('fermentation_time', parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tiempo de Secado (días)
                    </label>
                    <input
                      type="number"
                      value={formData.drying_time}
                      onChange={(e) => updateFormData('drying_time', parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Modo de Transporte *
                    </label>
                    <select
                      value={formData.transport_mode}
                      onChange={(e) => updateFormData('transport_mode', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    >
                      <option value="via_terrestre">Vía Terrestre</option>
                      <option value="via_aerea">Vía Aérea</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ubicación de Bodega
                    </label>
                    <input
                      type="text"
                      value={formData.warehouse_location}
                      onChange={(e) => updateFormData('warehouse_location', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Ej: Bodega Central, Quito"
                    />
                  </div>
                </div>
              </div>

              {/* Quality Information */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Control de Calidad</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contenido de Humedad (%)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.moisture_content}
                      onChange={(e) => updateFormData('moisture_content', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      min="0"
                      max="100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tamaño de Malla
                    </label>
                    <input
                      type="text"
                      value={formData.screen_size}
                      onChange={(e) => updateFormData('screen_size', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Ej: 16/17"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Conteo de Defectos
                    </label>
                    <input
                      type="number"
                      value={formData.defect_count}
                      onChange={(e) => updateFormData('defect_count', parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Puntaje de Catación (0-100)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.cupping_score}
                      onChange={(e) => updateFormData('cupping_score', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      min="0"
                      max="100"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notas de Catación
                  </label>
                  <textarea
                    value={formData.cupping_notes}
                    onChange={(e) => updateFormData('cupping_notes', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Acidez, cuerpo, sabor, aroma..."
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => router.push('/crmalohja/batches')}
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  disabled={isSaving}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-md disabled:bg-amber-400"
                >
                  {isSaving ? 'Creando...' : 'Crear Lote'}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}