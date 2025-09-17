import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    const start = Date.now()

    // Query súper simple
    const result = await query('SELECT COUNT(*) as total FROM farmers WHERE is_active = true')

    const duration = Date.now() - start

    return NextResponse.json({
      success: true,
      count: result.rows[0].total,
      duration_ms: duration,
      message: `Query took ${duration}ms`
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}