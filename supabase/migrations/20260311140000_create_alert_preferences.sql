-- Alert preferences table for email deadline alerts
-- Users can configure when they want to be notified about fiscal deadlines

create table public.alert_preferences (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  email_alerts_enabled boolean not null default true,
  alert_days_before integer[] not null default '{7, 3, 1}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint alert_preferences_user_id_unique unique (user_id)
);

-- Enable RLS
alter table public.alert_preferences enable row level security;

-- Users can only see their own preferences
create policy "Users can view own alert preferences"
  on public.alert_preferences for select
  using (auth.uid() = user_id);

-- Users can insert their own preferences
create policy "Users can insert own alert preferences"
  on public.alert_preferences for insert
  with check (auth.uid() = user_id);

-- Users can update their own preferences
create policy "Users can update own alert preferences"
  on public.alert_preferences for update
  using (auth.uid() = user_id);

-- Auto-update updated_at on changes
create or replace function public.handle_alert_preferences_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger on_alert_preferences_updated
  before update on public.alert_preferences
  for each row execute procedure public.handle_alert_preferences_updated_at();
