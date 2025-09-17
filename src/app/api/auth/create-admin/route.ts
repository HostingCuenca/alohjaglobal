import { NextResponse } from 'next/server'
import { query } from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function POST() {
  try {
    // Hash de la contraseña por defecto
    const password = 'admin123'
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    // Crear usuario administrador
    const result = await query(`
      INSERT INTO users (
        email, password_hash, first_name, last_name, role, is_active
      ) VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (email) DO UPDATE SET
        password_hash = EXCLUDED.password_hash,
        is_active = EXCLUDED.is_active
      RETURNING id, email, first_name, last_name, role
    `, [
      'admin@alohja.com',
      passwordHash,
      'Admin',
      'Alohja',
      'admin',
      true
    ])

    return NextResponse.json({
      success: true,
      message: 'Usuario administrador creado',
      user: result.rows[0],
      credentials: {
        email: 'admin@alohja.com',
        password: 'admin123'
      }
    })

  } catch (error) {
    console.error('Error creating admin user:', error)
    return NextResponse.json({
      success: false,
      error: 'Error al crear usuario administrador'
    }, { status: 500 })
  }
}