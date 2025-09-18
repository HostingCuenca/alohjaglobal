'use client'

import { useState } from 'react'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'

export default function Home() {
  const [language, setLanguage] = useState<'es' | 'en'>('es')

  return (
    <div className="min-h-screen bg-white">
      <Navigation language={language} setLanguage={setLanguage} />
      <Hero language={language} />

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

      {/* About Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            {language === 'es' ? 'Quienes Somos' : 'Who We Are'}
          </h2>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            {language === 'es'
              ? 'Somos Alohja Coffee, una empresa nacida del legado de nuestros abuelos, quienes dedicaron su vida al cultivo del café y al amor por la tierra. Nuestro propósito es continuar esta tradición cultivando bajo sombra, en armonía con la naturaleza, a la vez que apoyamos a las familias campesinas locales. «Nos comprometemos a ofrecer al mundo el mejor café de especialidad de Ecuador, con calidad, sostenibilidad y una historia auténtica en cada grano».'
              : 'We are Alohja Coffee, a company born from the legacy of our grandparents, who dedicated their lives to coffee farming and love for the land. Our purpose is to continue this tradition by cultivating under shade, in harmony with nature, while supporting local farming families. We are committed to bringing the world Ecuador\'s finest specialty coffee — with quality, sustainability, and an authentic story in every bean.'
            }
          </p>
        </div>
      </section>

      {/* Coffee Process Gallery */}
      <section className="py-16 px-4 bg-amber-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              {language === 'es' ? 'Nuestro Proceso' : 'Our Process'}
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              {language === 'es'
                ? 'Desde la recolección hasta la taza: un viaje de calidad y tradición en cada grano de café ecuatoriano.'
                : 'From harvest to cup: a journey of quality and tradition in every Ecuadorian coffee bean.'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Paso 1: Recolección */}
            <div className="relative group overflow-hidden rounded-xl shadow-xl bg-white">
              <div className="aspect-[4/3] relative">
                <Image
                  src="/assets/fotosinicio/persona recolectando granos.jpg"
                  alt={language === 'es' ? 'Recolección manual de granos de café' : 'Manual coffee bean harvesting'}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/60 transition-all duration-300 flex items-end">
                <div className="p-6 text-white w-full">
                  <div className="bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">
                    {language === 'es' ? 'PASO 1' : 'STEP 1'}
                  </div>
                  <h3 className="font-bold text-xl mb-2">
                    {language === 'es' ? 'Recolección' : 'Harvesting'}
                  </h3>
                  <p className="text-sm opacity-95 leading-relaxed">
                    {language === 'es' ? 'Selección manual y cuidadosa de granos maduros en su punto perfecto' : 'Manual and careful selection of ripe beans at their perfect point'}
                  </p>
                </div>
              </div>
            </div>

            {/* Paso 2: Secado */}
            <div className="relative group overflow-hidden rounded-xl shadow-xl bg-white">
              <div className="aspect-[4/3] relative">
                <Image
                  src="/assets/fotosinicio/secadocafe.jpg"
                  alt={language === 'es' ? 'Proceso de secado del café' : 'Coffee drying process'}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/60 transition-all duration-300 flex items-end">
                <div className="p-6 text-white w-full">
                  <div className="bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">
                    {language === 'es' ? 'PASO 2' : 'STEP 2'}
                  </div>
                  <h3 className="font-bold text-xl mb-2">
                    {language === 'es' ? 'Secado' : 'Drying'}
                  </h3>
                  <p className="text-sm opacity-95 leading-relaxed">
                    {language === 'es' ? 'Secado natural al sol preservando los sabores únicos' : 'Natural sun drying preserving unique flavors'}
                  </p>
                </div>
              </div>
            </div>

            {/* Paso 3: Tostado */}
            <div className="relative group overflow-hidden rounded-xl shadow-xl bg-white">
              <div className="aspect-[4/3] relative">
                <Image
                  src="/assets/fotosinicio/cafe tostandose.jpg"
                  alt={language === 'es' ? 'Proceso de tostado del café' : 'Coffee roasting process'}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/60 transition-all duration-300 flex items-end">
                <div className="p-6 text-white w-full">
                  <div className="bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">
                    {language === 'es' ? 'PASO 3' : 'STEP 3'}
                  </div>
                  <h3 className="font-bold text-xl mb-2">
                    {language === 'es' ? 'Tostado' : 'Roasting'}
                  </h3>
                  <p className="text-sm opacity-95 leading-relaxed">
                    {language === 'es' ? 'Tostado artesanal controlado para el perfil perfecto' : 'Controlled artisanal roasting for the perfect profile'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Detalles del proceso */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="relative overflow-hidden rounded-lg shadow-lg group bg-white">
              <div className="aspect-square relative">
                <Image
                  src="/assets/fotosinicio/cafe pre tostado.jpg"
                  alt={language === 'es' ? 'Granos antes del tostado' : 'Beans before roasting'}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                <p className="text-white text-sm font-semibold opacity-0 group-hover:opacity-100 text-center px-3 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  {language === 'es' ? 'Pre-Tostado' : 'Pre-Roasted'}
                </p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg shadow-lg group bg-white">
              <div className="aspect-square relative">
                <Image
                  src="/assets/fotosinicio/granosdecafe.jpg"
                  alt={language === 'es' ? 'Granos de café listos' : 'Ready coffee beans'}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                <p className="text-white text-sm font-semibold opacity-0 group-hover:opacity-100 text-center px-3 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  {language === 'es' ? 'Granos Listos' : 'Ready Beans'}
                </p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg shadow-lg group bg-white">
              <div className="aspect-square relative">
                <Image
                  src="/assets/fotosinicio/cafetostadoenmano.jpg"
                  alt={language === 'es' ? 'Café tostado en mano' : 'Roasted coffee in hand'}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                <p className="text-white text-sm font-semibold opacity-0 group-hover:opacity-100 text-center px-3 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  {language === 'es' ? 'Calidad Premium' : 'Premium Quality'}
                </p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg shadow-lg group bg-white">
              <div className="aspect-square relative">
                <Image
                  src="/assets/fotosinicio/cafe tendido.jpg"
                  alt={language === 'es' ? 'Café secándose al sol' : 'Coffee drying in the sun'}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                <p className="text-white text-sm font-semibold opacity-0 group-hover:opacity-100 text-center px-3 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  {language === 'es' ? 'Secado Natural' : 'Natural Drying'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Purpose */}
      <section className="py-16 px-4 bg-amber-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-black mb-4">
                {language === 'es' ? 'Misión' : 'Mission'}
              </h3>
              <p className="text-gray-700">
                {language === 'es'
                  ? 'Ser una empresa profundamente centrada en las personas, ofreciendo productos auténticos y sostenibles que conecten culturas, historias y territorios, creando valor y experiencias con impacto positivo a nivel global.'
                  : 'To be a company deeply focused on people, offering authentic and sustainable products that connect cultures, stories, and territories, creating value and experiences with a positive impact on a global level.'
                }
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-black mb-4">
                {language === 'es' ? 'Visión' : 'Vision'}
              </h3>
              <p className="text-gray-700">
                {language === 'es'
                  ? 'Posicionar Alohja como una marca global que trascienda generaciones, llevando productos de calidad al mundo y conectando personas con historias auténticas'
                  : 'Position Alohja as a global brand that transcends generations, bringing quality products to the world and connecting people with authentic stories.'
                }
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-black mb-4">
                {language === 'es' ? 'Propósito' : 'Purpose'}
              </h3>
              <p className="text-gray-700">
                {language === 'es'
                  ? 'Generar una conexión real entre el productor y el consumidor a través de nuestros productos, haciendo que cada persona se sienta parte de un cambio verdadero'
                  : 'Generate a real connection between the producer and the consumer through our products, making each person feel part of a real change.'
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-black text-center mb-12">
            {language === 'es' ? 'Valores Corporativos' : 'Corporate Values'}
          </h3>
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
        </div>
      </section>

      {/* Landscape & Origin Section */}
      <section className="py-16 px-4">
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

      <Footer language={language} />
    </div>
  )
}