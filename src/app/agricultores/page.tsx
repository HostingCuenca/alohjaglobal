'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function FarmersPage() {
  const [language, setLanguage] = useState<'es' | 'en'>('es')

  const farmers = [
    {
      name: 'Pablo Quezada',
      farm: 'Gran Chaparral',
      origin: 'Portovelo',
      varieties: 'Typica – Gesha- Bourbon - Sidra',
      altitude: '+ 1 110 masl / + 1 110 msnm',
      method: {
        es: 'Bajo sombra',
        en: 'Under shade'
      },
      quote: {
        es: 'Cada amanecer en el campo es una nueva oportunidad. Mi mayor deseo es que el esfuerzo de mis manos se vea reflejado en un café que cruce fronteras y dé orgullo a mi familia.',
        en: 'Every dawn in the field is a new opportunity. My greatest desire is that the effort of my hands be reflected in a coffee that crosses borders and gives pride to my family.'
      }
    },
    {
      name: 'Armando Ramirez',
      farm: 'Don Tavo',
      origin: 'Paltas',
      varieties: 'Bourbon- Gesha',
      altitude: '+ 1 750 masl / + 1 750 msnm',
      method: {
        es: 'Bajo sombra',
        en: 'Under shade'
      },
      quote: {
        es: 'Sembrar café es sembrar esperanza. Sueño con que nuestro trabajo sea reconocido, para que las próximas generaciones encuentren en la tierra un camino digno de progreso.',
        en: 'Planting coffee is planting hope. I dream that our work will be recognized, so that future generations find in the land a dignified path of progress.'
      }
    },
    {
      name: 'Elauterio Fajardo',
      farm: 'Tandambo',
      origin: 'Paltas',
      varieties: 'Bourbon',
      altitude: '+ 1 700 masl / + 1 700 msnm',
      method: {
        es: 'Bajo sombra',
        en: 'Under shade'
      },
      quote: {
        es: 'Con cada grano que recojo pienso en un futuro mejor para mis hijos. Quiero que la calidad de nuestro café sea valorada y que nuestra voz como agricultores se escuche en el mundo.',
        en: 'With every bean I pick, I think of a better future for my children. I want the quality of our coffee to be valued and our voice as farmers to be heard in the world.'
      }
    },
    {
      name: 'Edita Collaguazo',
      farm: 'Tandambo',
      origin: 'Paltas',
      varieties: 'Bourbon',
      altitude: '+ 1 700 masl / + 1 700 msnm',
      method: {
        es: 'Bajo sombra',
        en: 'Under shade'
      },
      quote: {
        es: 'Cada grano que selecciono lleva consigo mi esperanza de progreso. Sueño con que las mujeres del campo tengamos más oportunidades y que nuestro esfuerzo sea visible.',
        en: 'Every bean I select carries with it my hope for progress. I dream that women in the countryside have more opportunities and that our effort is visible.'
      }
    },
    {
      name: 'Victoria Fajardo',
      farm: 'Reina del Cisne',
      origin: 'Paltas',
      varieties: 'Bourbon',
      altitude: '+ 1 600 masl / + 1 600 msnm',
      method: {
        es: 'Bajo sombra',
        en: 'Under shade'
      },
      quote: {
        es: 'Trabajar la tierra es mi orgullo. Mi deseo es que el sacrificio de cada jornada abra puertas para que mi futuro y el de mis hijos sea próspero y se abran más posibilidades.',
        en: 'Working the land is my pride. My desire is that the sacrifice of each day opens doors so that my future and that of my children is prosperous and more possibilities open up.'
      }
    },
    {
      name: 'Mercy Espinosa',
      farm: 'La Esperanza',
      origin: 'Portovelo',
      varieties: 'Gesha- Sidra',
      altitude: '+ 1 200 masl / + 1 200 msnm',
      method: {
        es: 'Bajo sombra',
        en: 'Under shade'
      },
      quote: {
        es: 'Cuidar el café es cuidar la vida. Anhelo que nuestro trabajo llegue lejos, y que se reconozca el valor de quienes lo hacemos con dedicación y amor.',
        en: 'Taking care of coffee is taking care of life. I long for our work to go far, and for the value of those who do it with dedication and love to be recognized.'
      }
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation language={language} setLanguage={setLanguage} />

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
            {language === 'es' ? 'Nuestros Agricultores' : 'Our Farmers'}
          </h1>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            {language === 'es'
              ? '"En cada grano de café late la historia de manos trabajadoras que, con paciencia y amor por la tierra, cultivan sueños entre montañas. Nuestros agricultores, guardianes de la calidad, seleccionan con cuidado cada fruto, transformando esfuerzo y tradición en la esencia de un café único."'
              : '"Within every coffee bean lives the story of hardworking hands that, with patience and love for the land, nurture dreams among the mountains. Our farmers, guardians of quality, carefully select each harvest, transforming effort and tradition into the essence of a unique coffee."'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {farmers.map((farmer, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400">
                  {farmer.name}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-black mb-4">{farmer.name}</h3>

                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">
                      {language === 'es' ? 'Finca:' : 'Farm:'}
                    </span>
                    <span>{farmer.farm}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">
                      {language === 'es' ? 'Origen:' : 'Origin:'}
                    </span>
                    <span>{farmer.origin}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">
                      {language === 'es' ? 'Variedades:' : 'Varieties:'}
                    </span>
                    <span className="text-right">{farmer.varieties}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">
                      {language === 'es' ? 'Altitud:' : 'Altitude:'}
                    </span>
                    <span>{farmer.altitude}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">
                      {language === 'es' ? 'Método:' : 'Method:'}
                    </span>
                    <span>{language === 'es' ? farmer.method.es : farmer.method.en}</span>
                  </div>
                </div>

                <blockquote className="text-gray-600 italic text-sm mb-4 border-l-4 border-yellow-500 pl-4">
                  &ldquo;{language === 'es' ? farmer.quote.es : farmer.quote.en}&rdquo;
                </blockquote>

                <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 px-4 rounded-lg transition-colors">
                  {language === 'es' ? 'Ver Perfil Completo' : 'View Full Profile'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer language={language} />
    </div>
  )
}