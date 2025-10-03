import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

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
        p.category_id,
        p.variety_id,
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
        p.created_at,
        p.updated_at,

        -- Coffee variety information
        cv.id as variety_id_ref,
        cv.name as variety_name,
        cv.description as variety_description,

        -- Category information
        pc.id as category_id_ref,
        pc.name as category_name,
        pc.name_en as category_name_en

      FROM products p
      LEFT JOIN coffee_varieties cv ON p.variety_id = cv.id
      LEFT JOIN product_categories pc ON p.category_id = pc.id
      WHERE p.id::text = $1 OR p.sku = $1 OR p.slug = $1
    `, [id])

    if (result.rows.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Product not found'
      }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      product: result.rows[0]
    })
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch product',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const {
      sku,
      name,
      name_en,
      description,
      description_en,
      long_description,
      long_description_en,
      slug,
      category_id,
      variety_id,
      weight_grams,
      roast_level,
      grind_type,
      packaging_type,
      price_usd,
      price_local,
      currency_local,
      primary_image_url,
      gallery_images,
      tags,
      flavor_notes,
      brewing_recommendations,
      stock_quantity,
      is_active
    } = body

    const result = await query(`
      UPDATE products SET
        sku = COALESCE($2, sku),
        name = COALESCE($3, name),
        name_en = COALESCE($4, name_en),
        description = COALESCE($5, description),
        description_en = COALESCE($6, description_en),
        long_description = COALESCE($7, long_description),
        long_description_en = COALESCE($8, long_description_en),
        slug = COALESCE($9, slug),
        category_id = COALESCE($10, category_id),
        variety_id = COALESCE($11, variety_id),
        weight_grams = COALESCE($12, weight_grams),
        roast_level = COALESCE($13, roast_level),
        grind_type = COALESCE($14, grind_type),
        packaging_type = COALESCE($15, packaging_type),
        price_usd = COALESCE($16, price_usd),
        price_local = COALESCE($17, price_local),
        currency_local = COALESCE($18, currency_local),
        primary_image_url = COALESCE($19, primary_image_url),
        gallery_images = COALESCE($20, gallery_images),
        tags = COALESCE($21, tags),
        flavor_notes = COALESCE($22, flavor_notes),
        brewing_recommendations = COALESCE($23, brewing_recommendations),
        stock_quantity = COALESCE($24, stock_quantity),
        is_active = COALESCE($25, is_active),
        updated_at = NOW()
      WHERE id::text = $1 OR sku = $1
      RETURNING *
    `, [
      id, sku, name, name_en, description, description_en,
      long_description, long_description_en, slug,
      category_id, variety_id, weight_grams, roast_level, grind_type,
      packaging_type, price_usd, price_local, currency_local,
      primary_image_url,
      gallery_images ? JSON.stringify(gallery_images) : null,
      tags ? JSON.stringify(tags) : null,
      flavor_notes ? JSON.stringify(flavor_notes) : null,
      brewing_recommendations, stock_quantity, is_active
    ])

    if (result.rows.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Product not found'
      }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      product: result.rows[0]
    })
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to update product'
    }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const result = await query(`
      UPDATE products
      SET is_active = false, updated_at = NOW()
      WHERE id::text = $1 OR sku = $1
      RETURNING id, sku, name
    `, [id])

    if (result.rows.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Product not found'
      }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: 'Product deactivated successfully',
      product: result.rows[0]
    })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to delete product'
    }, { status: 500 })
  }
}