'use client'

import { useState } from 'react'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import CartSidebar from '@/components/CartSidebar'
import { useCart } from '@/context/CartContext'
import { Product } from '@/types/cart'

export default function ProductsPage() {
  const [language, setLanguage] = useState<'es' | 'en'>('es')
  const { addToCart, state } = useCart()
  const [selectedProductImages, setSelectedProductImages] = useState<{[key: string]: number}>({})

  const handleImageClick = (productId: string, imageIndex: number) => {
    setSelectedProductImages(prev => ({
      ...prev,
      [productId]: imageIndex
    }))
  }

  const products: Product[] = [
    {
      id: 'coffee-ground-light-250',
      sku: 'CGL250',
      name: 'Café molido tueste claro 250 gr',
      nameEn: 'Ground coffee light roast 250 gr',
      primaryImageUrl: '/assets/productosreales/4. 250 gr.png',
      galleryImages: ['/assets/productosreales/4. 250 gr.png'],
      description: 'Café molido con tueste claro, ideal para métodos de filtrado',
      descriptionEn: 'Ground coffee with light roast, ideal for filter methods',
      weightGrams: 250,
      roastLevel: 'light',
      grindType: 'ground',
      priceUsd: 12.99,
      priceLocal: 12.99,
      currencyLocal: 'USD',
      isActive: true,
      stockQuantity: 50,
      variety: { name: 'Typica Mejorada' },
      flavorNotes: ['Cítrico', 'Floral', 'Dulce']
    },
    {
      id: 'coffee-ground-dark-250',
      sku: 'CGD250',
      name: 'Café molido tueste oscuro 250 gr',
      nameEn: 'Ground coffee dark roast 250 gr',
      primaryImageUrl: '/assets/productosreales/7. 250 gr.png',
      galleryImages: ['/assets/productosreales/7. 250 gr.png'],
      description: 'Café molido con tueste oscuro, perfecto para espresso',
      descriptionEn: 'Ground coffee with dark roast, perfect for espresso',
      weightGrams: 250,
      roastLevel: 'dark',
      grindType: 'ground',
      priceUsd: 12.99,
      priceLocal: 12.99,
      currencyLocal: 'USD',
      isActive: true,
      stockQuantity: 45,
      variety: { name: 'Bourbon Rosado' },
      flavorNotes: ['Chocolate', 'Nuez', 'Caramelo']
    },
    {
      id: 'coffee-premium-blend',
      sku: 'CPB001',
      name: 'Café Premium Blend',
      nameEn: 'Premium Coffee Blend',
      primaryImageUrl: '/assets/productosreales/6.png',
      galleryImages: ['/assets/productosreales/6.png'],
      description: 'Mezcla premium de variedades selectas',
      descriptionEn: 'Premium blend of select varieties',
      weightGrams: 250,
      roastLevel: 'medium',
      packagingType: 'bag',
      priceUsd: 15.99,
      priceLocal: 15.99,
      currencyLocal: 'USD',
      isActive: true,
      stockQuantity: 30,
      variety: { name: 'Gesha' },
      flavorNotes: ['Floral', 'Bergamota', 'Jasmin']
    },
    {
      id: 'coffee-signature-series',
      sku: 'CSS001',
      name: 'Café Signature Series',
      nameEn: 'Signature Series Coffee',
      primaryImageUrl: '/assets/productosreales/9.png',
      galleryImages: ['/assets/productosreales/9.png', '/assets/productosreales/11.png'],
      description: 'Edición limitada de nuestra colección signature',
      descriptionEn: 'Limited edition from our signature collection',
      weightGrams: 340,
      roastLevel: 'medium',
      grindType: 'whole_bean',
      priceUsd: 22.99,
      priceLocal: 22.99,
      currencyLocal: 'USD',
      isActive: true,
      stockQuantity: 20,
      variety: { name: 'Typica Mejorada' },
      flavorNotes: ['Chocolate', 'Vainilla', 'Frutal']
    },
    {
      id: 'coffee-ground-light-340',
      sku: 'CGL340',
      name: 'Café molido tueste claro 340 gr',
      nameEn: 'Ground coffee light roast 340 gr',
      primaryImageUrl: '/assets/productosreales/5. 340 gr.png',
      galleryImages: ['/assets/productosreales/5. 340 gr.png', '/assets/productosreales/10. solo en 340 gr.png'],
      description: 'Presentación familiar de café molido tueste claro',
      descriptionEn: 'Family size light roast ground coffee',
      weightGrams: 340,
      roastLevel: 'light',
      grindType: 'ground',
      priceUsd: 16.99,
      priceLocal: 16.99,
      currencyLocal: 'USD',
      isActive: true,
      stockQuantity: 35,
      variety: { name: 'Typica Mejorada' },
      flavorNotes: ['Cítrico', 'Floral', 'Dulce']
    },
    {
      id: 'coffee-ground-dark-340',
      sku: 'CGD340',
      name: 'Café molido tueste oscuro 340 gr',
      nameEn: 'Ground coffee dark roast 340 gr',
      primaryImageUrl: '/assets/productosreales/8. 340 gr.png',
      galleryImages: ['/assets/productosreales/8. 340 gr.png', '/assets/productosreales/13. solo en 340 gr.png'],
      description: 'Presentación familiar de café molido tueste oscuro',
      descriptionEn: 'Family size dark roast ground coffee',
      weightGrams: 340,
      roastLevel: 'dark',
      grindType: 'ground',
      priceUsd: 16.99,
      priceLocal: 16.99,
      currencyLocal: 'USD',
      isActive: true,
      stockQuantity: 40,
      variety: { name: 'Bourbon Rosado' },
      flavorNotes: ['Chocolate', 'Nuez', 'Caramelo']
    },
    {
      id: 'coffee-artisan-blend',
      sku: 'CAB001',
      name: 'Café Artesanal Blend',
      nameEn: 'Artisan Coffee Blend',
      primaryImageUrl: '/assets/productosreales/12.png',
      galleryImages: ['/assets/productosreales/12.png', '/assets/productosreales/14.png'],
      description: 'Mezcla artesanal de granos selectos',
      descriptionEn: 'Artisanal blend of select beans',
      weightGrams: 340,
      roastLevel: 'medium',
      grindType: 'whole_bean',
      priceUsd: 19.99,
      priceLocal: 19.99,
      currencyLocal: 'USD',
      isActive: true,
      stockQuantity: 25,
      variety: { name: 'Gesha' },
      flavorNotes: ['Floral', 'Bergamota', 'Dulce']
    },
    {
      id: 'coffee-premium-reserve',
      sku: 'CPR001',
      name: 'Café Premium Reserve',
      nameEn: 'Premium Reserve Coffee',
      primaryImageUrl: '/assets/productosreales/15.png',
      galleryImages: ['/assets/productosreales/15.png'],
      description: 'Reserva premium de edición limitada',
      descriptionEn: 'Limited edition premium reserve',
      weightGrams: 250,
      roastLevel: 'dark',
      packagingType: 'premium_bag',
      priceUsd: 24.99,
      priceLocal: 24.99,
      currencyLocal: 'USD',
      isActive: true,
      stockQuantity: 25,
      variety: { name: 'Bourbon Rosado' },
      flavorNotes: ['Chocolate', 'Especias', 'Caramelo']
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
          {products.map((product, index) => {
            const currentImageIndex = selectedProductImages[product.id] || 0
            const currentImage = product.galleryImages?.[currentImageIndex] || product.primaryImageUrl || '/images/coffee-placeholder.jpg'

            return (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="aspect-square bg-gray-50 rounded-lg mb-4 overflow-hidden relative">
                  <Image
                    src={currentImage}
                    alt={language === 'es' ? product.name : product.nameEn}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />

                  {/* Image Gallery Indicators */}
                  {product.galleryImages && product.galleryImages.length > 1 && (
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                      {product.galleryImages.map((_, imgIndex) => (
                        <button
                          key={imgIndex}
                          onClick={() => handleImageClick(product.id, imgIndex)}
                          className={`w-2 h-2 rounded-full transition-all duration-200 ${
                            currentImageIndex === imgIndex
                              ? 'bg-yellow-500'
                              : 'bg-white/60 hover:bg-white/80'
                          }`}
                        />
                      ))}
                    </div>
                  )}

                  {/* Navigation Arrows for multiple images */}
                  {product.galleryImages && product.galleryImages.length > 1 && (
                    <>
                      <button
                        onClick={() => handleImageClick(product.id, currentImageIndex > 0 ? currentImageIndex - 1 : product.galleryImages!.length - 1)}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200"
                      >
                        ←
                      </button>
                      <button
                        onClick={() => handleImageClick(product.id, currentImageIndex < product.galleryImages!.length - 1 ? currentImageIndex + 1 : 0)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200"
                      >
                        →
                      </button>
                    </>
                  )}
                </div>
              
              <div className="space-y-3">
                <h3 className="font-bold text-lg text-black leading-tight">
                  {language === 'es' ? product.name : product.nameEn}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed">
                  {language === 'es' ? product.description : product.descriptionEn}
                </p>

                {/* Variety and Weight Info */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{product.variety?.name}</span>
                  <span>{product.weightGrams}g</span>
                </div>

                {/* Flavor Notes */}
                {product.flavorNotes && (
                  <div className="flex flex-wrap gap-1">
                    {product.flavorNotes.slice(0, 3).map((note, noteIndex) => (
                      <span key={noteIndex} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        {note}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-700">
                    ${product.priceLocal.toFixed(2)}
                  </span>
                  <div className="text-xs text-gray-500">
                    {language === 'es' ? 'Por unidad' : 'Per unit'}
                  </div>
                </div>

                <button
                  onClick={() => addToCart(product, 1)}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                >
                  {language === 'es' ? 'Agregar al Carrito' : 'Add to Cart'}
                </button>
              </div>
            </div>
            )
          })}
        </div>

        {/* Contact Banner */}
        <div className="mt-16 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-black mb-4">
            {language === 'es' ? '¿Necesitas más información?' : 'Need more information?'}
          </h2>
          <p className="text-lg text-black/80 mb-6 max-w-2xl mx-auto">
            {language === 'es'
              ? 'Contacta con nuestro equipo para pedidos especiales, precios mayoristas o cualquier consulta sobre nuestros productos.'
              : 'Contact our team for special orders, wholesale prices, or any questions about our products.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.href = '/contacto'}
              className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
            >
              {language === 'es' ? 'Contáctanos' : 'Contact Us'}
            </button>
            <button
              onClick={() => {
                const whatsappNumber = '593999999999'
                const message = language === 'es'
                  ? '¡Hola! Me interesa conocer más sobre sus productos de café Alohja.'
                  : 'Hello! I\'m interested in learning more about your Alohja coffee products.'
                const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
                window.open(whatsappUrl, '_blank')
              }}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span>WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      <Footer language={language} />
      <CartSidebar language={language} />
    </div>
  )
}