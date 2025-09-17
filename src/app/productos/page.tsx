'use client'

import { useState } from 'react'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function ProductsPage() {
  const [language, setLanguage] = useState<'es' | 'en'>('es')

  const products = [
    { 
      name: 'Café molido tueste claro 250 gr', 
      nameEn: 'Ground coffee light roast 250 gr',
      image: '/assets/productos/placeholderCafé molido tueste claro 250 gr.png',
      description: 'Café molido con tueste claro, ideal para métodos de filtrado',
      descriptionEn: 'Ground coffee with light roast, ideal for filter methods',
      price: '$12.99'
    },
    { 
      name: 'Café molido tueste oscuro 250 gr', 
      nameEn: 'Ground coffee dark roast 250 gr',
      image: '/assets/productos/placeholder Cafe molido tueste oscuro 250 gr.png',
      description: 'Café molido con tueste oscuro, perfecto para espresso',
      descriptionEn: 'Ground coffee with dark roast, perfect for espresso',
      price: '$12.99'
    },
    { 
      name: 'Café regalo corporativo claro 50 gr', 
      nameEn: 'Corporate gift coffee light 50 gr',
      image: '/assets/productos/placeholder Cafe regalo corporativo claro 50 gr.png',
      description: 'Presentación especial para regalos corporativos',
      descriptionEn: 'Special presentation for corporate gifts',
      price: '$8.99'
    },
    { 
      name: 'Café en oro, grano verde 1 kg', 
      nameEn: 'Gold coffee, green beans 1 kg',
      image: '/assets/productos/placeholder Café en oro, grano verde 1 kg.png',
      description: 'Café verde premium para tostadores profesionales',
      descriptionEn: 'Premium green coffee for professional roasters',
      price: '$24.99'
    },
    { 
      name: 'Café molido tueste claro 340 gr', 
      nameEn: 'Ground coffee light roast 340 gr',
      image: '/assets/productos/placeholderCafé molido tueste claro 250 gr.png',
      description: 'Presentación familiar de café molido tueste claro',
      descriptionEn: 'Family size light roast ground coffee',
      price: '$16.99'
    },
    { 
      name: 'Café molido tueste oscuro 340 gr', 
      nameEn: 'Ground coffee dark roast 340 gr',
      image: '/assets/productos/placeholder Cafe molido tueste oscuro 250 gr.png',
      description: 'Presentación familiar de café molido tueste oscuro',
      descriptionEn: 'Family size dark roast ground coffee',
      price: '$16.99'
    },
    { 
      name: 'Café en grano tueste claro 340 gr', 
      nameEn: 'Coffee beans light roast 340 gr',
      image: '/assets/productos/placeholder Café en oro, grano verde 1 kg.png',
      description: 'Granos enteros con tueste claro para máxima frescura',
      descriptionEn: 'Whole beans with light roast for maximum freshness',
      price: '$18.99'
    },
    { 
      name: 'Café regalo corporativo oscuro 50 gr', 
      nameEn: 'Corporate gift coffee dark 50 gr',
      image: '/assets/productos/placeholder Cafe regalo corporativo claro 50 gr.png',
      description: 'Presentación corporativa con tueste oscuro',
      descriptionEn: 'Corporate presentation with dark roast',
      price: '$8.99'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation language={language} setLanguage={setLanguage} />

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
            {language === 'es' ? 'Nuestros Productos' : 'Our Products'}
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {language === 'es'
              ? 'Descubre nuestra selección de cafés premium ecuatorianos, cuidadosamente cultivados y procesados para ofrecerte la mejor experiencia en cada taza.'
              : 'Discover our selection of premium Ecuadorian coffees, carefully cultivated and processed to offer you the best experience in every cup.'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="aspect-square bg-gray-50 rounded-lg mb-4 overflow-hidden">
                <Image
                  src={product.image}
                  alt={language === 'es' ? product.name : product.nameEn}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="space-y-3">
                <h3 className="font-bold text-lg text-black leading-tight">
                  {language === 'es' ? product.name : product.nameEn}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed">
                  {language === 'es' ? product.description : product.descriptionEn}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-700">
                    {product.price}
                  </span>
                  <div className="text-xs text-gray-500">
                    {language === 'es' ? 'Por unidad' : 'Per unit'}
                  </div>
                </div>
                
                <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
                  {language === 'es' ? 'Ver Detalles' : 'View Details'}
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