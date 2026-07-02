'use client'

import { useCart } from '@/context/CartContext'

export default function AddToCartButton({ product }) {
  const { addItem } = useCart()

  return (
    <button
      onClick={() => addItem(product)}
      className="w-full sm:w-auto bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg flex items-center justify-center gap-2"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
      </svg>
      Add al Carrito
    </button>
  )
}
