import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const farmerId = searchParams.get('farmer_id')

    if (farmerId) {
      // Get specific farmer with detailed info and media
      const result = await query(`
        SELECT
          f.id,
          f.farmer_code,
          f.first_name,
          f.last_name,
          f.full_name,
          f.email,
          f.phone,
          f.profile_image_url,
          f.cover_image_url,
          f.biography,
          f.years_experience,
          f.farming_philosophy,
          f.certifications,
          f.social_media,
          p.name as province_name,
          p.code as province_code,
          p.map_image_url as province_map,
          p.altitude_range,
          COUNT(DISTINCT fm.id) as media_count,
          COUNT(DISTINCT cb.id) as batches_count,
          COALESCE(
            JSON_AGG(
              DISTINCT JSONB_BUILD_OBJECT(
                'id', fm.id,
                'media_type', fm.media_type,
                'media_category', fm.media_category,
                'title', fm.title,
                'description', fm.description,
                'media_url', fm.media_url,
                'thumbnail_url', fm.thumbnail_url,
                'duration', fm.duration,
                'is_featured', fm.is_featured,
                'display_order', fm.display_order,
                'created_at', fm.created_at
              )
            ) FILTER (WHERE fm.id IS NOT NULL AND fm.is_public = true),
            '[]'::json
          ) as media_content
        FROM farmers f
        LEFT JOIN provinces p ON f.province_id = p.id
        LEFT JOIN farmer_media fm ON f.id = fm.farmer_id AND fm.is_public = true
        LEFT JOIN coffee_batches cb ON f.id = cb.farmer_id AND cb.status = 'active'
        WHERE f.id = $1 AND f.is_active = true
        GROUP BY f.id, p.name, p.code, p.map_image_url, p.altitude_range
      `, [farmerId])

      if (result.rows.length === 0) {
        return NextResponse.json({
          success: false,
          error: 'Agricultor no encontrado'
        }, { status: 404 })
      }

      return NextResponse.json({
        success: true,
        farmer: result.rows[0]
      })
    } else {
      // Get all active farmers for public display - OPTIMIZED FOR WEB PERFORMANCE
      // This endpoint is specifically designed for fast loading on public website
      const result = await query(`
        SELECT
          f.id,
          f.farmer_code,
          f.first_name,
          f.last_name,
          f.full_name,
          f.profile_image_url,
          f.biography,
          f.years_experience,
          p.name as province_name,
          p.code as province_code,
          p.altitude_range,
          -- Use simple counts instead of complex aggregations for speed
          (SELECT COUNT(*) FROM farmer_media fm WHERE fm.farmer_id = f.id AND fm.is_public = true) as media_count,
          (SELECT COUNT(*) FROM coffee_batches cb WHERE cb.farmer_id = f.id AND cb.status = 'active') as batches_count
        FROM farmers f
        LEFT JOIN provinces p ON f.province_id = p.id
        WHERE f.is_active = true
        ORDER BY f.years_experience DESC, f.created_at DESC
      `)

      return NextResponse.json({
        success: true,
        farmers: result.rows
      })
    }
  } catch (error) {
    console.error('Error fetching public farmers:', error)
    return NextResponse.json({
      success: false,
      error: 'Error al obtener información de agricultores'
    }, { status: 500 })
  }
}