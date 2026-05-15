export type OrderStatus =
  | 'pending_payment'
  | 'paid'
  | 'processing'
  | 'completed'
  | 'cancelled'

export type PlanType = 'basic' | 'standard' | 'premium' | 'avulso'

export interface Order {
  id: string
  created_at: string
  updated_at: string
  customer_name: string
  customer_email: string
  customer_whatsapp: string
  plan: PlanType
  amount_cents: number
  status: OrderStatus
  original_photo_url: string | null
  restored_photo_url: string | null
  notes: string | null
  payment_id: string | null
  mercadopago_preference_id: string | null
}

export interface Profile {
  id: string
  email: string
  full_name: string | null
  whatsapp: string | null
  credits: number
  plan: PlanType | null
  created_at: string
}

export interface Plan {
  id: PlanType
  name: string
  price_cents: number
  price_label: string
  description: string
  features: string[]
  highlight?: boolean
  max_photos: number | 'unlimited'
}
