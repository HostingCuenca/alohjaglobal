import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

// GET - Lista todos los lotes o busca por batch_id
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const batch_id = searchParams.get('batch_id')

    if (batch_id) {
      // Buscar lote específico por batch_id
      const result = await query(`
        SELECT * FROM batches_simple
        WHERE batch_id = $1 AND status = 'active'
      `, [batch_id])

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
      // Listar todos los lotes activos
      const result = await query(`
        SELECT * FROM batches_simple
        WHERE status = 'active'
        ORDER BY harvest_date DESC
      `)

      return NextResponse.json({
        success: true,
        batches: result.rows
      })
    }
  } catch (error) {
    console.error('Error fetching batches:', error)
    return NextResponse.json({
      success: false,
      error: 'Error al obtener lotes'
    }, { status: 500 })
  }
}

// POST - Crear nuevo lote
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      batch_id, variety, farmer, farm, province, altitude,
      harvest_date, roast_date, pack_date, distribution_date, retail_date,
      process, drying_method, transport_mode,
      origin, farmers_list, drying_types, transfer_to_quito, storage,
      roast_types, transfer_to_shipping, destination_country
    } = body

    // Validación básica
    if (!batch_id) {
      return NextResponse.json({
        success: false,
        error: 'batch_id es requerido'
      }, { status: 400 })
    }

    const result = await query(`
      INSERT INTO batches_simple (
        batch_id, variety, farmer, farm, province, altitude,
        harvest_date, roast_date, pack_date, distribution_date, retail_date,
        process, drying_method, transport_mode,
        origin, farmers_list, drying_types, transfer_to_quito, storage,
        roast_types, transfer_to_shipping, destination_country
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)
      RETURNING *
    `, [
      batch_id, variety, farmer, farm, province, altitude,
      harvest_date, roast_date, pack_date, distribution_date, retail_date,
      process, drying_method, transport_mode,
      origin, farmers_list, drying_types, transfer_to_quito, storage,
      roast_types, transfer_to_shipping, destination_country
    ])

    return NextResponse.json({
      success: true,
      batch: result.rows[0]
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating batch:', error)

    if (error instanceof Error && error.message.includes('unique constraint')) {
      return NextResponse.json({
        success: false,
        error: 'El batch_id ya existe'
      }, { status: 400 })
    }

    return NextResponse.json({
      success: false,
      error: 'Error al crear lote'
    }, { status: 500 })
  }
}

// PUT - Actualizar lote existente
export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const {
      id, batch_id, variety, farmer, farm, province, altitude,
      harvest_date, roast_date, pack_date, distribution_date, retail_date,
      process, drying_method, transport_mode,
      origin, farmers_list, drying_types, transfer_to_quito, storage,
      roast_types, transfer_to_shipping, destination_country
    } = body

    if (!id) {
      return NextResponse.json({
        success: false,
        error: 'id es requerido'
      }, { status: 400 })
    }

    const result = await query(`
      UPDATE batches_simple SET
        batch_id = $2,
        variety = $3,
        farmer = $4,
        farm = $5,
        province = $6,
        altitude = $7,
        harvest_date = $8,
        roast_date = $9,
        pack_date = $10,
        distribution_date = $11,
        retail_date = $12,
        process = $13,
        drying_method = $14,
        transport_mode = $15,
        origin = $16,
        farmers_list = $17,
        drying_types = $18,
        transfer_to_quito = $19,
        storage = $20,
        roast_types = $21,
        transfer_to_shipping = $22,
        destination_country = $23,
        updated_at = NOW()
      WHERE id = $1
      RETURNING *
    `, [
      id, batch_id, variety, farmer, farm, province, altitude,
      harvest_date, roast_date, pack_date, distribution_date, retail_date,
      process, drying_method, transport_mode,
      origin, farmers_list, drying_types, transfer_to_quito, storage,
      roast_types, transfer_to_shipping, destination_country
    ])

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
  } catch (error) {
    console.error('Error updating batch:', error)
    return NextResponse.json({
      success: false,
      error: 'Error al actualizar lote'
    }, { status: 500 })
  }
}

// DELETE - Eliminar (soft delete) lote
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({
        success: false,
        error: 'id es requerido'
      }, { status: 400 })
    }

    const result = await query(`
      UPDATE batches_simple SET
        status = 'inactive',
        updated_at = NOW()
      WHERE id = $1
      RETURNING *
    `, [id])

    if (result.rows.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Lote no encontrado'
      }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: 'Lote eliminado correctamente'
    })
  } catch (error) {
    console.error('Error deleting batch:', error)
    return NextResponse.json({
      success: false,
      error: 'Error al eliminar lote'
    }, { status: 500 })
  }
}
