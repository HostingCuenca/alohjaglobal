import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: { id: string } | Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await Promise.resolve(params)
    const batchId = resolvedParams.id
    
    const result = await query(`
      SELECT 
        cb.*,
        f.full_name as farmer_name,
        f.farmer_code,
        f.biography,
        f.years_experience,
        f.profile_image_url,
        farm.name as farm_name,
        farm.altitude_min,
        farm.altitude_max,
        farm.latitude,
        farm.longitude,
        cv.name as variety_name,
        cv.description as variety_description,
        p.name as province_name,
        p.code as province_code,
        p.map_image_url as province_map,
        p.altitude_range
      FROM coffee_batches cb
      JOIN farmers f ON cb.farmer_id = f.id
      JOIN farms farm ON cb.farm_id = farm.id
      JOIN coffee_varieties cv ON cb.variety_id = cv.id
      JOIN provinces p ON f.province_id = p.id
      WHERE cb.batch_id = $1 AND cb.status = 'active'
    `, [batchId])
    
    if (result.rows.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Batch not found'
      }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      batch: result.rows[0]
    })
  } catch (error) {
    console.error('Error fetching batch:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch batch'
    }, { status: 500 })
  }
}