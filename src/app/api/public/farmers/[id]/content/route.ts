import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: { id: string } | Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await Promise.resolve(params)
    const farmerId = resolvedParams.id

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
        fm.display_order,
        fm.is_featured,
        fm.created_at,
        f.full_name as farmer_name,
        f.farmer_code
      FROM farmer_media fm
      JOIN farmers f ON fm.farmer_id = f.id
      WHERE fm.farmer_id = $1 AND fm.is_public = true AND f.is_active = true
      ORDER BY fm.is_featured DESC, fm.display_order ASC, fm.created_at DESC
    `, [farmerId])

    return NextResponse.json({
      success: true,
      content: result.rows,
      farmer_id: farmerId
    })
  } catch (error) {
    console.error('Error fetching public farmer content:', error)
    return NextResponse.json({
      success: false,
      error: 'Error al obtener contenido del agricultor'
    }, { status: 500 })
  }
}