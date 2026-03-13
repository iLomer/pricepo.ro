-- Checklist progress tracking for guided fiscal checklists
create table if not exists public.checklist_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  checklist_id text not null,
  completed_steps jsonb default '[]'::jsonb not null,
  dismissed boolean default false not null,
  started_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,

  unique(user_id, checklist_id)
);

-- RLS: users can only access their own progress
alter table public.checklist_progress enable row level security;

create policy "Users can view own checklist progress"
  on public.checklist_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert own checklist progress"
  on public.checklist_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update own checklist progress"
  on public.checklist_progress for update
  using (auth.uid() = user_id);
