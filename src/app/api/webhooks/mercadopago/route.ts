import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { MercadoPagoConfig, Payment } from 'mercadopago'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Ignora notificações que não sejam de pagamento
    if (body.type !== 'payment') {
      return NextResponse.json({ ok: true })
    }

    const mp = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN! })
    const paymentClient = new Payment(mp)
    const payment = await paymentClient.get({ id: body.data.id })

    if (!payment || !payment.external_reference) {
      return NextResponse.json({ ok: true })
    }

    const order_id = payment.external_reference
    const supabase = await createAdminClient()

    let new_status: string | null = null

    if (payment.status === 'approved') {
      new_status = 'paid'
    } else if (payment.status === 'rejected' || payment.status === 'cancelled') {
      new_status = 'cancelled'
    }

    if (new_status) {
      await supabase
        .from('orders')
        .update({
          status: new_status,
          payment_id: String(payment.id),
        })
        .eq('id', order_id)
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Erro no webhook:', err)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
