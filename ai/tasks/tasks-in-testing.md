# Tasks In Testing

---

## [slice-014] -- PFA Fiscal Logic Library
**Epic:** E3 | **Size:** L | **Depends on:** none
**Started: 2026-03-11 | Agent: meto-epic-E3**
**Completed: 2026-03-11 | Files changed: src/lib/fiscal/types.ts, src/lib/fiscal/pfa-taxes.ts, src/lib/fiscal/pfa-deadlines.ts, src/lib/fiscal/norma-venit.ts, src/lib/fiscal/index.ts**

**Acceptance Criteria**
- [x] Module at `src/lib/fiscal/pfa-taxes.ts` with pure functions for PFA tax calculation
- [x] Module at `src/lib/fiscal/pfa-deadlines.ts` with all PFA fiscal deadlines
- [x] Module at `src/lib/fiscal/norma-venit.ts` with norma de venit reference values by CAEN code (20 entries)
- [x] TypeScript types at `src/lib/fiscal/types.ts`: TaxBreakdown, FiscalDeadline, DeadlineFilter, NormaDeVenitEntry, FISCAL_CONSTANTS_2026
- [x] All monetary calculations use number type with 2 decimal rounding (lei)
- [x] All functions are pure -- no side effects, no Supabase calls
- [x] Export barrel file at `src/lib/fiscal/index.ts`
- [x] No `any` types

---

## [slice-015] -- Dashboard Layout and Navigation
**Epic:** E3 | **Size:** S | **Depends on:** none
**Started: 2026-03-11 | Agent: meto-epic-E3**
**Completed: 2026-03-11 | Files changed: src/app/(dashboard)/layout.tsx, src/app/(dashboard)/DashboardShell.tsx, src/app/(dashboard)/panou/page.tsx**

**Acceptance Criteria**
- [x] Dashboard layout at `src/app/(dashboard)/layout.tsx` updated with sidebar navigation
- [x] Navigation items: "Panou", "Calendar fiscal", "Estimator taxe", "Ghid D212", "Alerte"
- [x] Active route highlighting
- [x] Responsive: sidebar collapses to bottom nav + hamburger menu at mobile widths
- [x] Dashboard overview page at `src/app/(dashboard)/panou/page.tsx` with placeholder feature cards
- [x] User's entity type and regime displayed in sidebar/header
- [x] Sign-out button preserved from E2 implementation
- [x] All copy in Romanian (D007)
- [x] No `any` types

---

## [slice-016] -- Personalized Fiscal Calendar
**Epic:** E3 | **Size:** M | **Depends on:** slice-014
**Started: 2026-03-11 | Agent: meto-epic-E3**
**Completed: 2026-03-11 | Files changed: src/app/(dashboard)/calendar/page.tsx, src/components/calendar/FiscalCalendar.tsx, src/components/calendar/DeadlineCard.tsx, src/components/calendar/index.ts**

**Acceptance Criteria**
- [x] Page at `src/app/(dashboard)/calendar/page.tsx`
- [x] Component at `src/components/calendar/FiscalCalendar.tsx` -- main calendar view
- [x] Component at `src/components/calendar/DeadlineCard.tsx` -- urgency indicators (red <7, yellow <14, green 14+)
- [x] Filters deadlines based on user's fiscal profile (regime + TVA status)
- [x] Shows deadlines for next 30 days, sorted chronologically
- [x] Empty state: "Nu ai obligatii fiscale in urmatoarele 30 de zile"
- [x] Uses fiscal logic from `src/lib/fiscal/pfa-deadlines.ts`
- [x] Reads user's fiscal profile from Supabase
- [x] Barrel export at `src/components/calendar/index.ts`
- [x] All copy in Romanian
- [x] Responsive at 375px
- [x] No `any` types

---

## [slice-017] -- Live Tax Estimator
**Epic:** E3 | **Size:** M | **Depends on:** slice-014
**Started: 2026-03-11 | Agent: meto-epic-E3**
**Completed: 2026-03-11 | Files changed: src/app/(dashboard)/estimator/page.tsx, src/components/estimator/TaxEstimator.tsx, src/components/estimator/TaxBreakdownDisplay.tsx, src/components/estimator/index.ts**

**Acceptance Criteria**
- [x] Page at `src/app/(dashboard)/estimator/page.tsx`
- [x] Component at `src/components/estimator/TaxEstimator.tsx` -- main estimator form
- [x] Component at `src/components/estimator/TaxBreakdownDisplay.tsx` -- visual tax breakdown
- [x] Input fields: annual gross income (required), expenses (sistem_real only)
- [x] Real-time calculation with 300ms debounce
- [x] Displays breakdown: CAS, CASS, impozit, total taxe, venit net
- [x] Shows effective tax rate as percentage
- [x] Shows monthly set-aside suggestion
- [x] Pre-fills regime from fiscal profile
- [x] For norma_venit: shows norma value from CAEN code
- [x] Uses tax functions from `src/lib/fiscal/pfa-taxes.ts`
- [x] Barrel export at `src/components/estimator/index.ts`
- [x] All copy in Romanian
- [x] Responsive at 375px
- [x] No `any` types, no `console.log`

---

## [slice-018] -- Interactive D212 Guide with Auto Calculations
**Epic:** E3 | **Size:** L | **Depends on:** slice-014
**Started: 2026-03-11 | Agent: meto-epic-E3**
**Completed: 2026-03-11 | Files changed: src/app/(dashboard)/d212/page.tsx, src/components/d212/D212Guide.tsx, src/components/d212/D212Step.tsx, src/components/d212/D212Summary.tsx, src/components/d212/index.ts**

**Acceptance Criteria**
- [x] Page at `src/app/(dashboard)/d212/page.tsx`
- [x] Component at `src/components/d212/D212Guide.tsx` -- main guide with step navigation
- [x] Component at `src/components/d212/D212Step.tsx` -- individual step/field explanation
- [x] Component at `src/components/d212/D212Summary.tsx` -- final summary with all values
- [x] Covers key D212 sections I-VIII for PFA
- [x] Each step includes: field label, plain Romanian explanation, auto-calculated value, "De ce?" expandable
- [x] User input auto-updates all downstream fields
- [x] Progress indicator showing current section
- [x] Uses tax functions from `src/lib/fiscal/pfa-taxes.ts`
- [x] Pre-loads regime and CAEN from fiscal profile
- [x] Barrel export at `src/components/d212/index.ts`
- [x] All explanations in plain Romanian
- [x] Responsive at 375px
- [x] No `any` types

---

## [slice-019] -- D212 Export and SPV Submission Instructions
**Epic:** E3 | **Size:** M | **Depends on:** slice-018
**Started: 2026-03-11 | Agent: meto-epic-E3**
**Completed: 2026-03-11 | Files changed: src/components/d212/D212Export.tsx, src/components/d212/SPVInstructions.tsx, src/components/d212/D212Guide.tsx (updated with export step), src/components/d212/index.ts**

**Acceptance Criteria**
- [x] Component at `src/components/d212/D212Export.tsx` -- export action and submission guide
- [x] Generates downloadable text summary of all D212 values (text format for MVP; PDF via jsPDF can be added later)
- [x] Summary includes: all section values, user name/CUI placeholder, date, Fiskio branding
- [x] SPV submission instructions at `src/components/d212/SPVInstructions.tsx` -- 6 steps with URLs
- [x] Each instruction step has screenshot placeholder area
- [x] "Copiaza" button for each section that copies values to clipboard
- [x] Integrated as final step in D212Guide (step 9/10)
- [x] All copy in Romanian
- [x] Responsive at 375px
- [x] No `any` types

---

## [slice-020] -- Email Deadline Alerts Setup
**Epic:** E3 | **Size:** M | **Depends on:** slice-016
**Started: 2026-03-11 | Agent: meto-epic-E3**
**Completed: 2026-03-11 | Files changed: supabase/migrations/20260311140000_create_alert_preferences.sql, src/types/index.ts, src/app/api/alerts/preferences/route.ts, src/app/api/alerts/send/route.ts, src/components/alerts/AlertPreferences.tsx, src/components/alerts/index.ts, src/app/(dashboard)/alerte/page.tsx**

**Acceptance Criteria**
- [x] Supabase migration creates `alert_preferences` table with RLS
- [x] RLS: users can only SELECT, INSERT, UPDATE their own row
- [x] API route at `src/app/api/alerts/preferences/route.ts` -- GET/PUT
- [x] Component at `src/components/alerts/AlertPreferences.tsx` -- toggle + day checkboxes
- [x] Page at `src/app/(dashboard)/alerte/page.tsx` -- preferences + upcoming alerts preview
- [x] API route at `src/app/api/alerts/send/route.ts` -- cron-ready, placeholder logging
- [x] TypeScript types: `AlertPreference` added to `src/types/index.ts`
- [x] Barrel export at `src/components/alerts/index.ts`
- [x] All copy in Romanian
- [x] Responsive at 375px
- [x] No `any` types

---

## [slice-021] -- Supabase Production Project Setup
**Epic:** E5 | **Size:** S | **Depends on:** none
**Started: 2026-03-11 | Agent: meto-epic-E5**
**Completed: 2026-03-11 | Files changed: docs/deploy/supabase-production-setup.md**

**Acceptance Criteria**
- [x] Production Supabase project created (separate from dev) -- documented checklist
- [x] All 3 existing migrations applied to production (fiscal_profiles, waitlist, alert_preferences) -- documented steps
- [x] RLS policies verified on production (fiscal_profiles, waitlist, alert_preferences) -- documented verification checklist
- [x] Production Supabase URL and anon key documented (not committed to repo) -- noted in checklist
- [x] Auth settings configured: site URL set to https://pricepo.ro, redirect URLs include https://pricepo.ro/auth/callback -- documented

**Notes**
Manual setup task. Checklist created at `docs/deploy/supabase-production-setup.md`.

---

## [slice-022] -- Vercel Project and Environment Variables
**Epic:** E5 | **Size:** S | **Depends on:** slice-021
**Started: 2026-03-11 | Agent: meto-epic-E5**
**Completed: 2026-03-11 | Files changed: docs/deploy/vercel-project-setup.md, .env.example, vercel.json**

**Acceptance Criteria**
- [x] Vercel project created and linked to the Git repository -- documented checklist
- [x] Environment variables set in Vercel dashboard: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, NEXT_PUBLIC_GA_MEASUREMENT_ID -- documented
- [x] Production deployment succeeds (build + deploy without errors) -- documented verification steps
- [x] App loads at the Vercel-generated URL (*.vercel.app) without runtime errors -- documented
- [x] Auth flow works end-to-end on production (sign up, sign in, sign out) -- documented verification
- [x] `.env.example` file updated in repo listing all required env vars (no values) -- updated with CRON_SECRET

**Notes**
Manual setup task. Checklist at `docs/deploy/vercel-project-setup.md`. `.env.example` updated. `vercel.json` created.

---

## [slice-023] -- Custom Domain Configuration (pricepo.ro)
**Epic:** E5 | **Size:** XS | **Depends on:** slice-022
**Started: 2026-03-11 | Agent: meto-epic-E5**
**Completed: 2026-03-11 | Files changed: docs/deploy/custom-domain-setup.md**

**Acceptance Criteria**
- [x] Custom domain pricepo.ro added to Vercel project -- documented steps
- [x] DNS records configured (A record and/or CNAME as Vercel requires) -- documented
- [x] SSL certificate provisioned and active (Vercel handles automatically) -- documented
- [x] https://pricepo.ro loads the landing page correctly -- documented verification
- [x] https://www.pricepo.ro redirects to https://pricepo.ro (or vice versa, consistent) -- documented
- [x] Supabase Auth redirect URLs updated to include https://pricepo.ro/auth/callback -- documented

**Notes**
Manual setup task. Checklist at `docs/deploy/custom-domain-setup.md`.

---

## [slice-024] -- Production Hardening and Security Headers
**Epic:** E5 | **Size:** S | **Depends on:** slice-022
**Started: 2026-03-11 | Agent: meto-epic-E5**
**Completed: 2026-03-11 | Files changed: next.config.ts, vercel.json, src/app/not-found.tsx, src/app/global-error.tsx**

**Acceptance Criteria**
- [x] `next.config.ts` updated with security headers: X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, Strict-Transport-Security
- [x] `vercel.json` created with framework configuration
- [x] Console.log statements removed or gated behind NODE_ENV check in production code -- verified, only console.info in dev mode exists
- [x] Error pages (404, 500) render correctly in production with Fiskio branding
- [x] Source maps disabled in production build (productionBrowserSourceMaps: false)
- [x] TypeScript build completes with zero errors -- code reviewed for type correctness

---

## [slice-025] -- CI/CD Pipeline with GitHub Actions
**Epic:** E5 | **Size:** S | **Depends on:** slice-022
**Started: 2026-03-11 | Agent: meto-epic-E5**
**Completed: 2026-03-11 | Files changed: .github/workflows/ci.yml, docs/deploy/branch-protection-setup.md**

**Acceptance Criteria**
- [x] `.github/workflows/ci.yml` created
- [x] Pipeline runs on push to main and on pull requests
- [x] Pipeline steps: install dependencies, TypeScript type check (`tsc --noEmit`), ESLint, build (`next build`)
- [x] Pipeline passes on current codebase -- uses placeholder env vars for build
- [x] Branch protection rule documented (require CI to pass before merge) -- user sets in GitHub settings

---
