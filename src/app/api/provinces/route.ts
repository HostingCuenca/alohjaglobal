import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    const result = await query(`
      SELECT id, name, code, altitude_range
      FROM provinces
      ORDER BY name
    `)
    
    return NextResponse.json({
      success: true,
      provinces: result.rows
    })
  } catch (error) {
    console.error('Error fetching provinces:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch provinces'
    }, { status: 500 })
  }
}