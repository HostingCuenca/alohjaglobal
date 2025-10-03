'use client'

import { useState } from 'react'

interface HeroProps {
  language: 'es' | 'en'
}

export default function Hero({ language }: HeroProps) {
  const [searchValue, setSearchValue] = useState('')
  const [searchResult, setSearchResult] = useState<{
    loteId: string;
    finca: string;
    variedad: string;
    altitud: string;
    procesamiento: string;
    fechaCosecha: string;
    ubicacion: string;
  } | null>(null)

  const handleSearch = () => {
    // Simulando búsqueda de lote
    if (searchValue.trim()) {
      const mockResult = {
        loteId: searchValue,
        finca: language === 'es' ? 'Finca El Paraíso' : 'El Paraíso Farm',
        variedad: language === 'es' ? 'Typica Ecuatoriana' : 'Ecuadorian Typica',
        altitud: '1,200 - 1,400 msnm',
        procesamiento: language === 'es' ? 'Lavado' : 'Washed',
        fechaCosecha: language === 'es' ? 'Marzo 2024' : 'March 2024',
        ubicacion: language === 'es' ? 'Provincia de Loja, Ecuador' : 'Loja Province, Ecuador'
      }
      setSearchResult(mockResult)
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
            {language === 'es' ? 'Busca tu lote de café' : 'Search your coffee batch'}
          </h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={language === 'es' ? 'Ingresa el código de tu lote (ej: ALO2024-001)' : 'Enter your batch code (e.g: ALO2024-001)'}
              className="flex-1 px-4 py-3 rounded-lg text-white placeholder-gray-300 bg-black bg-opacity-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button
              onClick={handleSearch}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              {language === 'es' ? 'Buscar' : 'Search'}
            </button>
          </div>
        </div>

        {/* Search Result */}
        {searchResult && (
          <div className="search-result rounded-2xl p-6 text-black max-w-3xl mx-auto mb-8">
            <h4 className="text-2xl font-bold mb-4 text-center">
              {language === 'es' ? `Lote: ${searchResult.loteId}` : `Batch: ${searchResult.loteId}`}
            </h4>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div>
                <strong>{language === 'es' ? 'Finca:' : 'Farm:'}</strong> {searchResult.finca}
              </div>
              <div>
                <strong>{language === 'es' ? 'Variedad:' : 'Variety:'}</strong> {searchResult.variedad}
              </div>
              <div>
                <strong>{language === 'es' ? 'Altitud:' : 'Altitude:'}</strong> {searchResult.altitud}
              </div>
              <div>
                <strong>{language === 'es' ? 'Procesamiento:' : 'Processing:'}</strong> {searchResult.procesamiento}
              </div>
              <div>
                <strong>{language === 'es' ? 'Fecha de cosecha:' : 'Harvest date:'}</strong> {searchResult.fechaCosecha}
              </div>
              <div>
                <strong>{language === 'es' ? 'Ubicación:' : 'Location:'}</strong> {searchResult.ubicacion}
              </div>
            </div>
          </div>
        )}

        {!searchResult && (
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