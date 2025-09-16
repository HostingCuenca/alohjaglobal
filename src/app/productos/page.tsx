'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function ProductsPage() {
  const [language, setLanguage] = useState<'es' | 'en'>('es')

  const products = [
    { name: 'Café molido tueste claro 250 gr', nameEn: 'Ground coffee light roast 250 gr' },
    { name: 'Café molido tueste claro 340 gr', nameEn: 'Ground coffee light roast 340 gr' },
    { name: 'Café molido tueste oscuro 250 gr', nameEn: 'Ground coffee dark roast 250 gr' },
    { name: 'Café molido tueste oscuro 340 gr', nameEn: 'Ground coffee dark roast 340 gr' },
    { name: 'Café molido clásico claro 200 gr', nameEn: 'Classic light ground coffee 200 gr' },
    { name: 'Café molido clásico oscuro 200 gr', nameEn: 'Classic dark ground coffee 200 gr' },
    { name: 'Café en grano tueste claro 340 gr', nameEn: 'Coffee beans light roast 340 gr' },
    { name: 'Café en grano tueste oscuro 340 gr', nameEn: 'Coffee beans dark roast 340 gr' },
    { name: 'Café en grano tueste claro 1 kg blend', nameEn: 'Coffee beans light roast 1 kg blend' },
    { name: 'Café en grano tueste oscuro 1 kg blend', nameEn: 'Coffee beans dark roast 1 kg blend' },
    { name: 'Café en grano tueste claro 1 kg origen', nameEn: 'Coffee beans light roast 1 kg origin' },
    { name: 'Café en grano tueste oscuro 1 kg origen', nameEn: 'Coffee beans dark roast 1 kg origin' },
    { name: 'Café regalo corporativo claro 50 gr', nameEn: 'Corporate gift coffee light 50 gr' },
    { name: 'Café regalo corporativo oscuro 50 gr', nameEn: 'Corporate gift coffee dark 50 gr' },
    { name: 'Café en oro, grano verde 1 kg', nameEn: 'Gold coffee, green beans 1 kg' },
    { name: 'Café en oro grano verde 5 kg', nameEn: 'Gold coffee green beans 5 kg' }
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-gray-400">
                  {language === 'es' ? 'Imagen del producto' : 'Product image'}
                </span>
              </div>
              <h3 className="font-semibold text-black mb-2">
                {language === 'es' ? product.name : product.nameEn}
              </h3>
              <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 px-4 rounded-lg transition-colors">
                {language === 'es' ? 'Ver Detalles' : 'View Details'}
              </button>
            </div>
          ))}
        </div>
      </div>

      <Footer language={language} />
    </div>
  )
}