import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    // Simple query first to test
    const result = await query(`
      SELECT
        id, sku, name, name_en, description, weight_grams,
        roast_level, grind_type, price_usd, price_local,
        primary_image_url, is_active
      FROM products
      WHERE is_active = true
      ORDER BY name
      LIMIT 5
    `)

    return NextResponse.json({
      success: true,
      products: result.rows,
      count: result.rows.length
    })
  } catch (error) {
    console.error('Error fetching products (simple):', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch products',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}