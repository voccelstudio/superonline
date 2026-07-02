'use client'

import { useParams, notFound } from 'next/navigation'
import Link from 'next/link'
import { products, getProductById, formatPrice, categories } from '@/data/products'
import { useCart } from '@/context/CartContext'
import ProductCard from '@/components/ProductCard'

export default function ProductoPage() {
  const params = useParams()
  const product = getProductById(params.id)
  const { addItem } = useCart()

  if (!product) {
    notFound()
  }

  const category = categories.find((c) => c.id === product.category)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const categoryColors = {
    oriental: 'bg-red-100 text-red-700',
    arabe: 'bg-emerald-100 text-emerald-700',
    india: 'bg-amber-100 text-amber-700',
    especias: 'bg-orange-100 text-orange-700',
    salsas: 'bg-blue-100 text-blue-700',
    arroz: 'bg-yellow-100 text-yellow-700',
    tes: 'bg-teal-100 text-teal-700',
    conservas: 'bg-purple-100 text-purple-700',
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-primary-600 transition-colors">Inicio</Link>
        <span>/</span>
        <Link href="/productos" className="hover:text-primary-600 transition-colors">Productos</Link>
        {category && (
          <>
            <span>/</span>
            <Link
              href={`/productos?categoria=${category.slug}`}
              className="hover:text-primary-600 transition-colors"
            >
              {category.name}
            </Link>
          </>
        )}
        <span>/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center">
          <span className="text-8xl opacity-30">🥘</span>
        </div>
        <div>
          {category && (
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${categoryColors[category.id] || 'bg-gray-100 text-gray-700'}`}>
              {category.name}
            </span>
          )}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
          <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

          <div className="text-4xl font-bold text-primary-600 mb-8">
            {formatPrice(product.price)}
          </div>

          <button
            onClick={() => addItem(product)}
            className="w-full sm:w-auto bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg flex items-center justify-center gap-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            Add al Carrito
          </button>

          {product.features && product.features.length > 0 && (
            <div className="mt-10 border-t border-gray-100 pt-8">
              <h3 className="font-semibold text-gray-900 mb-4">Características</h3>
              <ul className="space-y-3">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Productos Relacionados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
