'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { useCache } from '@/hooks/useCache'

interface ContentDetail {
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
  farmer_id: string
  farmer_name: string
  farmer_code: string
  farmer_image?: string
}

interface RelatedContent {
  id: string
  title: string
  media_category: string
  duration: number
  media_url: string
}

export default function VideoContentPage() {
  const [language, setLanguage] = useState<'es' | 'en'>('es')
  const [content, setContent] = useState<ContentDetail | null>(null)
  const [relatedContent, setRelatedContent] = useState<RelatedContent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const params = useParams()
  const farmerId = params.id as string
  const contentId = params.contentId as string

  useEffect(() => {
    if (farmerId && contentId) {
      loadContentDetails()
    }
  }, [farmerId, contentId])

  const loadContentDetails = async () => {
    try {
      setIsLoading(true)

      // Load specific content details
      const contentResponse = await fetch(`/api/public/farmers/${farmerId}/content`)
      const contentData = await contentResponse.json()

      if (contentData.success) {
        const targetContent = contentData.content.find((c: any) => c.id === contentId)
        if (targetContent) {
          setContent(targetContent)

          // Set related content (other videos from same farmer, excluding current)
          const related = contentData.content
            .filter((c: any) => c.id !== contentId)
            .slice(0, 3)
          setRelatedContent(related)
        } else {
          router.push(`/agricultores/${farmerId}`)
        }
      } else {
        router.push(`/agricultores/${farmerId}`)
      }
    } catch (error) {
      console.error('Error loading content:', error)
      router.push(`/agricultores/${farmerId}`)
    } finally {
      setIsLoading(false)
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation language={language} setLanguage={setLanguage} />

        {/* Breadcrumb Skeleton */}
        <div className="bg-gray-50 border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center space-x-2 text-sm animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-16"></div>
              <div className="h-4 bg-gray-200 rounded w-4"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-4 bg-gray-200 rounded w-4"></div>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="animate-pulse">
            <div className="aspect-video bg-gray-200 rounded-xl mb-8"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>

        <Footer language={language} />
      </div>
    )
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation language={language} setLanguage={setLanguage} />
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {language === 'es' ? 'Contenido no encontrado' : 'Content not found'}
            </h1>
            <button
              onClick={() => router.push(`/agricultores/${farmerId}`)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
            >
              {language === 'es' ? 'Volver al Perfil' : 'Back to Profile'}
            </button>
          </div>
        </div>
        <Footer language={language} />
      </div>
    )
  }

  const youtubeId = getYouTubeId(content.media_url)

  return (
    <div className="min-h-screen bg-white">
      <Navigation language={language} setLanguage={setLanguage} />

      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <button
              onClick={() => router.push('/')}
              className="hover:text-green-600 transition-colors"
            >
              {language === 'es' ? 'Inicio' : 'Home'}
            </button>
            <span>›</span>
            <button
              onClick={() => router.push('/agricultores')}
              className="hover:text-green-600 transition-colors"
            >
              {language === 'es' ? 'Agricultores' : 'Farmers'}
            </button>
            <span>›</span>
            <button
              onClick={() => router.push(`/agricultores/${farmerId}`)}
              className="hover:text-green-600 transition-colors"
            >
              {content.farmer_name}
            </button>
            <span>›</span>
            <span className="text-gray-900 font-medium">
              {getCategoryLabel(content.media_category)}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Video Player */}
            <div className="mb-6">
              {youtubeId ? (
                <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
                  <iframe
                    src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1&showinfo=0&iv_load_policy=3&cc_load_policy=0&fs=1&disablekb=0&controls=1&autohide=1&color=white&theme=light`}
                    title={content.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              ) : (
                <div className="aspect-video bg-gradient-to-br from-gray-400 to-gray-600 rounded-xl flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-6xl mb-4">🎥</div>
                    <p className="text-xl font-medium">
                      {language === 'es' ? 'Video no disponible' : 'Video not available'}
                    </p>
                    <button
                      onClick={() => window.open(content.media_url, '_blank')}
                      className="mt-4 bg-white text-gray-800 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                    >
                      {language === 'es' ? 'Ver enlace original' : 'View original link'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Video Info */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {content.title}
                  </h1>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      ⏱️ {formatDuration(content.duration)}
                    </span>
                    <span className="flex items-center gap-1">
                      📅 {formatDate(content.created_at)}
                    </span>
                    {content.is_featured && (
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-bold">
                        ⭐ {language === 'es' ? 'Destacado' : 'Featured'}
                      </span>
                    )}
                  </div>
                </div>
                <div className="ml-4">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    {getCategoryLabel(content.media_category)}
                  </span>
                </div>
              </div>

              {content.description && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {language === 'es' ? 'Descripción' : 'Description'}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {content.description}
                  </p>
                </div>
              )}
            </div>

            {/* Related Content */}
            {relatedContent.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {language === 'es' ? 'Más contenido de este agricultor' : 'More content from this farmer'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {relatedContent.map((related) => (
                    <button
                      key={related.id}
                      onClick={() => router.push(`/agricultores/${farmerId}/videos/${related.id}`)}
                      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow text-left group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center group-hover:bg-gray-300 transition-colors">
                          <span className="text-2xl">🎥</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 line-clamp-2 group-hover:text-green-600 transition-colors">
                            {related.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                            <span>{getCategoryLabel(related.media_category)}</span>
                            <span>•</span>
                            <span>{formatDuration(related.duration)}</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Farmer Info */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 sticky top-8">
              <div className="flex items-center gap-4 mb-4">
                {content.farmer_image ? (
                  <img
                    src={content.farmer_image}
                    alt={content.farmer_name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-amber-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {content.farmer_name.split(' ').map(n => n[0]).join('')}
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-gray-900">{content.farmer_name}</h3>
                  <p className="text-sm text-gray-600">{content.farmer_code}</p>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => router.push(`/agricultores/${farmerId}`)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  {language === 'es' ? 'Ver Perfil Completo' : 'View Full Profile'}
                </button>

                <button
                  onClick={() => router.push(`/agricultores`)}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  {language === 'es' ? 'Todos los Agricultores' : 'All Farmers'}
                </button>
              </div>
            </div>

            {/* Share */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-4">
                {language === 'es' ? 'Compartir' : 'Share'}
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href)
                    alert(language === 'es' ? 'Enlace copiado' : 'Link copied')
                  }}
                  className="w-full bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                >
                  📋 {language === 'es' ? 'Copiar enlace' : 'Copy link'}
                </button>
                <button
                  onClick={() => window.open(content.media_url, '_blank')}
                  className="w-full bg-red-100 hover:bg-red-200 text-red-800 font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                >
                  🎥 {language === 'es' ? 'Ver en YouTube' : 'Watch on YouTube'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer language={language} />
    </div>
  )
}