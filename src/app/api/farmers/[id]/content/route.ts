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
        fm.*,
        f.full_name as farmer_name,
        f.farmer_code
      FROM farmer_media fm
      JOIN farmers f ON fm.farmer_id = f.id
      WHERE fm.farmer_id = $1
      ORDER BY fm.is_featured DESC, fm.display_order ASC, fm.created_at DESC
    `, [farmerId])

    return NextResponse.json({
      success: true,
      content: result.rows
    })
  } catch (error) {
    console.error('Error fetching farmer content:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch farmer content'
    }, { status: 500 })
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } | Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await Promise.resolve(params)
    const farmerId = resolvedParams.id
    const body = await request.json()

    const {
      media_type,
      media_category,
      title,
      description,
      media_url,
      thumbnail_url,
      duration,
      display_order = 0,
      is_featured = false,
      is_public = true
    } = body

    if (!media_type || !media_category || !title || !media_url) {
      return NextResponse.json({
        success: false,
        error: 'Los campos media_type, media_category, title y media_url son requeridos'
      }, { status: 400 })
    }

    const result = await query(`
      INSERT INTO farmer_media (
        farmer_id, media_type, media_category, title, description,
        media_url, thumbnail_url, duration, display_order,
        is_featured, is_public
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *
    `, [
      farmerId, media_type, media_category, title, description,
      media_url, thumbnail_url, duration, display_order,
      is_featured, is_public
    ])

    return NextResponse.json({
      success: true,
      content: result.rows[0]
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating farmer content:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to create farmer content'
    }, { status: 500 })
  }
}