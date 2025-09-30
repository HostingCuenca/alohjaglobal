import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    // Simplified query for now - we can enhance with JOINs later when batches are available
    const result = await query(`
      SELECT
        p.id,
        p.sku,
        p.name,
        p.name_en,
        p.description,
        p.description_en,
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

        -- Coffee variety information
        cv.name as variety_name,
        cv.description as variety_description,
        cv.characteristics as variety_characteristics,

        -- Category information
        pc.name as category_name,
        pc.name_en as category_name_en

      FROM products p
      LEFT JOIN coffee_varieties cv ON p.variety_id = cv.id
      LEFT JOIN product_categories pc ON p.category_id = pc.id

      WHERE p.is_active = true
      ORDER BY p.name
    `)

    return NextResponse.json({
      success: true,
      products: result.rows
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch products',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      sku,
      name,
      name_en,
      description,
      description_en,
      category_id,
      variety_id,
      weight_grams,
      roast_level,
      grind_type,
      packaging_type,
      price_usd,
      price_local,
      currency_local = 'USD',
      primary_image_url,
      gallery_images = [],
      tags = [],
      flavor_notes = [],
      brewing_recommendations,
      stock_quantity = 0
    } = body

    // Validation
    if (!sku || !name || !name_en || !weight_grams || !price_usd) {
      return NextResponse.json({
        success: false,
        error: 'SKU, name, name_en, weight_grams, and price_usd are required'
      }, { status: 400 })
    }

    const result = await query(`
      INSERT INTO products (
        sku, name, name_en, description, description_en,
        category_id, variety_id, weight_grams, roast_level, grind_type,
        packaging_type, price_usd, price_local, currency_local,
        primary_image_url, gallery_images, tags, flavor_notes,
        brewing_recommendations, stock_quantity
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
        $11, $12, $13, $14, $15, $16, $17, $18, $19, $20
      )
      RETURNING *
    `, [
      sku, name, name_en, description, description_en,
      category_id, variety_id, weight_grams, roast_level, grind_type,
      packaging_type, price_usd, price_local, currency_local,
      primary_image_url, JSON.stringify(gallery_images), JSON.stringify(tags),
      JSON.stringify(flavor_notes), brewing_recommendations, stock_quantity
    ])

    return NextResponse.json({
      success: true,
      product: result.rows[0]
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to create product'
    }, { status: 500 })
  }
}