'use client'

import { useCart } from '@/context/CartContext'
import { useState } from 'react'
import Image from 'next/image'

interface CartSidebarProps {
  language: 'es' | 'en'
}

export default function CartSidebar({ language }: CartSidebarProps) {
  const { state, removeFromCart, updateQuantity, toggleCart, clearCart } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)

  const handleWhatsAppCheckout = () => {
    setIsProcessing(true)

    const message = language === 'es'
      ? `¡Hola! Me interesa hacer un pedido de café Alohja:\n\n` +
        state.items.map(item =>
          `• ${item.name} (${item.weight}g) - ${item.quantity}x $${item.price.toFixed(2)}`
        ).join('\n') +
        `\n\nTotal: $${state.total.toFixed(2)} ${state.items[0]?.currency || 'USD'}\n\n` +
        `¿Podrían confirmar disponibilidad y método de pago?`
      : `Hello! I'm interested in placing an order for Alohja coffee:\n\n` +
        state.items.map(item =>
          `• ${item.nameEn} (${item.weight}g) - ${item.quantity}x $${item.price.toFixed(2)}`
        ).join('\n') +
        `\n\nTotal: $${state.total.toFixed(2)} ${state.items[0]?.currency || 'USD'}\n\n` +
        `Could you confirm availability and payment method?`

    const whatsappNumber = '593999999999' // Tu número de WhatsApp
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`

    window.open(whatsappUrl, '_blank')

    setTimeout(() => {
      setIsProcessing(false)
      clearCart()
      toggleCart()
    }, 1000)
  }

  if (!state.isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40"
        onClick={toggleCart}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-96 max-w-full bg-white shadow-2xl z-50 transform transition-transform duration-300">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-bold">
              {language === 'es' ? 'Tu Carrito' : 'Your Cart'}
            </h2>
            <button
              onClick={toggleCart}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {state.items.length === 0 ? (
              <div className="text-center text-gray-500 mt-12">
                <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6M20 13v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6" />
                </svg>
                <p className="text-lg font-medium">
                  {language === 'es' ? 'Tu carrito está vacío' : 'Your cart is empty'}
                </p>
                <p className="text-sm mt-2">
                  {language === 'es'
                    ? 'Agrega algunos productos para comenzar'
                    : 'Add some products to get started'
                  }
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">
                        {language === 'es' ? item.name : item.nameEn}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {item.weight}g {item.variety && `• ${item.variety}`}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 border rounded-full flex items-center justify-center text-sm hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span className="text-sm font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 border rounded-full flex items-center justify-center text-sm hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-xs text-red-500 hover:text-red-700"
                          >
                            {language === 'es' ? 'Eliminar' : 'Remove'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {state.items.length > 0 && (
            <div className="border-t p-6 space-y-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>{language === 'es' ? 'Total:' : 'Total:'}</span>
                <span>${state.total.toFixed(2)} {state.items[0]?.currency || 'USD'}</span>
              </div>

              <button
                onClick={handleWhatsAppCheckout}
                disabled={isProcessing}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                    <span>
                      {language === 'es' ? 'Pedir por WhatsApp' : 'Order via WhatsApp'}
                    </span>
                  </>
                )}
              </button>

              <button
                onClick={clearCart}
                className="w-full text-gray-600 hover:text-gray-800 font-medium py-2 text-sm"
              >
                {language === 'es' ? 'Vaciar carrito' : 'Clear cart'}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}