-- Track which fiscal deadlines a user has marked as completed
create table if not exists public.deadline_completions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  deadline_id text not null,
  completed_at timestamptz not null default now(),
  unique(user_id, deadline_id)
);

-- Enable RLS
alter table public.deadline_completions enable row level security;

-- Users can read their own completions
create policy "Users can read own completions" on public.deadline_completions
  for select
  to authenticated
  using (auth.uid() = user_id);

-- Users can insert their own completions
create policy "Users can insert own completions" on public.deadline_completions
  for insert
  to authenticated
  with check (auth.uid() = user_id);

-- Users can delete their own completions (uncheck)
create policy "Users can delete own completions" on public.deadline_completions
  for delete
  to authenticated
  using (auth.uid() = user_id);
