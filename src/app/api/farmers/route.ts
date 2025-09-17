import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    const result = await query(`
      SELECT 
        f.*,
        p.name as province_name,
        p.code as province_code,
        COUNT(fm.id) as media_count
      FROM farmers f
      LEFT JOIN provinces p ON f.province_id = p.id
      LEFT JOIN farmer_media fm ON f.id = fm.farmer_id AND fm.is_public = true
      WHERE f.is_active = true
      GROUP BY f.id, p.name, p.code
      ORDER BY f.created_at DESC
    `)
    
    return NextResponse.json({
      success: true,
      farmers: result.rows
    })
  } catch (error) {
    console.error('Error fetching farmers:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch farmers'
    }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      farmer_code,
      first_name,
      last_name,
      email,
      phone,
      province_id,
      municipality,
      address,
      biography,
      years_experience,
      farming_philosophy,
      certifications
    } = body

    const result = await query(`
      INSERT INTO farmers (
        farmer_code, first_name, last_name, email, phone,
        province_id, municipality, address, biography,
        years_experience, farming_philosophy, certifications
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *
    `, [
      farmer_code, first_name, last_name, email, phone,
      province_id, municipality, address, biography,
      years_experience, farming_philosophy, JSON.stringify(certifications || [])
    ])

    return NextResponse.json({
      success: true,
      farmer: result.rows[0]
    })
  } catch (error) {
    console.error('Error creating farmer:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to create farmer'
    }, { status: 500 })
  }
}