'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import CMSSidebar from '@/components/cms/CMSSidebar'
import CMSHeader from '@/components/cms/CMSHeader'
import ProductForm from '@/components/cms/ProductForm'

interface User {
  id: string
  username: string
  role: string
}

export default function EditProductPage() {
  const [user, setUser] = useState<User | null>(null)
  const [product, setProduct] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingProduct, setIsLoadingProduct] = useState(true)
  const router = useRouter()
  const params = useParams()
  const productId = params?.id as string

  useEffect(() => {
    const token = localStorage.getItem('cms_token')
    if (!token) {
      router.push('/crmalohja')
      return
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      setUser(payload)
      loadProduct()
    } catch {
      router.push('/crmalohja')
    }
  }, [router, productId])

  const loadProduct = async () => {
    try {
      setIsLoadingProduct(true)
      const response = await fetch(`/api/products/${productId}`)
      const data = await response.json()

      if (data.success) {
        // Transform API data to form data format
        const productData = {
          sku: data.product.sku,
          name: data.product.name,
          name_en: data.product.name_en,
          description: data.product.description || '',
          description_en: data.product.description_en || '',
          long_description: data.product.long_description || '',
          long_description_en: data.product.long_description_en || '',
          slug: data.product.slug || '',
          category_id: data.product.category_id,
          variety_id: data.product.variety_id,
          weight_grams: data.product.weight_grams,
          roast_level: data.product.roast_level || 'light',
          grind_type: data.product.grind_type || 'ground',
          packaging_type: data.product.packaging_type || 'bag',
          price_usd: data.product.price_usd,
          price_local: data.product.price_local,
          currency_local: data.product.currency_local || 'USD',
          primary_image_url: data.product.primary_image_url || '',
          gallery_images: Array.isArray(data.product.gallery_images)
            ? data.product.gallery_images
            : [],
          tags: Array.isArray(data.product.tags)
            ? data.product.tags
            : [],
          flavor_notes: Array.isArray(data.product.flavor_notes)
            ? data.product.flavor_notes
            : [],
          brewing_recommendations: data.product.brewing_recommendations || '',
          stock_quantity: data.product.stock_quantity || 0,
          is_active: data.product.is_active
        }
        setProduct(productData)
      } else {
        alert('No se pudo cargar el producto')
        router.push('/crmalohja/products')
      }
    } catch (error) {
      console.error('Error loading product:', error)
      alert('Error al cargar el producto')
      router.push('/crmalohja/products')
    } finally {
      setIsLoadingProduct(false)
    }
  }

  const handleSubmit = async (formData: any) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        router.push('/crmalohja/products')
      } else {
        const data = await response.json()
        alert(`Error: ${data.error || 'No se pudo actualizar el producto'}`)
      }
    } catch (error) {
      console.error('Error updating product:', error)
      alert('Error al actualizar el producto')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoadingProduct) {
    return (
      <div className="min-h-screen bg-gray-100 flex">
        <CMSSidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando producto...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <CMSSidebar />

      <div className="flex-1 flex flex-col">
        <CMSHeader user={user} />

        <main className="flex-1 p-8">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-4 mb-4">
                <button
                  onClick={() => router.push('/crmalohja/products')}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Editar Producto</h1>
                  <p className="text-gray-600 mt-1">{product?.name}</p>
                </div>
              </div>
            </div>

            {/* Form */}
            {product && (
              <ProductForm
                initialData={product}
                onSubmit={handleSubmit}
                isLoading={isLoading}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
