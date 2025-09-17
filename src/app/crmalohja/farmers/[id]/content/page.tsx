'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import CMSSidebar from '@/components/cms/CMSSidebar'
import CMSHeader from '@/components/cms/CMSHeader'

interface FarmerContent {
  id: string
  farmer_id: string
  media_type: string
  media_category: string
  title: string
  description: string
  media_url: string
  thumbnail_url: string
  duration: number
  display_order: number
  is_featured: boolean
  is_public: boolean
  created_at: string
  updated_at: string
  farmer_name: string
  farmer_code: string
}

interface User {
  id: string
  username: string
  role: string
}

const MEDIA_CATEGORIES = {
  'interview': 'Entrevista',
  'farm_tour': 'Tour de Finca',
  'harvest': 'Cosecha',
  'process': 'Procesamiento',
  'profile': 'Perfil',
  'story': 'Historia',
  'technique': 'Técnica'
}

const extractYouTubeId = (url: string): string | null => {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
  const match = url.match(regex)
  return match ? match[1] : null
}

export default function FarmerContentPage() {
  const [content, setContent] = useState<FarmerContent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const [farmer, setFarmer] = useState<any>(null)
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
  }, [router])

  const loadData = async () => {
    try {
      setIsLoading(true)

      const [contentResponse, farmerResponse] = await Promise.all([
        fetch(`/api/farmers/${farmerId}/content`),
        fetch(`/api/farmers/${farmerId}`)
      ])

      const contentData = await contentResponse.json()
      const farmerData = await farmerResponse.json()

      if (contentData.success) {
        setContent(contentData.content)
      }

      if (farmerData.success) {
        setFarmer(farmerData.farmer)
      }
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteContent = async (contentId: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este contenido?')) {
      return
    }

    try {
      const response = await fetch(`/api/farmers/${farmerId}/content/${contentId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        loadData()
      }
    } catch (error) {
      console.error('Error deleting content:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex">
        <CMSSidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando contenido...</p>
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
                  <h1 className="text-3xl font-bold text-gray-900">
                    Contenido de {farmer?.full_name || 'Agricultor'}
                  </h1>
                  <p className="text-gray-600 mt-1">Gestión de videos, entrevistas y contenido multimedia</p>
                </div>
              </div>

              <button
                onClick={() => router.push(`/crmalohja/farmers/${farmerId}/content/new`)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
              >
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Nuevo Contenido
                </div>
              </button>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <div className="text-gray-500">
                    <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <h3 className="text-lg font-medium mb-2">No hay contenido</h3>
                    <p className="mb-4">Aún no se ha agregado contenido para este agricultor</p>
                    <button
                      onClick={() => router.push(`/crmalohja/farmers/${farmerId}/content/new`)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                      Agregar Contenido
                    </button>
                  </div>
                </div>
              ) : (
                content.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden">
                    {/* Video Thumbnail */}
                    {item.media_type === 'video' && item.media_url.includes('youtube') && (
                      <div className="aspect-video bg-gray-200 relative">
                        {extractYouTubeId(item.media_url) ? (
                          <img
                            src={`https://img.youtube.com/vi/${extractYouTubeId(item.media_url)}/maxresdefault.jpg`}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                        )}

                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-red-600 rounded-full p-3 shadow-lg">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </div>
                        </div>

                        {/* Featured Badge */}
                        {item.is_featured && (
                          <div className="absolute top-2 left-2">
                            <span className="bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                              Destacado
                            </span>
                          </div>
                        )}

                        {/* Category Badge */}
                        <div className="absolute top-2 right-2">
                          <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs">
                            {MEDIA_CATEGORIES[item.media_category as keyof typeof MEDIA_CATEGORIES] || item.media_category}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Content Info */}
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                          {item.title}
                        </h3>
                      </div>

                      {item.description && (
                        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                          {item.description}
                        </p>
                      )}

                      {/* Duration */}
                      {item.duration && (
                        <div className="text-xs text-gray-500 mb-3">
                          Duración: {Math.floor(item.duration / 60)}:{(item.duration % 60).toString().padStart(2, '0')} min
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex justify-between items-center">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => window.open(item.media_url, '_blank')}
                            className="text-blue-600 hover:text-blue-900 text-sm"
                          >
                            Ver
                          </button>
                          <button
                            onClick={() => router.push(`/crmalohja/farmers/${farmerId}/content/${item.id}/edit`)}
                            className="text-green-600 hover:text-green-900 text-sm"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => deleteContent(item.id)}
                            className="text-red-600 hover:text-red-900 text-sm"
                          >
                            Eliminar
                          </button>
                        </div>

                        <div className="text-xs text-gray-500">
                          {new Date(item.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Stats */}
            {content.length > 0 && (
              <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="text-2xl font-bold text-gray-900">{content.length}</div>
                  <div className="text-sm text-gray-500">Total Contenido</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="text-2xl font-bold text-blue-600">
                    {content.filter(c => c.media_type === 'video').length}
                  </div>
                  <div className="text-sm text-gray-500">Videos</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="text-2xl font-bold text-yellow-600">
                    {content.filter(c => c.is_featured).length}
                  </div>
                  <div className="text-sm text-gray-500">Destacados</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="text-2xl font-bold text-green-600">
                    {content.filter(c => c.is_public).length}
                  </div>
                  <div className="text-sm text-gray-500">Públicos</div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}