import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function POST() {
  try {
    // Delete all farmer media first (due to foreign key constraints)
    await query('DELETE FROM farmer_media')

    // Delete all coffee batches
    await query('DELETE FROM coffee_batches')

    // Delete all farms
    await query('DELETE FROM farms')

    // Delete all farmers
    await query('DELETE FROM farmers')

    console.log('All farmer data cleaned successfully')

    return NextResponse.json({
      success: true,
      message: 'All farmer data has been cleaned'
    })
  } catch (error) {
    console.error('Error cleaning farmer data:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to clean farmer data'
    }, { status: 500 })
  }
}