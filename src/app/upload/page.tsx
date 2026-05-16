'use client'

import { useState, useCallback, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useDropzone } from 'react-dropzone'
import { Upload, X, AlertCircle, CheckCircle, ChevronLeft, Shield, Lock } from 'lucide-react'
import { PLANS } from '@/lib/plans'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const STEPS = ['Escolha o plano', 'Envie a foto', 'Seus dados']

function ProgressBar({ current }: { current: number }) {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-3">
        {STEPS.map((label, i) => (
          <div key={i} className="flex flex-col items-center flex-1">
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              backgroundColor: i < current ? 'var(--color-sage)' : i === current ? 'var(--color-amber)' : 'var(--color-beige)',
              color: i <= current ? 'white' : 'var(--color-warm-gray)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, fontWeight: 700,
              transition: 'all 0.3s',
            }}>
              {i < current ? <CheckCircle className="h-4 w-4" /> : i + 1}
            </div>
            <span style={{ fontSize: 11, marginTop: 6, color: i === current ? 'var(--color-amber)' : 'var(--color-warm-gray)', fontWeight: i === current ? 700 : 400, textAlign: 'center' }}>
              {label}
            </span>
          </div>
        ))}
      </div>
      <div style={{ height: 4, backgroundColor: 'var(--color-beige)', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ height: '100%', backgroundColor: 'var(--color-amber)', borderRadius: 4, width: `${(current / (STEPS.length - 1)) * 100}%`, transition: 'width 0.4s ease' }} />
      </div>
    </div>
  )
}

function UploadForm() {
  const searchParams = useSearchParams()
  const initialPlan = searchParams.get('plan') || 'avulso'

  const [step, setStep] = useState(0)
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

  const plan = PLANS.find((p) => p.id === selectedPlan)

  const handleNext = () => {
    if (step === 1 && !file) { setError('Selecione uma foto para continuar.'); return }
    setError(null)
    setStep((s) => s + 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return
    setLoading(true)
    setError(null)
    try {
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
      const fd = new FormData()
      fd.append('file', file)
      fd.append('order_id', order_id)
      fd.append('type', 'original')
      await fetch('/api/upload', { method: 'POST', body: fd })
      window.location.href = checkout_url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro inesperado')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-cream)' }}>

      {/* Header */}
      <header style={{ borderBottom: '1px solid var(--color-beige)', backgroundColor: 'white', padding: '16px 24px' }}>
        <div className="mx-auto max-w-xl flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div style={{ width: 32, height: 32, border: '2px solid var(--color-amber)', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-amber)', fontSize: 16 }}>♡</div>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, color: 'var(--color-brown)' }}>
              Reviver <span style={{ color: 'var(--color-amber)' }}>Memórias</span>
            </span>
          </Link>
          <div className="flex items-center gap-1" style={{ fontSize: 12, color: 'var(--color-warm-gray)' }}>
            <Lock className="h-3 w-3" />
            <span>Pagamento seguro</span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-xl px-4 py-10">

        {/* Título */}
        <div className="text-center mb-8">
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: 'var(--color-brown)', marginBottom: 6 }}>
            Restaure sua memória
          </h1>
          <p style={{ fontSize: 15, color: 'var(--color-warm-gray)' }}>Passo {step + 1} de {STEPS.length}</p>
        </div>

        {/* Barra de progresso */}
        <ProgressBar current={step} />

        {/* Card do formulário */}
        <div style={{ backgroundColor: 'white', border: '1px solid var(--color-beige)', borderRadius: 'var(--radius-xl)', padding: 32, boxShadow: '0 4px 24px rgba(61,43,31,0.08)' }}>

          {/* ── PASSO 0: Plano ── */}
          {step === 0 && (
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--color-brown)', marginBottom: 4 }}>Escolha seu plano</h2>
              <p style={{ fontSize: 14, color: 'var(--color-warm-gray)', marginBottom: 24 }}>Quantas fotos você quer restaurar?</p>
              <div className="flex flex-col gap-3">
                {PLANS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedPlan(p.id)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '16px 20px', borderRadius: 'var(--radius-md)', textAlign: 'left', width: '100%',
                      border: selectedPlan === p.id ? '2px solid var(--color-amber)' : '1.5px solid var(--color-beige)',
                      backgroundColor: selectedPlan === p.id ? '#FEFBF5' : 'white',
                      cursor: 'pointer', transition: 'all 0.15s',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <div style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${selectedPlan === p.id ? 'var(--color-amber)' : 'var(--color-beige)'}`, backgroundColor: selectedPlan === p.id ? 'var(--color-amber)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {selectedPlan === p.id && <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'white' }} />}
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--color-brown)' }}>{p.name}</span>
                          {p.highlight && <span style={{ backgroundColor: 'var(--color-amber)', color: 'white', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 'var(--radius-full)' }}>Popular</span>}
                        </div>
                        <span style={{ fontSize: 13, color: 'var(--color-warm-gray)' }}>
                          {p.max_photos === 'unlimited' ? 'Fotos ilimitadas' : `${p.max_photos} foto${Number(p.max_photos) > 1 ? 's' : ''}`} · {p.description}
                        </span>
                      </div>
                    </div>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--color-amber)', flexShrink: 0, marginLeft: 12 }}>{p.price_label}</span>
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={handleNext}
                style={{ marginTop: 24, width: '100%', backgroundColor: 'var(--color-amber)', color: 'white', border: 'none', borderRadius: 'var(--radius-full)', padding: '14px', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}
                className="hover:opacity-90 transition-opacity">
                Continuar →
              </button>
            </div>
          )}

          {/* ── PASSO 1: Foto ── */}
          {step === 1 && (
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--color-brown)', marginBottom: 4 }}>Envie sua foto</h2>
              <p style={{ fontSize: 14, color: 'var(--color-warm-gray)', marginBottom: 24 }}>Quanto pior o estado da foto, mais impressionante fica o resultado.</p>

              {!file ? (
                <div {...getRootProps()} style={{
                  border: `2px dashed ${isDragActive ? 'var(--color-amber)' : 'var(--color-beige)'}`,
                  borderRadius: 'var(--radius-lg)', padding: 40, textAlign: 'center', cursor: 'pointer',
                  backgroundColor: isDragActive ? '#FEFBF5' : 'var(--color-cream)', transition: 'all 0.2s',
                }}>
                  <input {...getInputProps()} />
                  <div style={{ fontSize: 48, marginBottom: 12 }}>📷</div>
                  <p style={{ fontWeight: 700, fontSize: 15, color: 'var(--color-brown)', marginBottom: 6 }}>
                    {isDragActive ? 'Solte a foto aqui' : 'Clique ou arraste a foto aqui'}
                  </p>
                  <p style={{ fontSize: 13, color: 'var(--color-warm-gray)' }}>JPEG, PNG ou WEBP · máximo 20MB</p>
                  <div style={{ marginTop: 16, display: 'inline-flex', alignItems: 'center', gap: 6, backgroundColor: 'var(--color-amber)', color: 'white', borderRadius: 'var(--radius-full)', padding: '10px 24px', fontSize: 14, fontWeight: 700 }}>
                    <Upload className="h-4 w-4" />
                    Selecionar foto
                  </div>
                </div>
              ) : (
                <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--color-beige)', position: 'relative' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={preview!} alt="Preview da foto" style={{ width: '100%', maxHeight: 240, objectFit: 'cover' }} />
                  <button type="button" onClick={() => { setFile(null); setPreview(null) }}
                    style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(0,0,0,0.6)', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white' }}>
                    <X className="h-4 w-4" />
                  </button>
                  <div style={{ backgroundColor: 'var(--color-brown)', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <CheckCircle className="h-4 w-4" style={{ color: 'var(--color-sage)' }} />
                    <span style={{ fontSize: 13, color: 'var(--color-cream)' }}>{file.name}</span>
                  </div>
                </div>
              )}

              {error && (
                <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 8, backgroundColor: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 'var(--radius-md)', padding: '12px 16px', fontSize: 14, color: '#991B1B' }}>
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {error}
                </div>
              )}

              <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                <button type="button" onClick={() => { setError(null); setStep(0) }}
                  style={{ flex: 1, border: '1.5px solid var(--color-beige)', backgroundColor: 'transparent', borderRadius: 'var(--radius-full)', padding: '12px', fontSize: 14, fontWeight: 700, color: 'var(--color-brown)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  <ChevronLeft className="h-4 w-4" /> Voltar
                </button>
                <button type="button" onClick={handleNext}
                  style={{ flex: 2, backgroundColor: 'var(--color-amber)', color: 'white', border: 'none', borderRadius: 'var(--radius-full)', padding: '12px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
                  className="hover:opacity-90 transition-opacity">
                  Continuar →
                </button>
              </div>
            </div>
          )}

          {/* ── PASSO 2: Dados ── */}
          {step === 2 && (
            <form onSubmit={handleSubmit}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--color-brown)', marginBottom: 4 }}>Seus dados</h2>
              <p style={{ fontSize: 14, color: 'var(--color-warm-gray)', marginBottom: 24 }}>Para entregarmos sua foto restaurada.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { label: 'Nome completo', key: 'name', type: 'text', placeholder: 'Como posso te chamar?' },
                  { label: 'Email', key: 'email', type: 'email', placeholder: 'Para confirmar seu pedido' },
                  { label: 'WhatsApp (com DDD)', key: 'whatsapp', type: 'tel', placeholder: 'Ex: 11 99999-9999' },
                ].map((field) => (
                  <div key={field.key}>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: 'var(--color-brown)', marginBottom: 6 }}>{field.label}</label>
                    <input
                      type={field.type}
                      required
                      placeholder={field.placeholder}
                      value={form[field.key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      style={{ width: '100%', padding: '12px 16px', border: '1.5px solid var(--color-beige)', borderRadius: 'var(--radius-md)', fontSize: 14, color: 'var(--color-brown)', backgroundColor: 'white', outline: 'none', fontFamily: 'var(--font-body)' }}
                    />
                  </div>
                ))}
              </div>

              {/* Resumo do pedido */}
              <div style={{ marginTop: 24, backgroundColor: 'var(--color-paper)', borderRadius: 'var(--radius-md)', padding: '16px 20px' }}>
                <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--color-warm-gray)', marginBottom: 12 }}>Resumo do pedido</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 15, color: 'var(--color-brown)' }}>Plano {plan?.name}</p>
                    <p style={{ fontSize: 12, color: 'var(--color-warm-gray)' }}>{plan?.description}</p>
                  </div>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: 'var(--color-amber)' }}>{plan?.price_label}</p>
                </div>
                {file && (
                  <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--color-beige)', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <CheckCircle className="h-4 w-4" style={{ color: 'var(--color-sage)' }} />
                    <span style={{ fontSize: 13, color: 'var(--color-warm-gray)' }}>1 foto anexada</span>
                  </div>
                )}
              </div>

              {/* Garantias */}
              <div style={{ marginTop: 16, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                {[
                  { icon: Shield, text: 'Pagamento seguro' },
                  { icon: Lock, text: 'Seus dados protegidos' },
                  { icon: CheckCircle, text: 'Garantia de satisfação' },
                ].map((g) => (
                  <div key={g.text} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--color-warm-gray)' }}>
                    <g.icon className="h-3 w-3" style={{ color: 'var(--color-sage)' }} />
                    {g.text}
                  </div>
                ))}
              </div>

              {error && (
                <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 8, backgroundColor: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 'var(--radius-md)', padding: '12px 16px', fontSize: 14, color: '#991B1B' }}>
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {error}
                </div>
              )}

              <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                <button type="button" onClick={() => { setError(null); setStep(1) }}
                  style={{ flex: 1, border: '1.5px solid var(--color-beige)', backgroundColor: 'transparent', borderRadius: 'var(--radius-full)', padding: '14px', fontSize: 14, fontWeight: 700, color: 'var(--color-brown)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  <ChevronLeft className="h-4 w-4" /> Voltar
                </button>
                <button type="submit" disabled={loading}
                  style={{ flex: 2, backgroundColor: loading ? 'var(--color-beige)' : 'var(--color-amber)', color: 'white', border: 'none', borderRadius: 'var(--radius-full)', padding: '14px', fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer' }}>
                  {loading ? 'Aguarde...' : `Pagar ${plan?.price_label} →`}
                </button>
              </div>

              <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--color-warm-gray)', marginTop: 12 }}>
                Você será redirecionado para o pagamento seguro via Mercado Pago
              </p>
            </form>
          )}

        </div>
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
