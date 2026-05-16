const NUMBER = '5549933819365'

export const WA_MESSAGES = {
  default:
    'Olá! Vim pelo site Reviver Memórias e gostaria de restaurar uma foto. 😊',
  avulso:
    'Olá! Vim pelo site e tenho interesse em restaurar 1 foto (Plano Avulso - R$ 14,90). Podem me ajudar?',
  basic:
    'Olá! Vim pelo site e tenho interesse no Plano Básico (5 fotos - R$ 39,90). Podem me ajudar?',
  standard:
    'Olá! Vim pelo site e tenho interesse no Plano Padrão (15 fotos - R$ 69,90). Podem me ajudar?',
  premium:
    'Olá! Vim pelo site e tenho interesse no Plano Premium (40 fotos - R$ 119,90). Podem me ajudar?',
  duvida:
    'Olá! Vim pelo site Reviver Memórias e gostaria de tirar uma dúvida antes de fazer meu pedido.',
}

export function waLink(msg: keyof typeof WA_MESSAGES = 'default'): string {
  return `https://wa.me/${NUMBER}?text=${encodeURIComponent(WA_MESSAGES[msg])}`
}
