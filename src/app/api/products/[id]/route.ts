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
        pc.name_en as category_name_en,

        -- Batch and origin information (aggregated)
        COALESCE(
          json_agg(
            DISTINCT jsonb_build_object(
              'batch_id', cb.batch_id,
              'farmer_name', f.full_name,
              'farmer_code', f.farmer_code,
              'province_name', pr.name,
              'province_code', pr.code,
              'province_map', pr.map_image_url,
              'altitude_range', pr.altitude_range,
              'altitude_min', cb.altitude_min,
              'altitude_max', cb.altitude_max,
              'processing_method', cb.processing_method,
              'drying_method', cb.drying_method,
              'harvest_date', cb.harvest_date,
              'transport_mode', cb.transport_mode,
              'roast_date', cb.roast_date,
              'percentage', pb.percentage
            )
          ) FILTER (WHERE cb.id IS NOT NULL),
          '[]'::json
        ) as batches

      FROM products p
      LEFT JOIN coffee_varieties cv ON p.variety_id = cv.id
      LEFT JOIN product_categories pc ON p.category_id = pc.id
      LEFT JOIN product_batches pb ON p.id = pb.product_id
      LEFT JOIN coffee_batches cb ON pb.batch_id = cb.id
      LEFT JOIN farmers f ON cb.farmer_id = f.id
      LEFT JOIN provinces pr ON f.province_id = pr.id

      WHERE p.id = $1 OR p.sku = $1
      GROUP BY
        p.id, p.sku, p.name, p.name_en, p.description, p.description_en,
        p.weight_grams, p.roast_level, p.grind_type, p.packaging_type,
        p.price_usd, p.price_local, p.currency_local, p.primary_image_url,
        p.gallery_images, p.tags, p.flavor_notes, p.brewing_recommendations,
        p.is_active, p.stock_quantity,
        cv.name, cv.description, cv.characteristics,
        pc.name, pc.name_en
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
      error: 'Failed to fetch product'
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
        category_id = COALESCE($7, category_id),
        variety_id = COALESCE($8, variety_id),
        weight_grams = COALESCE($9, weight_grams),
        roast_level = COALESCE($10, roast_level),
        grind_type = COALESCE($11, grind_type),
        packaging_type = COALESCE($12, packaging_type),
        price_usd = COALESCE($13, price_usd),
        price_local = COALESCE($14, price_local),
        currency_local = COALESCE($15, currency_local),
        primary_image_url = COALESCE($16, primary_image_url),
        gallery_images = COALESCE($17, gallery_images),
        tags = COALESCE($18, tags),
        flavor_notes = COALESCE($19, flavor_notes),
        brewing_recommendations = COALESCE($20, brewing_recommendations),
        stock_quantity = COALESCE($21, stock_quantity),
        is_active = COALESCE($22, is_active),
        updated_at = NOW()
      WHERE id = $1 OR sku = $1
      RETURNING *
    `, [
      id, sku, name, name_en, description, description_en,
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
      WHERE id = $1 OR sku = $1
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