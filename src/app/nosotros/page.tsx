'use client'

import { useState } from 'react'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function AboutUsPage() {
  const [language, setLanguage] = useState<'es' | 'en'>('es')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)

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
              <source src="https://blog.torisoftt.com/videos/quienes-somos.mp4" type="video/mp4" />
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
      <section>
        <div className="w-full">
          <Image
            src="/assets/nuestrosvalores.png"
            alt={language === 'es' ? 'Nuestros Valores - Alohja Coffee' : 'Our Values - Alohja Coffee'}
            width={1920}
            height={800}
            className="w-full h-auto object-cover"
          />
        </div>
      </section>

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
                src="https://blog.torisoftt.com/videos/quienesomos/10.png"
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

        {/* Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-black text-center mb-12">
            {language === 'es' ? 'Valores Corporativos' : 'Corporate Values'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                es: 'Confianza en nuestros productos – Inspiramos seguridad y orgullo en quienes nos eligen.',
                en: 'Confidence in our products – We inspire confidence and pride in those who choose us.'
              },
              {
                es: 'Calidad – garantizamos excelencia en todo lo que hacemos.',
                en: 'Quality – We guarantee excellence in everything we do.'
              },
              {
                es: 'Sostenibilidad – Cuidamos el planeta y las comunidades.',
                en: 'Sustainability – We care for the planet and communities.'
              },
              {
                es: 'Innovación – Creamos nuevas formas de inspirar y sorprender.',
                en: 'Innovation – We create new ways to inspire and surprise.'
              },
              {
                es: 'Transparencia – Procesos claros que generan confianza.',
                en: 'Transparency – Clear processes that build trust.'
              },
              {
                es: 'Inspiración – Motivamos a otros a ser parte de algo significativo.',
                en: 'Inspiration – We motivate others to be part of something meaningful.'
              },
              {
                es: 'Ética - Tomamos decisiones correctas y responsables, basadas en integridad, respeto y justicia en todas nuestras acciones.',
                en: 'Ethics - We make correct and responsible decisions, based on integrity, respect and justice in all our actions.'
              },
              {
                es: 'Comercio justo: garantizamos el pago justo y digno que merecen los productores',
                en: 'Fair trade -- We guarantee the fair and dignified payment that producers deserve.'
              }
            ].map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <p className="text-gray-700 text-sm">
                  {language === 'es' ? value.es : value.en}
                </p>
              </div>
            ))}
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