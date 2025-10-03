import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    const result = await query(`
      SELECT id, name, name_en, description, description_en
      FROM product_categories
      ORDER BY name
    `)

    return NextResponse.json({
      success: true,
      categories: result.rows
    })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch categories'
    }, { status: 500 })
  }
}
