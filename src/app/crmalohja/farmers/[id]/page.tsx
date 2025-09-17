'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Image from 'next/image'
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
  province_id: number
  province_name: string
  province_code: string
  municipality: string
  address: string
  profile_image_url: string
  biography: string
  years_experience: number
  farming_philosophy: string
  certifications: string[]
  social_media: any
  is_active: boolean
  created_at: string
  updated_at: string
  media_count: number
}

interface User {
  id: string
  username: string
  role: string
}

export default function FarmerProfilePage() {
  const [farmer, setFarmer] = useState<Farmer | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
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
      loadFarmer()
    } catch {
      router.push('/crmalohja')
    }
  }, [router, farmerId])

  const loadFarmer = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/farmers/${farmerId}`)
      const data = await response.json()

      if (data.success) {
        setFarmer(data.farmer)
      } else {
        router.push('/crmalohja/farmers')
      }
    } catch (error) {
      console.error('Error loading farmer:', error)
      router.push('/crmalohja/farmers')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex">
        <CMSSidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando perfil...</p>
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
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8 flex justify-between items-start">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => router.push('/crmalohja/farmers')}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{farmer.full_name}</h1>
                  <p className="text-gray-600 mt-1">Código: {farmer.farmer_code}</p>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => router.push(`/crmalohja/farmers/${farmer.id}/content`)}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                >
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Contenido
                  </div>
                </button>
                <button
                  onClick={() => router.push(`/crmalohja/farmers/${farmer.id}/edit`)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                >
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Editar
                  </div>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Card */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="text-center mb-6">
                    <div className="w-32 h-32 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                      {farmer.profile_image_url ? (
                        <Image
                          src={farmer.profile_image_url}
                          alt={farmer.full_name}
                          width={128}
                          height={128}
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-4xl text-gray-400">👨‍🌾</span>
                      )}
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">{farmer.full_name}</h2>
                    <p className="text-gray-600">{farmer.province_name}</p>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2 ${
                        farmer.is_active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {farmer.is_active ? 'Activo' : 'Inactivo'}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Código:</span>
                      <span className="text-gray-900">{farmer.farmer_code}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Experiencia:</span>
                      <span className="text-gray-900">{farmer.years_experience} años</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Provincia:</span>
                      <span className="text-gray-900">{farmer.province_name}</span>
                    </div>
                    {farmer.email && (
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Email:</span>
                        <span className="text-gray-900">{farmer.email}</span>
                      </div>
                    )}
                    {farmer.phone && (
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Teléfono:</span>
                        <span className="text-gray-900">{farmer.phone}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Medios:</span>
                      <span className="text-gray-900">{farmer.media_count} archivos</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="lg:col-span-2 space-y-6">
                {/* Biography */}
                {farmer.biography && (
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Biografía</h3>
                    <p className="text-gray-700 leading-relaxed">{farmer.biography}</p>
                  </div>
                )}

                {/* Farming Philosophy */}
                {farmer.farming_philosophy && (
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Filosofía de Cultivo</h3>
                    <p className="text-gray-700 leading-relaxed">{farmer.farming_philosophy}</p>
                  </div>
                )}

                {/* Certifications */}
                {farmer.certifications && farmer.certifications.length > 0 && (
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Certificaciones</h3>
                    <div className="flex flex-wrap gap-2">
                      {farmer.certifications.map((cert, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Address */}
                {farmer.address && (
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Ubicación</h3>
                    <div className="space-y-2">
                      <p className="text-gray-700">{farmer.address}</p>
                      {farmer.municipality && (
                        <p className="text-gray-600">{farmer.municipality}, {farmer.province_name}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Timestamps */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Información del Sistema</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Creado:</span>
                      <p className="text-gray-600">{new Date(farmer.created_at).toLocaleString('es-ES')}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Actualizado:</span>
                      <p className="text-gray-600">{new Date(farmer.updated_at).toLocaleString('es-ES')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}