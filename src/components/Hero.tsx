'use client'

import { useState } from 'react'

interface HeroProps {
  language: 'es' | 'en'
}

export default function Hero({ language }: HeroProps) {
  const [searchValue, setSearchValue] = useState('')
  const [searchResult, setSearchResult] = useState<any>(null)

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
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          style={{ pointerEvents: 'none' }}
        >
          <source
            src="https://res.cloudinary.com/dzfakhjlh/video/upload/v1726497600/Video_Inicio_Pagina_web_du6glp.mp4"
            type="video/mp4"
          />
          {/* Fallback para navegadores que no soporten el video */}
          <div className="w-full h-full bg-gradient-to-br from-green-800 to-amber-700" />
        </video>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
          {language === 'es' ? 'Rastrea tu café' : 'Track your coffee'}
        </h1>
        <p className="text-lg md:text-xl mb-8 opacity-90 max-w-3xl mx-auto">
          {language === 'es'
            ? 'Descubre el origen, la finca y el proceso de tu café favorito. Cada lote cuenta una historia única desde las montañas de Ecuador hasta tu taza.'
            : 'Discover the origin, farm, and process of your favorite coffee. Each batch tells a unique story from the mountains of Ecuador to your cup.'
          }
        </p>

        {/* Search Box */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 max-w-2xl mx-auto">
          <h3 className="text-xl md:text-2xl font-semibold mb-4">
            {language === 'es' ? 'Busca tu lote de café' : 'Search your coffee batch'}
          </h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={language === 'es' ? 'Ingresa el código de tu lote (ej: ALO2024-001)' : 'Enter your batch code (e.g: ALO2024-001)'}
              className="flex-1 px-4 py-3 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
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
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 text-black max-w-3xl mx-auto mb-8">
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
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
              {language === 'es' ? 'Descubre Nuestros Productos' : 'Discover Our Products'}
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-black font-bold py-4 px-8 rounded-full transition-all duration-300">
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