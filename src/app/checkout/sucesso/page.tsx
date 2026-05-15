import { CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function CheckoutSucesso() {
  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl border border-zinc-200 p-8 max-w-md w-full text-center shadow-sm">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
        <h1 className="text-2xl font-bold mb-2">Pagamento confirmado!</h1>
        <p className="text-zinc-500 mb-6">
          Recebemos seu pedido. Vamos restaurar sua foto e enviar o resultado por WhatsApp em até 24h.
        </p>
        <p className="text-sm text-zinc-400 mb-6">
          Fique de olho no WhatsApp e no email que você cadastrou.
        </p>
        <Link
          href="/"
          className="inline-block rounded-full bg-amber-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-amber-700 transition-colors"
        >
          Voltar ao início
        </Link>
      </div>
    </div>
  )
}
