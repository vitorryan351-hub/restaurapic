import Link from 'next/link'
import { CheckCircle, Shield, Star, Clock, Heart, MessageCircle, Upload, Sparkles, Download } from 'lucide-react'
import { PLANS } from '@/lib/plans'
import { waLink } from '@/lib/whatsapp'

const STEPS = [
  {
    icon: MessageCircle,
    step: '01',
    title: 'Fale com a gente',
    desc: 'Mande uma mensagem no WhatsApp. É simples — do mesmo jeito que você já faz com amigos e família.',
  },
  {
    icon: Upload,
    step: '02',
    title: 'Envie a foto',
    desc: 'Tire uma foto da imagem ou mande o arquivo pelo próprio WhatsApp. Nossa equipe cuida do resto.',
  },
  {
    icon: Download,
    step: '03',
    title: 'Receba restaurada',
    desc: 'Em até 24h, a foto restaurada chega de volta no seu WhatsApp — pronta para imprimir e guardar.',
  },
]

const TESTIMONIALS = [
  {
    name: 'Ana Claudia M.',
    city: 'São Paulo, SP',
    text: 'Encontrei uma foto da minha avó que parecia perdida para sempre. Vocês devolveram ela como nova. Chorei de emoção quando recebi.',
    stars: 5,
    photo: '👵',
  },
  {
    name: 'Roberto S.',
    city: 'Belo Horizonte, MG',
    text: 'A foto do casamento dos meus pais, de 1972, estava completamente desbotada. O resultado ficou incrível. Vou imprimir e emoldurar.',
    stars: 5,
    photo: '👨',
  },
  {
    name: 'Fernanda L.',
    city: 'Porto Alegre, RS',
    text: 'Rápido, cuidadoso e com um resultado que superou tudo que eu esperava. Minha mãe não acreditou quando viu a foto restaurada.',
    stars: 5,
    photo: '👩',
  },
]

const FAQS = [
  {
    q: 'Como faço para enviar minha foto?',
    a: 'É simples! Clique no botão de WhatsApp, mande uma mensagem e envie a foto pelo próprio aplicativo — do mesmo jeito que você manda foto para um familiar.',
  },
  {
    q: 'Que tipos de dano vocês conseguem corrigir?',
    a: 'Arranhões, manchas, rasgos, desbotamento e fotos em preto e branco que podem ser colorizadas. Se a foto estiver muito danificada, avaliamos antes de cobrar qualquer coisa.',
  },
  {
    q: 'Como faço o pagamento?',
    a: 'Após aprovar o serviço, enviamos a chave Pix ou link de pagamento diretamente pelo WhatsApp. Aceitamos também cartão de crédito e débito.',
  },
  {
    q: 'Em quanto tempo recebo a foto?',
    a: 'O prazo é de até 24h após a confirmação do pagamento. A foto restaurada chega direto no seu WhatsApp, em alta resolução.',
  },
  {
    q: 'E se eu não ficar satisfeito?',
    a: 'Refazemos sem custo adicional até você ficar satisfeito. Sua memória importa demais para entregarmos algo abaixo das suas expectativas.',
  },
]

const WA_BUTTON_STYLE = {
  backgroundColor: '#25D366',
  color: 'white',
  borderRadius: 'var(--radius-full)',
  padding: '16px 36px',
  fontSize: 18,
  fontWeight: 700,
  display: 'inline-flex',
  alignItems: 'center',
  gap: 10,
  boxShadow: '0 4px 24px rgba(37,211,102,0.35)',
  textDecoration: 'none',
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: 'var(--color-cream)', color: 'var(--color-brown)' }}>

      {/* ── NAVBAR ── */}
      <header style={{ borderBottom: '1px solid var(--color-beige)', backgroundColor: 'rgba(250,246,240,0.95)', backdropFilter: 'blur(8px)' }} className="sticky top-0 z-50">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div style={{ width: 36, height: 36, border: '2px solid var(--color-amber)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-amber)', fontSize: 18 }}>♡</div>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700 }}>
              Reviver <span style={{ color: 'var(--color-amber)' }}>Memórias</span>
            </span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm" style={{ color: 'var(--color-warm-gray)' }}>
            <a href="#como-funciona" className="hover:opacity-80 transition-opacity">Como funciona</a>
            <a href="#precos" className="hover:opacity-80 transition-opacity">Preços</a>
            <a href="#depoimentos" className="hover:opacity-80 transition-opacity">Depoimentos</a>
            <a href="#faq" className="hover:opacity-80 transition-opacity">Dúvidas</a>
          </nav>
          <a href={waLink('default')} target="_blank" rel="noreferrer"
            style={{ backgroundColor: '#25D366', color: 'white', borderRadius: 'var(--radius-full)', padding: '10px 20px', fontSize: 14, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 7, textDecoration: 'none' }}
            className="hover:opacity-90 transition-opacity">
            <MessageCircle className="h-4 w-4" />
            Falar no WhatsApp
          </a>
        </div>
      </header>

      <main className="flex-1">

        {/* ── HERO ── */}
        <section style={{ background: 'linear-gradient(160deg, #F0E8D8 0%, var(--color-cream) 60%)', paddingTop: 72, paddingBottom: 80 }}>
          <div className="mx-auto max-w-5xl px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 mb-6"
                  style={{ background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: 'var(--radius-full)', padding: '6px 16px' }}>
                  <Heart className="h-4 w-4" style={{ color: '#16A34A' }} />
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#15803D' }}>+ de 500 memórias restauradas</span>
                </div>

                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(34px, 5vw, 54px)', fontWeight: 700, lineHeight: 1.15, marginBottom: 20 }}>
                  Devolva a vida às suas<br />
                  <span style={{ color: 'var(--color-amber)' }}>memórias mais preciosas</span>
                </h1>

                <p style={{ fontSize: 18, lineHeight: 1.75, color: 'var(--color-warm-gray)', marginBottom: 12, maxWidth: 440 }}>
                  Restauramos fotos antigas e danificadas com carinho.
                </p>
                <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--color-warm-gray)', marginBottom: 32, maxWidth: 440 }}>
                  É simples: <strong style={{ color: 'var(--color-brown)' }}>mande uma mensagem no WhatsApp</strong>, envie a foto e receba o resultado em até 24h.
                </p>

                {/* CTA WhatsApp */}
                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                  <a href={waLink('default')} target="_blank" rel="noreferrer"
                    style={{ ...WA_BUTTON_STYLE, fontSize: 16 }}
                    className="hover:opacity-90 transition-opacity">
                    <MessageCircle className="h-5 w-5" />
                    Chamar no WhatsApp
                  </a>
                  <a href="#precos"
                    style={{ border: '1.5px solid var(--color-beige)', borderRadius: 'var(--radius-full)', padding: '16px 28px', fontSize: 16, color: 'var(--color-brown)', textAlign: 'center', textDecoration: 'none' }}
                    className="hover:opacity-80 transition-opacity">
                    Ver preços
                  </a>
                </div>

                <div className="flex flex-wrap gap-4">
                  {[
                    { icon: Shield, text: 'Garantia de satisfação' },
                    { icon: Clock, text: 'Entrega em até 24h' },
                    { icon: Star, text: 'Pague via Pix' },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" style={{ color: 'var(--color-amber)' }} />
                      <span style={{ fontSize: 13, color: 'var(--color-warm-gray)' }}>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Before/After */}
              <div style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: '0 20px 60px rgba(61,43,31,0.15)', border: '1px solid var(--color-beige)' }}>
                <div className="grid grid-cols-2" style={{ minHeight: 300 }}>
                  <div style={{ background: 'linear-gradient(135deg, #8a7060, #6b5040)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 16 }}>
                    <span style={{ background: 'rgba(0,0,0,0.5)', color: 'white', fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', padding: '4px 10px', borderRadius: 4, alignSelf: 'flex-start' }}>Antes</span>
                    <div style={{ textAlign: 'center', fontSize: 56, opacity: 0.3 }}>🖼️</div>
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>Foto danificada</span>
                  </div>
                  <div style={{ background: 'linear-gradient(135deg, #d4b896, #c49a6c)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 16 }}>
                    <span style={{ background: 'rgba(181,101,29,0.85)', color: 'white', fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', padding: '4px 10px', borderRadius: 4, alignSelf: 'flex-end' }}>Depois</span>
                    <div style={{ textAlign: 'center', fontSize: 56 }}>🖼️</div>
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', textAlign: 'center' }}>Memória restaurada</span>
                  </div>
                </div>
                <div style={{ background: 'var(--color-brown)', padding: '14px 20px', textAlign: 'center' }}>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontStyle: 'italic', color: 'var(--color-beige)' }}>
                    "Parecia impossível. Ficou perfeita."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section style={{ backgroundColor: 'var(--color-amber)', padding: '28px 0' }}>
          <div className="mx-auto max-w-4xl px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { value: '500+', label: 'Fotos restauradas' },
                { value: '24h', label: 'Prazo de entrega' },
                { value: '100%', label: 'Satisfação garantida' },
                { value: '4.9★', label: 'Avaliação média' },
              ].map((s) => (
                <div key={s.label}>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 700, color: 'white', lineHeight: 1 }}>{s.value}</p>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', marginTop: 4 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── COMO FUNCIONA ── */}
        <section id="como-funciona" style={{ padding: '80px 0', backgroundColor: 'var(--color-cream)' }}>
          <div className="mx-auto max-w-5xl px-4">
            <div className="text-center mb-12">
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--color-amber)', marginBottom: 12 }}>Simples assim</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,40px)', fontWeight: 700, marginBottom: 12 }}>Como funciona</h2>
              <p style={{ color: 'var(--color-warm-gray)', fontSize: 16, maxWidth: 460, margin: '0 auto' }}>
                Tudo pelo WhatsApp — sem cadastro, sem formulário, sem complicação.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {STEPS.map((step, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div style={{ width: 72, height: 72, borderRadius: 'var(--radius-full)', backgroundColor: '#F0FFF4', border: '2px solid #86EFAC', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, position: 'relative' }}>
                    <step.icon className="h-7 w-7" style={{ color: '#16A34A' }} />
                    <span style={{ position: 'absolute', top: -8, right: -8, width: 24, height: 24, borderRadius: '50%', backgroundColor: 'var(--color-amber)', color: 'white', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{step.title}</h3>
                  <p style={{ fontSize: 15, color: 'var(--color-warm-gray)', lineHeight: 1.65 }}>{step.desc}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <a href={waLink('default')} target="_blank" rel="noreferrer"
                style={{ ...WA_BUTTON_STYLE }}
                className="hover:opacity-90 transition-opacity">
                <MessageCircle className="h-5 w-5" />
                Quero restaurar minha foto
              </a>
              <p style={{ fontSize: 13, color: 'var(--color-warm-gray)', marginTop: 12 }}>
                Abre o WhatsApp direto — sem precisar salvar o número
              </p>
            </div>
          </div>
        </section>

        {/* ── PREÇOS ── */}
        <section id="precos" style={{ padding: '80px 0', backgroundColor: 'var(--color-paper)' }}>
          <div className="mx-auto max-w-5xl px-4">
            <div className="text-center mb-12">
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--color-amber)', marginBottom: 12 }}>Transparência total</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,40px)', fontWeight: 700, marginBottom: 12 }}>Planos e preços</h2>
              <p style={{ color: 'var(--color-warm-gray)', fontSize: 16 }}>Sem surpresas. O preço que você vê é o que você paga.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {PLANS.map((plan) => (
                <div key={plan.id} style={{
                  backgroundColor: plan.highlight ? '#FEFBF5' : 'white',
                  border: plan.highlight ? '2px solid var(--color-amber-light)' : '1px solid var(--color-beige)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '28px 20px',
                  display: 'flex', flexDirection: 'column',
                  position: 'relative',
                  boxShadow: plan.highlight ? '0 8px 32px rgba(181,101,29,0.12)' : '0 1px 4px rgba(61,43,31,0.06)',
                }}>
                  {plan.highlight && (
                    <span style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', backgroundColor: 'var(--color-amber)', color: 'white', fontSize: 11, fontWeight: 700, padding: '4px 14px', borderRadius: 'var(--radius-full)', whiteSpace: 'nowrap' }}>
                      ★ Mais popular
                    </span>
                  )}
                  <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{plan.name}</p>
                  <p style={{ fontSize: 12, color: 'var(--color-warm-gray)', marginBottom: 12 }}>{plan.description}</p>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700, color: 'var(--color-amber)', marginBottom: 20 }}>{plan.price_label}</p>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24, flex: 1 }}>
                    {plan.features.map((f, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13 }}>
                        <CheckCircle className="h-4 w-4 shrink-0 mt-0.5" style={{ color: 'var(--color-sage)' }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href={waLink(plan.id as any)} target="_blank" rel="noreferrer"
                    style={{ backgroundColor: '#25D366', color: 'white', borderRadius: 'var(--radius-full)', padding: '11px 0', fontSize: 14, fontWeight: 700, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, textDecoration: 'none' }}
                    className="hover:opacity-90 transition-opacity">
                    <MessageCircle className="h-4 w-4" />
                    Pedir pelo WhatsApp
                  </a>
                </div>
              ))}
            </div>

            {/* Garantia */}
            <div style={{ marginTop: 28, backgroundColor: 'var(--color-brown)', borderRadius: 'var(--radius-lg)', padding: '24px 32px', display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
              <Shield className="h-8 w-8 shrink-0" style={{ color: 'var(--color-amber-light)' }} />
              <div>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'white', marginBottom: 4 }}>Garantia de satisfação total</p>
                <p style={{ fontSize: 14, color: 'var(--color-beige)' }}>Se o resultado não atender suas expectativas, refazemos sem custo adicional. Sem burocracia, sem prazo.</p>
              </div>
            </div>

            {/* Link alternativo para quem prefere o site */}
            <p className="text-center mt-6" style={{ fontSize: 13, color: 'var(--color-warm-gray)' }}>
              Prefere fazer pelo site?{' '}
              <Link href="/upload" style={{ color: 'var(--color-amber)', textDecoration: 'underline' }}>
                Clique aqui para usar o formulário online
              </Link>
            </p>
          </div>
        </section>

        {/* ── DEPOIMENTOS ── */}
        <section id="depoimentos" style={{ padding: '80px 0', backgroundColor: 'var(--color-cream)' }}>
          <div className="mx-auto max-w-5xl px-4">
            <div className="text-center mb-12">
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--color-amber)', marginBottom: 12 }}>Quem já reviveu</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,40px)', fontWeight: 700 }}>O que nossos clientes dizem</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t, i) => (
                <div key={i} style={{ backgroundColor: 'white', border: '1px solid var(--color-beige)', borderRadius: 'var(--radius-lg)', padding: 28, boxShadow: '0 1px 4px rgba(61,43,31,0.06)' }}>
                  <div style={{ display: 'flex', gap: 2, marginBottom: 16 }}>
                    {Array.from({ length: t.stars }).map((_, s) => (
                      <span key={s} style={{ color: 'var(--color-amber-light)', fontSize: 14 }}>★</span>
                    ))}
                  </div>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontStyle: 'italic', color: 'var(--color-brown)', lineHeight: 1.6, marginBottom: 20 }}>
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderTop: '1px solid var(--color-paper)', paddingTop: 16 }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: 'var(--color-paper)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{t.photo}</div>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: 14 }}>{t.name}</p>
                      <p style={{ fontSize: 12, color: 'var(--color-warm-gray)' }}>{t.city}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" style={{ padding: '80px 0', backgroundColor: 'var(--color-paper)' }}>
          <div className="mx-auto max-w-2xl px-4">
            <div className="text-center mb-12">
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--color-amber)', marginBottom: 12 }}>Tire suas dúvidas</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,40px)', fontWeight: 700 }}>Perguntas frequentes</h2>
            </div>
            <div>
              {FAQS.map((item, i) => (
                <div key={i} style={{ borderBottom: '1px solid var(--color-beige)', padding: '24px 0' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, marginBottom: 10 }}>{item.q}</h3>
                  <p style={{ fontSize: 15, color: 'var(--color-warm-gray)', lineHeight: 1.7 }}>{item.a}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <p style={{ fontSize: 15, color: 'var(--color-warm-gray)', marginBottom: 16 }}>Ainda tem dúvida? É só chamar.</p>
              <a href={waLink('duvida')} target="_blank" rel="noreferrer"
                style={{ ...WA_BUTTON_STYLE, fontSize: 15 }}
                className="hover:opacity-90 transition-opacity">
                <MessageCircle className="h-5 w-5" />
                Tirar dúvida no WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section style={{ padding: '80px 0', backgroundColor: 'var(--color-brown)', textAlign: 'center' }}>
          <div className="mx-auto max-w-xl px-4">
            <div style={{ fontSize: 48, marginBottom: 16 }}>♡</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,40px)', fontWeight: 700, color: 'white', marginBottom: 16 }}>
              Sua memória merece uma segunda chance
            </h2>
            <p style={{ fontSize: 16, color: 'var(--color-beige)', marginBottom: 32, lineHeight: 1.75 }}>
              É só mandar uma mensagem. A gente cuida de tudo — você só precisa ter a foto.
            </p>
            <a href={waLink('default')} target="_blank" rel="noreferrer"
              style={{ ...WA_BUTTON_STYLE, fontSize: 18 }}
              className="hover:opacity-90 transition-opacity">
              <MessageCircle className="h-6 w-6" />
              Chamar no WhatsApp agora
            </a>
            <p style={{ fontSize: 13, color: 'var(--color-warm-gray)', marginTop: 16 }}>
              Resposta rápida · Pague via Pix · Garantia de satisfação
            </p>
          </div>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: '1px solid var(--color-beige)', padding: '40px 0', backgroundColor: 'var(--color-cream)', textAlign: 'center' }}>
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div style={{ width: 32, height: 32, border: '2px solid var(--color-amber)', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-amber)', fontSize: 16 }}>♡</div>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700 }}>
              Reviver <span style={{ color: 'var(--color-amber)' }}>Memórias</span>
            </span>
          </div>
          <p style={{ fontSize: 13, color: 'var(--color-warm-gray)', marginBottom: 12 }}>Suas memórias merecem durar para sempre.</p>
          <div className="flex justify-center gap-6 mb-6" style={{ fontSize: 13, color: 'var(--color-warm-gray)' }}>
            <a href="/privacidade" className="hover:opacity-70 transition-opacity">Privacidade</a>
            <a href="/termos" className="hover:opacity-70 transition-opacity">Termos de uso</a>
            <Link href="/upload" className="hover:opacity-70 transition-opacity">Formulário online</Link>
          </div>
          <a href={waLink('default')} target="_blank" rel="noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 7, backgroundColor: '#25D366', color: 'white', borderRadius: 'var(--radius-full)', padding: '10px 22px', fontSize: 14, fontWeight: 700, textDecoration: 'none', marginBottom: 20 }}
            className="hover:opacity-90 transition-opacity">
            <MessageCircle className="h-4 w-4" /> (49) 93381-9365
          </a>
          <p style={{ fontSize: 12, color: 'var(--color-beige)' }}>© 2025 Reviver Memórias. Feito com carinho.</p>
        </div>
      </footer>

    </div>
  )
}
