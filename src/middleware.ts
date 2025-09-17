import { NextResponse } from 'next/server'

export function middleware() {
  // Temporalmente deshabilitado para debugging
  return NextResponse.next()
}

export const config = {
  matcher: ['/crmalohja/:path*']
}