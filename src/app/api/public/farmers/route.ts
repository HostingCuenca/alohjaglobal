import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const farmerId = searchParams.get('farmer_id')
    const slug = searchParams.get('slug')

    if (farmerId || slug) {
      // Get specific farmer with content
      let result;
      if (slug) {
        result = await query(`
          SELECT
            f.*,
            p.name as province_name,
            p.code as province_code,
            p.latitude as province_lat,
            p.longitude as province_lng
          FROM farmers f
          LEFT JOIN provinces p ON f.province_id = p.id
          WHERE LOWER(REPLACE(CONCAT(f.first_name, '-', f.last_name), ' ', '-')) = LOWER($1)
          AND f.is_active = true
        `, [slug])
      } else {
        result = await query(`
          SELECT
            f.*,
            p.name as province_name,
            p.code as province_code,
            p.latitude as province_lat,
            p.longitude as province_lng
          FROM farmers f
          LEFT JOIN provinces p ON f.province_id = p.id
          WHERE f.id = $1 AND f.is_active = true
        `, [farmerId])
      }

      if (result.rows.length === 0) {
        return NextResponse.json({
          success: false,
          error: 'Agricultor no encontrado'
        }, { status: 404 })
      }

      const farmer = result.rows[0]

      // Get farmer's content/interviews
      const contentResult = await query(`
        SELECT
          id,
          title,
          content,
          youtube_url,
          is_public,
          created_at
        FROM farmer_media
        WHERE farmer_id = $1 AND is_public = true
        ORDER BY created_at DESC
      `, [farmer.id])

      // Get farmer's farms
      const farmsResult = await query(`
        SELECT
          name,
          total_area_hectares,
          coffee_area_hectares,
          altitude_min,
          altitude_max,
          processing_method
        FROM farms
        WHERE farmer_id = $1
        ORDER BY name
      `, [farmer.id])

      // Get farmer's active batches count
      const batchesResult = await query(`
        SELECT COUNT(*) as batch_count
        FROM coffee_batches
        WHERE farmer_id = $1 AND status = 'active'
      `, [farmer.id])

      return NextResponse.json({
        success: true,
        farmer: {
          ...farmer,
          content: contentResult.rows,
          farms: farmsResult.rows,
          batch_count: parseInt(batchesResult.rows[0].batch_count)
        }
      })
    } else {
      // Get all active farmers for public display
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
          f.certifications,
          p.name as province_name,
          p.code as province_code,
          COUNT(fm.id) as content_count,
          COUNT(DISTINCT cb.id) as batch_count
        FROM farmers f
        LEFT JOIN provinces p ON f.province_id = p.id
        LEFT JOIN farmer_media fm ON f.id = fm.farmer_id AND fm.is_public = true
        LEFT JOIN coffee_batches cb ON f.id = cb.farmer_id AND cb.status = 'active'
        WHERE f.is_active = true
        GROUP BY f.id, p.name, p.code
        ORDER BY f.created_at DESC
      `, [])

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