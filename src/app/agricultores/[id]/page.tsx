'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { useCache } from '@/hooks/useCache'

interface FarmerDetail {
  id: string
  farmer_code: string
  first_name: string
  last_name: string
  full_name: string
  email?: string
  phone?: string
  profile_image_url?: string
  cover_image_url?: string
  biography?: string
  years_experience: number
  farming_philosophy?: string
  certifications?: string[]
  social_media?: any
  province_name: string
  province_code: string
  province_map?: string
  altitude_range?: string
  media_count: number
  batches_count: number
  media_content: FarmerContent[]
}

interface FarmerContent {
  id: string
  media_type: string
  media_category: string
  title: string
  description: string
  media_url: string
  thumbnail_url?: string
  duration: number
  is_featured: boolean
  display_order: number
  created_at: string
}

interface Batch {
  batch_id: string
  harvest_date: string
  processing_method: string
  status: string
  green_weight_kg: string
  farm_name: string
  variety_name: string
}

export default function FarmerProfilePage() {
  const [language, setLanguage] = useState<'es' | 'en'>('es')
  const [batches, setBatches] = useState<Batch[]>([])
  const [activeTab, setActiveTab] = useState<'overview' | 'content' | 'batches'>('overview')
  const router = useRouter()
  const params = useParams()
  const farmerId = params.id as string

  // Use cache for farmer data
  const {
    data: farmer,
    loading: isLoading,
    error: farmerError
  } = useCache(`farmer-${farmerId}`, async () => {
    const response = await fetch(`/api/public/farmers/${farmerId}`)
    const data = await response.json()
    if (!data.success) throw new Error(data.error)
    return data.farmer as FarmerDetail
  }, 5) // Cache for 5 minutes

  // Load batches when farmer data is available
  useEffect(() => {
    if (farmer && farmer.batches_count > 0) {
      loadBatches(farmer.farmer_code)
    }
  }, [farmer])

  // Redirect to farmers page if there's an error
  useEffect(() => {
    if (farmerError) {
      console.error('Error loading farmer profile:', farmerError)
      router.push('/agricultores')
    }
  }, [farmerError, router])

  const loadBatches = async (farmerCode: string) => {
    try {
      const batchesResponse = await fetch('/api/public/batches')
      const batchesData = await batchesResponse.json()

      if (batchesData.success) {
        const farmerBatches = batchesData.batches.filter(
          (batch: any) => batch.farmer_code === farmerCode
        )
        setBatches(farmerBatches)
      }
    } catch (error) {
      console.error('Error loading batches:', error)
    }
  }

  const getYouTubeId = (url: string): string | null => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    const match = url.match(regex)
    return match ? match[1] : null
  }

  const getCategoryLabel = (category: string) => {
    const categories = {
      'interview': language === 'es' ? 'Entrevista' : 'Interview',
      'farm_tour': language === 'es' ? 'Tour de Finca' : 'Farm Tour',
      'harvest': language === 'es' ? 'Cosecha' : 'Harvest',
      'process': language === 'es' ? 'Procesamiento' : 'Processing',
      'profile': language === 'es' ? 'Perfil' : 'Profile',
      'story': language === 'es' ? 'Historia' : 'Story',
      'technique': language === 'es' ? 'Técnica' : 'Technique'
    }
    return categories[category as keyof typeof categories] || category
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation language={language} setLanguage={setLanguage} />
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">
              {language === 'es' ? 'Cargando perfil...' : 'Loading profile...'}
            </p>
          </div>
        </div>
        <Footer language={language} />
      </div>
    )
  }

  if (!farmer) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation language={language} setLanguage={setLanguage} />
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {language === 'es' ? 'Agricultor no encontrado' : 'Farmer not found'}
            </h1>
            <button
              onClick={() => router.push('/agricultores')}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
            >
              {language === 'es' ? 'Volver a Agricultores' : 'Back to Farmers'}
            </button>
          </div>
        </div>
        <Footer language={language} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation language={language} setLanguage={setLanguage} />

      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        {farmer.cover_image_url ? (
          <img
            src={farmer.cover_image_url}
            alt={farmer.full_name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url('/assets/fotosinicio/foto paisaje.jpg')`,
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

        {/* Profile Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto flex items-end gap-6">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl bg-white">
              {farmer.profile_image_url ? (
                <img
                  src={farmer.profile_image_url}
                  alt={farmer.full_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-green-600 to-amber-600 flex items-center justify-center text-white text-3xl font-bold">
                  {farmer.first_name[0]}{farmer.last_name[0]}
                </div>
              )}
            </div>

            <div className="text-white flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold">{farmer.full_name}</h1>
                <span className="bg-amber-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                  {farmer.farmer_code}
                </span>
              </div>
              <div className="flex items-center gap-6 text-lg">
                <span className="flex items-center gap-2">
                  📍 {farmer.province_name}
                </span>
                <span className="flex items-center gap-2">
                  ⏱️ {farmer.years_experience} {language === 'es' ? 'años de experiencia' : 'years of experience'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={() => router.push('/agricultores')}
          className="absolute top-8 left-8 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-16 bg-white border-b border-gray-200 z-40">
        <div className="max-w-7xl mx-auto px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {language === 'es' ? 'Perfil' : 'Overview'}
            </button>
            <button
              onClick={() => setActiveTab('content')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'content'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {language === 'es' ? `Videos (${farmer.media_content.length})` : `Videos (${farmer.media_content.length})`}
            </button>
            <button
              onClick={() => setActiveTab('batches')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'batches'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {language === 'es' ? `Lotes (${batches.length})` : `Batches (${batches.length})`}
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-8">
              {farmer.biography && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {language === 'es' ? 'Historia' : 'Story'}
                  </h2>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {farmer.biography}
                  </p>
                </div>
              )}

              {farmer.farming_philosophy && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {language === 'es' ? 'Filosofía de Cultivo' : 'Farming Philosophy'}
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {farmer.farming_philosophy}
                  </p>
                </div>
              )}

              {farmer.certifications && farmer.certifications.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {language === 'es' ? 'Certificaciones' : 'Certifications'}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {farmer.certifications.map((cert, index) => (
                      <span
                        key={index}
                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Info */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  {language === 'es' ? 'Información' : 'Information'}
                </h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      {language === 'es' ? 'Código' : 'Code'}
                    </span>
                    <p className="font-mono text-lg">{farmer.farmer_code}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      {language === 'es' ? 'Provincia' : 'Province'}
                    </span>
                    <p>{farmer.province_name}</p>
                  </div>
                  {farmer.altitude_range && (
                    <div>
                      <span className="text-sm font-medium text-gray-500">
                        {language === 'es' ? 'Altitud' : 'Altitude'}
                      </span>
                      <p>{farmer.altitude_range}</p>
                    </div>
                  )}
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      {language === 'es' ? 'Experiencia' : 'Experience'}
                    </span>
                    <p>{farmer.years_experience} {language === 'es' ? 'años' : 'years'}</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  {language === 'es' ? 'Estadísticas' : 'Statistics'}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{farmer.batches_count}</div>
                    <div className="text-xs text-gray-500">
                      {language === 'es' ? 'Lotes' : 'Batches'}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{farmer.media_content.length}</div>
                    <div className="text-xs text-gray-500">
                      {language === 'es' ? 'Videos' : 'Videos'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {language === 'es' ? 'Videos y Contenido' : 'Videos and Content'}
              </h2>
              <p className="text-gray-600">
                {language === 'es'
                  ? 'Explora las historias y técnicas de cultivo de este agricultor.'
                  : 'Explore the stories and cultivation techniques of this farmer.'
                }
              </p>
            </div>

            {farmer.media_content.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📹</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {language === 'es' ? 'No hay contenido disponible' : 'No content available'}
                </h3>
                <p className="text-gray-600">
                  {language === 'es'
                    ? 'Este agricultor aún no tiene videos o entrevistas publicadas.'
                    : 'This farmer does not have any published videos or interviews yet.'
                  }
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {farmer.media_content.map((content) => (
                  <div key={content.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
                    <div className="aspect-video bg-gray-900 relative overflow-hidden">
                      {getYouTubeId(content.media_url) ? (
                        <img
                          src={`https://img.youtube.com/vi/${getYouTubeId(content.media_url)}/maxresdefault.jpg`}
                          alt={content.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-green-600 to-amber-600 flex items-center justify-center">
                          <div className="text-white text-center">
                            <div className="text-4xl mb-2">🎥</div>
                            <p className="text-sm font-medium">{getCategoryLabel(content.media_category)}</p>
                          </div>
                        </div>
                      )}

                      {/* Play button overlay */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                        <div className="bg-red-600 rounded-full p-3 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>

                      {/* Category badge */}
                      <div className="absolute top-3 left-3">
                        <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                          {getCategoryLabel(content.media_category)}
                        </span>
                      </div>

                      {content.is_featured && (
                        <div className="absolute top-3 right-3">
                          <span className="bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                            ⭐ {language === 'es' ? 'Destacado' : 'Featured'}
                          </span>
                        </div>
                      )}

                      {/* Duration */}
                      <div className="absolute bottom-3 right-3">
                        <span className="bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                          {formatDuration(content.duration)}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-3">
                        {content.title}
                      </h3>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {content.description}
                      </p>

                      <button
                        onClick={() => router.push(`/agricultores/${farmerId}/videos/${content.id}`)}
                        className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        {language === 'es' ? 'Ver Contenido' : 'View Content'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'batches' && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {language === 'es' ? 'Lotes de Café' : 'Coffee Batches'}
              </h2>
              <p className="text-gray-600">
                {language === 'es'
                  ? 'Descubre los lotes de café actualmente disponibles de este agricultor.'
                  : 'Discover the coffee batches currently available from this farmer.'
                }
              </p>
            </div>

            {batches.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📦</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {language === 'es' ? 'No hay lotes disponibles' : 'No batches available'}
                </h3>
                <p className="text-gray-600">
                  {language === 'es'
                    ? 'Este agricultor no tiene lotes activos en este momento.'
                    : 'This farmer does not have any active batches at the moment.'
                  }
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {batches.map((batch) => (
                  <div key={batch.batch_id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-900">{batch.batch_id}</h3>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                        {batch.status}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">{language === 'es' ? 'Finca:' : 'Farm:'}</span>
                        <span className="font-medium">{batch.farm_name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">{language === 'es' ? 'Variedad:' : 'Variety:'}</span>
                        <span className="font-medium">{batch.variety_name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">{language === 'es' ? 'Proceso:' : 'Process:'}</span>
                        <span className="font-medium">{batch.processing_method}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">{language === 'es' ? 'Peso:' : 'Weight:'}</span>
                        <span className="font-medium">{batch.green_weight_kg} kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">{language === 'es' ? 'Cosecha:' : 'Harvest:'}</span>
                        <span className="font-medium">{new Date(batch.harvest_date).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => router.push(`/lotes?batch=${batch.batch_id}`)}
                      className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      {language === 'es' ? 'Ver Detalles' : 'View Details'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <Footer language={language} />
    </div>
  )
}