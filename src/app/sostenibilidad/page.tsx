'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Sprout, Sun, Truck, Flame, Package, Plane, MapPin, Factory, Coffee } from 'lucide-react'

export default function SustainabilityPage() {
  const [language, setLanguage] = useState<'es' | 'en'>('es')
  const [activeTab, setActiveTab] = useState('sustainability')
  const [batchNumber, setBatchNumber] = useState('')
  const [batchData, setBatchData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [searchPerformed, setSearchPerformed] = useState(false)

  // Sample batch data similar to lotes page
  const sampleBatches = [
    {
      batch_id: "AR000147",
      variety: "Typica Mejorada",
      farmer: "Armando Ramirez",
      harvest_date: "2025-08-15",
      drying_method: "Natural",
      transport_mode: "Vía terrestre",
      roast_date: "2025-09-20",
      pack_date: "2025-09-20",
      distribution_date: "2025-09-20",
      retail_date: "2025-09-20",
      province: "LOJA",
      farm: "Finca El Mirador",
      altitude: "1,200 - 1,400 msnm",
      process: "Lavado",
      origin: "Paltas-Olmedo-Vilcabamba",
      farmers_list: "Armando Ramirez",
      drying_types: "Natural",
      transfer_to_quito: "terrestre",
      storage: "Bodega Quito Central",
      roast_types: "tueste claro - tueste medio",
      packed: "2025-09-20",
      transfer_to_shipping: "terrestre-marítimo",
      destination_country: "Japón - Estados Unidos"
    },
    {
      batch_id: "PQ000258",
      variety: "Gesha",
      farmer: "Pablo Quezada",
      harvest_date: "2025-07-20",
      drying_method: "Honey",
      transport_mode: "Vía aérea",
      roast_date: "2025-09-15",
      pack_date: "2025-09-15",
      distribution_date: "2025-09-16",
      retail_date: "2025-09-17",
      province: "ELORO",
      farm: "Gran Chaparral",
      altitude: "1,500 - 1,800 msnm",
      process: "Honey",
      origin: "Portovelo-Piñas",
      farmers_list: "Pablo Quezada - Ivan Ramirez",
      drying_types: "Honey - Lavado",
      transfer_to_quito: "aéreo",
      storage: "Bodega Quito Norte",
      roast_types: "tueste medio - tueste medio oscuro",
      packed: "2025-09-15",
      transfer_to_shipping: "aéreo-marítimo",
      destination_country: "Corea del Sur - Singapur"
    }
  ]

  const loadBatchData = async (batchId: string) => {
    setIsLoading(true)
    setSearchPerformed(true)

    try {
      // Try to fetch from API first
      const response = await fetch(`/api/public/batches?batch_id=${batchId}`)
      const data = await response.json()

      if (data.success && data.batch) {
        setBatchData(data.batch)
      } else {
        // Fallback to sample data
        const foundBatch = sampleBatches.find(batch =>
          batch.batch_id.toLowerCase() === batchId.toLowerCase().trim()
        )

        if (foundBatch) {
          setBatchData(foundBatch)
        } else {
          setBatchData(null)
        }
      }
    } catch (error) {
      console.error('Error loading batch data:', error)
      // Try sample data on error
      const foundBatch = sampleBatches.find(batch =>
        batch.batch_id.toLowerCase() === batchId.toLowerCase().trim()
      )
      setBatchData(foundBatch || null)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = () => {
    if (batchNumber.trim()) {
      loadBatchData(batchNumber.trim())
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation language={language} setLanguage={setLanguage} />

      {/* Sustainability Video Section - FULLSCREEN */}
      <section className="bg-black">
        <div className="w-full">
          <div className="aspect-video bg-gray-900">
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster="https://blog.torisoftt.com/videos/sostenibilidad/imagendefondo.png"
            >
              <source src="https://blog.torisoftt.com/videos/sostenibilidad/videoportada.mp4" type="video/mp4" />
              {language === 'es'
                ? 'Tu navegador no soporta el elemento de video.'
                : 'Your browser does not support the video element.'
              }
            </video>
          </div>
        </div>
      </section>

      {/* OLD VIDEO COMMENTED FOR BACKUP
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
              <source src="https://blog.torisoftt.com/videos/sostenibilidad.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>
      */}

      {/* NEW DESIGN - TABS STRUCTURE */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
            {language === 'es' ? 'Sostenibilidad' : 'Sustainability'}
          </h1>
        </div>

        {/* Tabs Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {[
            { key: 'sustainability', es: 'Sostenibilidad', en: 'Sustainability' },
            { key: 'certifications', es: 'Certificaciones', en: 'Certifications' },
            { key: 'traceability', es: 'Trazabilidad', en: 'Traceability' },
            { key: 'policies', es: 'Políticas', en: 'Policies' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab.key
                  ? 'bg-yellow-500 text-black shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-yellow-100 border border-gray-200'
              }`}
            >
              {language === 'es' ? tab.es : tab.en}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'sustainability' && (
          <div className="space-y-8">
            {/* Café con propósito - Hero Section */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl p-12 text-center shadow-xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {language === 'es' ? 'Café con propósito' : 'Coffee with purpose'}
              </h2>
              <p className="text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
                {language === 'es'
                  ? 'Cada taza de Alohja Café es más que un buen sabor: es la unión de prácticas sostenibles, compromiso con la tierra y responsabilidad con las futuras generaciones.'
                  : 'Each cup of Alohja Coffee is more than good taste: it is the union of sustainable practices, commitment to the land and responsibility to future generations.'
                }
              </p>
            </div>

            {/* Grid limpio 3x3 - Orden perfecto */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* FILA 1 */}
              {/* Esquina superior izquierda - Card visual */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-600 to-green-700 h-64 group">
                <div className="absolute inset-0 opacity-20">
                  <Image
                    src="https://blog.torisoftt.com/videos/sostenibilidad/cafe en flor 1.png"
                    alt="Café sostenible"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="relative z-10 p-6 h-full flex flex-col justify-end text-white">
                  <h3 className="text-2xl font-bold mb-2">
                    {language === 'es' ? 'Compromiso Verde' : 'Green Commitment'}
                  </h3>
                  <p className="text-green-100">
                    {language === 'es' ? 'Cada acción cuenta para un futuro sostenible' : 'Every action counts for a sustainable future'}
                  </p>
                </div>
              </div>

              {/* Mitigación del cambio climático */}
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-green-400 transition-all duration-300 group">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🌱</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {language === 'es' ? 'Mitigación del cambio climático' : 'Climate change mitigation'}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {language === 'es'
                    ? 'En Alohja Café creemos que cada grano puede ser un aporte contra el cambio climático. Nuestro modelo de cultivo bajo sombra ayuda a capturar carbono, proteger la biodiversidad y reducir el impacto ambiental.'
                    : 'At Alohja Coffee we believe that each bean can contribute against climate change. Our shade-grown model helps capture carbon, protect biodiversity and reduce environmental impact.'
                  }
                </p>
              </div>

              {/* Carbono neutro */}
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-green-400 transition-all duration-300 group">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">♻️</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {language === 'es' ? 'Carbono neutro' : 'Carbon neutral'}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {language === 'es'
                    ? 'Nos comprometemos a medir, reducir y compensar nuestras emisiones en toda la cadena productiva. Desde la siembra hasta la exportación, trabajamos para que nuestro café sea carbono neutro.'
                    : 'We commit to measuring, reducing and offsetting our emissions throughout the production chain. From planting to export, we work to make our coffee carbon neutral.'
                  }
                </p>
              </div>

              {/* FILA 2 */}
              {/* Bonos de carbono */}
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-amber-400 transition-all duration-300 group">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🌳</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {language === 'es' ? 'Bonos de carbono' : 'Carbon credits'}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {language === 'es'
                    ? 'A través de la conservación de bosques y la siembra de nuevos árboles, generamos oportunidades para producir y comercializar bonos de carbono, un mecanismo que apoya tanto a la economía local como a la lucha global.'
                    : 'Through forest conservation and planting new trees, we generate opportunities to produce and market carbon credits, a mechanism that supports both the local economy and the global fight.'
                  }
                </p>
              </div>

              {/* Conservación del agua */}
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-blue-400 transition-all duration-300 group">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">💧</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {language === 'es' ? 'Conservación del agua' : 'Water conservation'}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {language === 'es'
                    ? 'Nuestro proceso de cultivo y beneficio busca optimizar el uso del agua, evitando desperdicios y protegiendo las fuentes naturales que abastecen a nuestras comunidades. El agua es vida, y en cada paso la cuidamos.'
                    : 'Our cultivation and processing seeks to optimize water use, avoiding waste and protecting natural sources that supply our communities. Water is life, and we take care of it at every step.'
                  }
                </p>
              </div>

              {/* Protección de la biodiversidad */}
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-purple-400 transition-all duration-300 group">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🦋</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {language === 'es' ? 'Protección de la biodiversidad' : 'Biodiversity protection'}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {language === 'es'
                    ? 'El café bajo sombra no solo produce granos de alta calidad, también es refugio de aves, abejas y especies nativas. Así, nuestros cafetales se convierten en corredores biológicos que mantienen viva la riqueza natural.'
                    : 'Shade-grown coffee not only produces high-quality beans, it is also a refuge for birds, bees and native species. Thus, our coffee plantations become biological corridors that keep the natural wealth alive.'
                  }
                </p>
              </div>

              {/* FILA 3 */}
              {/* Desarrollo comunitario */}
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-yellow-400 transition-all duration-300 group">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🤝</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {language === 'es' ? 'Desarrollo comunitario' : 'Community development'}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {language === 'es'
                    ? 'La sostenibilidad también es social. Apostamos por el bienestar de nuestros agricultores, garantizando precios justos, capacitación y oportunidades para que las familias progresen sin dejar atrás sus tradiciones.'
                    : 'Sustainability is also social. We are committed to the well-being of our farmers, guaranteeing fair prices, training and opportunities for families to prosper without leaving their traditions behind.'
                  }
                </p>
              </div>

              {/* Economía circular */}
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-emerald-400 transition-all duration-300 group">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🔄</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {language === 'es' ? 'Economía circular' : 'Circular economy'}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {language === 'es'
                    ? 'Reducimos el uso de plásticos en nuestros empaques y aprovechamos los subproductos del café para crear abonos orgánicos. Así, cerramos el ciclo de producción de manera más limpia y consciente.'
                    : 'We reduce the use of plastics in our packaging and use coffee by-products to create organic fertilizers. Thus, we close the production cycle in a cleaner and more conscious way.'
                  }
                </p>
              </div>

              {/* Esquina inferior derecha - Card visual */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-600 to-orange-600 h-64 group">
                <div className="absolute inset-0 opacity-20">
                  <Image
                    src="https://blog.torisoftt.com/videos/sostenibilidad/biodiversidad 2.png"
                    alt="Biodiversidad"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="relative z-10 p-6 h-full flex flex-col justify-end text-white">
                  <h3 className="text-2xl font-bold mb-2">
                    {language === 'es' ? 'Impacto Positivo' : 'Positive Impact'}
                  </h3>
                  <p className="text-orange-100">
                    {language === 'es' ? 'Transformando vidas, protegiendo el planeta' : 'Transforming lives, protecting the planet'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'certifications' && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {language === 'es' ? 'Certificaciones' : 'Certifications'}
            </h2>
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📜</div>
              <p className="text-gray-600 text-lg">
                {language === 'es'
                  ? 'Las certificaciones se publicarán próximamente a medida que las obtengamos.'
                  : 'Certifications will be published soon as we obtain them.'
                }
              </p>
            </div>
          </div>
        )}

        {activeTab === 'traceability' && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {language === 'es' ? 'Trazabilidad' : 'Traceability'}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {language === 'es' ? '¿Qué es la trazabilidad?' : 'What is traceability?'}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {language === 'es'
                    ? 'La trazabilidad es la capacidad de seguir y documentar el recorrido de nuestro café desde la finca hasta tu taza. Cada lote tiene un código único que te permite conocer su origen, proceso y calidad.'
                    : 'Traceability is the ability to track and document the journey of our coffee from farm to cup. Each batch has a unique code that allows you to know its origin, process and quality.'
                  }
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {language === 'es'
                    ? 'Con nuestro sistema de trazabilidad, garantizamos transparencia total en cada etapa del proceso, desde el agricultor que cultivó los granos hasta el momento en que llega a tus manos.'
                    : 'With our traceability system, we guarantee total transparency at every stage of the process, from the farmer who grew the beans to the moment it reaches your hands.'
                  }
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-100 to-yellow-100 p-6 rounded-lg">
                <div className="text-center">
                  <div className="text-6xl mb-4">🌱➡️☕</div>
                  <p className="text-sm text-gray-600">
                    {language === 'es' ? 'Imagen animada de trazabilidad aquí' : 'Animated traceability image here'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'policies' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl p-8 text-center shadow-xl mb-8">
              <h2 className="text-3xl font-bold mb-3">
                {language === 'es' ? 'Políticas de Sostenibilidad' : 'Sustainability Policies'}
              </h2>
              <p className="text-green-100 text-lg">
                {language === 'es' ? 'Nuestro compromiso documentado con el planeta y las personas' : 'Our documented commitment to the planet and people'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Política Ambiental */}
              <div className="bg-white border-2 border-green-200 rounded-xl p-6 hover:shadow-xl hover:border-green-400 transition-all duration-300">
                <div className="flex items-start gap-3 mb-4">
                  <div className="text-4xl">🌿</div>
                  <div>
                    <span className="text-sm font-bold text-green-600 uppercase tracking-wide">
                      {language === 'es' ? 'Política 1' : 'Policy 1'}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mt-1">
                      {language === 'es' ? 'Política Ambiental' : 'Environmental Policy'}
                    </h3>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {language === 'es'
                    ? 'En Alohja Café protegemos la naturaleza que nos da vida. Nuestro café se cultiva bajo sombra, preservando la biodiversidad, cuidando los suelos y reduciendo el impacto ambiental. Nos comprometemos a implementar prácticas agrícolas responsables que garanticen un equilibrio entre producción y ecosistema.'
                    : 'At Alohja Coffee we protect the nature that gives us life. Our coffee is grown under shade, preserving biodiversity, caring for soils and reducing environmental impact. We are committed to implementing responsible agricultural practices that ensure a balance between production and ecosystem.'
                  }
                </p>
              </div>

              {/* Política de Mitigación del Cambio Climático */}
              <div className="bg-white border-2 border-blue-200 rounded-xl p-6 hover:shadow-xl hover:border-blue-400 transition-all duration-300">
                <div className="flex items-start gap-3 mb-4">
                  <div className="text-4xl">🌍</div>
                  <div>
                    <span className="text-sm font-bold text-blue-600 uppercase tracking-wide">
                      {language === 'es' ? 'Política 2' : 'Policy 2'}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mt-1">
                      {language === 'es' ? 'Mitigación del Cambio Climático' : 'Climate Change Mitigation'}
                    </h3>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {language === 'es'
                    ? 'Trabajamos activamente para reducir nuestra huella de carbono. Adoptamos sistemas de producción sostenibles, impulsamos la captura de CO₂ a través de la reforestación y buscamos constantemente innovaciones que nos acerquen a la neutralidad de carbono.'
                    : 'We work actively to reduce our carbon footprint. We adopt sustainable production systems, promote CO₂ capture through reforestation and constantly seek innovations that bring us closer to carbon neutrality.'
                  }
                </p>
              </div>

              {/* Política de Carbono Neutro */}
              <div className="bg-white border-2 border-emerald-200 rounded-xl p-6 hover:shadow-xl hover:border-emerald-400 transition-all duration-300">
                <div className="flex items-start gap-3 mb-4">
                  <div className="text-4xl">⚖️</div>
                  <div>
                    <span className="text-sm font-bold text-emerald-600 uppercase tracking-wide">
                      {language === 'es' ? 'Política 3' : 'Policy 3'}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mt-1">
                      {language === 'es' ? 'Carbono Neutro' : 'Carbon Neutral'}
                    </h3>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {language === 'es'
                    ? 'Nos comprometemos a medir, gestionar y compensar nuestras emisiones. Nuestro objetivo es lograr un café carbono neutro, en el que cada taza represente no solo calidad, sino también un aporte a la lucha contra el cambio climático.'
                    : 'We commit to measuring, managing and offsetting our emissions. Our goal is to achieve carbon neutral coffee, where each cup represents not only quality, but also a contribution to the fight against climate change.'
                  }
                </p>
              </div>

              {/* Política de Conservación del Agua */}
              <div className="bg-white border-2 border-cyan-200 rounded-xl p-6 hover:shadow-xl hover:border-cyan-400 transition-all duration-300">
                <div className="flex items-start gap-3 mb-4">
                  <div className="text-4xl">💦</div>
                  <div>
                    <span className="text-sm font-bold text-cyan-600 uppercase tracking-wide">
                      {language === 'es' ? 'Política 4' : 'Policy 4'}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mt-1">
                      {language === 'es' ? 'Conservación del Agua' : 'Water Conservation'}
                    </h3>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {language === 'es'
                    ? 'El agua es un recurso vital. En nuestros procesos productivos promovemos el uso responsable, la reducción de desperdicios y la protección de fuentes naturales, asegurando disponibilidad para las comunidades y la naturaleza.'
                    : 'Water is a vital resource. In our production processes we promote responsible use, waste reduction and protection of natural sources, ensuring availability for communities and nature.'
                  }
                </p>
              </div>

              {/* Política de Conservación de la Biodiversidad */}
              <div className="bg-white border-2 border-purple-200 rounded-xl p-6 hover:shadow-xl hover:border-purple-400 transition-all duration-300">
                <div className="flex items-start gap-3 mb-4">
                  <div className="text-4xl">🦜</div>
                  <div>
                    <span className="text-sm font-bold text-purple-600 uppercase tracking-wide">
                      {language === 'es' ? 'Política 5' : 'Policy 5'}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mt-1">
                      {language === 'es' ? 'Conservación de la Biodiversidad' : 'Biodiversity Conservation'}
                    </h3>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {language === 'es'
                    ? 'Nuestros cafetales bajo sombra actúan como refugio para aves, abejas y especies nativas. Nos comprometemos a proteger estos hábitats y a promover la convivencia armoniosa entre producción agrícola y vida silvestre.'
                    : 'Our shade-grown coffee plantations act as a refuge for birds, bees and native species. We are committed to protecting these habitats and promoting harmonious coexistence between agricultural production and wildlife.'
                  }
                </p>
              </div>

              {/* Política Social y Comunitaria */}
              <div className="bg-white border-2 border-amber-200 rounded-xl p-6 hover:shadow-xl hover:border-amber-400 transition-all duration-300">
                <div className="flex items-start gap-3 mb-4">
                  <div className="text-4xl">👥</div>
                  <div>
                    <span className="text-sm font-bold text-amber-600 uppercase tracking-wide">
                      {language === 'es' ? 'Política 6' : 'Policy 6'}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mt-1">
                      {language === 'es' ? 'Social y Comunitaria' : 'Social and Community'}
                    </h3>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {language === 'es'
                    ? 'Creemos que la sostenibilidad también es social. Apoyamos a nuestros agricultores con precios justos, capacitaciones y oportunidades de desarrollo, promoviendo la equidad de género y el fortalecimiento de comunidades rurales.'
                    : 'We believe that sustainability is also social. We support our farmers with fair prices, training and development opportunities, promoting gender equity and strengthening rural communities.'
                  }
                </p>
              </div>

              {/* Política de Economía Circular */}
              <div className="bg-white border-2 border-teal-200 rounded-xl p-6 hover:shadow-xl hover:border-teal-400 transition-all duration-300">
                <div className="flex items-start gap-3 mb-4">
                  <div className="text-4xl">♻️</div>
                  <div>
                    <span className="text-sm font-bold text-teal-600 uppercase tracking-wide">
                      {language === 'es' ? 'Política 7' : 'Policy 7'}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mt-1">
                      {language === 'es' ? 'Economía Circular' : 'Circular Economy'}
                    </h3>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {language === 'es'
                    ? 'Minimizamos el uso de plásticos en nuestros empaques, fomentamos el reciclaje y reutilizamos los subproductos del café en prácticas agrícolas regenerativas. Nuestro objetivo es avanzar hacia un modelo de producción cada vez más limpio.'
                    : 'We minimize the use of plastics in our packaging, promote recycling and reuse coffee by-products in regenerative agricultural practices. Our goal is to move towards an increasingly clean production model.'
                  }
                </p>
              </div>

              {/* Política de Transparencia y Trazabilidad */}
              <div className="bg-white border-2 border-indigo-200 rounded-xl p-6 hover:shadow-xl hover:border-indigo-400 transition-all duration-300">
                <div className="flex items-start gap-3 mb-4">
                  <div className="text-4xl">📋</div>
                  <div>
                    <span className="text-sm font-bold text-indigo-600 uppercase tracking-wide">
                      {language === 'es' ? 'Política 8' : 'Policy 8'}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mt-1">
                      {language === 'es' ? 'Transparencia y Trazabilidad' : 'Transparency and Traceability'}
                    </h3>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {language === 'es'
                    ? 'Cada grano de nuestro café tiene una historia. Garantizamos trazabilidad en toda la cadena de valor, brindando a nuestros clientes la seguridad de consumir un producto ético, sostenible y de origen confiable.'
                    : 'Every bean of our coffee has a story. We guarantee traceability throughout the value chain, giving our customers the assurance of consuming an ethical, sustainable and reliably sourced product.'
                  }
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Sustainability Message */}
        <div className="text-center bg-green-50 rounded-2xl p-8 md:p-12 mt-16 mb-12 shadow-sm border border-green-200">
          <div className="inline-block p-3 bg-white rounded-full mb-4 shadow-md">
            <span className="text-5xl">🌱</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {language === 'es' ? 'Compromiso con la Tierra' : 'Commitment to the Earth'}
          </h3>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            {language === 'es'
              ? 'Cada taza que tomas, está conectada a una agricultura sostenible. Bajo el abrigo de los bosques naturales de Ecuador, nuestras prácticas priorizan el equilibrio ecológico, la regeneración de suelos y el uso responsable de los recursos.'
              : 'Every cup you drink is connected to sustainable agriculture. Under the shelter of Ecuador\'s natural forests, our practices prioritize ecological balance, soil regeneration, and responsible use of resources.'
            }
          </p>
        </div>

        {/* Batch Search Section - Improved Design */}
        <div className="mb-8">
          <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 rounded-2xl p-8 md:p-12 shadow-lg border border-amber-200">
            <div className="text-center mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {language === 'es' ? 'Trazabilidad del Café' : 'Coffee Traceability'}
              </h2>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
                {language === 'es'
                  ? 'Ingresa el número de lote de tu café y descubre su historia completa desde la finca hasta tu taza.'
                  : 'Enter your coffee batch number and discover its complete story from farm to cup.'
                }
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    value={batchNumber}
                    onChange={(e) => setBatchNumber(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder={language === 'es' ? 'Ej: AR000147, PQ000258' : 'Ex: AR000147, PQ000258'}
                    className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:border-yellow-500 text-lg font-medium shadow-sm transition-all text-gray-900 placeholder:text-gray-500"
                  />
                </div>
                <button
                  onClick={handleSearch}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      </svg>
                      <span>{language === 'es' ? 'Buscando...' : 'Searching...'}</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <span>{language === 'es' ? 'Buscar Lote' : 'Search Batch'}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Quick examples */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 mb-3">
                  {language === 'es' ? '💡 Prueba con estos códigos de ejemplo:' : '💡 Try these example codes:'}
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {sampleBatches.map((batch) => (
                    <button
                      key={batch.batch_id}
                      onClick={() => {
                        setBatchNumber(batch.batch_id)
                        loadBatchData(batch.batch_id)
                      }}
                      className="px-4 py-2 bg-white border-2 border-amber-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-amber-100 hover:border-amber-400 transition-all duration-200 shadow-sm hover:shadow"
                    >
                      {batch.batch_id}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Batch Results Section */}
      {(batchData || searchPerformed) && (
        <div className="max-w-7xl mx-auto px-4 pb-16">
          {batchData ? (
            <div className="bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-green-600 to-green-700 px-8 py-6 text-white">
                <div className="flex items-center gap-4">
                  <span className="text-3xl">📋</span>
                  <div>
                    <h3 className="text-2xl font-bold">
                      {language === 'es' ? 'Lote:' : 'Batch:'} {batchData.batch_id}
                    </h3>
                    <p className="opacity-90">
                      {batchData.farm} • {batchData.province}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h4 className="font-bold text-xl text-black mb-4 flex items-center gap-2">
                      <span>🌱</span>
                      {language === 'es' ? 'Información Básica' : 'Basic Information'}
                    </h4>
                    <div className="space-y-3">
                      {[
                        { icon: '📋', label: language === 'es' ? 'Número de Lote' : 'Batch Number', value: batchData.batch_id },
                        { icon: '🌱', label: language === 'es' ? 'Variedad' : 'Variety', value: batchData.variety },
                        { icon: '👨‍🌾', label: language === 'es' ? 'Caficultor' : 'Coffee Farmer', value: batchData.farmer }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <span>{item.icon}</span>
                            <span className="font-medium text-gray-800">{item.label}</span>
                          </div>
                          <span className="font-bold text-gray-900">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Process Information */}
                  <div className="space-y-4">
                    <h4 className="font-bold text-xl text-black mb-4 flex items-center gap-2">
                      <span>⚙️</span>
                      {language === 'es' ? 'Proceso' : 'Process'}
                    </h4>
                    <div className="space-y-3">
                      {[
                        { icon: '🗓️', label: language === 'es' ? 'Cosecha' : 'Harvest', value: batchData.harvest_date },
                        { icon: '☀️', label: language === 'es' ? 'Secado' : 'Drying', value: batchData.drying_method },
                        { icon: '🚛', label: language === 'es' ? 'Traslado' : 'Transport', value: batchData.transport_mode || 'Terrestre' }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <span>{item.icon}</span>
                            <span className="font-medium text-gray-800">{item.label}</span>
                          </div>
                          <span className="font-bold text-gray-900">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Distribution Information */}
                  <div className="space-y-4">
                    <h4 className="font-bold text-xl text-black mb-4 flex items-center gap-2">
                      <span>📦</span>
                      {language === 'es' ? 'Distribución' : 'Distribution'}
                    </h4>
                    <div className="space-y-3">
                      {[
                        { icon: '🔥', label: language === 'es' ? 'Tostado' : 'Roasted', value: batchData.roast_date },
                        { icon: '📦', label: language === 'es' ? 'Empacado' : 'Packed', value: batchData.pack_date },
                        { icon: '🚢', label: language === 'es' ? 'Destino' : 'Destination', value: batchData.destination_country || 'Internacional' }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <span>{item.icon}</span>
                            <span className="font-medium text-gray-800">{item.label}</span>
                          </div>
                          <span className="font-bold text-gray-900">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Journey Timeline - Horizontal Visual */}
                <div className="pt-8 border-t border-gray-200 mb-8">
                  <h4 className="font-bold text-xl text-black mb-6 flex items-center gap-2">
                    <Coffee className="w-6 h-6 text-amber-700" />
                    {language === 'es' ? 'Viaje del Café' : 'Coffee Journey'}
                  </h4>

                  {/* Horizontal Timeline */}
                  <div className="relative">
                    {/* Progress Line */}
                    <div className="absolute top-8 left-0 right-0 h-1 bg-gray-200 hidden md:block" style={{ zIndex: 0 }}></div>
                    <div className="absolute top-8 left-0 h-1 bg-gradient-to-r from-green-500 to-amber-500 hidden md:block" style={{ width: '100%', zIndex: 1 }}></div>

                    {/* Timeline Steps */}
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-4 md:gap-2 relative" style={{ zIndex: 2 }}>
                      {[
                        { Icon: Sprout, label: language === 'es' ? 'Cosecha' : 'Harvest', date: batchData.harvest_date, color: 'bg-green-500', textColor: 'text-white' },
                        { Icon: Sun, label: language === 'es' ? 'Secado' : 'Drying', date: batchData.harvest_date, color: 'bg-yellow-500', textColor: 'text-white' },
                        { Icon: Truck, label: language === 'es' ? 'Transporte' : 'Transport', date: batchData.pack_date, color: 'bg-blue-500', textColor: 'text-white' },
                        { Icon: Flame, label: language === 'es' ? 'Tostado' : 'Roasting', date: batchData.roast_date, color: 'bg-orange-500', textColor: 'text-white' },
                        { Icon: Package, label: language === 'es' ? 'Empaque' : 'Packaging', date: batchData.pack_date, color: 'bg-purple-500', textColor: 'text-white' },
                        { Icon: Plane, label: language === 'es' ? 'Distribución' : 'Distribution', date: batchData.distribution_date, color: 'bg-cyan-500', textColor: 'text-white' }
                      ].map((step, index) => (
                        <div key={index} className="flex flex-col items-center text-center">
                          {/* Icon Circle */}
                          <div className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center shadow-lg mb-3 transform hover:scale-110 transition-transform duration-300`}>
                            <step.Icon className={`w-8 h-8 ${step.textColor}`} strokeWidth={2} />
                          </div>
                          {/* Label */}
                          <p className="font-bold text-sm text-gray-900 mb-1">{step.label}</p>
                          {/* Date */}
                          <p className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">{step.date}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Province Map */}
                <div className="pt-8 border-t border-gray-200">
                  <h4 className="font-bold text-xl text-black mb-6 flex items-center gap-2">
                    <MapPin className="w-6 h-6 text-red-600" />
                    {language === 'es' ? 'Origen - Provincia de' : 'Origin - Province of'} {batchData.province?.replace(/([A-Z])/g, ' $1').trim()}
                  </h4>
                  <div className="grid md:grid-cols-3 gap-8 items-start">
                    {/* Map Image */}
                    <div className="md:col-span-1">
                      <div className="w-full max-w-xs mx-auto">
                        <div className="relative aspect-square bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                          <Image
                            src={batchData.province === 'LOJA' ? '/assets/mapaspng/mapaecuadorLOJA.png' : batchData.province === 'ELORO' ? '/assets/mapaspng/mapaecuadorELORO.png' : batchData.province === 'PICHINCHA' ? '/assets/mapaspng/mapaecuadorPICHINCHA.png' : '/assets/mapaspng/ilustracioncafe.png'}
                            alt={`Mapa de ${batchData.province}`}
                            fill
                            className="object-contain p-4"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Map Information */}
                    <div className="md:col-span-2 space-y-4">
                      <div className="bg-green-50 rounded-lg p-6">
                        <h5 className="font-bold text-lg text-green-800 mb-4 flex items-center gap-2">
                          <span>📍</span>
                          {language === 'es' ? 'Información de Ubicación' : 'Location Information'}
                        </h5>
                        <div className="space-y-3">
                          {[
                            { label: language === 'es' ? 'Provincia:' : 'Province:', value: batchData.province?.replace(/([A-Z])/g, ' $1').trim() },
                            { label: language === 'es' ? 'Finca:' : 'Farm:', value: batchData.farm },
                            { label: language === 'es' ? 'Altitud:' : 'Altitude:', value: batchData.altitude },
                            { label: language === 'es' ? 'Proceso:' : 'Process:', value: batchData.process }
                          ].map((item, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <span className="font-medium text-green-700">{item.label}</span>
                              <span className="font-bold text-green-900">{item.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
              <div className="text-6xl mb-4">❌</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {language === 'es' ? 'Lote no encontrado' : 'Batch not found'}
              </h3>
              <p className="text-gray-600">
                {language === 'es'
                  ? 'Verifica el número de lote e intenta nuevamente.'
                  : 'Please verify the batch number and try again.'
                }
              </p>
            </div>
          )}
        </div>
      )}

      {/* Multimedia Gallery Section - Rediseñado */}
      <section className="bg-gradient-to-br from-green-50 to-yellow-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">

          {/* Nuestra misión - Texto + Video */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-black mb-6">
                {language === 'es' ? 'Nuestra misión' : 'Our mission'}
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {language === 'es'
                  ? 'En nuestra finca, trabajamos con un modelo de producción sostenible que respeta la biodiversidad y potencia el rol de los polinizadores. Nos dedicamos a prácticas responsables que garantizan un futuro verde.'
                  : 'On our farm, we work with a sustainable production model that respects biodiversity and enhances the role of pollinators. We are dedicated to responsible practices that guarantee a green future.'
                }
              </p>
            </div>
            <div className="relative overflow-hidden rounded-xl shadow-2xl">
              <video
                className="w-full rounded-xl"
                controls
                poster="https://blog.torisoftt.com/videos/sostenibilidad/imagendefondo.png"
              >
                <source src="https://blog.torisoftt.com/videos/sostenibilidad/videodepolinizadoresbiodiversidad.mp4" type="video/mp4" />
                {language === 'es'
                  ? 'Tu navegador no soporta el elemento de video.'
                  : 'Your browser does not support the video element.'
                }
              </video>
            </div>
          </div>

          {/* Galería de imágenes - Grid 3x2 */}
          <div>
            <h2 className="text-3xl font-bold text-center text-black mb-8">
              {language === 'es' ? 'Galería de imágenes' : 'Image gallery'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="relative overflow-hidden rounded-lg shadow-lg group aspect-square">
                <Image
                  src="https://blog.torisoftt.com/videos/sostenibilidad/biodiversidad 1.png"
                  alt="Biodiversidad 1"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
              </div>
              <div className="relative overflow-hidden rounded-lg shadow-lg group aspect-square">
                <Image
                  src="https://blog.torisoftt.com/videos/sostenibilidad/cafe en flor 1.png"
                  alt="Café en flor 1"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
              </div>
              <div className="relative overflow-hidden rounded-lg shadow-lg group aspect-square">
                <Image
                  src="https://blog.torisoftt.com/videos/sostenibilidad/cafe en flor 2.png"
                  alt="Café en flor 2"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
              </div>
              <div className="relative overflow-hidden rounded-lg shadow-lg group aspect-square">
                <Image
                  src="https://blog.torisoftt.com/videos/sostenibilidad/cafe en flor 3.png"
                  alt="Café en flor 3"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
              </div>
              <div className="relative overflow-hidden rounded-lg shadow-lg group aspect-square">
                <Image
                  src="https://blog.torisoftt.com/videos/sostenibilidad/cafe en flor 4.png"
                  alt="Café en flor 4"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
              </div>
              <div className="relative overflow-hidden rounded-lg shadow-lg group aspect-square">
                <Image
                  src="https://blog.torisoftt.com/videos/sostenibilidad/biodiversidad 2.png"
                  alt="Biodiversidad 2"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      <Footer language={language} />
    </div>
  )
}

/* COMMENTED OLD VERSION FOR BACKUP
<div className="max-w-7xl mx-auto px-4 py-16">
  <div className="text-center mb-12">
    <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
      {language === 'es' ? 'Sostenibilidad' : 'Sustainability'}
    </h1>
  </div>

        <div className="bg-amber-50 rounded-lg p-8 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-black mb-4">
              {language === 'es'
                ? 'Ingresa el número de lote y sigue de cerca la ruta de tu café favorito.'
                : 'Enter the batch number and closely follow the route of your favorite coffee.'
              }
            </h2>
            <div className="max-w-md mx-auto flex gap-4">
              <input
                type="text"
                value={batchNumber}
                onChange={(e) => setBatchNumber(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={language === 'es' ? 'Número de lote' : 'Batch number'}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <button
                onClick={handleSearch}
                disabled={isLoading}
                className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 text-black font-medium px-6 py-2 rounded-lg transition-colors"
              >
                {isLoading ? (language === 'es' ? 'Buscando...' : 'Searching...') : (language === 'es' ? 'Buscar' : 'Search')}
              </button>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-bold text-black text-center mb-8">
            {language === 'es' ? 'Aprende todo sobre tu café favorito' : 'Learn all about your favorite coffee'}
          </h3>

          <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === 'es' ? 'Parámetro' : 'Parameter'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === 'es' ? 'Información' : 'Information'}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {searchPerformed && !batchData && !isLoading && (
                  <tr>
                    <td colSpan={2} className="px-6 py-8 text-center">
                      <div className="text-gray-500">
                        <p className="text-lg font-medium mb-2">
                          {language === 'es' ? 'Lote no encontrado' : 'Batch not found'}
                        </p>
                        <p className="text-sm">
                          {language === 'es'
                            ? 'No se encontró información para el número de lote ingresado'
                            : 'No information found for the entered batch number'
                          }
                        </p>
                      </div>
                    </td>
                  </tr>
                )}

                {!searchPerformed && (
                  <tr>
                    <td colSpan={2} className="px-6 py-8 text-center">
                      <div className="text-gray-400">
                        <p className="text-lg font-medium mb-2">
                          {language === 'es' ? 'Ingresa un número de lote' : 'Enter a batch number'}
                        </p>
                        <p className="text-sm">
                          {language === 'es'
                            ? 'Busca información detallada sobre tu café favorito'
                            : 'Search for detailed information about your favorite coffee'
                          }
                        </p>
                      </div>
                    </td>
                  </tr>
                )}

                {batchData && (
                  <>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {language === 'es' ? 'Número de lote' : 'Batch number'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {batchData.batch_id}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {language === 'es' ? 'Variedad' : 'Variety'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {batchData.variety || '-'}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {language === 'es' ? 'Caficultor' : 'Coffee Farmer'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {batchData.farmers_list || batchData.farmer || '-'}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {language === 'es' ? 'Provincia' : 'Province'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {batchData.province || '-'}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {language === 'es' ? 'Finca' : 'Farm'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {batchData.farm || '-'}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {language === 'es' ? 'Altitud' : 'Altitude'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {batchData.altitude || '-'}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {language === 'es' ? 'Origen' : 'Origin'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {batchData.origin || '-'}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {language === 'es' ? 'Proceso' : 'Process'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {batchData.process || '-'}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {language === 'es' ? 'Fecha de cosecha' : 'Harvest date'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {batchData.harvest_date || '-'}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {language === 'es' ? 'Tipo de secado' : 'Drying type'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {batchData.drying_types || batchData.drying_method || '-'}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {language === 'es' ? 'Traslado a Quito' : 'Transfer to Quito'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {batchData.transfer_to_quito || '-'}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {language === 'es' ? 'Almacenamiento temporal' : 'Temporary storage'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {batchData.storage || '-'}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {language === 'es' ? 'Tipo de tostado' : 'Type of roasting'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {batchData.roast_types || '-'}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {language === 'es' ? 'Empacado' : 'Packed'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {batchData.packed || batchData.pack_date || '-'}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {language === 'es' ? 'Traslado a embarque' : 'Transfer to boarding'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {batchData.transfer_to_shipping || '-'}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {language === 'es' ? 'País de destino' : 'Country of destination'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {batchData.destination_country || '-'}
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center bg-green-50 rounded-lg p-8">
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            {language === 'es'
              ? 'Cada taza que tomas, está conectada a una agricultura sostenible. Bajo el abrigo de los bosques naturales de Ecuador, nuestras prácticas priorizan el equilibrio ecológico, la regeneración de suelos y el uso responsable de los recursos.'
              : 'Every cup you drink, is connected to sustainable agriculture. Under the shelter of Ecuador\'s natural forests, our practices prioritize ecological balance, soil regeneration, and responsible use of resources.'
            }
          </p>
  </div>
</div>
END OF COMMENTED VERSION */