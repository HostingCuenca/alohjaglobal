'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function CMSRedirect() {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('cms_token')
    if (token) {
      console.log('Redirecting to dashboard from redirect page')
      router.replace('/crmalohja/dashboard')
    } else {
      router.replace('/crmalohja')
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirigiendo...</p>
      </div>
    </div>
  )
}