'use client'

import { useState, useCallback, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useDropzone } from 'react-dropzone'
import { Upload, X, CheckCircle, AlertCircle } from 'lucide-react'
import { PLANS } from '@/lib/plans'
import { cn } from '@/lib/utils'

function UploadForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialPlan = searchParams.get('plan') || 'avulso'

  const [selectedPlan, setSelectedPlan] = useState(initialPlan)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', email: '', whatsapp: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback((accepted: File[]) => {
    const f = accepted[0]
    if (!f) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': [], 'image/png': [], 'image/webp': [] },
    maxSize: 20 * 1024 * 1024,
    maxFiles: 1,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) { setError('Selecione uma foto para restaurar.'); return }

    setLoading(true)
    setError(null)

    try {
      // 1. Cria o pedido e gera preferência de pagamento
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: form.name,
          customer_email: form.email,
          customer_whatsapp: form.whatsapp,
          plan_id: selectedPlan,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Erro ao criar pedido')
      }

      const { order_id, checkout_url } = await res.json()

      // 2. Faz upload da foto original
      const formData = new FormData()
      formData.append('file', file)
      formData.append('order_id', order_id)
      formData.append('type', 'original')

      await fetch('/api/upload', { method: 'POST', body: formData })

      // 3. Redireciona para o checkout do Mercado Pago
      window.location.href = checkout_url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro inesperado')
      setLoading(false)
    }
  }

  const plan = PLANS.find((p) => p.id === selectedPlan)

  return (
    <div className="min-h-screen bg-zinc-50 py-12 px-4">
      <div className="mx-auto max-w-2xl">

        <div className="mb-8 text-center">
          <a href="/" className="text-xl font-bold tracking-tight">RestauraPic</a>
          <h1 className="mt-4 text-2xl font-bold">Faça seu pedido</h1>
          <p className="text-zinc-500 text-sm mt-1">Preencha os dados e envie sua foto</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm">

          {/* Seleção de plano */}
          <div>
            <label className="block text-sm font-medium mb-3">Escolha o plano</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {PLANS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedPlan(p.id)}
                  className={cn(
                    'rounded-xl border p-3 text-left transition-all',
                    selectedPlan === p.id
                      ? 'border-amber-500 bg-amber-50 ring-1 ring-amber-500'
                      : 'border-zinc-200 hover:border-zinc-300'
                  )}
                >
                  <p className="font-semibold text-sm">{p.name}</p>
                  <p className="text-amber-600 font-bold text-sm">{p.price_label}</p>
                  <p className="text-zinc-400 text-xs mt-0.5">
                    {p.max_photos === 'unlimited' ? 'Ilimitado' : `${p.max_photos} foto${p.max_photos > 1 ? 's' : ''}`}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Upload da foto */}
          <div>
            <label className="block text-sm font-medium mb-3">Foto para restaurar</label>
            {!file ? (
              <div
                {...getRootProps()}
                className={cn(
                  'rounded-xl border-2 border-dashed p-8 text-center cursor-pointer transition-colors',
                  isDragActive ? 'border-amber-400 bg-amber-50' : 'border-zinc-200 hover:border-zinc-300'
                )}
              >
                <input {...getInputProps()} />
                <Upload className="mx-auto h-8 w-8 text-zinc-400 mb-3" />
                <p className="text-sm font-medium text-zinc-600">
                  {isDragActive ? 'Solte a foto aqui' : 'Clique ou arraste a foto aqui'}
                </p>
                <p className="text-xs text-zinc-400 mt-1">JPEG, PNG ou WEBP · máx 20MB</p>
              </div>
            ) : (
              <div className="relative rounded-xl overflow-hidden border border-zinc-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={preview!} alt="Preview" className="w-full max-h-56 object-cover" />
                <button
                  type="button"
                  onClick={() => { setFile(null); setPreview(null) }}
                  className="absolute top-2 right-2 rounded-full bg-black/60 p-1 text-white hover:bg-black/80"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-black/40 px-3 py-2">
                  <p className="text-xs text-white truncate">{file.name}</p>
                </div>
              </div>
            )}
          </div>

          {/* Dados do cliente */}
          <div className="space-y-4">
            <label className="block text-sm font-medium">Seus dados</label>
            <input
              type="text"
              placeholder="Nome completo"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-lg border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
            />
            <input
              type="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-lg border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
            />
            <input
              type="tel"
              placeholder="WhatsApp com DDD (ex: 11999999999)"
              required
              value={form.whatsapp}
              onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
              className="w-full rounded-lg border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
            />
          </div>

          {/* Erro */}
          {error && (
            <div className="flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          {/* Resumo + botão */}
          <div className="border-t border-zinc-100 pt-4">
            <div className="flex items-center justify-between mb-4 text-sm">
              <span className="text-zinc-500">Total a pagar</span>
              <span className="text-xl font-bold text-amber-600">{plan?.price_label}</span>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-amber-600 py-3 text-sm font-semibold text-white hover:bg-amber-700 transition-colors disabled:opacity-60"
            >
              {loading ? 'Aguarde...' : `Pagar ${plan?.price_label} e restaurar`}
            </button>
            <p className="text-center text-xs text-zinc-400 mt-3">
              Pague via Pix, cartão de crédito ou débito
            </p>
          </div>

        </form>
      </div>
    </div>
  )
}

export default function UploadPage() {
  return (
    <Suspense>
      <UploadForm />
    </Suspense>
  )
}
