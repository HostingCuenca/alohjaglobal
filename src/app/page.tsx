'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'
import { products } from '@/data/products'

export default function Home() {
  const [language, setLanguage] = useState<'es' | 'en'>('es')

  // Get featured products (carefully selected variety for homepage)
  const featuredProducts = products.filter(p => p.isActive && [
    'coffee-alta-montana',          // Ground light roast
    'coffee-cordillera',            // Ground dark roast
    'whole-bean-light-340',         // Whole bean light
    'whole-bean-dark-340'           // Whole bean dark
  ].includes(p.id))

  return (
    <div className="min-h-screen bg-white">
      <Navigation language={language} setLanguage={setLanguage} />
      <Hero language={language} />

      {/* Our Process Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              {language === 'es' ? 'Nuestro Proceso' : 'Our Process'}
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              {language === 'es'
                ? 'Desde el cultivo hasta la taza: un proceso cuidadoso que preserva la calidad y sostenibilidad en cada etapa.'
                : 'From cultivation to cup: a careful process that preserves quality and sustainability at every stage.'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Paso 1: Cultivo bajo sombra */}
            <div className="relative group overflow-hidden rounded-xl shadow-xl bg-white">
              <div className="aspect-[3/2] relative">
                <Image
                  src="/assets/fotosinicio/persona recolectando granos.jpg"
                  alt={language === 'es' ? 'Cultivo bajo sombra' : 'Shade cultivation'}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/70 transition-all duration-300 flex items-end">
                <div className="p-8 text-white w-full">
                  <div className="bg-green-500 text-white text-sm font-bold px-4 py-2 rounded-full mb-4 inline-block">
                    {language === 'es' ? 'PASO 1' : 'STEP 1'}
                  </div>
                  <h3 className="font-bold text-2xl mb-3">
                    {language === 'es' ? 'Cultivo bajo sombra' : 'Shade Cultivation'}
                  </h3>
                  <p className="text-base opacity-95 leading-relaxed">
                    {language === 'es'
                      ? 'El cultivo bajo sombra protege la biodiversidad, conserva los suelos y fomenta un ecosistema sostenible, donde el café crece en equilibrio con la naturaleza.'
                      : 'Shade cultivation protects biodiversity, conserves soil and fosters a sustainable ecosystem, where coffee grows in balance with nature.'
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Paso 2: Recolección */}
            <div className="relative group overflow-hidden rounded-xl shadow-xl bg-white">
              <div className="aspect-[3/2] relative">
                <Image
                  src="/assets/fotosinicio/recoleccionn.jpg"
                  alt={language === 'es' ? 'Recolección manual de granos de café' : 'Manual coffee bean harvesting'}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/70 transition-all duration-300 flex items-end">
                <div className="p-8 text-white w-full">
                  <div className="bg-green-500 text-white text-sm font-bold px-4 py-2 rounded-full mb-4 inline-block">
                    {language === 'es' ? 'PASO 2' : 'STEP 2'}
                  </div>
                  <h3 className="font-bold text-2xl mb-3">
                    {language === 'es' ? 'Recolección' : 'Harvesting'}
                  </h3>
                  <p className="text-base opacity-95 leading-relaxed">
                    {language === 'es'
                      ? 'Selección manual y cuidadosa de granos maduros en su punto perfecto, preservando la calidad excepcional.'
                      : 'Manual and careful selection of ripe beans at their perfect point, preserving exceptional quality.'
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Paso 3: Secado */}
            <div className="relative group overflow-hidden rounded-xl shadow-xl bg-white">
              <div className="aspect-[3/2] relative">
                <Image
                  src="/assets/fotosinicio/secadocafe.jpg"
                  alt={language === 'es' ? 'Proceso de secado del café' : 'Coffee drying process'}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/70 transition-all duration-300 flex items-end">
                <div className="p-8 text-white w-full">
                  <div className="bg-green-500 text-white text-sm font-bold px-4 py-2 rounded-full mb-4 inline-block">
                    {language === 'es' ? 'PASO 3' : 'STEP 3'}
                  </div>
                  <h3 className="font-bold text-2xl mb-3">
                    {language === 'es' ? 'Secado' : 'Drying'}
                  </h3>
                  <p className="text-base opacity-95 leading-relaxed">
                    {language === 'es'
                      ? 'Secado natural al sol preservando los sabores únicos y las características especiales del grano.'
                      : 'Natural sun drying preserving unique flavors and special characteristics of the bean.'
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Paso 4: Tostado */}
            <div className="relative group overflow-hidden rounded-xl shadow-xl bg-white">
              <div className="aspect-[3/2] relative">
                <Image
                  src="/assets/fotosinicio/tostado.jpg"
                  alt={language === 'es' ? 'Proceso de tostado del café' : 'Coffee roasting process'}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/70 transition-all duration-300 flex items-end">
                <div className="p-8 text-white w-full">
                  <div className="bg-green-500 text-white text-sm font-bold px-4 py-2 rounded-full mb-4 inline-block">
                    {language === 'es' ? 'PASO 4' : 'STEP 4'}
                  </div>
                  <h3 className="font-bold text-2xl mb-3">
                    {language === 'es' ? 'Tostado' : 'Roasting'}
                  </h3>
                  <p className="text-base opacity-95 leading-relaxed">
                    {language === 'es'
                      ? 'Tostado artesanal controlado para desarrollar el perfil de sabor perfecto y resaltar las notas únicas.'
                      : 'Controlled artisanal roasting to develop the perfect flavor profile and highlight unique notes.'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Coffee Traceability Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-green-50 to-yellow-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            {language === 'es' ? 'Trazabilidad del Café' : 'Coffee Traceability'}
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            {language === 'es'
              ? 'Descubre el origen, la finca y el proceso de tu café favorito. Cada lote cuenta una historia única desde las montañas de Ecuador hasta tu taza. Con nuestro sistema de trazabilidad, puedes conocer exactamente qué agricultor cultivó tu café, en qué finca, cuándo fue cosechado y cómo fue procesado.'
              : 'Discover the origin, farm, and process of your favorite coffee. Each batch tells a unique story from the mountains of Ecuador to your cup. With our traceability system, you can know exactly which farmer grew your coffee, on which farm, when it was harvested, and how it was processed.'
            }
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.href = '/lotes'}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
            >
              {language === 'es' ? 'Explorar Lotes' : 'Explore Batches'}
            </button>
            <button
              onClick={() => window.location.href = '/agricultores'}
              className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-bold py-3 px-8 rounded-lg transition-all duration-300"
            >
              {language === 'es' ? 'Conoce a los Agricultores' : 'Meet the Farmers'}
            </button>
          </div>
        </div>
      </section>

      {/* Featured Video Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              {language === 'es' ? 'Nuestro Compromiso' : 'Our Commitment'}
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              {language === 'es'
                ? 'Conoce de cerca nuestro trabajo, valores y el impacto que generamos en las comunidades productoras.'
                : 'Get to know our work, values and the impact we generate in producing communities.'
              }
            </p>
          </div>

          <div className="w-full">
            <video
              className="w-full rounded-xl shadow-2xl"
              controls
              poster="/assets/fotosinicio/foto paisaje.jpg"
            >
              <source src="https://blog.torisoftt.com/videos/video-inicio-2.mp4" type="video/mp4" />
              {language === 'es'
                ? 'Tu navegador no soporta el elemento de video.'
                : 'Your browser does not support the video element.'
              }
            </video>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              {language === 'es' ? 'Nuestros Productos' : 'Our Products'}
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              {language === 'es'
                ? 'Descubre nuestra selección de cafés premium, cada uno con su propia historia y características únicas que reflejan la riqueza de Ecuador.'
                : 'Discover our selection of premium coffees, each with its own story and unique characteristics that reflect the richness of Ecuador.'
              }
            </p>
          </div>

          {/* Featured Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {featuredProducts.map((product, index) => (
              <Link key={product.id} href={`/productos/${product.id}`} className="block">
                <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="aspect-square bg-gray-50 rounded-lg mb-3 overflow-hidden">
                    <Image
                      src={product.primaryImageUrl || '/images/coffee-placeholder.jpg'}
                      alt={language === 'es' ? product.name : product.nameEn}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-sm text-black leading-tight">
                      {language === 'es' ? product.name : product.nameEn}
                    </h3>
                    <p className="text-xs text-gray-600 leading-tight line-clamp-2">
                      {(() => {
                        const desc = language === 'es' ? product.description : product.descriptionEn;
                        // Extract first sentence or first 80 characters for preview
                        const firstSentence = desc.split('.')[0];
                        return firstSentence.length > 80 ? firstSentence.substring(0, 77) + '...' : firstSentence + '.';
                      })()}
                    </p>
                    {product.flavorNotes && product.flavorNotes.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {product.flavorNotes.slice(0, 2).map((note, noteIndex) => (
                          <span key={noteIndex} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            {note}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-green-700">
                        ${product.priceLocal.toFixed(2)}
                      </span>
                      <span className="text-xs text-gray-500">{product.weightGrams}g</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => window.location.href = '/productos'}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-10 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {language === 'es' ? 'Ver Todos los Productos' : 'View All Products'}
            </button>
          </div>
        </div>
      </section>


      {/* Landscape & Origin Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              {language === 'es' ? 'Nuestro Origen' : 'Our Origin'}
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              {language === 'es'
                ? 'Los paisajes únicos de Ecuador proporcionan el ambiente perfecto para cultivar café de especialidad.'
                : 'Ecuador\'s unique landscapes provide the perfect environment for growing specialty coffee.'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="relative overflow-hidden rounded-xl shadow-lg">
              <Image
                src="/assets/fotosinicio/foto paisaje.jpg"
                alt={language === 'es' ? 'Paisaje cafetero ecuatoriano' : 'Ecuadorian coffee landscape'}
                width={600}
                height={400}
                className="w-full h-80 object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">
                    {language === 'es' ? 'Montañas Ecuatorianas' : 'Ecuadorian Mountains'}
                  </h3>
                  <p className="text-sm opacity-90">
                    {language === 'es' ? 'Altitudes perfectas para café de altura' : 'Perfect altitudes for high-altitude coffee'}
                  </p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-xl shadow-lg">
              <Image
                src="/assets/fotosinicio/foto paisaje anochecer.jpg"
                alt={language === 'es' ? 'Atardecer en plantación' : 'Sunset at plantation'}
                width={600}
                height={400}
                className="w-full h-80 object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">
                    {language === 'es' ? 'Clima Ideal' : 'Ideal Climate'}
                  </h3>
                  <p className="text-sm opacity-90">
                    {language === 'es' ? 'Condiciones naturales únicas' : 'Unique natural conditions'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative overflow-hidden rounded-lg shadow-md">
              <Image
                src="/assets/fotosinicio/foto paisaje 1.jpg"
                alt={language === 'es' ? 'Vista panorámica' : 'Panoramic view'}
                width={400}
                height={250}
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="relative overflow-hidden rounded-lg shadow-md">
              <Image
                src="/assets/fotosinicio/flor blanca.jpg"
                alt={language === 'es' ? 'Flor del café' : 'Coffee flower'}
                width={400}
                height={250}
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="bg-green-800 rounded-lg p-6 flex flex-col justify-center text-white">
              <h4 className="text-xl font-bold mb-3">
                {language === 'es' ? 'Cultivo Sostenible' : 'Sustainable Farming'}
              </h4>
              <p className="text-sm opacity-90 leading-relaxed">
                {language === 'es'
                  ? 'Nuestros cafetales bajo sombra preservan la biodiversidad y garantizan la calidad excepcional de nuestros granos.'
                  : 'Our shade-grown coffee preserves biodiversity and ensures the exceptional quality of our beans.'
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are - Unified Section with CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-green-50 to-yellow-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                {language === 'es' ? '¿Quiénes Somos?' : 'Who We Are?'}
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                {language === 'es'
                  ? 'Somos Alohja Coffee, una empresa nacida del legado de nuestros abuelos, quienes dedicaron su vida al cultivo del café y al amor por la tierra.'
                  : 'We are Alohja Coffee, a company born from the legacy of our grandparents, who dedicated their lives to coffee farming and love for the land.'
                }
              </p>
              <p className="text-base text-gray-600 mb-8 leading-relaxed">
                {language === 'es'
                  ? 'Nuestro propósito es continuar esta tradición cultivando bajo sombra, en armonía con la naturaleza, a la vez que apoyamos a las familias campesinas locales. Nos comprometemos a ofrecer al mundo el mejor café de especialidad de Ecuador, con calidad, sostenibilidad y una historia auténtica en cada grano.'
                  : 'Our purpose is to continue this tradition by cultivating under shade, in harmony with nature, while supporting local farming families. We are committed to bringing the world Ecuador\'s finest specialty coffee — with quality, sustainability, and an authentic story in every bean.'
                }
              </p>
              <button
                onClick={() => window.location.href = '/nosotros'}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {language === 'es' ? 'Conoce Nuestra Historia' : 'Learn Our Story'}
              </button>
            </div>

            {/* Image */}
            <div className="relative overflow-hidden rounded-xl shadow-2xl">
              <Image
                src="/assets/fotosinicio/quienesomos1.png"
                alt={language === 'es' ? 'Quienes Somos - Alohja Coffee' : 'Who We Are - Alohja Coffee'}
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer language={language} />
    </div>
  )
}