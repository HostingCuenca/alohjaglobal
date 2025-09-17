import { NextResponse } from 'next/server'
import { query } from '@/lib/db'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'alohja-cms-secret-key'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({
        success: false,
        error: 'Email y contraseña son requeridos'
      }, { status: 400 })
    }

    // Buscar usuario en la base de datos
    const result = await query(`
      SELECT id, email, password_hash, first_name, last_name, role, is_active
      FROM users 
      WHERE email = $1 AND is_active = true
    `, [email])

    if (result.rows.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Credenciales inválidas'
      }, { status: 401 })
    }

    const user = result.rows[0]

    // Verificar contraseña
    const isValidPassword = await bcrypt.compare(password, user.password_hash)

    if (!isValidPassword) {
      return NextResponse.json({
        success: false,
        error: 'Credenciales inválidas'
      }, { status: 401 })
    }

    // Actualizar último login
    await query(`
      UPDATE users 
      SET last_login = NOW() 
      WHERE id = $1
    `, [user.id])

    // Generar JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        role: user.role 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    )

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role
      }
    })

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({
      success: false,
      error: 'Error interno del servidor'
    }, { status: 500 })
  }
}