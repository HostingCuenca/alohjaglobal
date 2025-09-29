'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import CartSidebar from '@/components/CartSidebar'
import { useCart } from '@/context/CartContext'
import { getProductById, getRelatedProducts } from '@/data/products'

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string
  const [language, setLanguage] = useState<'es' | 'en'>('es')
  const { addToCart } = useCart()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedWeightIndex, setSelectedWeightIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const product = getProductById(productId)
  const relatedProducts = getRelatedProducts(productId)

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation language={language} setLanguage={setLanguage} />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {language === 'es' ? 'Producto no encontrado' : 'Product not found'}
          </h1>
          <p className="text-gray-600 mb-8">
            {language === 'es'
              ? 'El producto que buscas no existe o ha sido movido.'
              : 'The product you are looking for does not exist or has been moved.'
            }
          </p>
          <Link
            href="/productos"
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg transition-colors duration-300"
          >
            {language === 'es' ? 'Ver todos los productos' : 'View all products'}
          </Link>
        </div>
        <Footer language={language} />
      </div>
    )
  }

  const getCurrentWeightOption = () => {
    if (!product.weightOptions || product.weightOptions.length === 0) return null
    return product.weightOptions[selectedWeightIndex]
  }

  const getCurrentPrice = () => {
    const weightOption = getCurrentWeightOption()
    return weightOption ? weightOption.price : product.priceLocal
  }

  const getCurrentWeight = () => {
    const weightOption = getCurrentWeightOption()
    return weightOption ? weightOption.weight : product.weightGrams
  }

  const getCurrentImage = () => {
    const weightOption = getCurrentWeightOption()
    if (weightOption && selectedImageIndex === 0) {
      return weightOption.image
    }
    return product.galleryImages?.[selectedImageIndex] || product.primaryImageUrl || '/images/coffee-placeholder.jpg'
  }

  const handleAddToCart = () => {
    const weightOption = getCurrentWeightOption()
    const productToAdd = weightOption ? {
      ...product,
      sku: weightOption.sku,
      priceLocal: weightOption.price,
      priceUsd: weightOption.price,
      weightGrams: weightOption.weight,
      primaryImageUrl: weightOption.image
    } : product

    addToCart(productToAdd, quantity)
  }

  const getGrindTypeLabel = (grindType: string) => {
    const labels = {
      'ground': language === 'es' ? 'Molido' : 'Ground',
      'whole_bean': language === 'es' ? 'Grano entero' : 'Whole bean'
    }
    return labels[grindType as keyof typeof labels] || grindType
  }

  const getRoastLevelLabel = (roastLevel: string) => {
    const labels = {
      'light': language === 'es' ? 'Tueste claro' : 'Light roast',
      'dark': language === 'es' ? 'Tueste oscuro' : 'Dark roast'
    }
    return labels[roastLevel as keyof typeof labels] || roastLevel
  }

  return (
    <>
      <Head>
        <title>{`${language === 'es' ? product.name : product.nameEn} - Alohja Global`}</title>
        <meta
          name="description"
          content={language === 'es' ? product.description : product.descriptionEn}
        />
        <meta property="og:title" content={`${language === 'es' ? product.name : product.nameEn} - Alohja Global`} />
        <meta property="og:description" content={language === 'es' ? product.description : product.descriptionEn} />
        <meta property="og:image" content={product.primaryImageUrl} />
        <meta property="og:type" content="product" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${language === 'es' ? product.name : product.nameEn} - Alohja Global`} />
        <meta name="twitter:description" content={language === 'es' ? product.description : product.descriptionEn} />
        <meta name="twitter:image" content={product.primaryImageUrl} />
        <link rel="canonical" href={`https://alohjaglobal.com/productos/${product.id}`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": language === 'es' ? product.name : product.nameEn,
              "description": language === 'es' ? product.description : product.descriptionEn,
              "image": product.primaryImageUrl,
              "sku": product.sku,
              "brand": {
                "@type": "Brand",
                "name": "Alohja Global"
              },
              "offers": {
                "@type": "Offer",
                "price": getCurrentPrice(),
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock",
                "seller": {
                  "@type": "Organization",
                  "name": "Alohja Global"
                }
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5",
                "reviewCount": "1"
              }
            })
          }}
        />
      </Head>

      <div className="min-h-screen bg-white">
        <Navigation language={language} setLanguage={setLanguage} />

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <nav className="flex text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-700">
            {language === 'es' ? 'Inicio' : 'Home'}
          </Link>
          <span className="mx-2">/</span>
          <Link href="/productos" className="hover:text-gray-700">
            {language === 'es' ? 'Productos' : 'Products'}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">
            {language === 'es' ? product.name : product.nameEn}
          </span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden">
              <Image
                src={getCurrentImage()}
                alt={language === 'es' ? product.name : product.nameEn}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Gallery */}
            {product.galleryImages && product.galleryImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.galleryImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square bg-gray-50 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      selectedImageIndex === index
                        ? 'border-yellow-500'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} - ${index + 1}`}
                      width={150}
                      height={150}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {language === 'es' ? product.name : product.nameEn}
              </h1>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-green-700">
                  ${getCurrentPrice().toFixed(2)} USD
                </span>
                <span className="text-sm text-gray-500">
                  {language === 'es' ? 'Por unidad' : 'Per unit'}
                </span>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed">
                {language === 'es' ? product.description : product.descriptionEn}
              </p>
            </div>

            {/* Product Specifications */}
            <div className="grid grid-cols-2 gap-4 p-6 bg-gray-50 rounded-xl">
              <div>
                <span className="text-sm font-medium text-gray-500 block">
                  {language === 'es' ? 'Peso' : 'Weight'}
                </span>
                <span className="text-lg font-semibold text-gray-900">
                  {getCurrentWeight()}g
                </span>
              </div>

              {product.variety && (
                <div>
                  <span className="text-sm font-medium text-gray-500 block">
                    {language === 'es' ? 'Variedad' : 'Variety'}
                  </span>
                  <span className="text-lg font-semibold text-gray-900">
                    {product.variety.name}
                  </span>
                </div>
              )}

              {product.roastLevel && (
                <div>
                  <span className="text-sm font-medium text-gray-500 block">
                    {language === 'es' ? 'Tueste' : 'Roast'}
                  </span>
                  <span className="text-lg font-semibold text-gray-900">
                    {getRoastLevelLabel(product.roastLevel)}
                  </span>
                </div>
              )}

              {product.grindType && (
                <div>
                  <span className="text-sm font-medium text-gray-500 block">
                    {language === 'es' ? 'Molienda' : 'Grind'}
                  </span>
                  <span className="text-lg font-semibold text-gray-900">
                    {getGrindTypeLabel(product.grindType)}
                  </span>
                </div>
              )}
            </div>

            {/* Weight Options */}
            {product.weightOptions && product.weightOptions.length > 1 && (
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3">
                  {language === 'es' ? 'Selecciona el peso:' : 'Select weight:'}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {product.weightOptions.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedWeightIndex(index)}
                      className={`p-4 border-2 rounded-xl text-left transition-all duration-200 ${
                        selectedWeightIndex === index
                          ? 'border-yellow-500 bg-yellow-50 shadow-md'
                          : 'border-gray-300 hover:border-yellow-400 hover:bg-gray-50'
                      }`}
                    >
                      <div className="font-bold text-gray-900 text-lg">{option.weight}g</div>
                      <div className="text-sm font-semibold text-gray-700">${option.price.toFixed(2)}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Flavor Notes */}
            {product.flavorNotes && product.flavorNotes.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {language === 'es' ? 'Notas de sabor' : 'Flavor notes'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.flavorNotes.map((note, index) => (
                    <span
                      key={index}
                      className="bg-green-100 text-green-800 px-3 py-2 rounded-full text-sm font-medium"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Brewing Recommendations */}
            {product.brewingRecommendations && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {language === 'es' ? 'Recomendaciones de preparación' : 'Brewing recommendations'}
                </h3>
                <p className="text-gray-600">
                  {product.brewingRecommendations}
                </p>
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  {language === 'es' ? 'Cantidad:' : 'Quantity:'}
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 border-2 border-gray-400 rounded-lg flex items-center justify-center hover:bg-gray-100 hover:border-gray-500 transition-all duration-200 text-gray-900 font-bold text-xl"
                  >
                    −
                  </button>
                  <span className="text-2xl font-bold min-w-[4rem] text-center text-gray-900 bg-gray-50 px-4 py-2 rounded-lg border-2 border-gray-300">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 border-2 border-gray-400 rounded-lg flex items-center justify-center hover:bg-gray-100 hover:border-gray-500 transition-all duration-200 text-gray-900 font-bold text-xl"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-6 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {language === 'es' ? 'Agregar al Carrito' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {language === 'es' ? 'Productos relacionados' : 'Related products'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/productos/${relatedProduct.id}`}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="aspect-square bg-gray-50 rounded-lg mb-4 overflow-hidden">
                    <Image
                      src={relatedProduct.primaryImageUrl || '/images/coffee-placeholder.jpg'}
                      alt={language === 'es' ? relatedProduct.name : relatedProduct.nameEn}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h3 className="font-bold text-lg text-black leading-tight mb-2">
                    {language === 'es' ? relatedProduct.name : relatedProduct.nameEn}
                  </h3>

                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-green-700">
                      ${relatedProduct.priceLocal.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500">
                      {relatedProduct.weightGrams}g
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

        <Footer language={language} />
        <CartSidebar language={language} />
      </div>
    </>
  )
}