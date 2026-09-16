create table if not exists public.profiles(
 id uuid primary key references auth.users(id) on delete cascade,
 display_name text, credit_limit numeric(12,2) not null default 0,
 created_at timestamptz not null default now(),updated_at timestamptz not null default now()
);
create table if not exists public.transactions(
 id uuid primary key default gen_random_uuid(),user_id uuid not null references auth.users(id) on delete cascade,
 type text not null check(type in('income','expense')),description text not null,
 amount numeric(12,2) not null check(amount>0),date date not null,category text not null default 'Outros',
 payment_method text not null default 'pix' check(payment_method in('pix','credit_card')),
 installments integer not null default 1 check(installments between 1 and 6),note text default '',
 created_at timestamptz not null default now(),updated_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
alter table public.transactions enable row level security;
create policy "profiles own select" on public.profiles for select to authenticated using(auth.uid()=id);
create policy "profiles own insert" on public.profiles for insert to authenticated with check(auth.uid()=id);
create policy "profiles own update" on public.profiles for update to authenticated using(auth.uid()=id) with check(auth.uid()=id);
create policy "transactions own select" on public.transactions for select to authenticated using(auth.uid()=user_id);
create policy "transactions own insert" on public.transactions for insert to authenticated with check(auth.uid()=user_id);
create policy "transactions own update" on public.transactions for update to authenticated using(auth.uid()=user_id) with check(auth.uid()=user_id);
create policy "transactions own delete" on public.transactions for delete to authenticated using(auth.uid()=user_id);
grant select,insert,update on public.profiles to authenticated;
grant select,insert,update,delete on public.transactions to authenticated;
