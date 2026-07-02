'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminProductos() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({
    name: '', description: '', price: '', category: '',
    stock: '-1', features: '',
  })

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    const { data } = await supabase
      .from('admin_products')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setProducts(data)
    setLoading(false)
  }

  const resetForm = () => {
    setForm({ name: '', description: '', price: '', category: '', stock: '-1', features: '' })
    setEditing(null)
    setShowForm(false)
  }

  const openEdit = (product) => {
    setForm({
      name: product.name,
      description: product.description || '',
      price: String(product.price),
      category: product.category || '',
      stock: String(product.stock || '-1'),
      features: (product.features || []).join(', '),
    })
    setEditing(product.id)
    setShowForm(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      name: form.name,
      description: form.description,
      price: parseInt(form.price),
      category: form.category,
      stock: parseInt(form.stock) || -1,
      features: form.features.split(',').map((f) => f.trim()).filter(Boolean),
    }

    if (editing) {
      await supabase.from('admin_products').update(data).eq('id', editing)
    } else {
      await supabase.from('admin_products').insert(data)
    }

    resetForm()
    loadProducts()
  }

  const toggleActive = async (product) => {
    await supabase
      .from('admin_products')
      .update({ active: !product.active })
      .eq('id', product.id)
    loadProducts()
  }

  const deleteProduct = async (id) => {
    if (confirm('¿Eliminar este producto?')) {
      await supabase.from('admin_products').delete().eq('id', id)
      loadProducts()
    }
  }

  if (loading) {
    return <div className="text-gray-500">Cargando productos...</div>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Productos</h1>
        <button
          onClick={() => { resetForm(); setShowForm(true) }}
          className="bg-primary-500 hover:bg-primary-600 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors"
        >
          + Nuevo Producto
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 p-6 mb-6 space-y-4">
          <h2 className="font-semibold text-gray-900">{editing ? 'Editar' : 'Nuevo'} Producto</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Precio (Gs)</label>
              <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-500">
                <option value="">Sin categoría</option>
                <option value="oriental">Oriental</option>
                <option value="arabe">Árabe</option>
                <option value="india">India</option>
                <option value="especias">Especias</option>
                <option value="salsas">Salsas</option>
                <option value="arroz">Arroces</option>
                <option value="tes">Tés</option>
                <option value="conservas">Conservas</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock (-1 = ilimitado)</label>
              <input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-500" rows="2" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Características (separadas por coma)</label>
              <input type="text" value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Ej: 500ml, Sin TACC, Artesanal" />
            </div>
          </div>
          <div className="flex gap-2">
            <button type="submit" className="bg-primary-500 hover:bg-primary-600 text-white font-medium px-6 py-2 rounded-lg text-sm transition-colors">
              {editing ? 'Guardar Cambios' : 'Crear Producto'}
            </button>
            <button type="button" onClick={resetForm} className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-6 py-2 rounded-lg text-sm transition-colors">
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left text-gray-500">
              <th className="px-4 py-3 font-medium">Nombre</th>
              <th className="px-4 py-3 font-medium">Categoría</th>
              <th className="px-4 py-3 font-medium">Precio</th>
              <th className="px-4 py-3 font-medium">Estado</th>
              <th className="px-4 py-3 font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t border-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{p.name}</td>
                <td className="px-4 py-3 text-gray-500">{p.category || '-'}</td>
                <td className="px-4 py-3 text-gray-900">
                  {new Intl.NumberFormat('es-PY').format(p.price)} Gs
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleActive(p)}
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      p.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {p.active ? 'Activo' : 'Inactivo'}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(p)} className="text-primary-600 hover:text-primary-700 text-xs font-medium">
                      Editar
                    </button>
                    <button onClick={() => deleteProduct(p.id)} className="text-red-500 hover:text-red-600 text-xs font-medium">
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && (
          <div className="text-center py-12 text-gray-500">No hay productos. Creá el primero.</div>
        )}
      </div>
    </div>
  )
}
