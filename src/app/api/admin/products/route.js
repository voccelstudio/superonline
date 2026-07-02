import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export async function GET() {
  const supabase = createClient()
  const { data: products, error } = await supabase
    .from('admin_products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ products })
}

export async function POST(request) {
  const supabase = createClient()
  const { name, description, price, category, image, features, stock } = await request.json()

  if (!name || !price) {
    return NextResponse.json({ error: 'Nombre y precio requeridos' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('admin_products')
    .insert({ name, description, price, category, image, features: features || [], stock: stock || -1 })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ product: data }, { status: 201 })
}

export async function PUT(request) {
  const supabase = createClient()
  const { id, ...updates } = await request.json()

  const { data, error } = await supabase
    .from('admin_products')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ product: data })
}

export async function DELETE(request) {
  const supabase = createClient()
  const { id } = await request.json()

  const { error } = await supabase
    .from('admin_products')
    .delete()
    .eq('id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
