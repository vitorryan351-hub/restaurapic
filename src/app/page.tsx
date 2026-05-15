import Link from 'next/link'
import { CheckCircle, Clock, Star, Upload, Sparkles, Download } from 'lucide-react'
import { PLANS } from '@/lib/plans'
import { cn } from '@/lib/utils'

const BEFORE_AFTER = [
  { label: 'Foto desbotada dos anos 70', before: '/demos/demo1-before.jpg', after: '/demos/demo1-after.jpg' },
  { label: 'Foto rasgada em P&B', before: '/demos/demo2-before.jpg', after: '/demos/demo2-after.jpg' },
  { label: 'Colorização automática', before: '/demos/demo3-before.jpg', after: '/demos/demo3-after.jpg' },
]

const STEPS = [
  { icon: Upload, title: 'Faça o upload', desc: 'Envie sua foto pelo site. Aceitamos JPEG, PNG e WEBP até 20MB.' },
  { icon: Sparkles, title: 'Restauramos com IA', desc: 'Nossa equipe utiliza IA de última geração para restaurar cada detalhe.' },
  { icon: Download, title: 'Receba o resultado', desc: 'Em até 24h você recebe a foto restaurada por WhatsApp ou email.' },
]

const FAQS = [
  {
    q: 'Que tipos de dano vocês conseguem corrigir?',
    a: 'Arranhões, manchas, rasgos, desbotamento, perda de contraste, fotos P&B que podem ser colorizadas. Se a foto for muito danificada, analisamos caso a caso antes de cobrar.',
  },
  {
    q: 'Quanto tempo demora?',
    a: 'O prazo padrão é de até 48h. No plano Padrão e Premium a entrega é garantida em até 24h.',
  },
  {
    q: 'Como recebo a foto restaurada?',
    a: 'Enviamos por WhatsApp ou email, em alta resolução, pronta para imprimir.',
  },
  {
    q: 'Posso pagar via Pix?',
    a: 'Sim! Aceitamos Pix, cartão de crédito e débito. O Pix é processado instantaneamente.',
  },
  {
    q: 'O que acontece se eu não ficar satisfeito?',
    a: 'Oferecemos garantia de satisfação. Se o resultado não atender suas expectativas, refazemos sem custo adicional.',
  },
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-zinc-900">

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-zinc-100 bg-white/90 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <span className="text-xl font-bold tracking-tight">RestauraPic</span>
          <nav className="hidden md:flex gap-6 text-sm text-zinc-600">
            <a href="#como-funciona" className="hover:text-zinc-900">Como funciona</a>
            <a href="#exemplos" className="hover:text-zinc-900">Exemplos</a>
            <a href="#precos" className="hover:text-zinc-900">Preços</a>
            <a href="#faq" className="hover:text-zinc-900">FAQ</a>
          </nav>
          <Link
            href="/upload"
            className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white hover:bg-zinc-700 transition-colors"
          >
            Restaurar agora
          </Link>
        </div>
      </header>

      <main className="flex-1">

        {/* Hero */}
        <section className="py-20 px-4 text-center bg-gradient-to-b from-amber-50 to-white">
          <div className="mx-auto max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-1.5 text-sm font-medium text-amber-800">
              <Star className="h-4 w-4" />
              Mais de 500 memórias restauradas
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-6">
              Dê vida nova às suas<br />
              <span className="text-amber-600">memórias mais preciosas</span>
            </h1>
            <p className="text-lg text-zinc-600 mb-8 max-w-xl mx-auto">
              Restauramos fotos antigas, danificadas e desbotadas com inteligência artificial.
              Resultado profissional em até 24h, entregue por WhatsApp.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/upload"
                className="rounded-full bg-amber-600 px-8 py-3.5 text-base font-semibold text-white hover:bg-amber-700 transition-colors"
              >
                Restaurar minha foto
              </Link>
              <a
                href="#exemplos"
                className="rounded-full border border-zinc-200 px-8 py-3.5 text-base font-medium text-zinc-700 hover:bg-zinc-50 transition-colors"
              >
                Ver exemplos
              </a>
            </div>
            <p className="mt-4 text-sm text-zinc-500">
              Pague via Pix · Entrega em até 24h · Garantia de satisfação
            </p>
          </div>
        </section>

        {/* Como funciona */}
        <section id="como-funciona" className="py-20 px-4 bg-white">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold text-center mb-4">Como funciona</h2>
            <p className="text-center text-zinc-500 mb-12">Simples, rápido e sem complicação</p>
            <div className="grid md:grid-cols-3 gap-8">
              {STEPS.map((step, i) => (
                <div key={i} className="flex flex-col items-center text-center p-6">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100">
                    <step.icon className="h-7 w-7 text-amber-600" />
                  </div>
                  <div className="text-xs font-bold text-amber-600 mb-1">PASSO {i + 1}</div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Exemplos before/after */}
        <section id="exemplos" className="py-20 px-4 bg-zinc-50">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold text-center mb-4">Antes e Depois</h2>
            <p className="text-center text-zinc-500 mb-12">Resultados reais de restaurações feitas por nós</p>
            <div className="grid md:grid-cols-3 gap-6">
              {BEFORE_AFTER.map((item, i) => (
                <div key={i} className="rounded-2xl overflow-hidden border border-zinc-200 bg-white shadow-sm">
                  <div className="grid grid-cols-2">
                    <div className="relative bg-zinc-100 aspect-square flex items-center justify-center">
                      <span className="text-xs font-medium text-zinc-400 absolute top-2 left-2 bg-white/80 rounded px-1.5 py-0.5">Antes</span>
                      {/* Substituir por <Image> quando tiver as imagens reais */}
                      <div className="w-full h-full bg-gradient-to-br from-zinc-200 to-zinc-300" />
                    </div>
                    <div className="relative bg-amber-50 aspect-square flex items-center justify-center">
                      <span className="text-xs font-medium text-amber-700 absolute top-2 left-2 bg-white/80 rounded px-1.5 py-0.5">Depois</span>
                      <div className="w-full h-full bg-gradient-to-br from-amber-100 to-amber-200" />
                    </div>
                  </div>
                  <div className="p-3 text-center text-sm text-zinc-600">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Preços */}
        <section id="precos" className="py-20 px-4 bg-white">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold text-center mb-4">Planos e preços</h2>
            <p className="text-center text-zinc-500 mb-12">Escolha o plano ideal para o seu álbum</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {PLANS.map((plan) => (
                <div
                  key={plan.id}
                  className={cn(
                    'relative rounded-2xl border p-6 flex flex-col',
                    plan.highlight
                      ? 'border-amber-400 bg-amber-50 shadow-lg shadow-amber-100'
                      : 'border-zinc-200 bg-white'
                  )}
                >
                  {plan.highlight && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-white">
                      Mais popular
                    </span>
                  )}
                  <div className="mb-4">
                    <p className="font-semibold text-lg">{plan.name}</p>
                    <p className="text-zinc-500 text-sm">{plan.description}</p>
                  </div>
                  <div className="mb-6">
                    <span className="text-3xl font-bold">{plan.price_label}</span>
                    {plan.id !== 'avulso' && (
                      <span className="text-zinc-400 text-sm ml-1">/ pacote</span>
                    )}
                  </div>
                  <ul className="space-y-2 mb-6 flex-1">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-zinc-600">
                        <CheckCircle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/upload?plan=${plan.id}`}
                    className={cn(
                      'rounded-full py-2.5 text-sm font-semibold text-center transition-colors',
                      plan.highlight
                        ? 'bg-amber-500 text-white hover:bg-amber-600'
                        : 'bg-zinc-900 text-white hover:bg-zinc-700'
                    )}
                  >
                    Escolher plano
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-16 px-4 bg-zinc-50">
          <div className="mx-auto max-w-4xl text-center">
            <div className="grid grid-cols-3 gap-6">
              {[
                { value: '500+', label: 'Fotos restauradas' },
                { value: '24h', label: 'Prazo de entrega' },
                { value: '100%', label: 'Satisfação garantida' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-4xl font-bold text-amber-600">{stat.value}</p>
                  <p className="text-zinc-500 text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 px-4 bg-white">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold text-center mb-12">Perguntas frequentes</h2>
            <div className="space-y-6">
              {FAQS.map((item, i) => (
                <div key={i} className="border-b border-zinc-100 pb-6">
                  <h3 className="font-semibold mb-2">{item.q}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 px-4 bg-amber-600 text-white text-center">
          <div className="mx-auto max-w-xl">
            <h2 className="text-3xl font-bold mb-4">Pronto para restaurar suas memórias?</h2>
            <p className="text-amber-100 mb-8">
              Envie sua foto agora e receba o resultado em até 24h.
            </p>
            <Link
              href="/upload"
              className="inline-block rounded-full bg-white px-8 py-3.5 text-base font-semibold text-amber-700 hover:bg-amber-50 transition-colors"
            >
              Começar agora
            </Link>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-100 py-8 px-4 text-center text-sm text-zinc-400">
        <p>© 2025 RestauraPic. Feito com carinho para preservar memórias.</p>
        <div className="mt-2 flex justify-center gap-4">
          <a href="/privacidade" className="hover:text-zinc-600">Privacidade</a>
          <a href="/termos" className="hover:text-zinc-600">Termos de uso</a>
        </div>
      </footer>

    </div>
  )
}
