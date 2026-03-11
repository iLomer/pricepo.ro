# Tasks In Progress

---

## [slice-003] -- Set Up Supabase Client and Environment Variables
**Epic:** E1 | **Size:** S | **Depends on:** slice-001
**Started: 2026-03-11 | Agent: meto-epic-E1**

**User Story**
As a developer, I want the Supabase client configured with proper environment variables, so that database and auth integrations can be built on top of it.

**Acceptance Criteria**
- [ ] `@supabase/supabase-js` installed
- [ ] `@supabase/ssr` installed for server-side usage in Next.js App Router
- [ ] Browser client helper created at `src/lib/supabase/client.ts`
- [ ] Server client helper created at `src/lib/supabase/server.ts`
- [ ] `.env.local` created with `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` placeholders
- [ ] `.env.example` created with all required env vars documented (no real values)
- [ ] `.env.local` is in `.gitignore`
- [ ] TypeScript types compile without errors
