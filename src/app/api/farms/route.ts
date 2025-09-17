import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const farmerId = searchParams.get('farmer_id')

    let queryText = `
      SELECT
        f.*,
        farmer.full_name as farmer_name,
        farmer.farmer_code
      FROM farms f
      LEFT JOIN farmers farmer ON f.farmer_id = farmer.id
    `

    const params: any[] = []

    if (farmerId) {
      queryText += ' WHERE f.farmer_id = $1'
      params.push(farmerId)
    }

    queryText += ' ORDER BY f.name'

    const result = await query(queryText, params)

    return NextResponse.json({
      success: true,
      farms: result.rows
    })
  } catch (error) {
    console.error('Error fetching farms:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch farms'
    }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      farmer_id,
      name,
      total_area_hectares,
      coffee_area_hectares,
      altitude_min,
      altitude_max,
      latitude,
      longitude,
      soil_type,
      shade_percentage,
      irrigation_system,
      processing_method,
      farm_images,
      municipality
    } = body

    if (!farmer_id || !name) {
      return NextResponse.json({
        success: false,
        error: 'Farmer ID and name are required'
      }, { status: 400 })
    }

    const result = await query(`
      INSERT INTO farms (
        farmer_id, name, total_area_hectares, coffee_area_hectares,
        altitude_min, altitude_max, latitude, longitude, soil_type,
        shade_percentage, irrigation_system, processing_method, farm_images
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING *
    `, [
      farmer_id, name, total_area_hectares, coffee_area_hectares,
      altitude_min, altitude_max, latitude, longitude, soil_type,
      shade_percentage, irrigation_system, processing_method,
      JSON.stringify(farm_images || [])
    ])

    return NextResponse.json({
      success: true,
      farm: result.rows[0]
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating farm:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to create farm'
    }, { status: 500 })
  }
}