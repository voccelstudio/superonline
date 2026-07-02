'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { categories } from '@/data/products'
import { supabase } from '@/lib/supabase'

export default function Header() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [categoriesOpen, setCategoriesOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const { totalItems } = useCart()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) {
        setUser(data.user)
        supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single()
          .then(({ data: profile }) => {
            if (profile?.role === 'admin') setIsAdmin(true)
          })
      }
    })
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setIsAdmin(false)
    setUserMenuOpen(false)
    router.push('/')
    router.refresh()
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🥘</span>
            <div>
              <span className="text-xl font-bold text-gray-900 block leading-tight">
                MercadoDelicias
              </span>
              <span className="text-xs text-primary-600 font-medium">
                Delicatesen Online
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            <Link
              href="/"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
            >
              Inicio
            </Link>
            <div className="relative group">
              <button
                onMouseEnter={() => setCategoriesOpen(true)}
                onMouseLeave={() => setCategoriesOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 rounded-lg hover:bg-primary-50 transition-colors flex items-center gap-1"
              >
                Categorías
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {categoriesOpen && (
                <div
                  onMouseEnter={() => setCategoriesOpen(true)}
                  onMouseLeave={() => setCategoriesOpen(false)}
                  className="absolute top-full left-0 bg-white rounded-xl shadow-lg border border-gray-100 p-2 w-64 grid grid-cols-1 gap-1"
                >
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/productos?categoria=${cat.slug}`}
                      className="px-4 py-2.5 text-sm text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link
              href="/productos"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
            >
              Productos
            </Link>
            <Link
              href="/contacto"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
            >
              Contacto
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
                >
                  <span className="w-7 h-7 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-bold">
                    {user.email?.[0]?.toUpperCase() || 'U'}
                  </span>
                  <span className="hidden sm:inline">{user.email?.split('@')[0]}</span>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-lg border border-gray-100 p-2 w-48">
                    {isAdmin && (
                      <Link
                        href="/admin"
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                      >
                        ⚙️ Panel Admin
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="hidden sm:inline-flex px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
              >
                Ingresar
              </Link>
            )}

            <Link
              href="/carrito"
              className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-primary-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 py-4 space-y-1">
            <Link href="/" className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-primary-50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>Inicio</Link>
            <div className="px-4 py-2 text-sm font-medium text-gray-400">Categorías</div>
            {categories.map((cat) => (
              <Link key={cat.id} href={`/productos?categoria=${cat.slug}`}
                className="block px-4 py-2 pl-8 text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}>{cat.name}</Link>
            ))}
            <Link href="/productos" className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-primary-50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>Todos los Productos</Link>
            <Link href="/contacto" className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-primary-50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>Contacto</Link>
            <hr className="my-2 border-gray-100" />
            {user ? (
              <>
                {isAdmin && <Link href="/admin" className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-primary-50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>⚙️ Panel Admin</Link>}
                <button onClick={() => { handleLogout(); setMobileMenuOpen(false) }} className="block w-full text-left px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg">Cerrar Sesión</button>
              </>
            ) : (
              <Link href="/auth/login" className="block px-4 py-2.5 text-sm font-medium text-primary-600 hover:bg-primary-50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>Ingresar</Link>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
