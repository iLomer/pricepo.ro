# Supabase Production Project Setup

Checklist for setting up the production Supabase project for Fiskio (pricepo.ro).

## 1. Create Production Project

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Settings:
   - **Name:** fiskio-production
   - **Database Password:** generate a strong password and store securely
   - **Region:** EU West (Frankfurt) -- closest to Romanian users
   - **Plan:** Free tier for launch, upgrade as needed
4. Wait for project to finish provisioning

## 2. Record Credentials

After project creation, go to **Settings > API** and record:

- `NEXT_PUBLIC_SUPABASE_URL` -- Project URL (e.g., `https://xxxx.supabase.co`)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` -- anon/public key

**Do NOT commit these values to the repository.** They will be set as environment variables in Vercel (see slice-022).

## 3. Apply Migrations

Run the 3 existing migrations in order using the Supabase CLI:

```bash
# Link the CLI to the production project
supabase link --project-ref <project-ref>

# Push all migrations
supabase db push
```

Migrations to be applied:
1. `20260311000001_create_fiscal_profiles.sql` -- fiscal_profiles table + RLS
2. `20260311120000_create_waitlist.sql` -- waitlist table + RLS
3. `20260311140000_create_alert_preferences.sql` -- alert_preferences table + RLS

## 4. Verify RLS Policies

After applying migrations, verify in **Table Editor** or **SQL Editor**:

### fiscal_profiles
- [ ] RLS enabled
- [ ] Policy: users can SELECT their own row (`auth.uid() = id`)
- [ ] Policy: users can INSERT their own row
- [ ] Policy: users can UPDATE their own row

### waitlist
- [ ] RLS enabled
- [ ] Policy: anyone can INSERT (public waitlist signup)
- [ ] Policy: only service_role can SELECT (admin only)

### alert_preferences
- [ ] RLS enabled
- [ ] Policy: users can SELECT their own row (`auth.uid() = user_id`)
- [ ] Policy: users can INSERT their own row
- [ ] Policy: users can UPDATE their own row

## 5. Configure Auth Settings

Go to **Authentication > URL Configuration**:

- [ ] **Site URL:** `https://pricepo.ro`
- [ ] **Redirect URLs:** add `https://pricepo.ro/auth/callback`
- [ ] (Optional) Add `http://localhost:3000/auth/callback` for local dev if not already present

Go to **Authentication > Providers > Email**:
- [ ] Email provider enabled
- [ ] "Confirm email" setting configured as desired

## 6. Verify Setup

- [ ] Visit the Supabase dashboard Table Editor and confirm all 3 tables exist
- [ ] Test a simple query in SQL Editor: `SELECT count(*) FROM fiscal_profiles;`
- [ ] Confirm Auth is accessible by checking the Auth > Users page loads

## Notes

- Do NOT configure custom SMTP for auth emails yet (use Supabase default)
- Edge functions and realtime subscriptions are not needed for launch
- Database backups policy will be configured post-launch
