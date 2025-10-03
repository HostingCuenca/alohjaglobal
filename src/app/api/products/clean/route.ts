import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function DELETE() {
  try {
    // First, delete all product_batches relationships
    await query(`DELETE FROM product_batches`)

    // Then delete all products
    const result = await query(`
      DELETE FROM products
      RETURNING id, sku, name
    `)

    return NextResponse.json({
      success: true,
      message: `Successfully deleted ${result.rows.length} products`,
      deletedProducts: result.rows
    })
  } catch (error) {
    console.error('Error cleaning products:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to clean products',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Use DELETE method to clean all products',
    warning: 'This will permanently delete all products and their batch relationships'
  })
}
