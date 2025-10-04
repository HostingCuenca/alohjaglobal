import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProductDetailClient from '@/components/ProductDetailClient'
import { Product } from '@/types/cart'
import { query } from '@/lib/db'

// Enable ISR - revalidate every hour
export const revalidate = 3600

// Generate static params for all products
export async function generateStaticParams() {
  try {
    // Direct database query instead of HTTP fetch
    const result = await query(`
      SELECT slug FROM products WHERE is_active = true
    `)

    return result.rows.map((row: any) => ({
      id: row.slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

async function getProduct(slug: string): Promise<Product | null> {
  try {
    // Direct database query instead of HTTP fetch
    const result = await query(`
      SELECT
        p.id,
        p.sku,
        p.name,
        p.name_en,
        p.description,
        p.description_en,
        p.long_description,
        p.long_description_en,
        p.slug,
        p.weight_grams,
        p.roast_level,
        p.grind_type,
        p.packaging_type,
        p.price_usd,
        p.price_local,
        p.currency_local,
        p.primary_image_url,
        p.gallery_images,
        p.tags,
        p.flavor_notes,
        p.brewing_recommendations,
        p.is_active,
        p.stock_quantity,
        cv.name as variety_name,
        cv.description as variety_description,
        cv.characteristics as variety_characteristics,
        pc.name as category_name,
        pc.name_en as category_name_en
      FROM products p
      LEFT JOIN coffee_varieties cv ON p.variety_id = cv.id
      LEFT JOIN product_categories pc ON p.category_id = pc.id
      WHERE p.slug = $1 AND p.is_active = true
    `, [slug])

    if (result.rows.length === 0) {
      return null
    }

    const p = result.rows[0]
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
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

async function getRelatedProducts(slug: string, roastLevel: string, grindType: string): Promise<Product[]> {
  try {
    // Direct database query instead of HTTP fetch
    const result = await query(`
      SELECT
        p.slug,
        p.sku,
        p.name,
        p.name_en,
        p.primary_image_url,
        p.price_local,
        p.price_usd,
        p.weight_grams,
        p.roast_level,
        p.grind_type
      FROM products p
      WHERE p.is_active = true
        AND p.slug != $1
        AND (p.roast_level = $2 OR p.grind_type = $3)
      ORDER BY p.name
      LIMIT 4
    `, [slug, roastLevel, grindType])

    return result.rows.map((rp: any) => ({
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
      images: product.primaryImageUrl ? [product.primaryImageUrl] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} - Alohja Global`,
      description: product.description,
      images: product.primaryImageUrl ? [product.primaryImageUrl] : [],
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
