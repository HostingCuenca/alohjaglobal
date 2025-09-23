'use client'

import { useState } from 'react'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function AboutUsPage() {
  const [language, setLanguage] = useState<'es' | 'en'>('es')

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
      <section className="bg-amber-900 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-2">
                {language === 'es' ? 'Misión' : 'Mission'}
              </h2>
              <div className="w-16 h-1 bg-yellow-400 mx-auto mb-6"></div>
              <p className="text-amber-100 text-lg leading-relaxed">
                {language === 'es'
                  ? 'Generar progreso para las familias agricultoras ecuatorianas con base en la ética e innovación, construyendo excelencia profesional y calidad en el servicio.'
                  : 'Generate progress for Ecuadorian farming families based on ethics and innovation, building professional excellence and service quality.'
                }
              </p>
            </div>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-2">
                {language === 'es' ? 'Visión' : 'Vision'}
              </h2>
              <div className="w-16 h-1 bg-yellow-400 mx-auto mb-6"></div>
              <p className="text-amber-100 text-lg leading-relaxed">
                {language === 'es'
                  ? 'Ser una marca global que trascienda generaciones, llevando productos de calidad al mundo y conectando a las personas con historias auténticas.'
                  : 'To be a global brand that transcends generations, bringing quality products to the world and connecting people with authentic stories.'
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
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
              {language === 'es' ? 'Quienes Somos' : 'Who We Are'}
            </h1>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              {language === 'es'
                ? 'Somos Alohja Coffee, una empresa nacida del legado de nuestros abuelos, quienes dedicaron su vida al cultivo del café y al amor por la tierra. Nuestro propósito es continuar esta tradición cultivando bajo sombra, en armonía con la naturaleza, a la vez que apoyamos a las familias campesinas locales. «Nos comprometemos a ofrecer al mundo el mejor café de especialidad de Ecuador, con calidad, sostenibilidad y una historia auténtica en cada grano».'
                : 'We are Alohja Coffee, a company born from the legacy of our grandparents, who dedicated their lives to coffee farming and love for the land. Our purpose is to continue this tradition by cultivating under shade, in harmony with nature, while supporting local farming families. We are committed to bringing the world Ecuador\'s finest specialty coffee — with quality, sustainability, and an authentic story in every bean.'
              }
            </p>
          </div>
        </section>

        {/* Purpose Section */}
        <section className="mb-16">
          <div className="text-center bg-amber-50 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-black mb-6">
              {language === 'es' ? 'Propósito' : 'Purpose'}
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed max-w-4xl mx-auto">
              {language === 'es'
                ? 'Generar una conexión real entre el productor y el consumidor a través de nuestros productos, haciendo que cada persona se sienta parte de un cambio verdadero'
                : 'Generate a real connection between the producer and the consumer through our products, making each person feel part of a real change.'
              }
            </p>
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
        <section className="text-center bg-green-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-black mb-6">
            {language === 'es' ? 'Nuestro Legado' : 'Our Heritage'}
          </h2>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            {language === 'es'
              ? 'Desde las montañas de Ecuador hasta tu taza, cada grano cuenta una historia de tradición familiar, respeto por la naturaleza y compromiso con la excelencia. Somos más que una empresa de café: somos guardianes de una tradición que honra el pasado mientras construye un futuro sostenible.'
              : 'From the mountains of Ecuador to your cup, every bean tells a story of family tradition, respect for nature, and commitment to excellence. We are more than a coffee company: we are guardians of a tradition that honors the past while building a sustainable future.'
            }
          </p>
        </section>
      </div>

      <Footer language={language} />
    </div>
  )
}