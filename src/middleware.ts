import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'alohja-cms-secret-key'

export function middleware(request: NextRequest) {
  // Temporalmente deshabilitado para debugging
  return NextResponse.next()
}

export const config = {
  matcher: ['/crmalohja/:path*']
}