'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { MapPin, Calendar, Award, Coffee, Mountain, Leaf } from 'lucide-react'

interface FarmerData {
  id: string
  farmer_code: string
  first_name: string
  last_name: string
  full_name: string
  profile_image_url: string | null
  biography: string | null
  years_experience: number
  certifications: string[] | null
  province_name: string
  province_code: string
  province_lat: number
  province_lng: number
  content: ContentItem[]
  farms: Farm[]
  batch_count: number
}

interface ContentItem {
  id: string
  title: string
  content: string
  youtube_url: string | null
  created_at: string
}

interface Farm {
  name: string
  total_area_hectares: number
  coffee_area_hectares: number
  altitude_min: number
  altitude_max: number
  processing_method: string
}

export default function FarmerProfilePage() {
  const [language, setLanguage] = useState<'es' | 'en'>('es')
  const [farmer, setFarmer] = useState<FarmerData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const params = useParams()
  const slug = params?.slug as string

  useEffect(() => {
    if (slug) {
      loadFarmerData(slug)
    }
  }, [slug])

  const loadFarmerData = async (farmerSlug: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/public/farmers?slug=${encodeURIComponent(farmerSlug)}`)
      const data = await response.json()

      if (data.success) {
        setFarmer(data.farmer)
      } else {
        setError(data.error || 'Agricultor no encontrado')
      }
    } catch (error) {
      console.error('Error loading farmer:', error)
      setError('Error al cargar información del agricultor')
    } finally {
      setIsLoading(false)
    }
  }

  const extractYouTubeId = (url: string): string | null => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    const match = url.match(regex)
    return match ? match[1] : null
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation language={language} setLanguage={setLanguage} />
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">
              {language === 'es' ? 'Cargando perfil...' : 'Loading profile...'}
            </p>
          </div>
        </div>
        <Footer language={language} />
      </div>
    )
  }

  if (error || !farmer) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation language={language} setLanguage={setLanguage} />
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {language === 'es' ? 'Agricultor no encontrado' : 'Farmer not found'}
            </h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <Link
              href="/agricultores"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 px-6 rounded-lg transition-colors"
            >
              {language === 'es' ? 'Ver todos los agricultores' : 'View all farmers'}
            </Link>
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
      <section className="relative bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Coffee className="w-8 h-8" />
                <span className="text-green-200 font-medium">
                  {farmer.farmer_code}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {farmer.full_name}
              </h1>
              <div className="flex items-center gap-2 text-green-200 mb-6">
                <MapPin className="w-5 h-5" />
                <span>{farmer.province_name}</span>
                <span>•</span>
                <Calendar className="w-5 h-5" />
                <span>
                  {farmer.years_experience} {language === 'es' ? 'años de experiencia' : 'years of experience'}
                </span>
              </div>
              {farmer.biography && (
                <p className="text-lg leading-relaxed text-green-100">
                  {farmer.biography}
                </p>
              )}
            </div>
            <div className="flex justify-center">
              <div className="relative w-80 h-80 rounded-full overflow-hidden border-4 border-white shadow-xl">
                <Image
                  src={farmer.profile_image_url || '/assets/placeholders/coffee-field-farmer.jpg'}
                  alt={farmer.full_name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center bg-white rounded-lg p-6 shadow-md">
              <Mountain className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{farmer.farms.length}</div>
              <div className="text-sm text-gray-600">
                {language === 'es' ? 'Fincas' : 'Farms'}
              </div>
            </div>
            <div className="text-center bg-white rounded-lg p-6 shadow-md">
              <Coffee className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{farmer.batch_count}</div>
              <div className="text-sm text-gray-600">
                {language === 'es' ? 'Lotes activos' : 'Active batches'}
              </div>
            </div>
            <div className="text-center bg-white rounded-lg p-6 shadow-md">
              <Calendar className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{farmer.years_experience}</div>
              <div className="text-sm text-gray-600">
                {language === 'es' ? 'Años' : 'Years'}
              </div>
            </div>
            <div className="text-center bg-white rounded-lg p-6 shadow-md">
              <Award className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {farmer.certifications ? farmer.certifications.length : 0}
              </div>
              <div className="text-sm text-gray-600">
                {language === 'es' ? 'Certificaciones' : 'Certifications'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Farms Section */}
      {farmer.farms.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              {language === 'es' ? 'Sus Fincas' : 'Their Farms'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {farmer.farms.map((farm, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-md">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{farm.name}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        {language === 'es' ? 'Área total:' : 'Total area:'}
                      </span>
                      <span className="font-medium">{farm.total_area_hectares} ha</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        {language === 'es' ? 'Área café:' : 'Coffee area:'}
                      </span>
                      <span className="font-medium">{farm.coffee_area_hectares} ha</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        {language === 'es' ? 'Altitud:' : 'Altitude:'}
                      </span>
                      <span className="font-medium">
                        {farm.altitude_min} - {farm.altitude_max} msnm
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        {language === 'es' ? 'Proceso:' : 'Process:'}
                      </span>
                      <span className="font-medium">{farm.processing_method}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Certifications Section */}
      {farmer.certifications && farmer.certifications.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              {language === 'es' ? 'Certificaciones' : 'Certifications'}
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {farmer.certifications.map((cert, index) => (
                <div key={index} className="bg-white border border-green-200 rounded-lg px-6 py-3 shadow-sm">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-gray-900">{cert}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Interviews/Content Section */}
      {farmer.content.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              {language === 'es' ? 'Entrevistas y Contenido' : 'Interviews & Content'}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {farmer.content.map((item) => (
                <div key={item.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md">
                  {item.youtube_url && (
                    <div className="aspect-video">
                      <iframe
                        src={`https://www.youtube.com/embed/${extractYouTubeId(item.youtube_url)}`}
                        title={item.title}
                        className="w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">{item.content}</p>
                    <div className="text-sm text-gray-500">
                      {new Date(item.created_at).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer language={language} />
    </div>
  )
}