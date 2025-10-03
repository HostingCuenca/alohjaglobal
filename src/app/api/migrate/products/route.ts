import { NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { products } from '@/data/products'

export async function POST() {
  try {
    // First, let's check if we have product categories
    const categoriesResult = await query(`
      SELECT COUNT(*) as count FROM product_categories
    `)

    let defaultCategoryId = 1

    // If no categories exist, create a default one
    if (parseInt(categoriesResult.rows[0].count) === 0) {
      const categoryResult = await query(`
        INSERT INTO product_categories (name, name_en, description, description_en)
        VALUES ('Café', 'Coffee', 'Productos de café', 'Coffee products')
        RETURNING id
      `)
      defaultCategoryId = categoryResult.rows[0].id
    }

    // Get variety mapping
    const varietiesResult = await query(`
      SELECT id, name FROM coffee_varieties
    `)
    const varietyMap = new Map()
    varietiesResult.rows.forEach((row: any) => {
      varietyMap.set(row.name, row.id)
      // Also map partial matches
      if (row.name.includes('Typica')) varietyMap.set('Typica', row.id)
      if (row.name.includes('Bourbon')) varietyMap.set('Bourbon', row.id)
      if (row.name.includes('Gesha')) varietyMap.set('Gesha', row.id)
    })

    // Function to determine variety ID from product
    const getVarietyId = (product: any) => {
      if (product.variety?.name) {
        return varietyMap.get(product.variety.name)
      }

      // Try to extract from description
      const desc = product.description || ''
      if (desc.includes('Typica')) return varietyMap.get('Typica Mejorada')
      if (desc.includes('Bourbon')) return varietyMap.get('Bourbon Rosado')
      if (desc.includes('Gesha')) return varietyMap.get('Gesha')

      return varietyMap.get('Typica Mejorada') // Default fallback
    }

    const migratedProducts = []
    const errors = []

    for (const product of products) {
      try {
        // Check if product already exists
        const existingResult = await query(`
          SELECT id FROM products WHERE sku = $1
        `, [product.sku])

        if (existingResult.rows.length > 0) {
          console.log(`Product ${product.sku} already exists, skipping...`)
          continue
        }

        const varietyId = getVarietyId(product)

        // Generate slug from product id
        const slug = product.id

        const result = await query(`
          INSERT INTO products (
            sku, name, name_en, description, description_en,
            long_description, long_description_en, slug,
            category_id, variety_id, weight_grams, roast_level, grind_type,
            packaging_type, price_usd, price_local, currency_local,
            primary_image_url, gallery_images, tags, flavor_notes,
            brewing_recommendations, stock_quantity, is_active
          ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
            $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,
            $21, $22, $23, $24
          )
          RETURNING id, sku, name
        `, [
          product.sku,
          product.name,
          product.nameEn,
          product.description,
          product.descriptionEn,
          product.longDescription,
          product.longDescriptionEn,
          slug,
          defaultCategoryId,
          varietyId,
          product.weightGrams,
          product.roastLevel,
          product.grindType,
          product.packagingType,
          product.priceUsd,
          product.priceLocal,
          product.currencyLocal,
          product.primaryImageUrl,
          JSON.stringify(product.galleryImages || []),
          JSON.stringify(product.tags || []),
          JSON.stringify(product.flavorNotes || []),
          product.brewingRecommendations,
          product.stockQuantity,
          product.isActive
        ])

        migratedProducts.push(result.rows[0])
        console.log(`Migrated product: ${product.sku}`)

      } catch (error) {
        console.error(`Error migrating product ${product.sku}:`, error)
        errors.push({
          sku: product.sku,
          error: error instanceof Error ? error.message : 'Unknown error'
        })
      }
    }

    return NextResponse.json({
      success: true,
      message: `Migration completed`,
      migrated: migratedProducts,
      errors: errors,
      stats: {
        total: products.length,
        migrated: migratedProducts.length,
        errors: errors.length
      }
    })

  } catch (error) {
    console.error('Migration error:', error)
    return NextResponse.json({
      success: false,
      error: 'Migration failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}