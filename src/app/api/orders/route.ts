import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { MercadoPagoConfig, Preference } from 'mercadopago'
import { getPlan } from '@/lib/plans'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { customer_name, customer_email, customer_whatsapp, plan_id } = body

    if (!customer_name || !customer_email || !customer_whatsapp || !plan_id) {
      return NextResponse.json({ error: 'Campos obrigatórios ausentes' }, { status: 400 })
    }

    const plan = getPlan(plan_id)
    if (!plan) {
      return NextResponse.json({ error: 'Plano inválido' }, { status: 400 })
    }

    const supabase = await createAdminClient()

    // Cria o pedido no banco
    const { data: order, error } = await supabase
      .from('orders')
      .insert({
        customer_name,
        customer_email,
        customer_whatsapp,
        plan: plan_id,
        amount_cents: plan.price_cents,
        status: 'pending_payment',
      })
      .select()
      .single()

    if (error) throw error

    // Cria preferência de pagamento no Mercado Pago
    const mp = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN! })
    const preference = new Preference(mp)

    const preferenceData = await preference.create({
      body: {
        items: [
          {
            id: order.id,
            title: `Restauração de Fotos — Plano ${plan.name}`,
            quantity: 1,
            unit_price: plan.price_cents / 100,
            currency_id: 'BRL',
          },
        ],
        payer: {
          name: customer_name,
          email: customer_email,
        },
        payment_methods: {
          excluded_payment_types: [],
        },
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/sucesso?order_id=${order.id}`,
          failure: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/falha?order_id=${order.id}`,
          pending: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/pendente?order_id=${order.id}`,
        },
        auto_return: 'approved',
        external_reference: order.id,
        notification_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/mercadopago`,
      },
    })

    // Salva o ID da preferência no pedido
    await supabase
      .from('orders')
      .update({ mercadopago_preference_id: preferenceData.id })
      .eq('id', order.id)

    return NextResponse.json({
      order_id: order.id,
      checkout_url: preferenceData.init_point,
    })
  } catch (err) {
    console.error('Erro ao criar pedido:', err)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const supabase = await createAdminClient()
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return NextResponse.json(data)
  } catch (err) {
    console.error('Erro ao buscar pedidos:', err)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
