'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import CMSSidebar from '@/components/cms/CMSSidebar'
import CMSHeader from '@/components/cms/CMSHeader'

interface User {
  id: string
  username: string
  role: string
}

export default function EditBatchPage() {
  const params = useParams()
  const id = params.id as string

  const [formData, setFormData] = useState({
    id: '',
    batch_id: '',
    variety: '',
    farmer: '',
    farm: '',
    province: '',
    altitude: '',
    harvest_date: '',
    roast_date: '',
    pack_date: '',
    distribution_date: '',
    retail_date: '',
    process: '',
    drying_method: '',
    transport_mode: '',
    origin: '',
    farmers_list: '',
    drying_types: '',
    transfer_to_quito: '',
    storage: '',
    roast_types: '',
    transfer_to_shipping: '',
    destination_country: ''
  })

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('cms_token')
    if (!token) {
      router.push('/crmalohja')
      return
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      setUser(payload)
      loadBatch()
    } catch (error) {
      console.error('Error decoding token:', error)
      router.push('/crmalohja')
    }
  }, [router, id])

  const loadBatch = async () => {
    try {
      const response = await fetch(`/api/batches-simple?id=${id}`)
      const data = await response.json()

      if (data.success && data.batches && data.batches.length > 0) {
        const batch = data.batches[0]

        // Formatear fechas para input type="date"
        const formatDate = (dateString: string) => {
          if (!dateString) return ''
          const date = new Date(dateString)
          return date.toISOString().split('T')[0]
        }

        setFormData({
          id: batch.id,
          batch_id: batch.batch_id || '',
          variety: batch.variety || '',
          farmer: batch.farmer || '',
          farm: batch.farm || '',
          province: batch.province || '',
          altitude: batch.altitude || '',
          harvest_date: formatDate(batch.harvest_date),
          roast_date: formatDate(batch.roast_date),
          pack_date: formatDate(batch.pack_date),
          distribution_date: formatDate(batch.distribution_date),
          retail_date: formatDate(batch.retail_date),
          process: batch.process || '',
          drying_method: batch.drying_method || '',
          transport_mode: batch.transport_mode || '',
          origin: batch.origin || '',
          farmers_list: batch.farmers_list || '',
          drying_types: batch.drying_types || '',
          transfer_to_quito: batch.transfer_to_quito || '',
          storage: batch.storage || '',
          roast_types: batch.roast_types || '',
          transfer_to_shipping: batch.transfer_to_shipping || '',
          destination_country: batch.destination_country || ''
        })
      } else {
        alert('Lote no encontrado')
        router.push('/crmalohja/batches-simple')
      }
    } catch (error) {
      console.error('Error loading batch:', error)
      alert('Error al cargar el lote')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const response = await fetch('/api/batches-simple', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (data.success) {
        alert('Lote actualizado exitosamente')
        router.push('/crmalohja/batches-simple')
      } else {
        alert('Error: ' + data.error)
      }
    } catch (error) {
      console.error('Error updating batch:', error)
      alert('Error al actualizar el lote')
    } finally {
      setIsSaving(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('cms_token')
    router.push('/crmalohja')
  }

  if (!user || isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <CMSSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <CMSHeader user={user} onLogout={handleLogout} />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Editar Lote: {formData.batch_id}</h1>
              <p className="text-gray-600 mt-1">Actualiza la información del lote</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
              {/* Información Básica */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Información Básica</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">
                      Código de Lote * <span className="text-xs text-gray-500">(ej: AR000147)</span>
                    </label>
                    <input
                      type="text"
                      name="batch_id"
                      value={formData.batch_id}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                      placeholder="AR000147"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">Variedad</label>
                    <input
                      type="text"
                      name="variety"
                      value={formData.variety}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                      placeholder="Typica Mejorada"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">Agricultor</label>
                    <input
                      type="text"
                      name="farmer"
                      value={formData.farmer}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                      placeholder="Armando Ramirez"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">Finca</label>
                    <input
                      type="text"
                      name="farm"
                      value={formData.farm}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                      placeholder="Finca El Mirador"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">Provincia</label>
                    <select
                      name="province"
                      value={formData.province}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                    >
                      <option value="">Selecciona...</option>
                      <option value="LOJA">Loja</option>
                      <option value="ELORO">El Oro</option>
                      <option value="PICHINCHA">Pichincha</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">Altitud</label>
                    <input
                      type="text"
                      name="altitude"
                      value={formData.altitude}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                      placeholder="1,200 - 1,400 msnm"
                    />
                  </div>
                </div>
              </div>

              {/* Fechas */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Fechas</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">Fecha de Cosecha</label>
                    <input
                      type="date"
                      name="harvest_date"
                      value={formData.harvest_date}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">Fecha de Tostado</label>
                    <input
                      type="date"
                      name="roast_date"
                      value={formData.roast_date}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">Fecha de Empaque</label>
                    <input
                      type="date"
                      name="pack_date"
                      value={formData.pack_date}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">Fecha de Distribución</label>
                    <input
                      type="date"
                      name="distribution_date"
                      value={formData.distribution_date}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">Fecha Retail</label>
                    <input
                      type="date"
                      name="retail_date"
                      value={formData.retail_date}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                    />
                  </div>
                </div>
              </div>

              {/* Procesos */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Procesos</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">Proceso</label>
                    <input
                      type="text"
                      name="process"
                      value={formData.process}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                      placeholder="Lavado"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">Método de Secado</label>
                    <input
                      type="text"
                      name="drying_method"
                      value={formData.drying_method}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                      placeholder="Natural"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">Modo de Transporte</label>
                    <input
                      type="text"
                      name="transport_mode"
                      value={formData.transport_mode}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                      placeholder="Vía terrestre"
                    />
                  </div>
                </div>
              </div>

              {/* Trazabilidad Detallada */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Trazabilidad Detallada (Opcional)</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">Origen</label>
                    <input
                      type="text"
                      name="origin"
                      value={formData.origin}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                      placeholder="Paltas-Olmedo-Vilcabamba"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">Lista de Agricultores</label>
                    <input
                      type="text"
                      name="farmers_list"
                      value={formData.farmers_list}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                      placeholder="Armando Ramirez"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">Tipos de Secado</label>
                    <input
                      type="text"
                      name="drying_types"
                      value={formData.drying_types}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                      placeholder="Natural"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">Traslado a Quito</label>
                    <input
                      type="text"
                      name="transfer_to_quito"
                      value={formData.transfer_to_quito}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                      placeholder="terrestre"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">Almacenamiento</label>
                    <input
                      type="text"
                      name="storage"
                      value={formData.storage}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                      placeholder="Bodega Quito Central"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">Tipos de Tostado</label>
                    <input
                      type="text"
                      name="roast_types"
                      value={formData.roast_types}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                      placeholder="tueste claro - tueste medio"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">Traslado a Embarque</label>
                    <input
                      type="text"
                      name="transfer_to_shipping"
                      value={formData.transfer_to_shipping}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                      placeholder="terrestre-marítimo"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">País de Destino</label>
                    <input
                      type="text"
                      name="destination_country"
                      value={formData.destination_country}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                      placeholder="Japón - Estados Unidos"
                    />
                  </div>
                </div>
              </div>

              {/* Botones */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:bg-gray-400"
                >
                  {isSaving ? 'Guardando...' : 'Actualizar Lote'}
                </button>
                <button
                  type="button"
                  onClick={() => router.push('/crmalohja/batches-simple')}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}
