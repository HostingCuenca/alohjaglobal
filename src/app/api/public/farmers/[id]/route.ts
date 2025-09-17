import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const farmerId = params.id

    // Get basic farmer info first (fast query)
    const farmerResult = await query(`
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
        p.altitude_range
      FROM farmers f
      LEFT JOIN provinces p ON f.province_id = p.id
      WHERE f.id = $1 AND f.is_active = true
    `, [farmerId])

    if (farmerResult.rows.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Agricultor no encontrado'
      }, { status: 404 })
    }

    const farmer = farmerResult.rows[0]

    // Get media content separately (faster)
    const mediaResult = await query(`
      SELECT
        id,
        media_type,
        media_category,
        title,
        description,
        media_url,
        thumbnail_url,
        duration,
        is_featured,
        display_order,
        created_at
      FROM farmer_media
      WHERE farmer_id = $1 AND is_public = true
      ORDER BY is_featured DESC, display_order ASC, created_at DESC
    `, [farmerId])

    // Get simple counts
    const countsResult = await query(`
      SELECT
        (SELECT COUNT(*) FROM farmer_media WHERE farmer_id = $1 AND is_public = true) as media_count,
        (SELECT COUNT(*) FROM coffee_batches WHERE farmer_id = $1 AND status = 'active') as batches_count
    `, [farmerId])

    const counts = countsResult.rows[0]

    return NextResponse.json({
      success: true,
      farmer: {
        ...farmer,
        media_count: parseInt(counts.media_count),
        batches_count: parseInt(counts.batches_count),
        media_content: mediaResult.rows
      }
    })
  } catch (error) {
    console.error('Error fetching farmer profile:', error)
    return NextResponse.json({
      success: false,
      error: 'Error al obtener perfil del agricultor'
    }, { status: 500 })
  }
}