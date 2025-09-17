import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const batchId = searchParams.get('batch_id')

    if (batchId) {
      // Get specific batch
      const result = await query(`
        SELECT
          cb.batch_id,
          cb.harvest_date,
          cb.harvest_season,
          cb.harvest_method,
          cb.processing_method,
          cb.drying_method,
          cb.fermentation_time,
          cb.drying_time,
          cb.transport_mode,
          cb.warehouse_location,
          cb.roast_date,
          cb.pack_date,
          cb.distribution_date,
          cb.retail_date,
          cb.status,
          cb.green_weight_kg,
          cb.final_weight_kg,
          cb.moisture_content,
          cb.screen_size,
          cb.defect_count,
          cb.cupping_score,
          cb.cupping_notes,
          f.full_name as farmer_name,
          f.farmer_code,
          farm.name as farm_name,
          farm.altitude_min,
          farm.altitude_max,
          cv.name as variety_name,
          cv.description as variety_description,
          p.name as province_name,
          p.code as province_code,
          p.map_image_url as province_map
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
          error: 'Lote no encontrado'
        }, { status: 404 })
      }

      return NextResponse.json({
        success: true,
        batch: result.rows[0]
      })
    } else {
      // Get all active batches for public display
      const result = await query(`
        SELECT
          cb.batch_id,
          cb.harvest_date,
          cb.status,
          f.full_name as farmer_name,
          f.farmer_code,
          farm.name as farm_name,
          cv.name as variety_name,
          p.name as province_name,
          p.code as province_code
        FROM coffee_batches cb
        JOIN farmers f ON cb.farmer_id = f.id
        JOIN farms farm ON cb.farm_id = farm.id
        JOIN coffee_varieties cv ON cb.variety_id = cv.id
        JOIN provinces p ON f.province_id = p.id
        WHERE cb.status = 'active'
        ORDER BY cb.harvest_date DESC
        LIMIT 10
      `, [])

      return NextResponse.json({
        success: true,
        batches: result.rows
      })
    }
  } catch (error) {
    console.error('Error fetching public batches:', error)
    return NextResponse.json({
      success: false,
      error: 'Error al obtener información del lote'
    }, { status: 500 })
  }
}