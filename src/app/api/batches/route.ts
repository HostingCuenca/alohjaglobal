import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    const result = await query(`
      SELECT 
        cb.batch_id,
        cb.harvest_date,
        cb.processing_method,
        cb.drying_method,
        cb.transport_mode,
        cb.roast_date,
        cb.pack_date,
        cb.distribution_date,
        cb.retail_date,
        cb.status,
        cb.green_weight_kg,
        cb.final_weight_kg,
        f.full_name as farmer_name,
        f.farmer_code,
        farm.name as farm_name,
        cv.name as variety_name,
        p.name as province_name,
        p.code as province_code,
        p.map_image_url as province_map
      FROM coffee_batches cb
      JOIN farmers f ON cb.farmer_id = f.id
      JOIN farms farm ON cb.farm_id = farm.id
      JOIN coffee_varieties cv ON cb.variety_id = cv.id
      JOIN provinces p ON f.province_id = p.id
      WHERE cb.status = 'active'
      ORDER BY cb.harvest_date DESC
    `)
    
    return NextResponse.json({
      success: true,
      batches: result.rows
    })
  } catch (error) {
    console.error('Error fetching batches:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch batches'
    }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      batch_id,
      farmer_id,
      farm_id,
      variety_id,
      harvest_date,
      processing_method,
      drying_method,
      transport_mode,
      green_weight_kg,
      roast_date,
      pack_date,
      distribution_date,
      retail_date
    } = body

    const result = await query(`
      INSERT INTO coffee_batches (
        batch_id, farmer_id, farm_id, variety_id, harvest_date,
        processing_method, drying_method, transport_mode,
        green_weight_kg, roast_date, pack_date, distribution_date, retail_date
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING *
    `, [
      batch_id, farmer_id, farm_id, variety_id, harvest_date,
      processing_method, drying_method, transport_mode,
      green_weight_kg, roast_date, pack_date, distribution_date, retail_date
    ])

    return NextResponse.json({
      success: true,
      batch: result.rows[0]
    })
  } catch (error) {
    console.error('Error creating batch:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to create batch'
    }, { status: 500 })
  }
}