import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    const result = await query(`
      SELECT id, name, description, characteristics
      FROM coffee_varieties
      ORDER BY name
    `)

    return NextResponse.json({
      success: true,
      varieties: result.rows
    })
  } catch (error) {
    console.error('Error fetching varieties:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch varieties'
    }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, description, characteristics } = body

    if (!name) {
      return NextResponse.json({
        success: false,
        error: 'Name is required'
      }, { status: 400 })
    }

    const result = await query(`
      INSERT INTO coffee_varieties (name, description, characteristics)
      VALUES ($1, $2, $3)
      RETURNING *
    `, [name, description, JSON.stringify(characteristics || {})])

    return NextResponse.json({
      success: true,
      variety: result.rows[0]
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating variety:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to create variety'
    }, { status: 500 })
  }
}