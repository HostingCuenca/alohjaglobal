'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface HeroProps {
  language: 'es' | 'en'
}

export default function Hero({ language }: HeroProps) {
  const router = useRouter()
  const [searchValue, setSearchValue] = useState('')
  const [searchResult, setSearchResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [notFound, setNotFound] = useState(false)

  // Función para formatear fechas
  const formatEcuadorDate = (dateString: string | null | undefined): string => {
    if (!dateString) return '-'
    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) return dateString

      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'America/Guayaquil'
      }

      const locale = language === 'es' ? 'es-EC' : 'en-US'
      return date.toLocaleDateString(locale, options)
    } catch {
      return dateString
    }
  }

  const handleSearch = async () => {
    if (!searchValue.trim()) return

    setIsLoading(true)
    setNotFound(false)
    setSearchResult(null)

    try {
      const response = await fetch(`/api/batches-simple?batch_id=${searchValue.trim()}`)
      const data = await response.json()

      if (data.success && data.batch) {
        setSearchResult(data.batch)
        setNotFound(false)
      } else {
        setSearchResult(null)
        setNotFound(true)
      }
    } catch (error) {
      console.error('Error searching batch:', error)
      setNotFound(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleViewFullDetails = () => {
    if (searchResult) {
      router.push(`/sostenibilidad?batch=${searchResult.batch_id}`)
    }
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{
            width: '100%',
            height: '100%'
          }}
        >
          <source src="https://blog.torisoftt.com/videos/1.%20Video%20Inicio%20Pagina%20web%20(1920%20x%201000%20px).mp4" type="video/mp4" />
        </video>

        <div
          className="absolute inset-0 w-full h-full bg-gradient-to-br from-green-900 via-green-800 to-amber-800"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 75%, rgba(251, 191, 36, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 75% 25%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)
            `,
            zIndex: -1
          }}
        />
      </div>

      {/* Simplified Overlay */}
      <div className="hero-overlay"></div>

      {/* Content */}
      <div className="hero-content relative text-center text-white px-4 max-w-5xl mx-auto">
        {/* <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
          {language === 'es' ? 'Rastrea tu café' : 'Track your coffee'}
        </h1> */}
        {/* Temporarily commented - description moved to separate section below
        <p className="text-lg md:text-xl mb-8 text-gray-100 max-w-3xl mx-auto">
          {language === 'es'
            ? 'Descubre el origen, la finca y el proceso de tu café favorito. Cada lote cuenta una historia única desde las montañas de Ecuador hasta tu taza.'
            : 'Discover the origin, farm, and process of your favorite coffee. Each batch tells a unique story from the mountains of Ecuador to your cup.'
          }
        </p>
        */}

        {/* Search Box */}
        <div className="search-box rounded-2xl p-6 mb-8 max-w-2xl mx-auto">
          <h3 className="text-xl md:text-2xl font-semibold mb-4">
            {language === 'es' ? 'Rastrea tu lote de café' : 'Track your coffee batch'}
          </h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={language === 'es' ? 'Ej: AR000147, PQ000258' : 'Ex: AR000147, PQ000258'}
              className="flex-1 px-4 py-3 rounded-lg text-white placeholder-gray-300 bg-black bg-opacity-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              disabled={isLoading}
            />
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-black font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:transform-none"
            >
              {isLoading ? (language === 'es' ? 'Buscando...' : 'Searching...') : (language === 'es' ? 'Buscar' : 'Search')}
            </button>
          </div>
        </div>

        {/* Search Result - Versión Resumida */}
        {searchResult && (
          <div className="search-result rounded-2xl p-6 text-black max-w-3xl mx-auto mb-8">
            <h4 className="text-2xl font-bold mb-4 text-center">
              {language === 'es' ? `Lote: ${searchResult.batch_id}` : `Batch: ${searchResult.batch_id}`}
            </h4>
            <div className="grid md:grid-cols-2 gap-4 text-left mb-6">
              <div>
                <strong>{language === 'es' ? 'Finca:' : 'Farm:'}</strong> {searchResult.farm || '-'}
              </div>
              <div>
                <strong>{language === 'es' ? 'Variedad:' : 'Variety:'}</strong> {searchResult.variety || '-'}
              </div>
              <div>
                <strong>{language === 'es' ? 'Provincia:' : 'Province:'}</strong> {searchResult.province || '-'}
              </div>
              <div>
                <strong>{language === 'es' ? 'Proceso:' : 'Process:'}</strong> {searchResult.process || '-'}
              </div>
              <div>
                <strong>{language === 'es' ? 'Cosecha:' : 'Harvest:'}</strong> {formatEcuadorDate(searchResult.harvest_date)}
              </div>
              <div>
                <strong>{language === 'es' ? 'Caficultor:' : 'Farmer:'}</strong> {searchResult.farmer || '-'}
              </div>
            </div>
            <div className="text-center">
              <button
                onClick={handleViewFullDetails}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                {language === 'es' ? '📋 Ver Detalles Completos' : '📋 View Full Details'}
              </button>
            </div>
          </div>
        )}

        {/* Not Found Message */}
        {notFound && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl max-w-2xl mx-auto mb-8">
            <p className="font-bold">
              {language === 'es' ? '❌ Lote no encontrado' : '❌ Batch not found'}
            </p>
            <p className="text-sm mt-1">
              {language === 'es'
                ? 'Verifica el código e intenta nuevamente.'
                : 'Please verify the code and try again.'
              }
            </p>
          </div>
        )}

        {!searchResult && !notFound && !isLoading && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.href = '/productos'}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              {language === 'es' ? 'Descubre Nuestros Productos' : 'Discover Our Products'}
            </button>
            <button
              onClick={() => window.location.href = '/nosotros'}
              className="border-2 border-white text-white hover:bg-white hover:text-black font-bold py-4 px-8 rounded-full transition-all duration-300"
            >
              {language === 'es' ? 'Conoce Nuestra Historia' : 'Learn Our Story'}
            </button>
          </div>
        )}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <svg
          className="w-6 h-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  )
}