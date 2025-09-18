'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'

interface NavigationProps {
  language: 'es' | 'en'
  setLanguage: (lang: 'es' | 'en') => void
}

export default function Navigation({ language, setLanguage }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { state, toggleCart } = useCart()

  const menuItems = [
    { es: 'Inicio', en: 'Home', href: '/' },
    { es: 'Productos', en: 'Products', href: '/productos' },
    { es: 'Nosotros', en: 'About Us', href: '/nosotros' },
    { es: 'Alohja Global', en: 'Alohja Global', href: '/global' },
    { es: 'Sostenibilidad', en: 'Sustainability', href: '/sostenibilidad' },
    { es: 'Agricultores', en: 'Farmers', href: '/agricultores' },
    { es: 'Lotes', en: 'Batches', href: '/lotes' }
  ]

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/LogoHorizontal.png"
              alt="Alohja Coffee"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-black hover:text-yellow-600 transition-colors duration-200 font-medium"
              >
                {language === 'es' ? item.es : item.en}
              </Link>
            ))}
          </div>

          {/* Cart, Language Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <button
              onClick={toggleCart}
              className="relative p-2 text-black hover:text-yellow-600 transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <circle cx="8" cy="21" r="1"/>
                <circle cx="19" cy="21" r="1"/>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
              </svg>
              {state.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-500 text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {state.itemCount > 9 ? '9+' : state.itemCount}
                </span>
              )}
            </button>

            {/* Language Toggle */}
            <div className="flex items-center bg-gray-100 rounded-full p-1">
              <button
                onClick={() => setLanguage('es')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                  language === 'es'
                    ? 'bg-black text-white'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                ES
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                  language === 'en'
                    ? 'bg-black text-white'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                EN
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md text-black hover:bg-gray-100"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 text-black hover:bg-gray-50 rounded-md font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {language === 'es' ? item.es : item.en}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}