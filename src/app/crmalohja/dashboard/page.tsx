'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import CMSSidebar from '@/components/cms/CMSSidebar'
import CMSHeader from '@/components/cms/CMSHeader'

interface DashboardStats {
  totalFarmers: number
  totalBatches: number
  activeBatches: number
  totalProducts: number
}

export default function CMSDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalFarmers: 0,
    totalBatches: 0,
    activeBatches: 0,
    totalProducts: 0
  })
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    console.log('Dashboard useEffect running')
    
    const token = localStorage.getItem('cms_token')
    console.log('Token from localStorage:', !!token)
    
    if (!token) {
      console.log('No token found, redirecting to login')
      router.push('/crmalohja')
      return
    }

    // Decodificar token para obtener info del usuario
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      console.log('Decoded token payload:', payload)
      setUser(payload)
      loadDashboardStats()
    } catch (error) {
      console.error('Token decode error:', error)
      localStorage.removeItem('cms_token')
      router.push('/crmalohja')
      return
    }
  }, [router])

  const loadDashboardStats = async () => {
    try {
      setIsLoading(true)
      
      // Cargar estadísticas del dashboard
      const [farmersRes, batchesRes] = await Promise.all([
        fetch('/api/farmers'),
        fetch('/api/batches')
      ])

      const farmersData = await farmersRes.json()
      const batchesData = await batchesRes.json()

      if (farmersData.success && batchesData.success) {
        setStats({
          totalFarmers: farmersData.farmers.length,
          totalBatches: batchesData.batches.length,
          activeBatches: batchesData.batches.filter((b: any) => b.status === 'active').length,
          totalProducts: 0 // Por implementar
        })
      }
    } catch (error) {
      console.error('Error loading dashboard stats:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <CMSSidebar />
      
      <div className="flex-1 flex flex-col">
        <CMSHeader user={user} />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Welcome */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Bienvenido, {user?.email}
              </h1>
              <p className="text-gray-600 mt-2">
                Panel de control del sistema de trazabilidad de café
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-500">Agricultores</h3>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalFarmers}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-500">Total Lotes</h3>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalBatches}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-500">Lotes Activos</h3>
                    <p className="text-2xl font-bold text-gray-900">{stats.activeBatches}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-500">Productos</h3>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Acciones Rápidas</h3>
                </div>
                <div className="p-6 space-y-4">
                  <button 
                    onClick={() => router.push('/crmalohja/farmers/new')}
                    className="w-full text-left p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-200 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">Nuevo Agricultor</p>
                        <p className="text-sm text-gray-500">Registrar nuevo productor</p>
                      </div>
                    </div>
                  </button>

                  <button 
                    onClick={() => router.push('/crmalohja/batches/new')}
                    className="w-full text-left p-4 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-amber-200 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">Nuevo Lote</p>
                        <p className="text-sm text-gray-500">Registrar lote de café</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Actividad Reciente</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-500 text-center py-8">
                    No hay actividad reciente para mostrar
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}