import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    const order_id = formData.get('order_id') as string
    const type = (formData.get('type') as string) || 'original' // 'original' | 'restored'

    if (!file || !order_id) {
      return NextResponse.json({ error: 'Arquivo e order_id são obrigatórios' }, { status: 400 })
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: 'Formato inválido. Use JPEG, PNG ou WEBP' }, { status: 400 })
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'Arquivo muito grande. Máximo 10MB' }, { status: 400 })
    }

    const supabase = await createAdminClient()
    const bucket = type === 'restored' ? 'restored-photos' : 'original-photos'
    const ext = file.name.split('.').pop()
    const path = `${order_id}/${type}-${Date.now()}.${ext}`

    const bytes = await file.arrayBuffer()
    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(path, bytes, { contentType: file.type, upsert: true })

    if (uploadError) throw uploadError

    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(path)
    const photo_url = type === 'restored'
      ? urlData.publicUrl
      : path // fotos originais ficam privadas, guardamos só o path

    // Atualiza o pedido com a URL da foto
    const field = type === 'restored' ? 'restored_photo_url' : 'original_photo_url'
    await supabase.from('orders').update({ [field]: photo_url }).eq('id', order_id)

    return NextResponse.json({ url: photo_url })
  } catch (err) {
    console.error('Erro no upload:', err)
    return NextResponse.json({ error: 'Erro ao fazer upload' }, { status: 500 })
  }
}
