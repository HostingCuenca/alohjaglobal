import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: { id: string; contentId: string } | Promise<{ id: string; contentId: string }> }
) {
  try {
    const resolvedParams = await Promise.resolve(params)
    const { id: farmerId, contentId } = resolvedParams

    const result = await query(`
      SELECT
        fm.*,
        f.full_name as farmer_name,
        f.farmer_code
      FROM farmer_media fm
      JOIN farmers f ON fm.farmer_id = f.id
      WHERE fm.farmer_id = $1 AND fm.id = $2
    `, [farmerId, contentId])

    if (result.rows.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Content not found'
      }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      content: result.rows[0]
    })
  } catch (error) {
    console.error('Error fetching content:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch content'
    }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string; contentId: string } | Promise<{ id: string; contentId: string }> }
) {
  try {
    const resolvedParams = await Promise.resolve(params)
    const { id: farmerId, contentId } = resolvedParams
    const body = await request.json()

    const current = await query(`
      SELECT * FROM farmer_media WHERE farmer_id = $1 AND id = $2
    `, [farmerId, contentId])

    if (current.rows.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Content not found'
      }, { status: 404 })
    }

    const currentContent = current.rows[0]

    const updates: string[] = []
    const values: any[] = []
    let paramIndex = 1

    const updatableFields = [
      'media_type', 'media_category', 'title', 'description',
      'media_url', 'thumbnail_url', 'duration', 'display_order',
      'is_featured', 'is_public'
    ]

    updatableFields.forEach(field => {
      if (body.hasOwnProperty(field) && body[field] !== currentContent[field]) {
        updates.push(`${field} = $${paramIndex}`)
        values.push(body[field])
        paramIndex++
      }
    })

    if (updates.length === 0) {
      return NextResponse.json({
        success: true,
        content: currentContent,
        message: 'No changes detected'
      })
    }

    updates.push(`updated_at = NOW()`)
    values.push(farmerId, contentId)
    const whereIndex = paramIndex

    const updateQuery = `
      UPDATE farmer_media SET
        ${updates.join(', ')}
      WHERE farmer_id = $${whereIndex} AND id = $${whereIndex + 1}
      RETURNING *
    `

    const result = await query(updateQuery, values)

    return NextResponse.json({
      success: true,
      content: result.rows[0],
      updated_fields: updates.filter(u => u !== 'updated_at = NOW()').length
    })
  } catch (error) {
    console.error('Error updating content:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to update content'
    }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string; contentId: string } | Promise<{ id: string; contentId: string }> }
) {
  try {
    const resolvedParams = await Promise.resolve(params)
    const { id: farmerId, contentId } = resolvedParams

    const result = await query(`
      DELETE FROM farmer_media
      WHERE farmer_id = $1 AND id = $2
      RETURNING id, title
    `, [farmerId, contentId])

    if (result.rows.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Content not found'
      }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: `Contenido "${result.rows[0].title}" eliminado correctamente`
    })
  } catch (error) {
    console.error('Error deleting content:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to delete content'
    }, { status: 500 })
  }
}