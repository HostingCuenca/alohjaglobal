'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import CMSSidebar from '@/components/cms/CMSSidebar'
import CMSHeader from '@/components/cms/CMSHeader'

interface User {
  id: string
  username: string
  role: string
}

interface ContentFormData {
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
}

const MEDIA_CATEGORIES = [
  { value: 'interview', label: 'Entrevista' },
  { value: 'farm_tour', label: 'Tour de Finca' },
  { value: 'harvest', label: 'Cosecha' },
  { value: 'process', label: 'Procesamiento' },
  { value: 'profile', label: 'Perfil' },
  { value: 'story', label: 'Historia' },
  { value: 'technique', label: 'Técnica' }
]

const extractYouTubeId = (url: string): string | null => {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
  const match = url.match(regex)
  return match ? match[1] : null
}

export default function NewFarmerContentPage() {
  const [formData, setFormData] = useState<ContentFormData>({
    media_type: 'video',
    media_category: 'interview',
    title: '',
    description: '',
    media_url: '',
    thumbnail_url: '',
    duration: 0,
    display_order: 0,
    is_featured: false,
    is_public: true
  })

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [farmer, setFarmer] = useState<any>(null)
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
      loadFarmer()
    } catch {
      router.push('/crmalohja')
    }
  }, [router])

  const loadFarmer = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/farmers/${farmerId}`)
      const data = await response.json()

      if (data.success) {
        setFarmer(data.farmer)
      }
    } catch (error) {
      console.error('Error loading farmer:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateFormData = (field: keyof ContentFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))

    // Auto-extract YouTube thumbnail
    if (field === 'media_url' && value && (value.includes('youtube') || value.includes('youtu.be'))) {
      const videoId = extractYouTubeId(value)
      if (videoId) {
        setFormData(prev => ({
          ...prev,
          thumbnail_url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
        }))
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setErrors({})

    try {
      const response = await fetch(`/api/farmers/${farmerId}/content`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        router.push(`/crmalohja/farmers/${farmerId}/content`)
      } else {
        setErrors(data.errors || { general: 'Error al crear el contenido' })
      }
    } catch (error) {
      console.error('Error creating content:', error)
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
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
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
                  onClick={() => router.push(`/crmalohja/farmers/${farmerId}/content`)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Nuevo Contenido</h1>
                  <p className="text-gray-600 mt-1">
                    Agregar contenido para {farmer?.full_name || 'agricultor'}
                  </p>
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
                      Tipo de Contenido *
                    </label>
                    <select
                      value={formData.media_type}
                      onChange={(e) => updateFormData('media_type', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="video">Video</option>
                      <option value="image">Imagen</option>
                      <option value="document">Documento</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Categoría *
                    </label>
                    <select
                      value={formData.media_category}
                      onChange={(e) => updateFormData('media_category', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      {MEDIA_CATEGORIES.map(cat => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Título *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => updateFormData('title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                      placeholder="Ej: Entrevista con Pablo Quezada - La historia de Gran Chaparral"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descripción
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => updateFormData('description', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Descripción del contenido, contexto, temas tratados..."
                    />
                  </div>
                </div>
              </div>

              {/* Media Information */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Información del Medio</h2>

                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      URL del {formData.media_type === 'video' ? 'Video de YouTube' : 'Contenido'} *
                    </label>
                    <input
                      type="url"
                      value={formData.media_url}
                      onChange={(e) => updateFormData('media_url', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                      placeholder={
                        formData.media_type === 'video'
                          ? "https://www.youtube.com/watch?v=..."
                          : "URL del contenido"
                      }
                    />
                  </div>

                  {formData.media_type === 'video' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          URL de Miniatura
                        </label>
                        <input
                          type="url"
                          value={formData.thumbnail_url}
                          onChange={(e) => updateFormData('thumbnail_url', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Se auto-completa para videos de YouTube"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Duración (segundos)
                        </label>
                        <input
                          type="number"
                          value={formData.duration}
                          onChange={(e) => updateFormData('duration', parseInt(e.target.value) || 0)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          min="0"
                          placeholder="300"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Aproximadamente {Math.floor(formData.duration / 60)}:{(formData.duration % 60).toString().padStart(2, '0')} minutos
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Display Options */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Opciones de Visualización</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Orden de Visualización
                    </label>
                    <input
                      type="number"
                      value={formData.display_order}
                      onChange={(e) => updateFormData('display_order', parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="0"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      0 = orden por fecha, números mayores aparecen primero
                    </p>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="is_featured"
                      checked={formData.is_featured}
                      onChange={(e) => updateFormData('is_featured', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="is_featured" className="ml-2 block text-sm text-gray-700">
                      Contenido Destacado
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="is_public"
                      checked={formData.is_public}
                      onChange={(e) => updateFormData('is_public', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="is_public" className="ml-2 block text-sm text-gray-700">
                      Contenido Público
                    </label>
                  </div>
                </div>
              </div>

              {/* Preview */}
              {formData.media_url && formData.media_type === 'video' && (formData.media_url.includes('youtube') || formData.media_url.includes('youtu.be')) && (
                <div className="bg-gray-50 rounded-lg shadow p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">Vista Previa del Video</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Thumbnail Preview */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Miniatura</h3>
                      <div className="aspect-video bg-gray-200 rounded overflow-hidden">
                        {formData.thumbnail_url ? (
                          <img
                            src={formData.thumbnail_url}
                            alt="Preview"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none'
                              e.currentTarget.nextElementSibling?.classList.remove('hidden')
                            }}
                          />
                        ) : null}
                        <div className={`w-full h-full flex items-center justify-center ${formData.thumbnail_url ? 'hidden' : ''}`}>
                          <div className="text-center">
                            <svg className="w-16 h-16 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            <p className="text-gray-500 text-sm">No se pudo cargar la miniatura</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2">
                        <h4 className="font-medium text-gray-900">{formData.title || 'Sin título'}</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {formData.description || 'Sin descripción'}
                        </p>
                      </div>
                    </div>

                    {/* YouTube Embed Preview */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Video Embebido</h3>
                      <div className="aspect-video bg-gray-200 rounded overflow-hidden">
                        {extractYouTubeId(formData.media_url) ? (
                          <iframe
                            src={`https://www.youtube.com/embed/${extractYouTubeId(formData.media_url)}`}
                            title="YouTube video preview"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                            onError={() => {
                              console.error('Error loading YouTube video')
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="text-center">
                              <svg className="w-16 h-16 text-red-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <p className="text-red-600 text-sm font-medium">URL de YouTube inválida</p>
                              <p className="text-gray-500 text-xs mt-1">Verifica que la URL sea correcta</p>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="mt-2">
                        <p className="text-xs text-gray-500">
                          {extractYouTubeId(formData.media_url) ? (
                            <span className="text-green-600">✓ URL válida - Video se cargará correctamente</span>
                          ) : (
                            <span className="text-red-600">✗ URL inválida - El video no se podrá mostrar</span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => router.push(`/crmalohja/farmers/${farmerId}/content`)}
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  disabled={isSaving}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md disabled:bg-blue-400"
                >
                  {isSaving ? 'Creando...' : 'Crear Contenido'}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}