import ProductsClient from '@/components/ProductsClient'
import { Product } from '@/types/cart'
import { query } from '@/lib/db'

// Enable ISR - revalidate every hour
export const revalidate = 3600

async function getProducts(): Promise<Product[]> {
  try {
    // Direct database query instead of HTTP fetch to avoid SSR issues
    const result = await query(`
      SELECT
        p.id,
        p.sku,
        p.name,
        p.name_en,
        p.description,
        p.description_en,
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
      WHERE p.is_active = true
      ORDER BY p.name
    `)

    // Transform database results to Product type
    const transformedProducts: Product[] = result.rows.map((p: any) => ({
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
    }))

    return transformedProducts
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export default async function ProductsPage() {
  const products = await getProducts()

  return <ProductsClient products={products} />
}
