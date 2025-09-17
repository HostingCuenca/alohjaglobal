import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

// PUBLIC API ENDPOINT - Optimized for web performance
// This endpoint provides all public content for featured sections and lazy loading
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured') // ?featured=true for featured content only
    const limit = searchParams.get('limit') // ?limit=6 for pagination

    let whereClause = 'WHERE fm.is_public = true AND f.is_active = true'
    let limitClause = ''
    let orderBy = 'ORDER BY fm.is_featured DESC, fm.created_at DESC'

    if (featured === 'true') {
      whereClause += ' AND fm.is_featured = true'
    }

    if (limit) {
      limitClause = `LIMIT ${parseInt(limit)}`
    }

    const result = await query(`
      SELECT
        fm.id,
        fm.media_type,
        fm.media_category,
        fm.title,
        fm.description,
        fm.media_url,
        fm.thumbnail_url,
        fm.duration,
        fm.is_featured,
        fm.display_order,
        fm.created_at,
        f.id as farmer_id,
        f.full_name as farmer_name,
        f.farmer_code,
        f.profile_image_url as farmer_image
      FROM farmer_media fm
      JOIN farmers f ON fm.farmer_id = f.id
      ${whereClause}
      ${orderBy}
      ${limitClause}
    `)

    return NextResponse.json({
      success: true,
      content: result.rows,
      total: result.rows.length
    })
  } catch (error) {
    console.error('Error fetching public content:', error)
    return NextResponse.json({
      success: false,
      error: 'Error al obtener contenido público'
    }, { status: 500 })
  }
}