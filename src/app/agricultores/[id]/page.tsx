'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

// HARDCODED DATA - Mismos datos que en la página principal
const farmersData = {
  agricultores: [
    {
      id: "pablo-quezada",
      name: "Pablo Quezada",
      photo: "https://blog.torisoftt.com/videos/agricultores/pabloquezadaperfil.png",
      hasInterview: true,
      gender: "male",
      farmName: "Gran Chaparral",
      origin: "Portovelo – El Oro",
      varieties: ["Typica", "Gesha", "Bourbon", "Sidra"],
      altitude: "+ 1 110 masl / + 1 110 msnm",
      cultivationMethod: "Bajo sombra",
      quote: "Cada amanecer en el campo es una nueva oportunidad. Mi mayor deseo es que el esfuerzo de mis manos se vea reflejado en un café que cruce fronteras y dé orgullo a mi familia.",
      gallery: ["https://blog.torisoftt.com/videos/agricultores/pabloquezadaperfil.png"],
      interviewVideo: "https://blog.torisoftt.com/videos/agricultores/ENTREVISTAPABLOQUEZADA.mp4",
      individualVideo: null
    },
    {
      id: "armando-ramirez",
      name: "Armando Ramirez",
      photo: "https://blog.torisoftt.com/videos/agricultores/armandoramirezperfil.png",
      hasInterview: true,
      gender: "male",
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
      ],
      interviewVideo: "https://blog.torisoftt.com/videos/agricultores/ENTREVISTAARMANDORAMIREZ.mp4",
      individualVideo: null
    },
    {
      id: "elauterio-fajardo",
      name: "Elauterio Fajardo",
      photo: "https://blog.torisoftt.com/videos/agricultores/elauteriofajardoperfil.png",
      hasInterview: true,
      gender: "male",
      farmName: "Tandambo",
      origin: "Paltas - Loja",
      varieties: ["Bourbon"],
      altitude: "+ 1 700 masl / + 1 700 msnm",
      cultivationMethod: "Bajo sombra",
      quote: "Con cada grano que recojo pienso en un futuro mejor para mis hijos. Quiero que la calidad de nuestro café sea valorada y que nuestra voz como agricultores se escuche en el mundo.",
      gallery: ["https://blog.torisoftt.com/videos/agricultores/elauteriofajardoperfil.png"],
      interviewVideo: "https://blog.torisoftt.com/videos/ENTREVISTA%20ELAUTERIO%20FAJARDO.mp4",
      individualVideo: "https://blog.torisoftt.com/videos/agricultores/elauteriofajardovideo.mp4"
    },
    {
      id: "edita-collaguazo",
      name: "Edita Collaguazo",
      photo: "https://blog.torisoftt.com/videos/agricultores/elbitacollaguazoperfil.png",
      hasInterview: true,
      gender: "female",
      farmName: "Tandambo",
      origin: "Paltas - Loja",
      varieties: ["Bourbon"],
      altitude: "+ 1 700 masl / + 1 700 msnm",
      cultivationMethod: "Bajo sombra",
      quote: "Cada grano que selecciono lleva consigo mi esperanza de progreso. Sueño con que las mujeres del campo tengamos más oportunidades y que nuestro esfuerzo sea visible.",
      gallery: ["https://blog.torisoftt.com/videos/agricultores/elbitacollaguazoperfil.png"],
      interviewVideo: "https://blog.torisoftt.com/videos/ENTREVISTA%20ELBITA%20COLLAGUAZO.mp4",
      individualVideo: "https://blog.torisoftt.com/videos/agricultores/elbitacollaguazovideo.mp4"
    },
    {
      id: "mercy-espinosa",
      name: "Mercy Espinosa",
      photo: "https://blog.torisoftt.com/videos/agricultores/mercyespinozaperfil.png",
      hasInterview: false,
      gender: "female",
      farmName: "La Esperanza",
      origin: "Portovelo - Loja",
      varieties: ["Gesha", "Sidra"],
      altitude: "+ 1 200 masl / + 1 200 msnm",
      cultivationMethod: "Bajo sombra",
      quote: "Cuidar el café es cuidar la vida. Anhelo que nuestro trabajo llegue lejos, y que se reconozca el valor de quienes lo hacemos con dedicación y amor.",
      gallery: ["https://blog.torisoftt.com/videos/agricultores/mercyespinozaperfil.png"],
      individualVideo: null
    }
  ],
  fincas: [
    {
      id: "alohja",
      name: "Finca Alohja",
      photo: null,
      hasInterview: false,
      gender: "neutral",
      farmName: "Alohja coffee",
      origin: "Portovelo – El Oro",
      varieties: ["Gesha", "Sidra", "Bourbon", "Typica"],
      altitude: "+ 1 400 masl / + 1 400 msnm",
      cultivationMethod: "Bajo sombra",
      quote: "Cuidar el café es cuidar la vida. Anhelo que nuestro trabajo llegue lejos, y que se reconozca el valor de quienes lo hacemos con dedicación y amor.",
      gallery: [],
      interviewVideo: null,
      individualVideo: null
    },
    {
      id: "alohja-pichincha",
      name: "Finca Pichincha",
      photo: null,
      hasInterview: false,
      gender: "neutral",
      farmName: "Alohja Pichincha",
      origin: "Nanegal - Pichincha",
      varieties: ["Sidra", "Bourbon", "Typica"],
      altitude: "+ 1 500 masl / + 1 400 msnm",
      cultivationMethod: "Bajo sombra",
      quote: "Cuidar el café es cuidar la vida. Anhelo que nuestro trabajo llegue lejos, y que se reconozca el valor de quienes lo hacemos con dedicación y amor.",
      gallery: [],
      interviewVideo: null,
      individualVideo: null
    }
  ]
}

export default function FarmerDetailPage() {
  const [language, setLanguage] = useState<'es' | 'en'>('es')
  const [selectedImage, setSelectedImage] = useState(0)
  const params = useParams()
  const router = useRouter()

  const farmerId = params.id as string

  // Buscar el agricultor/finca
  const farmer = [...farmersData.agricultores, ...farmersData.fincas].find(f => f.id === farmerId)

  if (!farmer) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation language={language} setLanguage={setLanguage} />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {language === 'es' ? 'Agricultor no encontrado' : 'Farmer not found'}
          </h1>
          <button
            onClick={() => router.push('/agricultores')}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
          >
            {language === 'es' ? 'Volver a Agricultores' : 'Back to Farmers'}
          </button>
        </div>
        <Footer language={language} />
      </div>
    )
  }

  // Tabla de información como la especificaste
  const infoTable = [
    {
      label: language === 'es' ? 'Nombre de la Finca' : 'Farm name',
      value: farmer.farmName
    },
    {
      label: language === 'es' ? 'Origen' : 'Origin',
      value: farmer.origin
    },
    {
      label: language === 'es' ? 'Variedad de cultivo' : 'Cultivated variety',
      value: farmer.varieties
    },
    {
      label: language === 'es' ? 'Altitud del cultivo' : 'Crop Altitude',
      value: farmer.altitude
    },
    {
      label: language === 'es' ? 'Método de cultivo' : 'Cultivation method',
      value: farmer.cultivationMethod
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation language={language} setLanguage={setLanguage} />

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Back Button */}
        <button
          onClick={() => router.push('/agricultores')}
          className="flex items-center gap-2 text-green-600 hover:text-green-700 mb-8 group transition-all"
        >
          <span className="transform group-hover:-translate-x-1 transition-transform">←</span>
          {language === 'es' ? 'Volver a Agricultores' : 'Back to Farmers'}
        </button>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{farmer.name}</h1>
          <p className="text-xl text-gray-600">{farmer.farmName} - {farmer.origin}</p>
          {farmer.hasInterview && (
            <div className="mt-4">
              <span className="inline-flex items-center gap-2 bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-bold">
                🎥 {language === 'es' ? 'Con Video de Entrevista' : 'With Interview Video'}
              </span>
            </div>
          )}
        </div>

        {/* Nuevo layout unificado: Info arriba, Video medio, Frase abajo */}
        <div className="space-y-16">
          {/* Video de Entrevista centrado para agricultores con entrevista */}
          {farmer.hasInterview && (
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {language === 'es' ? 'Video de Entrevista' : 'Interview Video'}
                </h2>
                <p className="text-gray-600">
                  {language === 'es'
                    ? 'Conoce la historia personal detrás del café'
                    : 'Learn the personal story behind the coffee'
                  }
                </p>
              </div>

              {farmer.interviewVideo ? (
                <div className="aspect-square bg-gray-900 rounded-2xl overflow-hidden shadow-2xl max-w-3xl mx-auto">
                  <video
                    className="w-full h-full object-cover"
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={farmer.photo || '/assets/fotosinicio/foto paisaje.jpg'}
                  >
                    <source src={farmer.interviewVideo} type="video/mp4" />
                    {language === 'es'
                      ? 'Tu navegador no soporta el elemento de video.'
                      : 'Your browser does not support the video element.'
                    }
                  </video>
                </div>
              ) : (
                <div className="aspect-square bg-gradient-to-br from-green-600 to-amber-600 rounded-2xl flex items-center justify-center shadow-2xl max-w-3xl mx-auto">
                  <div className="text-center text-white">
                    <div className="text-6xl mb-4">🎥</div>
                    <p className="text-lg font-medium">
                      {language === 'es' ? 'Video próximamente' : 'Video coming soon'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 1. Información del Agricultor - Arriba */}
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {language === 'es' ? 'Información del Agricultor' : 'Farmer Information'}
            </h2>

            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
              <table className="w-full">
                <tbody>
                  {infoTable.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 py-5 font-semibold text-gray-700 border-b border-gray-200 w-1/2 text-lg">
                        {row.label}
                      </td>
                      <td className="px-6 py-5 text-gray-900 border-b border-gray-200">
                        {Array.isArray(row.value) ? (
                          <div className="flex flex-wrap gap-2">
                            {row.value.map((item, idx) => (
                              <span
                                key={idx}
                                className="bg-green-100 text-green-800 px-3 py-2 rounded-full text-sm font-medium"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="font-medium text-lg">{row.value}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 2. Video Individual - Medio */}
          {farmer.individualVideo && farmer.gender !== 'neutral' && (
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {language === 'es'
                    ? (farmer.gender === 'female' ? 'Video de la Agricultora' : 'Video del Agricultor')
                    : (farmer.gender === 'female' ? 'Female Farmer Video' : 'Farmer Video')
                  }
                </h2>
                <p className="text-gray-600">
                  {language === 'es'
                    ? 'Conoce más sobre el trabajo diario en la finca'
                    : 'Learn more about daily work on the farm'
                  }
                </p>
              </div>

              {farmer.individualVideo ? (
                <div className="aspect-square bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
                  <video
                    className="w-full h-full object-cover"
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={farmer.photo || '/assets/fotosinicio/foto paisaje.jpg'}
                  >
                    <source src={farmer.individualVideo} type="video/mp4" />
                    {language === 'es'
                      ? 'Tu navegador no soporta el elemento de video.'
                      : 'Your browser does not support the video element.'
                    }
                  </video>
                </div>
              ) : (
                <div className="aspect-square bg-gradient-to-br from-green-600 to-amber-600 rounded-2xl flex items-center justify-center shadow-2xl">
                  <div className="text-center text-white">
                    <div className="text-6xl mb-4">🎥</div>
                    <p className="text-lg font-medium">
                      {language === 'es' ? 'Video próximamente' : 'Video coming soon'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 3. Frase del Agricultor - Abajo */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {language === 'es' ? 'Testimonio Personal' : 'Personal Testimony'}
            </h2>
            <div className="bg-gradient-to-r from-green-50 to-amber-50 border border-green-200 rounded-2xl p-10 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center justify-center gap-2">
                💬 {language === 'es' ? 'Palabras del Agricultor' : 'Farmer\'s Words'}
              </h3>
              <blockquote className="text-gray-700 italic text-xl leading-relaxed text-center">
                &ldquo;{farmer.quote}&rdquo;
              </blockquote>
            </div>
          </div>
        </div>

        {/* 4. Gallery Section - Más espaciada */}
        {farmer.gallery && farmer.gallery.length > 0 && (
          <div className="mb-20 mt-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
                📸 {language === 'es' ? 'Galería de Fotos' : 'Photo Gallery'}
              </h2>
              <p className="text-gray-600 text-lg">
                {language === 'es'
                  ? 'Momentos capturados en la vida del agricultor y su finca'
                  : 'Captured moments in the life of the farmer and their farm'
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {farmer.gallery.map((image, index) => (
                <div
                  key={index}
                  className="aspect-square relative overflow-hidden rounded-2xl cursor-pointer group shadow-lg"
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image}
                    alt={`${farmer.name} - Foto ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
                        <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Image number badge */}
                  <div className="absolute top-4 right-4">
                    <span className="bg-black/70 text-white px-2 py-1 rounded-full text-xs font-bold">
                      {index + 1} / {farmer.gallery.length}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Additional Information */}
        <div className="bg-gradient-to-r from-amber-50 via-yellow-50 to-green-50 rounded-2xl p-8 shadow-lg">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {language === 'es' ? '¿Interesado en conocer más?' : 'Interested in learning more?'}
            </h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              {language === 'es'
                ? 'Cada agricultor tiene una historia única que contar. Explora más historias de nuestros productores de café.'
                : 'Every farmer has a unique story to tell. Explore more stories from our coffee producers.'
              }
            </p>
            <button
              onClick={() => router.push('/agricultores')}
              className="bg-gradient-to-r from-green-600 to-amber-600 hover:from-green-700 hover:to-amber-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {language === 'es' ? 'Ver Más Agricultores' : 'View More Farmers'} →
            </button>
          </div>
        </div>
      </div>

      <Footer language={language} />
    </div>
  )
}