import { XCircle } from 'lucide-react'
import Link from 'next/link'

export default function CheckoutFalha() {
  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl border border-zinc-200 p-8 max-w-md w-full text-center shadow-sm">
        <XCircle className="mx-auto h-16 w-16 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold mb-2">Pagamento não aprovado</h1>
        <p className="text-zinc-500 mb-6">
          Houve um problema com o seu pagamento. Você pode tentar novamente ou escolher outra forma de pagamento.
        </p>
        <Link
          href="/upload"
          className="inline-block rounded-full bg-amber-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-amber-700 transition-colors"
        >
          Tentar novamente
        </Link>
      </div>
    </div>
  )
}
