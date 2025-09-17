'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import CMSSidebar from '@/components/cms/CMSSidebar'
import CMSHeader from '@/components/cms/CMSHeader'

interface Province {
  id: number
  name: string
  code: string
}

interface Farmer {
  id: string
  farmer_code: string
  first_name: string
  last_name: string
  email: string
  phone: string
  province_id: number
  municipality: string
  address: string
  profile_image_url: string
  biography: string
  years_experience: number
  farming_philosophy: string
  certifications: string[]
  is_active: boolean
}

interface User {
  id: string
  username: string
  role: string
}

export default function EditFarmerPage() {
  const [farmer, setFarmer] = useState<Farmer | null>(null)
  const [provinces, setProvinces] = useState<Province[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [errors, setErrors] = useState<any>({})
  const router = useRouter()
  const params = useParams()
  const farmerId = params.id as string

  useEffect(() => {
    const token = localStorage.getItem('cms_token')
    if (!token) {
      router.push('/crmalohja')
      return
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      setUser(payload)
      loadData()
    } catch {
      router.push('/crmalohja')
    }
  }, [router, farmerId])

  const loadData = async () => {
    try {
      setIsLoading(true)

      // Load farmer and provinces in parallel
      const [farmerResponse, provincesResponse] = await Promise.all([
        fetch(`/api/farmers/${farmerId}`),
        fetch('/api/provinces')
      ])

      const farmerData = await farmerResponse.json()
      const provincesData = await provincesResponse.json()

      if (farmerData.success) {
        setFarmer(farmerData.farmer)
      } else {
        router.push('/crmalohja/farmers')
      }

      if (provincesData.success) {
        setProvinces(provincesData.provinces)
      }
    } catch (error) {
      console.error('Error loading data:', error)
      router.push('/crmalohja/farmers')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!farmer) return

    setIsSaving(true)
    setErrors({})

    try {
      const response = await fetch(`/api/farmers/${farmerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(farmer),
      })

      const data = await response.json()

      if (data.success) {
        router.push(`/crmalohja/farmers/${farmerId}`)
      } else {
        setErrors(data.errors || { general: 'Error al actualizar el agricultor' })
      }
    } catch (error) {
      console.error('Error updating farmer:', error)
      setErrors({ general: 'Error de conexión' })
    } finally {
      setIsSaving(false)
    }
  }

  const updateFarmer = (field: keyof Farmer, value: any) => {
    if (!farmer) return
    setFarmer({ ...farmer, [field]: value })
  }

  const addCertification = () => {
    if (!farmer) return
    const certs = farmer.certifications || []
    setFarmer({ ...farmer, certifications: [...certs, ''] })
  }

  const updateCertification = (index: number, value: string) => {
    if (!farmer) return
    const certs = [...(farmer.certifications || [])]
    certs[index] = value
    setFarmer({ ...farmer, certifications: certs })
  }

  const removeCertification = (index: number) => {
    if (!farmer) return
    const certs = farmer.certifications || []
    setFarmer({ ...farmer, certifications: certs.filter((_, i) => i !== index) })
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

  if (!farmer) {
    return (
      <div className="min-h-screen bg-gray-100 flex">
        <CMSSidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600">Agricultor no encontrado</p>
            <button
              onClick={() => router.push('/crmalohja/farmers')}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
            >
              Volver a la lista
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
                  onClick={() => router.push(`/crmalohja/farmers/${farmerId}`)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Editar Agricultor</h1>
                  <p className="text-gray-600 mt-1">{farmer.first_name} {farmer.last_name}</p>
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
                      Código de Agricultor *
                    </label>
                    <input
                      type="text"
                      value={farmer.farmer_code}
                      onChange={(e) => updateFarmer('farmer_code', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Estado
                    </label>
                    <select
                      value={farmer.is_active ? 'true' : 'false'}
                      onChange={(e) => updateFarmer('is_active', e.target.value === 'true')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="true">Activo</option>
                      <option value="false">Inactivo</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      value={farmer.first_name}
                      onChange={(e) => updateFarmer('first_name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Apellido *
                    </label>
                    <input
                      type="text"
                      value={farmer.last_name}
                      onChange={(e) => updateFarmer('last_name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={farmer.email || ''}
                      onChange={(e) => updateFarmer('email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      value={farmer.phone || ''}
                      onChange={(e) => updateFarmer('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Años de Experiencia
                    </label>
                    <input
                      type="number"
                      value={farmer.years_experience || ''}
                      onChange={(e) => updateFarmer('years_experience', parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Provincia
                    </label>
                    <select
                      value={farmer.province_id || ''}
                      onChange={(e) => updateFarmer('province_id', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">Seleccionar provincia...</option>
                      {provinces.map((province) => (
                        <option key={province.id} value={province.id}>
                          {province.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Municipio
                  </label>
                  <input
                    type="text"
                    value={farmer.municipality || ''}
                    onChange={(e) => updateFarmer('municipality', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dirección
                  </label>
                  <textarea
                    value={farmer.address || ''}
                    onChange={(e) => updateFarmer('address', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* Profile Information */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Información del Perfil</h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      URL de Imagen de Perfil
                    </label>
                    <input
                      type="url"
                      value={farmer.profile_image_url || ''}
                      onChange={(e) => updateFarmer('profile_image_url', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="https://..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Biografía
                    </label>
                    <textarea
                      value={farmer.biography || ''}
                      onChange={(e) => updateFarmer('biography', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Información sobre el agricultor..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Filosofía de Cultivo
                    </label>
                    <textarea
                      value={farmer.farming_philosophy || ''}
                      onChange={(e) => updateFarmer('farming_philosophy', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Filosofía y métodos de cultivo..."
                    />
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold text-gray-900">Certificaciones</h2>
                  <button
                    type="button"
                    onClick={addCertification}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                  >
                    Agregar
                  </button>
                </div>

                <div className="space-y-3">
                  {(farmer.certifications || []).map((cert, index) => (
                    <div key={index} className="flex gap-3">
                      <input
                        type="text"
                        value={cert}
                        onChange={(e) => updateCertification(index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Nombre de la certificación"
                      />
                      <button
                        type="button"
                        onClick={() => removeCertification(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                  {(!farmer.certifications || farmer.certifications.length === 0) && (
                    <p className="text-gray-500 text-sm">No hay certificaciones registradas</p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => router.push(`/crmalohja/farmers/${farmerId}`)}
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
                  {isSaving ? 'Guardando...' : 'Guardar Cambios'}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}