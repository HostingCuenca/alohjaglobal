'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { motion, AnimatePresence } from 'framer-motion'

export default function AboutUsPage() {
  const [language, setLanguage] = useState<'es' | 'en'>('es')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)
  const [currentValue, setCurrentValue] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const galleryImages = [
    '5.png', '6.png', '7.png', '8.png',
    '9.png', '10.png', '11.png', '12.png',
    '13.png', '14.png', '15.png', '16.png',
    '17.png', '18.png', 'agricultores 1.png', 'agricultores 2.png',
    'agricultores 3.png', 'agricultores 4.png', 'agricultores 5.png'
  ]

  const openLightbox = (index: number) => {
    setCurrentImage(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % galleryImages.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  const corporateValues = [
    {
      es: 'Confianza en nuestros productos',
      en: 'Confidence in our products',
      description: {
        es: 'Inspiramos seguridad y orgullo en quienes nos eligen.',
        en: 'We inspire confidence and pride in those who choose us.'
      },
      image: 'https://blog.torisoftt.com/videos/3.%20NOSOTROS/imagenes%20valores%20corporativos/Confianza%20en%20nuestros%20productos.jpg'
    },
    {
      es: 'Calidad',
      en: 'Quality',
      description: {
        es: 'Garantizamos excelencia en todo lo que hacemos.',
        en: 'We guarantee excellence in everything we do.'
      },
      image: 'https://blog.torisoftt.com/videos/3.%20NOSOTROS/imagenes%20valores%20corporativos/Calidad.jpg'
    },
    {
      es: 'Sostenibilidad',
      en: 'Sustainability',
      description: {
        es: 'Cuidamos el planeta y las comunidades.',
        en: 'We care for the planet and communities.'
      },
      image: 'https://blog.torisoftt.com/videos/3.%20NOSOTROS/imagenes%20valores%20corporativos/Sostenibilidad.jpg'
    },
    {
      es: 'Innovación',
      en: 'Innovation',
      description: {
        es: 'Creamos nuevas formas de inspirar y sorprender.',
        en: 'We create new ways to inspire and surprise.'
      },
      image: 'https://blog.torisoftt.com/videos/3.%20NOSOTROS/imagenes%20valores%20corporativos/innovacion.jpg'
    },
    {
      es: 'Transparencia',
      en: 'Transparency',
      description: {
        es: 'Procesos claros que generan confianza.',
        en: 'Clear processes that build trust.'
      },
      image: 'https://blog.torisoftt.com/videos/3.%20NOSOTROS/imagenes%20valores%20corporativos/transparencia.png'
    },
    {
      es: 'Inspiración',
      en: 'Inspiration',
      description: {
        es: 'Motivamos a otros a ser parte de algo significativo.',
        en: 'We motivate others to be part of something meaningful.'
      },
      image: 'https://blog.torisoftt.com/videos/3.%20NOSOTROS/imagenes%20valores%20corporativos/inspiraion.png'
    },
    {
      es: 'Ética',
      en: 'Ethics',
      description: {
        es: 'Tomamos decisiones correctas y responsables, basadas en integridad, respeto y justicia.',
        en: 'We make correct and responsible decisions, based on integrity, respect and justice.'
      },
      image: 'https://blog.torisoftt.com/videos/3.%20NOSOTROS/imagenes%20valores%20corporativos/etica.png'
    },
    {
      es: 'Comercio justo',
      en: 'Fair trade',
      description: {
        es: 'Garantizamos el pago justo y digno que merecen los productores.',
        en: 'We guarantee the fair and dignified payment that producers deserve.'
      },
      image: 'https://blog.torisoftt.com/videos/3.%20NOSOTROS/imagenes%20valores%20corporativos/comercio%20justo.png'
    }
  ]

  const [direction, setDirection] = useState(0)

  const nextValue = () => {
    setDirection(1)
    setCurrentValue((prev) => (prev + 1) % corporateValues.length)
  }

  const prevValue = () => {
    setDirection(-1)
    setCurrentValue((prev) => (prev - 1 + corporateValues.length) % corporateValues.length)
  }

  const goToValue = (index: number) => {
    setDirection(index > currentValue ? 1 : -1)
    setCurrentValue(index)
    setIsAutoPlaying(false) // Pausar autoplay cuando el usuario interactúa
  }

  // Auto-play carousel cada 8 segundos
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setDirection(1)
      setCurrentValue((prev) => (prev + 1) % corporateValues.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, corporateValues.length])

  return (
    <div className="min-h-screen bg-white">
      <Navigation language={language} setLanguage={setLanguage} />

      {/* Who We Are Video Section */}
      <section className="bg-black">
        <div className="w-full">
          <div className="aspect-video bg-gray-900">
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster="/assets/fotosinicio/foto paisaje.jpg"
            >
              <source src="https://blog.torisoftt.com/videos/3.%20NOSOTROS/video%20quienes%20somos%20REDISE%C3%91ADO.mp4" type="video/mp4" />
              {language === 'es'
                ? 'Tu navegador no soporta el elemento de video.'
                : 'Your browser does not support the video element.'
              }
            </video>
          </div>
        </div>
      </section>

      {/* Mission and Vision Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {language === 'es' ? 'Misión' : 'Mission'}
              </h2>
              <div className="w-16 h-1 bg-yellow-400 mx-auto mb-6"></div>
              <p className="text-gray-700 text-lg leading-relaxed">
                {language === 'es'
                  ? 'Ser una empresa profundamente centrada en las personas, ofreciendo productos auténticos y sostenibles que conecten culturas, historias y territorios, creando valor y experiencias con impacto positivo a nivel global.'
                  : 'To be a company deeply focused on people, offering authentic and sustainable products that connect cultures, stories, and territories, creating value and experiences with a positive impact on a global level.'
                }
              </p>
            </div>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {language === 'es' ? 'Visión' : 'Vision'}
              </h2>
              <div className="w-16 h-1 bg-yellow-400 mx-auto mb-6"></div>
              <p className="text-gray-700 text-lg leading-relaxed">
                {language === 'es'
                  ? 'Posicionar Alohja como una marca global que trascienda generaciones, llevando productos de calidad al mundo y conectando personas con historias auténticas.'
                  : 'Position Alohja as a global brand that transcends generations, bringing quality products to the world and connecting people with authentic stories.'
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Image */}
      {/* <section>
        <div className="w-full">
          <Image
            src="/assets/nuestrosvalores.png"
            alt={language === 'es' ? 'Nuestros Valores - Alohja Coffee' : 'Our Values - Alohja Coffee'}
            width={1920}
            height={800}
            className="w-full h-auto object-cover"
          />
        </div>
      </section> */}

      {/* PREVIOUS VERSION - COMMENTED FOR BACKUP
      <section className="bg-amber-900 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-6">
                {language === 'es' ? 'Misión' : 'Mission'}
              </h2>
              <p className="text-amber-100 text-lg leading-relaxed">
                {language === 'es'
                  ? 'Ser una empresa profundamente centrada en las personas, ofreciendo productos auténticos y sostenibles que conecten culturas, historias y territorios, creando valor y experiencias con impacto positivo a nivel global.'
                  : 'To be a company deeply focused on people, offering authentic and sustainable products that connect cultures, stories, and territories, creating value and experiences with a positive impact on a global level.'
                }
              </p>
            </div>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-6">
                {language === 'es' ? 'Visión' : 'Vision'}
              </h2>
              <p className="text-amber-100 text-lg leading-relaxed">
                {language === 'es'
                  ? 'Posicionar Alohja como una marca global que trascienda generaciones, llevando productos de calidad al mundo y conectando personas con historias auténticas'
                  : 'Position Alohja as a global brand that transcends generations, bringing quality products to the world and connecting people with authentic stories.'
                }
              </p>
            </div>
          </div>
        </div>
      </section>
      END OF PREVIOUS VERSION */}

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* About Section */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
                {language === 'es' ? 'Quienes Somos' : 'Who We Are'}
              </h1>
              <p className="text-lg text-gray-700 leading-relaxed">
                {language === 'es'
                  ? 'Somos Alohja Coffee, una empresa nacida del legado de nuestros abuelos, quienes dedicaron su vida al cultivo del café y al amor por la tierra. Nuestro propósito es continuar esta tradición cultivando bajo sombra, en armonía con la naturaleza, a la vez que apoyamos a las familias campesinas locales. «Nos comprometemos a ofrecer al mundo el mejor café de especialidad de Ecuador, con calidad, sostenibilidad y una historia auténtica en cada grano».'
                  : 'We are Alohja Coffee, a company born from the legacy of our grandparents, who dedicated their lives to coffee farming and love for the land. Our purpose is to continue this tradition by cultivating under shade, in harmony with nature, while supporting local farming families. We are committed to bringing the world Ecuador\'s finest specialty coffee — with quality, sustainability, and an authentic story in every bean.'
                }
              </p>
            </div>
            <div className="relative overflow-hidden rounded-xl shadow-2xl">
              <Image
                src="https://blog.torisoftt.com/videos/3.%20NOSOTROS/ERIKA%20Y%20RONALD.png"
                alt="Alohja Coffee Heritage"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
                unoptimized
              />
            </div>
          </div>
        </section>

        {/* Purpose Section */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center bg-amber-50 rounded-lg p-8">
            <div className="relative overflow-hidden rounded-xl shadow-lg">
              <Image
                src="https://blog.torisoftt.com/videos/quienesomos/agricultores%201.png"
                alt="Agricultores Alohja"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
                unoptimized
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-black mb-6">
                {language === 'es' ? 'Propósito' : 'Purpose'}
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                {language === 'es'
                  ? 'Generar una conexión real entre el productor y el consumidor a través de nuestros productos, haciendo que cada persona se sienta parte de un cambio verdadero'
                  : 'Generate a real connection between the producer and the consumer through our products, making each person feel part of a real change.'
                }
              </p>
            </div>
          </div>
        </section>

        {/* Values - Grid Cards */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-black text-center mb-12">
            {language === 'es' ? 'Valores Corporativos' : 'Corporate Values'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {corporateValues.map((value, index) => (
              <div key={index} className="group relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={value.image}
                    alt={language === 'es' ? value.es : value.en}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold text-xl mb-1">
                      {language === 'es' ? value.es : value.en}
                    </h3>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {language === 'es' ? value.description.es : value.description.en}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Values - Interactive Slideshow */}
        <section className="mb-16 space-y-8">
          <h2 className="text-3xl font-bold text-black text-center mb-12">
            {language === 'es' ? 'Explora Nuestros Valores' : 'Explore Our Values'}
          </h2>

          {/* Card Grande con animación tipo carrusel */}
          <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Main Content Area with AnimatePresence */}
            <div className="relative min-h-[500px] overflow-hidden">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentValue}
                  custom={direction}
                  initial={{ x: direction > 0 ? '100%' : '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: direction > 0 ? '-100%' : '100%' }}
                  transition={{
                    type: "tween",
                    ease: "easeInOut",
                    duration: 0.6
                  }}
                  className="absolute inset-0"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3 h-full">
                    {/* Image Section */}
                    <div className="relative lg:col-span-1 h-64 lg:h-auto">
                      <Image
                        src={corporateValues[currentValue].image}
                        alt={language === 'es' ? corporateValues[currentValue].es : corporateValues[currentValue].en}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>

                    {/* Text Content Section */}
                    <div className="lg:col-span-2 p-8 lg:p-12 flex flex-col justify-center relative bg-white">
                      <div className="space-y-6">
                        <h3 className="text-4xl lg:text-5xl font-bold text-gray-900">
                          {language === 'es' ? corporateValues[currentValue].es : corporateValues[currentValue].en}
                        </h3>
                        <p className="text-gray-700 text-xl lg:text-2xl leading-relaxed">
                          {language === 'es' ? corporateValues[currentValue].description.es : corporateValues[currentValue].description.en}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Arrows - Fuera del contenido animado */}
            <div className="absolute bottom-8 right-8 flex gap-3 z-10">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  prevValue()
                  setIsAutoPlaying(false)
                }}
                className="p-4 bg-amber-500 hover:bg-amber-600 text-white rounded-full shadow-lg transition-colors duration-200"
                aria-label="Valor anterior"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  nextValue()
                  setIsAutoPlaying(false)
                }}
                className="p-4 bg-amber-500 hover:bg-amber-600 text-white rounded-full shadow-lg transition-colors duration-200"
                aria-label="Siguiente valor"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>

            {/* Indicador de autoplay */}
            {isAutoPlaying && (
              <div className="absolute top-4 right-4 z-10">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </motion.div>
                  Auto
                </motion.div>
              </div>
            )}
          </div>

          {/* Thumbnails Navigation - Fuera de la card */}
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center gap-3 overflow-x-auto pb-2">
              {corporateValues.map((value, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.15, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => goToValue(index)}
                  className={`flex-shrink-0 relative rounded-xl overflow-hidden transition-all duration-300 ${
                    currentValue === index
                      ? 'ring-4 ring-amber-500 shadow-xl'
                      : 'opacity-60 hover:opacity-100 shadow-md'
                  }`}
                >
                  <div className="w-20 h-20 lg:w-24 lg:h-24">
                    <Image
                      src={value.image}
                      alt={language === 'es' ? value.es : value.en}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  </div>
                  {currentValue === index && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute inset-0 border-4 border-amber-500 rounded-xl"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Heritage Section */}
        <section className="text-center bg-green-50 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-black mb-6">
            {language === 'es' ? 'Nuestro Legado' : 'Our Heritage'}
          </h2>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed mb-12">
            {language === 'es'
              ? 'Desde las montañas de Ecuador hasta tu taza, cada grano cuenta una historia de tradición familiar, respeto por la naturaleza y compromiso con la excelencia. Somos más que una empresa de café: somos guardianes de una tradición que honra el pasado mientras construye un futuro sostenible.'
              : 'From the mountains of Ecuador to your cup, every bean tells a story of family tradition, respect for nature, and commitment to excellence. We are more than a coffee company: we are guardians of a tradition that honors the past while building a sustainable future.'
            }
          </p>

          {/* Image Gallery - Grid adaptativo */}
          <div className="max-w-7xl mx-auto">
            {/* Primeras 16 imágenes en grid de 4 columnas */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
              {galleryImages.slice(0, 16).map((img, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-lg shadow-md group cursor-pointer aspect-square bg-gray-100"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={`https://blog.torisoftt.com/videos/quienesomos/${encodeURIComponent(img)}`}
                    alt={`Nuestro legado ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      console.error(`Failed to load: ${img}`);
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            {/* Últimas 3 imágenes en grid de 3 columnas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {galleryImages.slice(16).map((img, index) => (
                <div
                  key={index + 16}
                  className="relative overflow-hidden rounded-lg shadow-md group cursor-pointer aspect-square bg-gray-100"
                  onClick={() => openLightbox(index + 16)}
                >
                  <img
                    src={`https://blog.torisoftt.com/videos/quienesomos/${img}`}
                    alt={`Nuestro legado ${index + 17}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 text-white hover:text-gray-300 z-50"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="max-w-6xl max-h-screen p-4" onClick={(e) => e.stopPropagation()}>
            <img
              src={`https://blog.torisoftt.com/videos/quienesomos/${galleryImages[currentImage]}`}
              alt={`Imagen ${currentImage + 1}`}
              className="max-h-[90vh] w-auto object-contain mx-auto"
            />
            <p className="text-white text-center mt-4 text-lg">
              {currentImage + 1} / {galleryImages.length}
            </p>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 text-white hover:text-gray-300 z-50"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      <Footer language={language} />
    </div>
  )
}