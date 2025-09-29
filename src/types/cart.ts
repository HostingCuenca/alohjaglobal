export interface CartItem {
  id: string
  sku: string
  name: string
  nameEn: string
  price: number
  currency: string
  weight: number
  image: string
  quantity: number
  variety?: string
  roastLevel?: string
  batchId?: string
}

export interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
  isOpen: boolean
}

export interface Product {
  id: string
  sku: string
  name: string
  nameEn: string
  description?: string
  descriptionEn?: string
  categoryId?: number
  varietyId?: number
  weightGrams: number
  roastLevel?: string
  grindType?: string
  packagingType?: string
  priceUsd: number
  priceLocal: number
  currencyLocal: string
  primaryImageUrl?: string
  galleryImages?: string[]
  tags?: string[]
  flavorNotes?: string[]
  brewingRecommendations?: string
  isActive: boolean
  stockQuantity: number
  variety?: {
    name: string
    description?: string
  }
  batches?: {
    batchId: string
    percentage: number
  }[]
  weightOptions?: {
    weight: number
    price: number
    sku: string
    image: string
  }[]
}