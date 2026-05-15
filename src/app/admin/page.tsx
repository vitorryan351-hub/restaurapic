'use client'

import { useEffect, useState, useRef } from 'react'
import { Order } from '@/types'
import { formatDate, formatCurrency, ORDER_STATUS_LABELS, ORDER_STATUS_COLORS, cn } from '@/lib/utils'
import { Upload, ExternalLink, RefreshCw } from 'lucide-react'

const STATUSES = ['pending_payment', 'paid', 'processing', 'completed', 'cancelled']

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState<string | null>(null)
  const [updating, setUpdating] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null)

  const fetchOrders = async () => {
    setLoading(true)
    const res = await fetch('/api/orders')
    const data = await res.json()
    setOrders(data)
    setLoading(false)
  }

  useEffect(() => { fetchOrders() }, [])

  const handleStatusChange = async (order_id: string, status: string) => {
    setUpdating(order_id)
    await fetch(`/api/orders/${order_id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    await fetchOrders()
    setUpdating(null)
  }

  const handleUploadRestored = async (order_id: string, file: File) => {
    setUploading(order_id)
    const fd = new FormData()
    fd.append('file', file)
    fd.append('order_id', order_id)
    fd.append('type', 'restored')

    await fetch('/api/upload', { method: 'POST', body: fd })

    // Atualiza status para 'completed' automaticamente
    await fetch(`/api/orders/${order_id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'completed' }),
    })

    await fetchOrders()
    setUploading(null)
  }

  const openFilePicker = (order_id: string) => {
    setActiveOrderId(order_id)
    fileInputRef.current?.click()
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && activeOrderId) {
      handleUploadRestored(activeOrderId, file)
    }
    e.target.value = ''
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={onFileChange} />

      <header className="border-b border-zinc-200 bg-white px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-bold">Painel Admin — RestauraPic</h1>
        <button
          onClick={fetchOrders}
          className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-800"
        >
          <RefreshCw className="h-4 w-4" /> Atualizar
        </button>
      </header>

      <div className="p-6">
        {/* Resumo */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
          {STATUSES.map((s) => {
            const count = orders.filter((o) => o.status === s).length
            return (
              <div key={s} className="bg-white rounded-xl border border-zinc-200 p-4 text-center">
                <p className="text-2xl font-bold">{count}</p>
                <p className="text-xs text-zinc-500 mt-1">{ORDER_STATUS_LABELS[s]}</p>
              </div>
            )
          })}
        </div>

        {/* Tabela de pedidos */}
        {loading ? (
          <p className="text-center text-zinc-400 py-12">Carregando pedidos...</p>
        ) : orders.length === 0 ? (
          <p className="text-center text-zinc-400 py-12">Nenhum pedido ainda.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold">{order.customer_name}</p>
                    <p className="text-sm text-zinc-500">{order.customer_email}</p>
                    <p className="text-sm text-zinc-500">{order.customer_whatsapp}</p>
                    <p className="text-xs text-zinc-400 mt-1">{formatDate(order.created_at)}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-lg font-bold text-amber-600">{formatCurrency(order.amount_cents)}</span>
                    <span className="text-xs font-medium capitalize">{order.plan}</span>
                    <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-medium', ORDER_STATUS_COLORS[order.status])}>
                      {ORDER_STATUS_LABELS[order.status]}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-3 items-center border-t border-zinc-100 pt-4">
                  {/* Link para foto original */}
                  {order.original_photo_url && (
                    <a
                      href={`#`}
                      className="flex items-center gap-1 text-xs text-blue-600 hover:underline"
                    >
                      <ExternalLink className="h-3 w-3" /> Ver foto original
                    </a>
                  )}

                  {/* Link para foto restaurada */}
                  {order.restored_photo_url && (
                    <a
                      href={order.restored_photo_url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-xs text-green-600 hover:underline"
                    >
                      <ExternalLink className="h-3 w-3" /> Ver foto restaurada
                    </a>
                  )}

                  {/* Upload foto restaurada */}
                  {order.status !== 'completed' && order.status !== 'cancelled' && order.status !== 'pending_payment' && (
                    <button
                      onClick={() => openFilePicker(order.id)}
                      disabled={uploading === order.id}
                      className="flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700 hover:bg-amber-200 transition-colors disabled:opacity-60"
                    >
                      <Upload className="h-3 w-3" />
                      {uploading === order.id ? 'Enviando...' : 'Subir foto restaurada'}
                    </button>
                  )}

                  {/* Alterar status */}
                  <select
                    value={order.status}
                    disabled={updating === order.id}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="ml-auto rounded-lg border border-zinc-200 px-2 py-1 text-xs outline-none"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>{ORDER_STATUS_LABELS[s]}</option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
