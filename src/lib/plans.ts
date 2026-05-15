import { Plan } from '@/types'

export const PLANS: Plan[] = [
  {
    id: 'avulso',
    name: 'Avulso',
    price_cents: 1490,
    price_label: 'R$ 14,90',
    description: 'Ideal para quem tem poucas fotos',
    features: [
      '1 foto restaurada',
      'Entrega em até 48h',
      'Remoção de arranhões e manchas',
      'Envio por WhatsApp ou email',
    ],
    max_photos: 1,
  },
  {
    id: 'basic',
    name: 'Básico',
    price_cents: 3990,
    price_label: 'R$ 39,90',
    description: 'Para restaurar um álbum pequeno',
    features: [
      '5 fotos restauradas',
      'Entrega em até 48h',
      'Remoção de arranhões e manchas',
      'Melhoria de nitidez',
      'Envio por WhatsApp ou email',
    ],
    max_photos: 5,
  },
  {
    id: 'standard',
    name: 'Padrão',
    price_cents: 6990,
    price_label: 'R$ 69,90',
    description: 'O favorito dos nossos clientes',
    features: [
      '15 fotos restauradas',
      'Entrega em até 24h',
      'Remoção de arranhões e manchas',
      'Melhoria de nitidez e resolução',
      'Colorização de fotos P&B',
      'Envio por WhatsApp ou email',
    ],
    highlight: true,
    max_photos: 15,
  },
  {
    id: 'premium',
    name: 'Premium',
    price_cents: 11990,
    price_label: 'R$ 119,90',
    description: 'Para álbuns completos',
    features: [
      '40 fotos restauradas',
      'Entrega em até 24h',
      'Remoção de arranhões e manchas',
      'Melhoria de nitidez e resolução 4x',
      'Colorização de fotos P&B',
      'Suporte prioritário',
      'Envio por WhatsApp ou email',
    ],
    max_photos: 40,
  },
]

export function getPlan(id: string): Plan | undefined {
  return PLANS.find((p) => p.id === id)
}
