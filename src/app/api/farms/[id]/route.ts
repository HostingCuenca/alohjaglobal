import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: { id: string } | Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await Promise.resolve(params)
    const farmId = resolvedParams.id

    const result = await query(`
      SELECT
        f.*,
        farmer.full_name as farmer_name,
        farmer.farmer_code
      FROM farms f
      LEFT JOIN farmers farmer ON f.farmer_id = farmer.id
      WHERE f.id = $1
    `, [farmId])

    if (result.rows.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Farm not found'
      }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      farm: result.rows[0]
    })
  } catch (error) {
    console.error('Error fetching farm:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch farm'
    }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } | Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await Promise.resolve(params)
    const farmId = resolvedParams.id
    const body = await request.json()

    // Get current farm data
    const currentFarm = await query(`
      SELECT * FROM farms WHERE id = $1
    `, [farmId])

    if (currentFarm.rows.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Farm not found'
      }, { status: 404 })
    }

    const current = currentFarm.rows[0]

    // Build dynamic UPDATE for changed fields only
    const updates: string[] = []
    const values: any[] = []
    let paramIndex = 1

    const updatableFields = [
      'farmer_id', 'name', 'total_area_hectares', 'coffee_area_hectares',
      'altitude_min', 'altitude_max', 'latitude', 'longitude',
      'soil_type', 'shade_percentage', 'irrigation_system', 'processing_method'
    ]

    // Add changed fields
    updatableFields.forEach(field => {
      if (body.hasOwnProperty(field) && body[field] !== current[field]) {
        updates.push(`${field} = $${paramIndex}`)
        values.push(body[field])
        paramIndex++
      }
    })

    // Handle farm_images (JSONB)
    if (body.hasOwnProperty('farm_images')) {
      const newImages = JSON.stringify(body.farm_images || [])
      const currentImages = JSON.stringify(current.farm_images || [])

      if (newImages !== currentImages) {
        updates.push(`farm_images = $${paramIndex}`)
        values.push(newImages)
        paramIndex++
      }
    }

    // If no changes, return current farm
    if (updates.length === 0) {
      return NextResponse.json({
        success: true,
        farm: current,
        message: 'No changes detected'
      })
    }

    // Always update updated_at
    updates.push(`updated_at = NOW()`)

    // Add WHERE clause
    values.push(farmId)
    const whereIndex = paramIndex

    const updateQuery = `
      UPDATE farms SET
        ${updates.join(', ')}
      WHERE id = $${whereIndex}
      RETURNING *
    `

    const result = await query(updateQuery, values)

    return NextResponse.json({
      success: true,
      farm: result.rows[0],
      updated_fields: updates.filter(u => u !== 'updated_at = NOW()').length
    })
  } catch (error) {
    console.error('Error updating farm:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to update farm',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } | Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await Promise.resolve(params)
    const farmId = resolvedParams.id

    // Check if farm has associated batches
    const batchCheck = await query(`
      SELECT COUNT(*) as batch_count
      FROM coffee_batches
      WHERE farm_id = $1
    `, [farmId])

    if (parseInt(batchCheck.rows[0].batch_count) > 0) {
      return NextResponse.json({
        success: false,
        error: 'No se puede eliminar la finca porque tiene lotes asociados'
      }, { status: 400 })
    }

    const result = await query(`
      DELETE FROM farms
      WHERE id = $1
      RETURNING id, name
    `, [farmId])

    if (result.rows.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Farm not found'
      }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: `Finca "${result.rows[0].name}" eliminada correctamente`
    })
  } catch (error) {
    console.error('Error deleting farm:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to delete farm'
    }, { status: 500 })
  }
}