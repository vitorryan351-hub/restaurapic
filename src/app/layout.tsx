import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RestauraPic — Restaure Suas Memórias',
  description:
    'Restauração profissional de fotos antigas e danificadas com IA. Resultados em até 24h. Pague via Pix.',
  keywords: 'restauração de fotos, restaurar foto antiga, restaurar foto danificada, colorização de fotos',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className={`${geist.className} min-h-full flex flex-col`}>{children}</body>
    </html>
  )
}
