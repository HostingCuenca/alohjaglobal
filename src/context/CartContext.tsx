'use client'

import { createContext, useContext, useReducer, ReactNode, useEffect } from 'react'
import { CartState, CartItem, Product } from '@/types/cart'

interface CartContextType {
  state: CartState
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  getCartTotal: () => number
  getItemCount: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

type CartAction =
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] }

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, quantity } = action.payload
      const existingItem = state.items.find(item => item.id === product.id)

      let newItems: CartItem[]

      if (existingItem) {
        newItems = state.items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        const newItem: CartItem = {
          id: product.id,
          sku: product.sku,
          name: product.name,
          nameEn: product.nameEn,
          price: product.priceLocal || product.priceUsd,
          currency: product.currencyLocal || 'USD',
          weight: product.weightGrams,
          image: product.primaryImageUrl || '/images/coffee-placeholder.jpg',
          quantity,
          variety: product.variety?.name,
          roastLevel: product.roastLevel,
          batchId: product.batches?.[0]?.batchId
        }
        newItems = [...state.items, newItem]
      }

      const total = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)

      return { ...state, items: newItems, total, itemCount }
    }

    case 'REMOVE_FROM_CART': {
      const newItems = state.items.filter(item => item.id !== action.payload)
      const total = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)

      return { ...state, items: newItems, total, itemCount }
    }

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload

      if (quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_FROM_CART', payload: id })
      }

      const newItems = state.items.map(item =>
        item.id === id ? { ...item, quantity } : item
      )

      const total = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)

      return { ...state, items: newItems, total, itemCount }
    }

    case 'CLEAR_CART':
      return { ...state, items: [], total: 0, itemCount: 0 }

    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen }

    case 'LOAD_CART': {
      const items = action.payload
      const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

      return { ...state, items, total, itemCount }
    }

    default:
      return state
  }
}

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
  isOpen: false
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('alohja-cart')
    if (savedCart) {
      try {
        const items = JSON.parse(savedCart)
        dispatch({ type: 'LOAD_CART', payload: items })
      } catch (error) {
        console.error('Error loading cart from localStorage:', error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('alohja-cart', JSON.stringify(state.items))
  }, [state.items])

  const addToCart = (product: Product, quantity = 1) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity } })
  }

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId })
  }

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' })
  }

  const getCartTotal = () => state.total
  const getItemCount = () => state.itemCount

  return (
    <CartContext.Provider value={{
      state,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      toggleCart,
      getCartTotal,
      getItemCount
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}