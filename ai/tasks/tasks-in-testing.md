# Tasks In Testing

---

## [slice-001] -- Initialize Next.js App with TypeScript
**Epic:** E1 | **Size:** S | **Depends on:** none
**Started: 2026-03-11 | Agent: meto-epic-E1**
**Completed: 2026-03-11 | Files changed: package.json, package-lock.json, tsconfig.json, next.config.ts, next-env.d.ts, eslint.config.mjs, postcss.config.mjs, src/app/layout.tsx, src/app/page.tsx, src/app/globals.css, src/app/favicon.ico, public/**

**User Story**
As a developer, I want a Next.js project initialized with TypeScript in strict mode, so that all subsequent work has a solid foundation.

**Acceptance Criteria**
- [x] Next.js app created with `create-next-app` using App Router (not Pages Router)
- [x] TypeScript strict mode enabled in `tsconfig.json`
- [x] Default boilerplate pages cleaned out (no Next.js demo content)
- [x] `npm run dev` starts successfully on localhost:3000
- [x] `npm run build` completes with zero errors
- [x] Project uses `src/` directory structure (`src/app/`, `src/lib/`, etc.)

---

## [slice-002] -- Configure Tailwind CSS with Fiskio Design Tokens
**Epic:** E1 | **Size:** S | **Depends on:** slice-001
**Started: 2026-03-11 | Agent: meto-epic-E1**
**Completed: 2026-03-11 | Files changed: src/app/globals.css, src/app/page.tsx**

**User Story**
As a developer, I want Tailwind CSS configured with base design tokens, so that all UI work uses consistent styling from the start.

**Acceptance Criteria**
- [x] Tailwind CSS installed and configured (Tailwind v4 via @theme inline in globals.css)
- [x] Base color palette defined (primary, secondary, accent, neutral, error, success, warning)
- [x] Custom font family configured (system font stack)
- [x] Global CSS file (`src/app/globals.css`) includes Tailwind directive (`@import "tailwindcss"` -- v4 syntax)
- [x] A simple test element renders with Tailwind classes correctly on `npm run dev`
- [x] Dark mode class strategy configured (manual toggle via @custom-variant dark)

**Note:** Tailwind v4 does not use `tailwind.config.ts`. All tokens configured via `@theme inline` in CSS.

---

## [slice-003] -- Set Up Supabase Client and Environment Variables
**Epic:** E1 | **Size:** S | **Depends on:** slice-001
**Started: 2026-03-11 | Agent: meto-epic-E1**
**Completed: 2026-03-11 | Files changed: package.json, package-lock.json, src/lib/supabase/client.ts, src/lib/supabase/server.ts, .env.example, .env.local**

**User Story**
As a developer, I want the Supabase client configured with proper environment variables, so that database and auth integrations can be built on top of it.

**Acceptance Criteria**
- [x] `@supabase/supabase-js` installed
- [x] `@supabase/ssr` installed for server-side usage in Next.js App Router
- [x] Browser client helper created at `src/lib/supabase/client.ts`
- [x] Server client helper created at `src/lib/supabase/server.ts`
- [x] `.env.local` created with `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` placeholders
- [x] `.env.example` created with all required env vars documented (no real values)
- [x] `.env.local` is in `.gitignore`
- [x] TypeScript types compile without errors
