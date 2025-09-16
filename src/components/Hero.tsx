'use client'

interface HeroProps {
  language: 'es' | 'en'
}

export default function Hero({ language }: HeroProps) {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <iframe
          src="https://player.cloudinary.com/embed/?cloud_name=dzfakhjlh&public_id=Video_Inicio_Pagina_web_du6glp&profile=cld-default"
          width="100%"
          height="100%"
          style={{
            height: '100%',
            width: '100%',
            border: 'none',
            objectFit: 'cover'
          }}
          allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
          allowFullScreen
          frameBorder="0"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          {language === 'es' ? 'Café Premium de Ecuador' : 'Premium Coffee from Ecuador'}
        </h1>
        <p className="text-xl md:text-2xl mb-8 leading-relaxed opacity-90">
          {language === 'es'
            ? 'Cultivado bajo sombra, en armonía con la naturaleza'
            : 'Cultivated under shade, in harmony with nature'
          }
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
            {language === 'es' ? 'Descubre Nuestros Productos' : 'Discover Our Products'}
          </button>
          <button className="border-2 border-white text-white hover:bg-white hover:text-black font-bold py-4 px-8 rounded-full transition-all duration-300">
            {language === 'es' ? 'Conoce Nuestra Historia' : 'Learn Our Story'}
          </button>
        </div>
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