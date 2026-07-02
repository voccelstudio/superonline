'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { formatPrice } from '@/data/products'

const statuses = [
  { value: 'pending', label: 'Pendiente', color: 'bg-yellow-100 text-yellow-700' },
  { value: 'confirmed', label: 'Confirmado', color: 'bg-blue-100 text-blue-700' },
  { value: 'preparing', label: 'Preparando', color: 'bg-purple-100 text-purple-700' },
  { value: 'shipped', label: 'En camino', color: 'bg-indigo-100 text-indigo-700' },
  { value: 'delivered', label: 'Entregado', color: 'bg-green-100 text-green-700' },
  { value: 'cancelled', label: 'Cancelado', color: 'bg-red-100 text-red-700' },
]

export default function AdminPedidos() {
  const [orders, setOrders] = useState([])
  const [filter, setFilter] = useState('all')
  const [expanded, setExpanded] = useState(null)

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    const { data } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100)
    if (data) setOrders(data)
  }

  const updateStatus = async (id, status) => {
    await supabase
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
    loadOrders()
  }

  const filteredOrders = filter === 'all'
    ? orders
    : orders.filter((o) => o.status === filter)

  const getStatusInfo = (value) => statuses.find((s) => s.value === value) || statuses[0]

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Pedidos</h1>

      <div className="flex gap-2 flex-wrap mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'all' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Todos ({orders.length})
        </button>
        {statuses.map((s) => (
          <button
            key={s.value}
            onClick={() => setFilter(s.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === s.value ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {s.label} ({orders.filter((o) => o.status === s.value).length})
          </button>
        ))}
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center py-12 text-gray-500">No hay pedidos {filter !== 'all' ? 'con este estado' : ''}</div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <button
                onClick={() => setExpanded(expanded === order.id ? null : order.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusInfo(order.status).color}`}>
                    {getStatusInfo(order.status).label}
                  </span>
                  <div className="text-left">
                    <span className="font-medium text-gray-900">{order.user_name}</span>
                    <span className="text-gray-500 ml-3 text-sm">{order.user_phone}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-primary-600">{formatPrice(order.total)}</span>
                  <span className="text-xs text-gray-400">
                    {new Date(order.created_at).toLocaleString('es-PY')}
                  </span>
                  <svg className={`w-5 h-5 text-gray-400 transition-transform ${expanded === order.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {expanded === order.id && (
                <div className="px-4 pb-4 border-t border-gray-100 pt-4">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Productos</h4>
                      <div className="space-y-2">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex justify-between text-sm">
                            <span className="text-gray-600">{item.name} x{item.quantity}</span>
                            <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Actualizar Estado</h4>
                      <div className="flex flex-wrap gap-2">
                        {statuses.map((s) => (
                          <button
                            key={s.value}
                            onClick={() => updateStatus(order.id, s.value)}
                            disabled={order.status === s.value}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 ${
                              order.status === s.value
                                ? 'bg-gray-900 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            {s.label}
                          </button>
                        ))}
                      </div>
                      {order.delivery_address && (
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-gray-900 mb-1">Dirección</h4>
                          <p className="text-sm text-gray-600">{order.delivery_address}</p>
                        </div>
                      )}
                      {order.notes && (
                        <div className="mt-2">
                          <h4 className="text-sm font-medium text-gray-900 mb-1">Notas</h4>
                          <p className="text-sm text-gray-600">{order.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
