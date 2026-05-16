import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Reviver Memórias — Suas memórias merecem durar para sempre',
  description:
    'Restauramos fotos antigas e danificadas com carinho. Entrega em até 24h por WhatsApp. Pague via Pix. Garantia de satisfação.',
  keywords: 'restauração de fotos, restaurar foto antiga, colorização de fotos, foto danificada, memórias',
  openGraph: {
    title: 'Reviver Memórias',
    description: 'Suas memórias merecem durar para sempre.',
    locale: 'pt_BR',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}
