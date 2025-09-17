'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { useCache } from '@/hooks/useCache'

interface Farmer {
  id: string
  farmer_code: string
  first_name: string
  last_name: string
  full_name: string
  profile_image_url?: string
  biography?: string
  years_experience: number
  farming_philosophy?: string
  province_name: string
  province_code: string
  altitude_range?: string
  media_count: number
  batches_count: number
  farms: string[]
  varieties: string[]
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
  farmer_name: string
  farmer_code: string
  farmer_id?: string
}

export default function FarmersPage() {
  const [language, setLanguage] = useState<'es' | 'en'>('es')
  const [allContent, setAllContent] = useState<FarmerContent[]>([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const router = useRouter()

  // Array de imágenes para el slideshow
  const coffeeImages = [
    {
      src: '/assets/fotosinicio/persona recolectando granos.jpg',
      alt: 'Agricultor recolectando café',
      label: { es: 'Recolección', en: 'Harvest' }
    },
    {
      src: '/assets/fotosinicio/secadocafe.jpg',
      alt: 'Secado de café',
      label: { es: 'Secado', en: 'Drying' }
    },
    {
      src: '/assets/fotosinicio/granosdecafe.jpg',
      alt: 'Granos de café',
      label: { es: 'Granos', en: 'Beans' }
    },
    {
      src: '/assets/fotosinicio/foto paisaje.jpg',
      alt: 'Paisaje cafetero',
      label: { es: 'Paisaje', en: 'Landscape' }
    },
    {
      src: '/assets/fotosinicio/cafe tendido.jpg',
      alt: 'Café tendido al sol',
      label: { es: 'Proceso', en: 'Process' }
    },
    {
      src: '/assets/fotosinicio/cafetostadoenmano.jpg',
      alt: 'Café tostado en mano',
      label: { es: 'Tostado', en: 'Roasted' }
    }
  ]

  // Use cache for farmers data
  const {
    data: farmers,
    loading: isLoading,
    error: farmersError
  } = useCache('farmers-list', async () => {
    const response = await fetch('/api/public/farmers')
    const data = await response.json()
    if (!data.success) throw new Error(data.error)
    return data.farmers as Farmer[]
  }, 3) // Cache for 3 minutes

  // Auto-rotate images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % coffeeImages.length
      )
    }, 4000)

    return () => clearInterval(interval)
  }, [coffeeImages.length])

  const fallbackFarmers = [
    {
      id: 'fallback-1',
      farmer_code: 'PQ',
      first_name: 'Pablo',
      last_name: 'Quezada',
      full_name: 'Pablo Quezada',
      biography: 'Pionero en el cultivo de Gesha en Ecuador con más de 20 años de experiencia.',
      years_experience: 20,
      province_name: 'El Oro',
      province_code: 'ELORO',
      altitude_range: '1,500 - 1,800 msnm',
      media_count: 0,
      batches_count: 0,
      farms: ['Gran Chaparral'],
      varieties: ['Typica', 'Gesha', 'Bourbon', 'Sidra']
    }
  ]

  // Load content when farmers data is available
  useEffect(() => {
    if (farmers && farmers.length > 0) {
      loadContent(farmers)
    }
  }, [farmers])

  const loadContent = async (farmersData: Farmer[]) => {
    try {
      // Load all content from farmers with media
      const contentPromises = farmersData
        .filter(farmer => farmer.media_count > 0)
        .map(farmer =>
          fetch(`/api/public/farmers/${farmer.id}/content`)
            .then(res => res.json())
            .then(data => {
              if (data.success) {
                // Add farmer_id to each content item
                return data.content.map(content => ({
                  ...content,
                  farmer_id: farmer.id
                }))
              }
              return []
            })
            .catch(() => [])
        )

      const allContentArrays = await Promise.all(contentPromises)
      const flatContent = allContentArrays.flat()
      setAllContent(flatContent)
    } catch (error) {
      console.error('Error loading content:', error)
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

  const handleViewFarmerProfile = (farmer: Farmer) => {
    // Navigate to individual farmer page (we'll create this route)
    router.push(`/agricultores/${farmer.id}`)
  }

  const handleViewFarmerBatches = (farmer: Farmer) => {
    // Navigate to batches filtered by farmer
    router.push(`/lotes?farmer=${farmer.farmer_code}`)
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  // Skeleton component for farmer cards
  const FarmerSkeleton = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-gray-200"></div>
      <div className="p-6">
        <div className="h-6 bg-gray-200 rounded mb-4"></div>
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="space-y-2 mb-4 bg-gray-50 p-4 rounded-lg">
          <div className="h-3 bg-gray-200 rounded"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
        </div>
        <div className="space-y-2">
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-8 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  )

  const featuredContent = allContent.filter(content => content.is_featured)
  const recentContent = allContent.slice(0, 6)

  return (
    <div className="min-h-screen bg-white">
      <Navigation language={language} setLanguage={setLanguage} />

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header - LOADS IMMEDIATELY */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {language === 'es' ? 'Nuestros Agricultores' : 'Our Farmers'}
          </h1>
          <p className="text-lg text-gray-800 max-w-4xl mx-auto leading-relaxed">
            {language === 'es'
              ? '"En cada grano de café late la historia de manos trabajadoras que, con paciencia y amor por la tierra, cultivan sueños entre montañas. Nuestros agricultores, guardianes de la calidad, seleccionan con cuidado cada fruto, transformando esfuerzo y tradición en la esencia de un café único."'
              : '"Within every coffee bean lives the story of hardworking hands that, with patience and love for the land, nurture dreams among the mountains. Our farmers, guardians of quality, carefully select each harvest, transforming effort and tradition into the essence of a unique coffee."'
            }
          </p>
        </div>

        {/* Nueva sección inspiracional con slideshow - CARGA INMEDIATAMENTE */}
        <div className="mb-16 relative">
          <div className="bg-gradient-to-r from-amber-50 via-yellow-50 to-green-50 rounded-2xl p-8 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

              {/* Slideshow de fotos */}
              <div className="relative h-80 rounded-xl overflow-hidden group">
                <img
                  src={coffeeImages[currentImageIndex].src}
                  alt={coffeeImages[currentImageIndex].alt}
                  className="w-full h-full object-cover transition-all duration-1000 ease-in-out"
                />

                {/* Overlay gradiente */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                {/* Label de la imagen actual */}
                <div className="absolute bottom-4 left-4 text-white">
                  <span className="bg-black/60 px-3 py-1 rounded-lg text-sm font-medium">
                    {coffeeImages[currentImageIndex].label[language]}
                  </span>
                </div>

                {/* Indicadores de progreso */}
                <div className="absolute bottom-4 right-4 flex gap-2">
                  {coffeeImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Contenido de texto */}
              <div className="space-y-4">
                <span className="inline-block bg-amber-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                  ☕ {language === 'es' ? 'Nuestra Esencia' : 'Our Essence'}
                </span>

                <p className="text-lg text-gray-700 leading-relaxed italic">
                  {language === 'es'
                    ? '"En cada grano de café late la historia de manos trabajadoras que, con paciencia y amor por la tierra, cultivan sueños entre montañas. Nuestros agricultores, guardianes de la calidad, seleccionan con cuidado cada fruto, transformando esfuerzo y tradición en la esencia de un café único."'
                    : '"Within every coffee bean lives the story of hardworking hands that, with patience and love for the land, nurture dreams among the mountains. Our farmers, guardians of quality, carefully select each harvest, transforming effort and tradition into the essence of a unique coffee."'
                  }
                </p>

                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-gray-600">{language === 'es' ? 'Tradición Familiar' : 'Family Tradition'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                    <span className="text-gray-600">{language === 'es' ? 'Calidad Premium' : 'Premium Quality'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    <span className="text-gray-600">{language === 'es' ? 'Café Único' : 'Unique Coffee'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Farmers Grid */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {language === 'es' ? 'Nuestros Productores' : 'Our Producers'}
            </h2>
            <div className="h-1 flex-1 bg-gradient-to-r from-green-400 to-transparent ml-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {isLoading ? (
              // Show skeleton cards while loading
              <>
                <FarmerSkeleton />
                <FarmerSkeleton />
                <FarmerSkeleton />
                <FarmerSkeleton />
                <FarmerSkeleton />
                <FarmerSkeleton />
              </>
            ) : farmers && farmers.length > 0 ? (
              farmers.map((farmer) => (
              <div key={farmer.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
                {/* Profile Image with Coffee Background */}
                <div className="aspect-[4/3] relative overflow-hidden">
                  {farmer.profile_image_url ? (
                    <img
                      src={farmer.profile_image_url}
                      alt={farmer.full_name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div
                      className="w-full h-full bg-cover bg-center relative"
                      style={{
                        backgroundImage: `url('/assets/fotosinicio/granosdecafe.jpg')`,
                        filter: 'sepia(20%) saturate(120%)'
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white">
                          <div className="w-24 h-24 bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="text-2xl font-bold">
                              {farmer.first_name[0]}{farmer.last_name[0]}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold">{farmer.full_name}</h3>
                          <p className="text-sm opacity-90">{farmer.province_name}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Badges */}
                  <div className="absolute top-3 right-3 space-y-2">
                    <span className="bg-amber-500 text-black px-3 py-1 rounded-full text-xs font-bold block">
                      {farmer.farmer_code}
                    </span>
                    {farmer.media_count > 0 && (
                      <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs block">
                        📹 {farmer.media_count}
                      </span>
                    )}
                    {farmer.batches_count > 0 && (
                      <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs block">
                        📦 {farmer.batches_count}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{farmer.full_name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-700">
                      <span className="flex items-center gap-1 font-medium">
                        📍 {farmer.province_name}
                      </span>
                      <span className="flex items-center gap-1 font-medium">
                        ⏱️ {farmer.years_experience} {language === 'es' ? 'años' : 'years'}
                      </span>
                    </div>
                  </div>

                  {/* Key Info - More Compact with Better Contrast */}
                  <div className="space-y-2 mb-4 text-sm bg-gray-50 p-4 rounded-lg">
                    {farmer.farms?.length > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="text-green-600 font-medium">🏡</span>
                        <span className="font-semibold text-gray-800">{language === 'es' ? 'Finca:' : 'Farm:'}</span>
                        <span className="text-gray-900 font-medium">{farmer.farms[0]}</span>
                      </div>
                    )}

                    {farmer.varieties?.length > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="text-amber-600 font-medium">☕</span>
                        <span className="font-semibold text-gray-800">{language === 'es' ? 'Variedades:' : 'Varieties:'}</span>
                        <span className="text-gray-900 font-medium text-xs">{farmer.varieties.slice(0, 2).join(', ')}</span>
                      </div>
                    )}

                    {farmer.altitude_range && (
                      <div className="flex items-center gap-2">
                        <span className="text-blue-600 font-medium">⛰️</span>
                        <span className="font-semibold text-gray-800">{language === 'es' ? 'Altitud:' : 'Altitude:'}</span>
                        <span className="text-gray-900 font-medium text-xs">{farmer.altitude_range}</span>
                      </div>
                    )}
                  </div>

                  {farmer.biography && (
                    <blockquote className="text-gray-800 italic text-sm mb-4 border-l-4 border-yellow-500 pl-4 bg-yellow-50 p-3 rounded-r-lg">
                      &ldquo;{farmer.biography}&rdquo;
                    </blockquote>
                  )}

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <button
                      onClick={() => handleViewFarmerProfile(farmer)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      👤 {language === 'es' ? 'Ver Perfil Completo' : 'View Full Profile'}
                    </button>

                    {farmer.batches_count > 0 && (
                      <button
                        onClick={() => handleViewFarmerBatches(farmer)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        📦 {language === 'es' ? `Ver ${farmer.batches_count} Lotes` : `View ${farmer.batches_count} Batches`}
                      </button>
                    )}
                  </div>
                </div>
              </div>
              ))
            ) : (
              // No farmers found
              <div className="col-span-full text-center py-12">
                <div className="text-6xl mb-4">👨‍🌾</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {language === 'es' ? 'No se encontraron agricultores' : 'No farmers found'}
                </h3>
                <p className="text-gray-800">
                  {language === 'es'
                    ? 'No hay agricultores disponibles en este momento.'
                    : 'No farmers are available at this moment.'
                  }
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Featured Content Section */}
        {featuredContent.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                {language === 'es' ? 'Historias Destacadas' : 'Featured Stories'}
              </h2>
              <div className="h-1 flex-1 bg-gradient-to-r from-yellow-400 to-transparent ml-6"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {featuredContent.map((content, index) => {
                // Si es el último elemento y es impar (queda solo), hacer layout horizontal
                const isLastOdd = index === featuredContent.length - 1 && featuredContent.length % 2 !== 0

                return (
                  <div
                    key={content.id}
                    className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group ${
                      isLastOdd ? 'md:col-span-2' : ''
                    }`}
                  >
                    <div className={`${isLastOdd ? 'md:flex md:items-center' : ''}`}>
                      {/* Video thumbnail */}
                      <div className={`bg-gray-900 relative overflow-hidden ${
                        isLastOdd ? 'aspect-video md:w-1/2 md:aspect-[16/10]' : 'aspect-video'
                      }`}>
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

                        {/* Duration */}
                        <div className="absolute bottom-3 right-3">
                          <span className="bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                            {formatDuration(content.duration)}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className={`p-6 ${isLastOdd ? 'md:w-1/2' : ''}`}>
                        <div className="flex items-start justify-between mb-3">
                          <h3 className={`font-bold text-gray-900 line-clamp-2 flex-1 ${
                            isLastOdd ? 'text-xl md:text-2xl' : 'text-lg'
                          }`}>
                            {content.title}
                          </h3>
                          <span className="ml-3 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                            {content.farmer_code}
                          </span>
                        </div>

                        <p className={`text-gray-800 mb-4 line-clamp-3 ${
                          isLastOdd ? 'text-base' : 'text-sm'
                        }`}>
                          {content.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <span className={`font-medium text-gray-900 ${
                            isLastOdd ? 'text-base' : 'text-sm'
                          }`}>
                            {content.farmer_name}
                          </span>
                          <button
                            onClick={() => {
                              if (content.farmer_id) {
                                router.push(`/agricultores/${content.farmer_id}/videos/${content.id}`)
                              } else {
                                window.open(content.media_url, '_blank')
                              }
                            }}
                            className={`bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors ${
                              isLastOdd ? 'px-6 py-3 text-base' : 'px-4 py-2 text-sm'
                            }`}
                          >
                            {language === 'es' ? 'Ver Contenido' : 'View Content'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* All Content Section */}
        {recentContent.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                {language === 'es' ? 'Todos los Videos' : 'All Videos'}
              </h2>
              <div className="h-1 flex-1 bg-gradient-to-r from-red-400 to-transparent ml-6"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentContent.map((content, index) => {
                // Si es el último elemento y es impar (queda solo), hacer layout horizontal
                const isLastOdd = index === recentContent.length - 1 && recentContent.length % 2 !== 0

                return (
                  <div
                    key={content.id}
                    className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${
                      isLastOdd ? 'md:col-span-2' : ''
                    }`}
                  >
                    <div className={`${isLastOdd ? 'md:flex md:items-center' : ''}`}>
                      {/* Video thumbnail */}
                      <div className={`bg-gray-200 relative ${
                        isLastOdd ? 'aspect-video md:w-1/2 md:aspect-[16/10]' : 'aspect-video'
                      }`}>
                        {getYouTubeId(content.media_url) ? (
                          <img
                            src={`https://img.youtube.com/vi/${getYouTubeId(content.media_url)}/hqdefault.jpg`}
                            alt={content.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
                            <span className="text-white text-4xl">🎥</span>
                          </div>
                        )}

                        <div className="absolute bottom-2 right-2">
                          <span className="bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                            {formatDuration(content.duration)}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className={`p-4 ${isLastOdd ? 'md:w-1/2' : ''}`}>
                        <div className="flex items-start justify-between mb-2">
                          <h3 className={`font-semibold text-gray-900 line-clamp-2 flex-1 ${
                            isLastOdd ? 'text-base md:text-lg' : 'text-sm'
                          }`}>
                            {content.title}
                          </h3>
                          <span className={`ml-2 text-gray-700 font-medium ${
                            isLastOdd ? 'text-sm' : 'text-xs'
                          }`}>
                            {content.farmer_code}
                          </span>
                        </div>

                        <p className={`text-gray-800 mb-3 line-clamp-2 ${
                          isLastOdd ? 'text-sm' : 'text-xs'
                        }`}>
                          {content.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <span className={`text-gray-700 ${
                            isLastOdd ? 'text-sm' : 'text-xs'
                          }`}>
                            {content.farmer_name}
                          </span>
                          <button
                            onClick={() => {
                              if (content.farmer_id) {
                                router.push(`/agricultores/${content.farmer_id}/videos/${content.id}`)
                              } else {
                                window.open(content.media_url, '_blank')
                              }
                            }}
                            className={`bg-red-500 hover:bg-red-600 text-white rounded transition-colors ${
                              isLastOdd ? 'px-4 py-2 text-sm' : 'px-3 py-1 text-xs'
                            }`}
                          >
                            ▶️ {language === 'es' ? 'Ver' : 'View'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Stats */}
        {farmers && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{farmers.length}</div>
            <div className="text-sm text-green-700 font-medium">
              {language === 'es' ? 'Agricultores' : 'Farmers'}
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-amber-600 mb-2">
              {farmers.reduce((acc, f) => acc + f.years_experience, 0)}
            </div>
            <div className="text-sm text-amber-700 font-medium">
              {language === 'es' ? 'Años de Experiencia' : 'Years Experience'}
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {farmers.reduce((acc, f) => acc + f.batches_count, 0)}
            </div>
            <div className="text-sm text-blue-700 font-medium">
              {language === 'es' ? 'Lotes Activos' : 'Active Batches'}
            </div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">
              {allContent.length}
            </div>
            <div className="text-sm text-red-700 font-medium">
              {language === 'es' ? 'Videos' : 'Videos'}
            </div>
          </div>
          </div>
        )}
      </div>

      <Footer language={language} />
    </div>
  )
}