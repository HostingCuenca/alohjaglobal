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
        cb.origin,
        cb.transfer_to_quito,
        cb.storage,
        cb.roast_types,
        cb.transfer_to_shipping,
        cb.destination_country,
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
      harvest_season,
      harvest_method,
      harvest_notes,
      processing_method,
      drying_method,
      fermentation_time,
      drying_time,
      transport_mode,
      warehouse_location,
      green_weight_kg,
      moisture_content,
      screen_size,
      defect_count,
      cupping_score,
      cupping_notes,
      status
    } = body

    // Validations
    if (!batch_id || !farmer_id || !farm_id || !variety_id || !harvest_date || !processing_method || !drying_method || !transport_mode) {
      return NextResponse.json({
        success: false,
        error: 'Required fields: batch_id, farmer_id, farm_id, variety_id, harvest_date, processing_method, drying_method, transport_mode'
      }, { status: 400 })
    }

    // Check if batch_id already exists
    const existingBatch = await query(`
      SELECT batch_id FROM coffee_batches WHERE batch_id = $1
    `, [batch_id])

    if (existingBatch.rows.length > 0) {
      return NextResponse.json({
        success: false,
        error: 'Batch ID already exists'
      }, { status: 400 })
    }

    const result = await query(`
      INSERT INTO coffee_batches (
        batch_id, farmer_id, farm_id, variety_id, harvest_date,
        harvest_season, harvest_method, harvest_notes,
        processing_method, drying_method, fermentation_time, drying_time,
        transport_mode, warehouse_location, green_weight_kg,
        moisture_content, screen_size, defect_count, cupping_score, cupping_notes,
        status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
      RETURNING *
    `, [
      batch_id, farmer_id, farm_id, variety_id, harvest_date,
      harvest_season || 'main', harvest_method || 'selective', harvest_notes,
      processing_method, drying_method, fermentation_time || 0, drying_time || 0,
      transport_mode, warehouse_location, green_weight_kg || 0,
      moisture_content || 0, screen_size, defect_count || 0, cupping_score || 0, cupping_notes,
      status || 'active'
    ])

    return NextResponse.json({
      success: true,
      batch: result.rows[0]
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating batch:', error)

    // Handle specific PostgreSQL errors
    if (error instanceof Error) {
      if (error.message.includes('foreign key constraint')) {
        return NextResponse.json({
          success: false,
          error: 'Invalid farmer, farm, or variety ID'
        }, { status: 400 })
      }
      if (error.message.includes('unique constraint')) {
        return NextResponse.json({
          success: false,
          error: 'Batch ID already exists'
        }, { status: 400 })
      }
    }

    return NextResponse.json({
      success: false,
      error: 'Failed to create batch'
    }, { status: 500 })
  }
}