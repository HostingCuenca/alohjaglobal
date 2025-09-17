import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const farmerId = params.id
    
    const result = await query(`
      SELECT 
        f.*,
        p.name as province_name,
        p.code as province_code
      FROM farmers f
      LEFT JOIN provinces p ON f.province_id = p.id
      WHERE f.id = $1
    `, [farmerId])
    
    if (result.rows.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Farmer not found'
      }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      farmer: result.rows[0]
    })
  } catch (error) {
    console.error('Error fetching farmer:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch farmer'
    }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const farmerId = params.id
    const body = await request.json()
    const {
      farmer_code,
      first_name,
      last_name,
      email,
      phone,
      province_id,
      municipality,
      address,
      biography,
      years_experience,
      farming_philosophy,
      certifications,
      is_active
    } = body

    const result = await query(`
      UPDATE farmers SET
        farmer_code = $1,
        first_name = $2,
        last_name = $3,
        email = $4,
        phone = $5,
        province_id = $6,
        municipality = $7,
        address = $8,
        biography = $9,
        years_experience = $10,
        farming_philosophy = $11,
        certifications = $12,
        is_active = $13,
        updated_at = NOW()
      WHERE id = $14
      RETURNING *
    `, [
      farmer_code, first_name, last_name, email, phone,
      province_id, municipality, address, biography,
      years_experience, farming_philosophy, 
      JSON.stringify(certifications || []), is_active, farmerId
    ])

    if (result.rows.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Farmer not found'
      }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      farmer: result.rows[0]
    })
  } catch (error) {
    console.error('Error updating farmer:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to update farmer'
    }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const farmerId = params.id

    // Verificar si el agricultor tiene lotes asociados
    const batchCheck = await query(`
      SELECT COUNT(*) as batch_count
      FROM coffee_batches
      WHERE farmer_id = $1
    `, [farmerId])

    if (parseInt(batchCheck.rows[0].batch_count) > 0) {
      return NextResponse.json({
        success: false,
        error: 'No se puede eliminar el agricultor porque tiene lotes asociados'
      }, { status: 400 })
    }

    const result = await query(`
      DELETE FROM farmers
      WHERE id = $1
      RETURNING id
    `, [farmerId])

    if (result.rows.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Farmer not found'
      }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: 'Agricultor eliminado correctamente'
    })
  } catch (error) {
    console.error('Error deleting farmer:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to delete farmer'
    }, { status: 500 })
  }
}