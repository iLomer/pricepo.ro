-- Registru incasari si plati (income & expense ledger)
-- Tracks all transactions per user for fiscal record keeping

create table public.transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  type text not null check (type in ('incasare', 'plata')),
  amount numeric(12,2) not null check (amount > 0),
  description text not null,
  category text,
  document_number text,
  transaction_date date not null default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Index for fast user lookups sorted by date
create index transactions_user_date_idx on public.transactions (user_id, transaction_date desc);

-- Enable RLS
alter table public.transactions enable row level security;

-- Users can only see their own transactions
create policy "Users can view own transactions"
  on public.transactions for select
  using (auth.uid() = user_id);

-- Users can insert their own transactions
create policy "Users can insert own transactions"
  on public.transactions for insert
  with check (auth.uid() = user_id);

-- Users can update their own transactions
create policy "Users can update own transactions"
  on public.transactions for update
  using (auth.uid() = user_id);

-- Users can delete their own transactions
create policy "Users can delete own transactions"
  on public.transactions for delete
  using (auth.uid() = user_id);

-- Auto-update updated_at
create or replace function public.handle_transactions_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger on_transactions_updated
  before update on public.transactions
  for each row execute procedure public.handle_transactions_updated_at();
