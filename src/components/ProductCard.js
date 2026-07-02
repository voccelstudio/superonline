'use client'

import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/data/products'

export default function ProductCard({ product }) {
  const { addItem } = useCart()

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
      <Link href={`/producto/${product.id}`}>
        <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-30 group-hover:scale-110 transition-transform duration-500">
            🥘
          </div>
          {product.category === 'oriental' && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              Oriental
            </div>
          )}
          {product.category === 'arabe' && (
            <div className="absolute top-2 left-2 bg-emerald-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
              Árabe
            </div>
          )}
          {product.category === 'india' && (
            <div className="absolute top-2 left-2 bg-amber-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
              India
            </div>
          )}
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/producto/${product.id}`}>
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1 hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary-600">
            {formatPrice(product.price)}
          </span>
          <button
            onClick={() => addItem(product)}
            className="bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors active:scale-95"
          >
            + Add al carrito
          </button>
        </div>
      </div>
    </div>
  )
}
