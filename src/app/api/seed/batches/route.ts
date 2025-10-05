import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function POST() {
  try {
    // First, ensure we have the necessary provinces
    const provinces = [
      { name: 'Loja', code: 'LOJA' },
      { name: 'El Oro', code: 'ELORO' },
      { name: 'Pichincha', code: 'PICHINCHA' }
    ]

    for (const prov of provinces) {
      await query(`
        INSERT INTO provinces (name, code)
        VALUES ($1, $2)
        ON CONFLICT (code) DO NOTHING
      `, [prov.name, prov.code])
    }

    // Create coffee varieties
    const varieties = [
      { name: 'Typica Mejorada', description: 'Variedad tradicional mejorada' },
      { name: 'Gesha', description: 'Variedad de alta calidad con notas florales' },
      { name: 'Bourbon Rosado', description: 'Variedad bourbon con frutos rosados' }
    ]

    for (const variety of varieties) {
      await query(`
        INSERT INTO coffee_varieties (name, description)
        VALUES ($1, $2)
        ON CONFLICT (name) DO NOTHING
      `, [variety.name, variety.description])
    }

    // Create farmers (only if they don't exist)
    const farmers = [
      { first_name: 'María', last_name: 'González', farmer_code: 'MG', province_code: 'PICHINCHA' }
    ]

    for (const farmer of farmers) {
      const provinceResult = await query(
        `SELECT id FROM provinces WHERE code = $1`,
        [farmer.province_code]
      )

      if (provinceResult.rows.length > 0) {
        await query(`
          INSERT INTO farmers (first_name, last_name, farmer_code, province_id)
          VALUES ($1, $2, $3, $4)
          ON CONFLICT (farmer_code) DO NOTHING
        `, [farmer.first_name, farmer.last_name, farmer.farmer_code, provinceResult.rows[0].id])
      }
    }

    // Create farms
    const farms = [
      {
        name: 'Finca El Mirador',
        farmer_code: 'AR0001',
        altitude_min: 1200,
        altitude_max: 1400,
        area_hectares: 5.0
      },
      {
        name: 'Gran Chaparral',
        farmer_code: 'PQ0002',
        altitude_min: 1500,
        altitude_max: 1800,
        area_hectares: 8.0
      },
      {
        name: 'La Esperanza',
        farmer_code: 'MG0003',
        altitude_min: 2000,
        altitude_max: 2200,
        area_hectares: 3.5
      }
    ]

    for (const farm of farms) {
      const farmerResult = await query(
        `SELECT id FROM farmers WHERE farmer_code = $1`,
        [farm.farmer_code]
      )

      if (farmerResult.rows.length > 0) {
        await query(`
          INSERT INTO farms (name, farmer_id, altitude_min, altitude_max, area_hectares)
          VALUES ($1, $2, $3, $4, $5)
          ON CONFLICT (name, farmer_id) DO NOTHING
        `, [farm.name, farmerResult.rows[0].id, farm.altitude_min, farm.altitude_max, farm.area_hectares])
      }
    }

    // Sample batch data to seed
    const batches = [
      {
        batch_id: 'AR000147',
        farmer_name: 'Armando Ramírez',
        farm_name: 'Finca El Mirador',
        variety_name: 'Typica Mejorada',
        harvest_date: '2025-08-15',
        processing_method: 'washed',
        drying_method: 'natural',
        transport_mode: 'via_terrestre',
        roast_date: '2025-09-20',
        pack_date: '2025-09-20',
        distribution_date: '2025-09-20',
        retail_date: '2025-09-20',
        origin: 'Paltas-Olmedo-Vilcabamba',
        transfer_to_quito: 'terrestre',
        storage: 'Bodega Quito Central',
        roast_types: 'tueste claro - tueste medio',
        transfer_to_shipping: 'terrestre-marítimo',
        destination_country: 'Japón - Estados Unidos'
      },
      {
        batch_id: 'PQ000258',
        farmer_name: 'Pablo Quezada',
        farm_name: 'Gran Chaparral',
        variety_name: 'Gesha',
        harvest_date: '2025-07-20',
        processing_method: 'honey',
        drying_method: 'honey',
        transport_mode: 'via_aerea',
        roast_date: '2025-09-15',
        pack_date: '2025-09-15',
        distribution_date: '2025-09-16',
        retail_date: '2025-09-17',
        origin: 'Portovelo-Piñas',
        transfer_to_quito: 'aéreo',
        storage: 'Bodega Quito Norte',
        roast_types: 'tueste medio - tueste medio oscuro',
        transfer_to_shipping: 'aéreo-marítimo',
        destination_country: 'Corea del Sur - Singapur'
      },
      {
        batch_id: 'MG000369',
        farmer_name: 'María González',
        farm_name: 'La Esperanza',
        variety_name: 'Bourbon Rosado',
        harvest_date: '2025-06-10',
        processing_method: 'washed',
        drying_method: 'washed',
        transport_mode: 'via_terrestre',
        roast_date: '2025-09-12',
        pack_date: '2025-09-12',
        distribution_date: '2025-09-13',
        retail_date: '2025-09-14',
        origin: null,
        transfer_to_quito: null,
        storage: null,
        roast_types: null,
        transfer_to_shipping: null,
        destination_country: null
      }
    ]

    const results = []

    for (const batch of batches) {
      // Get farmer_id
      const farmerResult = await query(
        `SELECT id FROM farmers WHERE full_name = $1 LIMIT 1`,
        [batch.farmer_name]
      )

      if (farmerResult.rows.length === 0) {
        results.push({
          batch_id: batch.batch_id,
          success: false,
          error: `Farmer not found: ${batch.farmer_name}`
        })
        continue
      }

      // Get farm_id
      const farmResult = await query(
        `SELECT id FROM farms WHERE name = $1 LIMIT 1`,
        [batch.farm_name]
      )

      if (farmResult.rows.length === 0) {
        results.push({
          batch_id: batch.batch_id,
          success: false,
          error: `Farm not found: ${batch.farm_name}`
        })
        continue
      }

      // Get variety_id
      const varietyResult = await query(
        `SELECT id FROM coffee_varieties WHERE name = $1 LIMIT 1`,
        [batch.variety_name]
      )

      if (varietyResult.rows.length === 0) {
        results.push({
          batch_id: batch.batch_id,
          success: false,
          error: `Variety not found: ${batch.variety_name}`
        })
        continue
      }

      const farmer_id = farmerResult.rows[0].id
      const farm_id = farmResult.rows[0].id
      const variety_id = varietyResult.rows[0].id

      // Insert or update batch
      try {
        await query(`
          INSERT INTO coffee_batches (
            batch_id,
            farmer_id,
            farm_id,
            variety_id,
            harvest_date,
            harvest_season,
            harvest_method,
            processing_method,
            drying_method,
            transport_mode,
            roast_date,
            pack_date,
            distribution_date,
            retail_date,
            origin,
            transfer_to_quito,
            storage,
            roast_types,
            transfer_to_shipping,
            destination_country,
            status
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
          ON CONFLICT (batch_id) DO UPDATE SET
            origin = EXCLUDED.origin,
            transfer_to_quito = EXCLUDED.transfer_to_quito,
            storage = EXCLUDED.storage,
            roast_types = EXCLUDED.roast_types,
            transfer_to_shipping = EXCLUDED.transfer_to_shipping,
            destination_country = EXCLUDED.destination_country,
            roast_date = EXCLUDED.roast_date,
            pack_date = EXCLUDED.pack_date,
            distribution_date = EXCLUDED.distribution_date,
            retail_date = EXCLUDED.retail_date
        `, [
          batch.batch_id,
          farmer_id,
          farm_id,
          variety_id,
          batch.harvest_date,
          'main',
          'selective',
          batch.processing_method,
          batch.drying_method,
          batch.transport_mode,
          batch.roast_date,
          batch.pack_date,
          batch.distribution_date,
          batch.retail_date,
          batch.origin,
          batch.transfer_to_quito,
          batch.storage,
          batch.roast_types,
          batch.transfer_to_shipping,
          batch.destination_country,
          'active'
        ])

        results.push({
          batch_id: batch.batch_id,
          success: true,
          message: 'Batch created/updated successfully'
        })
      } catch (error) {
        results.push({
          batch_id: batch.batch_id,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        })
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Batch seeding completed',
      results
    })
  } catch (error) {
    console.error('Error seeding batches:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to seed batches',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
