import ProductsClient from '@/components/ProductsClient'
import { Product } from '@/types/cart'

// Enable ISR - revalidate every hour
export const revalidate = 3600

async function getProducts(): Promise<Product[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3202'
    const response = await fetch(`${baseUrl}/api/products`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }

    const data = await response.json()

    if (data.success) {
      // Transform API data to Product type
      const transformedProducts: Product[] = data.products.map((p: any) => ({
        id: p.slug, // Use slug as ID for routing
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
        weightOptions: [] // Single weight per product now
      }))
      return transformedProducts
    }
    return []
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export default async function ProductsPage() {
  const products = await getProducts()

  return <ProductsClient products={products} />
}
