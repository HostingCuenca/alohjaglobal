'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

// HARDCODED DATA - Basado en JSON proporcionado
const farmersData = {
  agricultores: [
    {
      id: "pablo-quezada",
      name: "Pablo Quezada",
      photo: "https://blog.torisoftt.com/videos/agricultores/pabloquezadaperfil.png",
      hasInterview: true,
      farmName: "Gran Chaparral",
      origin: "Portovelo – El Oro",
      varieties: ["Typica", "Gesha", "Bourbon", "Sidra"],
      altitude: "+ 1 110 masl / + 1 110 msnm",
      cultivationMethod: "Bajo sombra",
      quote: "Cada amanecer en el campo es una nueva oportunidad. Mi mayor deseo es que el esfuerzo de mis manos se vea reflejado en un café que cruce fronteras y dé orgullo a mi familia.",
      gallery: ["https://blog.torisoftt.com/videos/agricultores/pabloquezadaperfil.png"]
    },
    {
      id: "armando-ramirez",
      name: "Armando Ramirez",
      photo: "https://blog.torisoftt.com/videos/agricultores/armandoramirezperfil.png",
      hasInterview: true,
      farmName: "Don Tavo",
      origin: "Paltas - Loja",
      varieties: ["Bourbon", "Gesha"],
      altitude: "+ 1 750 masl / + 1 750 msnm",
      cultivationMethod: "Bajo sombra",
      quote: "Sembrar café es sembrar esperanza. Sueño con que nuestro trabajo sea reconocido, para que las próximas generaciones encuentren en la tierra un camino digno de progreso.",
      gallery: [
        "https://blog.torisoftt.com/videos/agricultores/armandoramirez.png",
        "https://blog.torisoftt.com/videos/agricultores/armandoramirez2.png",
        "https://blog.torisoftt.com/videos/agricultores/armandoramirezperfil.png"
      ]
    },
    {
      id: "elauterio-fajardo",
      name: "Elauterio Fajardo",
      photo: "https://blog.torisoftt.com/videos/agricultores/elauteriofajardoperfil.png",
      hasInterview: false,
      farmName: "Tandambo",
      origin: "Paltas - Loja",
      varieties: ["Bourbon"],
      altitude: "+ 1 700 masl / + 1 700 msnm",
      cultivationMethod: "Bajo sombra",
      quote: "Con cada grano que recojo pienso en un futuro mejor para mis hijos. Quiero que la calidad de nuestro café sea valorada y que nuestra voz como agricultores se escuche en el mundo.",
      gallery: ["https://blog.torisoftt.com/videos/agricultores/elauteriofajardoperfil.png"]
    },
    {
      id: "edita-collaguazo",
      name: "Edita Collaguazo",
      photo: "https://blog.torisoftt.com/videos/agricultores/elbitacollaguazoperfil.png",
      hasInterview: false,
      farmName: "Tandambo",
      origin: "Paltas - Loja",
      varieties: ["Bourbon"],
      altitude: "+ 1 700 masl / + 1 700 msnm",
      cultivationMethod: "Bajo sombra",
      quote: "Cada grano que selecciono lleva consigo mi esperanza de progreso. Sueño con que las mujeres del campo tengamos más oportunidades y que nuestro esfuerzo sea visible.",
      gallery: ["https://blog.torisoftt.com/videos/agricultores/elbitacollaguazoperfil.png"]
    },
    {
      id: "mercy-espinosa",
      name: "Mercy Espinosa",
      photo: "https://blog.torisoftt.com/videos/agricultores/mercyespinozaperfil.png",
      hasInterview: false,
      farmName: "La Esperanza",
      origin: "Portovelo - Loja",
      varieties: ["Gesha", "Sidra"],
      altitude: "+ 1 200 masl / + 1 200 msnm",
      cultivationMethod: "Bajo sombra",
      quote: "Cuidar el café es cuidar la vida. Anhelo que nuestro trabajo llegue lejos, y que se reconozca el valor de quienes lo hacemos con dedicación y amor.",
      gallery: ["https://blog.torisoftt.com/videos/agricultores/mercyespinozaperfil.png"]
    }
  ],
  fincas: [
    {
      id: "alohja",
      name: "Finca Alohja",
      photo: null,
      hasInterview: false,
      farmName: "Alohja coffee",
      origin: "Portovelo – El Oro",
      varieties: ["Gesha", "Sidra", "Bourbon", "Typica"],
      altitude: "+ 1 400 masl / + 1 400 msnm",
      cultivationMethod: "Bajo sombra",
      quote: "Cuidar el café es cuidar la vida. Anhelo que nuestro trabajo llegue lejos, y que se reconozca el valor de quienes lo hacemos con dedicación y amor.",
      gallery: []
    },
    {
      id: "alohja-pichincha",
      name: "Finca Pichincha",
      photo: null,
      hasInterview: false,
      farmName: "Alohja Pichincha",
      origin: "Nanegal - Pichincha",
      varieties: ["Sidra", "Bourbon", "Typica"],
      altitude: "+ 1 500 masl / + 1 400 msnm",
      cultivationMethod: "Bajo sombra",
      quote: "Cuidar el café es cuidar la vida. Anhelo que nuestro trabajo llegue lejos, y que se reconozca el valor de quienes lo hacemos con dedicación y amor.",
      gallery: []
    }
  ]
}

export default function FarmersPage() {
  const [language, setLanguage] = useState<'es' | 'en'>('es')
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

  // Auto-rotate images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % coffeeImages.length
      )
    }, 4000)

    return () => clearInterval(interval)
  }, [coffeeImages.length])

  const handleViewFarmerProfile = (farmerId: string) => {
    router.push(`/agricultores/${farmerId}`)
  }

  const allFarmers = [...farmersData.agricultores, ...farmersData.fincas]

  return (
    <div className="min-h-screen bg-white">
      <Navigation language={language} setLanguage={setLanguage} />

      {/* Hero Video Section */}
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
              <source src="https://blog.torisoftt.com/videos/inicio-agricultores.mp4" type="video/mp4" />
              {language === 'es'
                ? 'Tu navegador no soporta el elemento de video.'
                : 'Your browser does not support the video element.'
              }
            </video>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header */}
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

        {/* Inspirational Section with Slideshow */}
        <div className="mb-16 relative">
          <div className="bg-gradient-to-r from-amber-50 via-yellow-50 to-green-50 rounded-2xl p-8 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Slideshow */}
              <div className="relative h-80 rounded-xl overflow-hidden group">
                <img
                  src={coffeeImages[currentImageIndex].src}
                  alt={coffeeImages[currentImageIndex].alt}
                  className="w-full h-full object-cover transition-all duration-1000 ease-in-out opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <span className="bg-black/60 px-3 py-1 rounded-lg text-sm font-medium">
                    {coffeeImages[currentImageIndex].label[language]}
                  </span>
                </div>
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

              {/* Content */}
              <div className="space-y-4">
                <span className="inline-block bg-amber-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                  ☕ {language === 'es' ? 'Nuestra Esencia' : 'Our Essence'}
                </span>
                <p className="text-lg text-gray-700 leading-relaxed italic">
                  {language === 'es'
                    ? '"En cada grano de café late la historia de manos trabajadoras que, con paciencia y amor por la tierra, cultivan sueños entre montañas."'
                    : '"Within every coffee bean lives the story of hardworking hands that, with patience and love for the land, nurture dreams among the mountains."'
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

        {/* Farmers Section - Layout en filas */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {language === 'es' ? 'Nuestros Agricultores' : 'Our Farmers'}
            </h2>
            <div className="h-1 flex-1 bg-gradient-to-r from-green-400 to-transparent ml-6"></div>
          </div>

          <div className="space-y-8">
            {farmersData.agricultores.map((farmer, index) => (
              <div key={farmer.id} className="group relative">
                {/* Card Container en fila */}
                <div className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-700 ease-out ${
                  index % 2 === 0 ? '' : 'lg:flex-row-reverse'
                } flex flex-col lg:flex-row`}>

                  {/* Profile Image Section */}
                  <div className="lg:w-1/3 h-64 lg:h-auto relative overflow-hidden bg-gradient-to-br from-green-100 to-amber-100">
                    {farmer.photo ? (
                      <img
                        src={farmer.photo}
                        alt={farmer.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-green-600 to-amber-600 flex items-center justify-center">
                        <div className="text-center text-white">
                          <div className="text-4xl mb-3">🏔️</div>
                          <h3 className="text-lg font-bold">{farmer.name}</h3>
                          <p className="text-sm opacity-90">{farmer.origin}</p>
                        </div>
                      </div>
                    )}

                    {/* Overlay with gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"></div>

                    {/* Farm Name Badge */}
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-amber-500/90 text-black px-3 py-1 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm">
                        🏡 {farmer.farmName}
                      </span>
                    </div>

                    {/* Interview Badge */}
                    {farmer.hasInterview && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-red-500/90 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm">
                          🎥 {language === 'es' ? 'Entrevista' : 'Interview'}
                        </span>
                      </div>
                    )}

                    {/* Hover Overlay Info */}
                    <div className="absolute top-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out">
                      <p className="text-sm font-medium bg-black/50 px-3 py-1 rounded-lg backdrop-blur-sm">
                        {farmer.altitude}
                      </p>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="lg:w-2/3 p-8 flex flex-col justify-between">
                    {/* Header Info */}
                    <div className="mb-6">
                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">{farmer.name}</h3>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                          ☕ {farmer.varieties.length} {language === 'es' ? 'Variedades' : 'Varieties'}
                        </span>
                      </div>

                      <p className="text-gray-600 flex items-center gap-2 mb-4">
                        <span className="text-green-600">📍</span>
                        <span className="font-medium">{farmer.origin}</span>
                      </p>

                      {/* Varieties */}
                      <div className="mb-6">
                        <p className="text-sm text-gray-500 mb-3 font-medium uppercase tracking-wide">
                          {language === 'es' ? 'Variedades de Cultivo:' : 'Coffee Varieties:'}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {farmer.varieties.map((variety, idx) => (
                            <span
                              key={idx}
                              className="bg-amber-100 text-amber-800 px-3 py-2 rounded-lg text-sm font-medium border border-amber-200"
                            >
                              {variety}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Quote */}
                      <blockquote className="text-gray-700 italic text-lg leading-relaxed border-l-4 border-green-500 pl-6 bg-green-50 p-6 rounded-r-xl">
                        &ldquo;{farmer.quote}&rdquo;
                      </blockquote>
                    </div>

                    {/* Action Button */}
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleViewFarmerProfile(farmer.id)}
                        className="bg-gradient-to-r from-green-600 to-amber-600 hover:from-green-700 hover:to-amber-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-400 ease-out transform hover:scale-102 shadow-lg hover:shadow-lg"
                      >
                        {language === 'es' ? 'Conocer Historia' : 'Learn Story'} →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Farms Grid - Sección Separada */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {language === 'es' ? 'Nuestras Fincas' : 'Our Farms'}
            </h2>
            <div className="h-1 flex-1 bg-gradient-to-r from-amber-400 to-transparent ml-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {farmersData.fincas.map((finca) => (
              <div key={finca.id} className="group relative">
                {/* Card Container - Más grande para fincas */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-700 ease-out transform hover:-translate-y-1">

                  {/* Farm Image */}
                  <div className="h-64 relative overflow-hidden bg-gradient-to-br from-amber-100 to-green-100">
                    {finca.photo ? (
                      <img
                        src={finca.photo}
                        alt={finca.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
                      />
                    ) : (
                      // Fallback for farms
                      <div className="w-full h-full bg-gradient-to-br from-amber-600 to-green-600 flex items-center justify-center">
                        <div className="text-center text-white">
                          <div className="text-6xl mb-4">🏔️</div>
                          <h3 className="text-xl font-bold">{finca.name}</h3>
                          <p className="text-sm opacity-90 mt-2">{finca.origin}</p>
                        </div>
                      </div>
                    )}

                    {/* Overlay with gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"></div>

                    {/* Farm Name Badge */}
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-amber-500/90 text-black px-4 py-2 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm">
                        🏢 {finca.farmName}
                      </span>
                    </div>

                    {/* Varieties Badge */}
                    <div className="absolute bottom-4 right-4">
                      <span className="bg-green-500/90 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm">
                        ☕ {finca.varieties.length} {language === 'es' ? 'Variedades' : 'Varieties'}
                      </span>
                    </div>

                    {/* Hover Overlay Info */}
                    <div className="absolute top-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-sm font-medium bg-black/50 px-3 py-2 rounded-lg backdrop-blur-sm inline-block">
                        {finca.altitude}
                      </p>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    {/* Name and Origin */}
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{finca.name}</h3>
                      <p className="text-base text-gray-600 flex items-center gap-2">
                        <span className="text-amber-600">📍</span>
                        {finca.origin}
                      </p>
                    </div>

                    {/* Varieties */}
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-2 font-medium">
                        {language === 'es' ? 'VARIEDADES CULTIVADAS:' : 'CULTIVATED VARIETIES:'}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {finca.varieties.map((variety, index) => (
                          <span
                            key={index}
                            className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {variety}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Quote */}
                    <blockquote className="text-gray-700 italic text-base mb-6 border-l-4 border-amber-500 pl-4 bg-amber-50 p-4 rounded-r-lg">
                      &ldquo;{finca.quote}&rdquo;
                    </blockquote>

                    {/* Action Button */}
                    <button
                      onClick={() => handleViewFarmerProfile(finca.id)}
                      className="w-full bg-gradient-to-r from-amber-600 to-green-600 hover:from-amber-700 hover:to-green-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-400 ease-out transform hover:scale-102 shadow-lg hover:shadow-lg"
                    >
                      {language === 'es' ? 'Conocer Finca' : 'Learn About Farm'} →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section - Actualizada */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{farmersData.agricultores.length}</div>
            <div className="text-sm text-green-700 font-medium">
              {language === 'es' ? 'Agricultores' : 'Farmers'}
            </div>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-amber-600 mb-2">{farmersData.fincas.length}</div>
            <div className="text-sm text-amber-700 font-medium">
              {language === 'es' ? 'Fincas' : 'Farms'}
            </div>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">
              {farmersData.agricultores.filter(f => f.hasInterview).length}
            </div>
            <div className="text-sm text-red-700 font-medium">
              {language === 'es' ? 'Entrevistas' : 'Interviews'}
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {[...new Set([...farmersData.agricultores, ...farmersData.fincas].flatMap(f => f.varieties))].length}
            </div>
            <div className="text-sm text-blue-700 font-medium">
              {language === 'es' ? 'Variedades' : 'Varieties'}
            </div>
          </div>
        </div>
      </div>

      <Footer language={language} />
    </div>
  )
}