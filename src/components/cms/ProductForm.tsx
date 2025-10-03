'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface ProductFormData {
  sku: string
  name: string
  name_en: string
  description: string
  description_en: string
  long_description: string
  long_description_en: string
  slug: string
  category_id: number | null
  variety_id: number | null
  weight_grams: number
  roast_level: string
  grind_type: string
  packaging_type: string
  price_usd: number
  price_local: number
  currency_local: string
  primary_image_url: string
  gallery_images: string[]
  tags: string[]
  flavor_notes: string[]
  brewing_recommendations: string
  stock_quantity: number
  is_active: boolean
}

interface Category {
  id: number
  name: string
  name_en: string
}

interface Variety {
  id: number
  name: string
}

interface ProductFormProps {
  initialData?: Partial<ProductFormData>
  onSubmit: (data: ProductFormData) => Promise<void>
  isLoading: boolean
}

export default function ProductForm({ initialData, onSubmit, isLoading }: ProductFormProps) {
  const [activeTab, setActiveTab] = useState<'es' | 'en'>('es')
  const [categories, setCategories] = useState<Category[]>([])
  const [varieties, setVarieties] = useState<Variety[]>([])
  const [newTag, setNewTag] = useState('')
  const [newFlavorNote, setNewFlavorNote] = useState('')
  const [newGalleryImage, setNewGalleryImage] = useState('')

  const [formData, setFormData] = useState<ProductFormData>({
    sku: '',
    name: '',
    name_en: '',
    description: '',
    description_en: '',
    long_description: '',
    long_description_en: '',
    slug: '',
    category_id: null,
    variety_id: null,
    weight_grams: 250,
    roast_level: 'light',
    grind_type: 'ground',
    packaging_type: 'bag',
    price_usd: 0,
    price_local: 0,
    currency_local: 'USD',
    primary_image_url: '',
    gallery_images: [],
    tags: [],
    flavor_notes: [],
    brewing_recommendations: '',
    stock_quantity: 0,
    is_active: true,
    ...initialData
  })

  useEffect(() => {
    loadCategories()
    loadVarieties()
  }, [])

  const loadCategories = async () => {
    try {
      const response = await fetch('/api/products/categories')
      if (response.ok) {
        const data = await response.json()
        setCategories(data.categories || [])
      }
    } catch (error) {
      console.error('Error loading categories:', error)
    }
  }

  const loadVarieties = async () => {
    try {
      const response = await fetch('/api/varieties')
      if (response.ok) {
        const data = await response.json()
        setVarieties(data.varieties || [])
      }
    } catch (error) {
      console.error('Error loading varieties:', error)
    }
  }

  const handleChange = (field: keyof ProductFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      handleChange('tags', [...formData.tags, newTag.trim()])
      setNewTag('')
    }
  }

  const removeTag = (tag: string) => {
    handleChange('tags', formData.tags.filter(t => t !== tag))
  }

  const addFlavorNote = () => {
    if (newFlavorNote.trim() && !formData.flavor_notes.includes(newFlavorNote.trim())) {
      handleChange('flavor_notes', [...formData.flavor_notes, newFlavorNote.trim()])
      setNewFlavorNote('')
    }
  }

  const removeFlavorNote = (note: string) => {
    handleChange('flavor_notes', formData.flavor_notes.filter(n => n !== note))
  }

  const addGalleryImage = () => {
    if (newGalleryImage.trim() && !formData.gallery_images.includes(newGalleryImage.trim())) {
      handleChange('gallery_images', [...formData.gallery_images, newGalleryImage.trim()])
      setNewGalleryImage('')
    }
  }

  const removeGalleryImage = (url: string) => {
    handleChange('gallery_images', formData.gallery_images.filter(img => img !== url))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Language Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            type="button"
            onClick={() => setActiveTab('es')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'es'
                ? 'border-yellow-500 text-yellow-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Español
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('en')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'en'
                ? 'border-yellow-500 text-yellow-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            English
          </button>
        </nav>
      </div>

      {/* Basic Information */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Información Básica</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              SKU *
            </label>
            <input
              type="text"
              required
              value={formData.sku}
              onChange={(e) => handleChange('sku', e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-gray-900 font-medium"
              placeholder="CAM250"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Slug (URL) *
            </label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => handleChange('slug', e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-gray-900 font-medium"
              placeholder="cafe-alta-montana"
            />
          </div>

          {activeTab === 'es' ? (
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Nombre (Español) *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-gray-900 font-medium"
              />
            </div>
          ) : (
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Name (English) *
              </label>
              <input
                type="text"
                required
                value={formData.name_en}
                onChange={(e) => handleChange('name_en', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-gray-900 font-medium"
              />
            </div>
          )}
        </div>
      </div>

      {/* Descriptions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Descripciones</h3>

        {activeTab === 'es' ? (
          <>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Descripción Corta (Español)
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-gray-900 font-medium resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Descripción Larga (Español)
              </label>
              <textarea
                value={formData.long_description}
                onChange={(e) => handleChange('long_description', e.target.value)}
                rows={5}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-gray-900 font-medium resize-none"
              />
            </div>
          </>
        ) : (
          <>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Short Description (English)
              </label>
              <textarea
                value={formData.description_en}
                onChange={(e) => handleChange('description_en', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-gray-900 font-medium resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Long Description (English)
              </label>
              <textarea
                value={formData.long_description_en}
                onChange={(e) => handleChange('long_description_en', e.target.value)}
                rows={5}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-gray-900 font-medium resize-none"
              />
            </div>
          </>
        )}
      </div>

      {/* Product Specifications */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Especificaciones</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Peso (gramos) *
            </label>
            <input
              type="number"
              required
              value={formData.weight_grams}
              onChange={(e) => handleChange('weight_grams', parseInt(e.target.value))}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-gray-900 font-medium"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Nivel de Tostado
            </label>
            <select
              value={formData.roast_level}
              onChange={(e) => handleChange('roast_level', e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-gray-900 font-medium"
            >
              <option value="light">Claro</option>
              <option value="dark">Oscuro</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Tipo de Molienda
            </label>
            <select
              value={formData.grind_type}
              onChange={(e) => handleChange('grind_type', e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-gray-900 font-medium"
            >
              <option value="ground">Molido</option>
              <option value="whole_bean">Grano Entero</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Tipo de Empaque
            </label>
            <select
              value={formData.packaging_type}
              onChange={(e) => handleChange('packaging_type', e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-gray-900 font-medium"
            >
              <option value="bag">Bolsa</option>
              <option value="can">Lata</option>
              <option value="box">Caja</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Variedad
            </label>
            <select
              value={formData.variety_id || ''}
              onChange={(e) => handleChange('variety_id', e.target.value ? parseInt(e.target.value) : null)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-gray-900 font-medium"
            >
              <option value="">Seleccionar variedad</option>
              {varieties.map((variety) => (
                <option key={variety.id} value={variety.id}>
                  {variety.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Categoría
            </label>
            <select
              value={formData.category_id || ''}
              onChange={(e) => handleChange('category_id', e.target.value ? parseInt(e.target.value) : null)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-gray-900 font-medium"
            >
              <option value="">Seleccionar categoría</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Pricing & Stock */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Precios e Inventario</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Precio USD *
            </label>
            <input
              type="number"
              step="0.01"
              required
              value={formData.price_usd}
              onChange={(e) => handleChange('price_usd', parseFloat(e.target.value))}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-gray-900 font-medium"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Precio Local
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.price_local}
              onChange={(e) => handleChange('price_local', parseFloat(e.target.value))}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-gray-900 font-medium"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Stock
            </label>
            <input
              type="number"
              value={formData.stock_quantity}
              onChange={(e) => handleChange('stock_quantity', parseInt(e.target.value))}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-gray-900 font-medium"
            />
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Imágenes</h3>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Imagen Principal
          </label>
          <input
            type="text"
            value={formData.primary_image_url}
            onChange={(e) => handleChange('primary_image_url', e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-gray-900 font-medium"
            placeholder="/assets/productos/imagen.png"
          />
          {formData.primary_image_url && (
            <div className="mt-2 relative h-32 w-32">
              <Image
                src={formData.primary_image_url}
                alt="Preview"
                fill
                className="object-cover rounded"
                unoptimized
              />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Galería de Imágenes
          </label>
          <div className="flex space-x-2 mb-2">
            <input
              type="text"
              value={newGalleryImage}
              onChange={(e) => setNewGalleryImage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addGalleryImage())}
              className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-gray-900 font-medium"
              placeholder="/assets/productos/galeria/imagen.png"
            />
            <button
              type="button"
              onClick={addGalleryImage}
              className="px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600"
            >
              Añadir
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {formData.gallery_images.map((url, index) => (
              <div key={index} className="relative group">
                <div className="relative h-24 w-full">
                  <Image
                    src={url}
                    alt={`Gallery ${index}`}
                    fill
                    className="object-cover rounded"
                    unoptimized
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeGalleryImage(url)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tags & Flavor Notes */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Etiquetas y Notas</h3>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Etiquetas (Tags)
          </label>
          <div className="flex space-x-2 mb-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-gray-900 font-medium"
              placeholder="aromático, frutal, etc."
            />
            <button
              type="button"
              onClick={addTag}
              className="px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600"
            >
              Añadir
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Notas de Sabor
          </label>
          <div className="flex space-x-2 mb-2">
            <input
              type="text"
              value={newFlavorNote}
              onChange={(e) => setNewFlavorNote(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFlavorNote())}
              className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-gray-900 font-medium"
              placeholder="Chocolate, Caramelo, etc."
            />
            <button
              type="button"
              onClick={addFlavorNote}
              className="px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600"
            >
              Añadir
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.flavor_notes.map((note, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-amber-100 text-amber-800"
              >
                {note}
                <button
                  type="button"
                  onClick={() => removeFlavorNote(note)}
                  className="ml-2 text-amber-600 hover:text-amber-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Brewing Recommendations */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recomendaciones de Preparación</h3>
        <textarea
          value={formData.brewing_recommendations}
          onChange={(e) => handleChange('brewing_recommendations', e.target.value)}
          rows={4}
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-gray-900 font-medium resize-none"
          placeholder="Filtro: V60, Chemex o prensa francesa. Agua 90–95 °C; molienda media-fina."
        />
      </div>

      {/* Status */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="is_active"
            checked={formData.is_active}
            onChange={(e) => handleChange('is_active', e.target.checked)}
            className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-300 rounded"
          />
          <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">
            Producto activo (visible en el sitio web)
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Guardando...' : 'Guardar Producto'}
        </button>
      </div>
    </form>
  )
}
