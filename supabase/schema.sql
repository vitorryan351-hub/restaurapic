-- =============================================
-- Tabela de perfis de usuários
-- =============================================
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  whatsapp text,
  credits int not null default 0,
  plan text,
  created_at timestamptz not null default now()
);

alter table profiles enable row level security;

drop policy if exists "Usuário vê apenas o próprio perfil" on profiles;
drop policy if exists "Usuário atualiza apenas o próprio perfil" on profiles;

create policy "Usuário vê apenas o próprio perfil"
  on profiles for select using (auth.uid() = id);

create policy "Usuário atualiza apenas o próprio perfil"
  on profiles for update using (auth.uid() = id);

-- Cria perfil automaticamente ao criar usuário
create or replace function handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- =============================================
-- Tabela de pedidos
-- =============================================
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  -- Dados do cliente
  customer_name text not null,
  customer_email text not null,
  customer_whatsapp text not null,

  -- Plano e valor
  plan text not null,
  amount_cents int not null,

  -- Status do pedido
  status text not null default 'pending_payment',

  -- Fotos
  original_photo_url text,
  restored_photo_url text,

  -- Notas internas (admin)
  notes text,

  -- Pagamento
  payment_id text,
  mercadopago_preference_id text,

  -- Relacionamento com usuário (opcional)
  user_id uuid references profiles(id) on delete set null
);

alter table orders enable row level security;

drop policy if exists "Cliente vê seus pedidos" on orders;
drop policy if exists "Service role tem acesso total" on orders;

-- Cliente vê apenas seus próprios pedidos (por email)
create policy "Cliente vê seus pedidos"
  on orders for select using (
    customer_email = (select email from profiles where id = auth.uid())
  );

-- Service role tem acesso total (para API routes)
create policy "Service role tem acesso total"
  on orders using (auth.role() = 'service_role');

-- Atualiza updated_at automaticamente
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace trigger orders_updated_at
  before update on orders
  for each row execute procedure set_updated_at();

-- =============================================
-- Storage Buckets
-- =============================================

-- Bucket para fotos originais (private)
insert into storage.buckets (id, name, public)
values ('original-photos', 'original-photos', false)
on conflict do nothing;

-- Bucket para fotos restauradas (public para entrega via link)
insert into storage.buckets (id, name, public)
values ('restored-photos', 'restored-photos', true)
on conflict do nothing;

-- Policy: apenas service_role faz upload de fotos
drop policy if exists "Service role gerencia fotos originais" on storage.objects;
drop policy if exists "Service role gerencia fotos restauradas" on storage.objects;
drop policy if exists "Fotos restauradas são públicas" on storage.objects;

create policy "Service role gerencia fotos originais"
  on storage.objects for all
  using (bucket_id = 'original-photos' and auth.role() = 'service_role');

create policy "Service role gerencia fotos restauradas"
  on storage.objects for all
  using (bucket_id = 'restored-photos' and auth.role() = 'service_role');

-- Policy: leitura pública das fotos restauradas
create policy "Fotos restauradas são públicas"
  on storage.objects for select
  using (bucket_id = 'restored-photos');
