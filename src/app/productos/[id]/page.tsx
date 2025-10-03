import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProductDetailClient from '@/components/ProductDetailClient'
import { Product } from '@/types/cart'

// Enable ISR - revalidate every hour
export const revalidate = 3600

// Generate static params for all products
export async function generateStaticParams() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3202'
    const response = await fetch(`${baseUrl}/api/products`, {
      next: { revalidate: 3600 }
    })

    if (!response.ok) {
      return []
    }

    const data = await response.json()

    if (data.success) {
      return data.products.map((product: any) => ({
        id: product.slug,
      }))
    }

    return []
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3202'
    const response = await fetch(`${baseUrl}/api/products/${slug}`, {
      next: { revalidate: 3600 }
    })

    if (!response.ok) {
      return null
    }

    const data = await response.json()

    if (data.success) {
      const p = data.product
      const transformedProduct: Product = {
        id: p.slug,
        sku: p.sku,
        name: p.name,
        nameEn: p.name_en,
        description: p.description,
        descriptionEn: p.description_en,
        longDescription: p.long_description,
        longDescriptionEn: p.long_description_en,
        weightGrams: p.weight_grams,
        roastLevel: p.roast_level,
        grindType: p.grind_type,
        packagingType: p.packaging_type,
        priceUsd: parseFloat(p.price_usd),
        priceLocal: parseFloat(p.price_local),
        currencyLocal: p.currency_local,
        primaryImageUrl: p.primary_image_url,
        galleryImages: p.gallery_images || [],
        tags: p.tags || [],
        flavorNotes: p.flavor_notes || [],
        brewingRecommendations: p.brewing_recommendations,
        isActive: p.is_active,
        stockQuantity: p.stock_quantity,
        variety: p.variety_name ? { name: p.variety_name } : undefined,
        weightOptions: []
      }
      return transformedProduct
    }
    return null
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

async function getRelatedProducts(slug: string, roastLevel: string, grindType: string): Promise<Product[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3202'
    const response = await fetch(`${baseUrl}/api/products`, {
      next: { revalidate: 3600 }
    })

    if (!response.ok) {
      return []
    }

    const data = await response.json()

    if (data.success) {
      const related = data.products
        .filter((rp: any) =>
          rp.slug !== slug &&
          (rp.roast_level === roastLevel || rp.grind_type === grindType)
        )
        .slice(0, 4)
        .map((rp: any) => ({
          id: rp.slug,
          sku: rp.sku,
          name: rp.name,
          nameEn: rp.name_en,
          primaryImageUrl: rp.primary_image_url,
          priceLocal: parseFloat(rp.price_local),
          priceUsd: parseFloat(rp.price_usd),
          weightGrams: rp.weight_grams,
          roastLevel: rp.roast_level,
          grindType: rp.grind_type
        }))
      return related
    }
    return []
  } catch (error) {
    console.error('Error fetching related products:', error)
    return []
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = await getProduct(params.id)

  if (!product) {
    return {
      title: 'Producto no encontrado - Alohja Global',
    }
  }

  return {
    title: `${product.name} - Alohja Global`,
    description: product.description,
    openGraph: {
      title: `${product.name} - Alohja Global`,
      description: product.description,
      images: [product.primaryImageUrl],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} - Alohja Global`,
      description: product.description,
      images: [product.primaryImageUrl],
    },
  }
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)

  if (!product) {
    notFound()
  }

  const relatedProducts = await getRelatedProducts(
    params.id,
    product.roastLevel || '',
    product.grindType || ''
  )

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />
}
