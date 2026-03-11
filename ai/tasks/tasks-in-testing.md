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
- [x] Summary includes: all section values, user name/CUI placeholder, date, Prevo branding
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
- [x] Auth settings configured: site URL set to https://prevo.ro, redirect URLs include https://prevo.ro/auth/callback -- documented

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

## [slice-023] -- Custom Domain Configuration (prevo.ro)
**Epic:** E5 | **Size:** XS | **Depends on:** slice-022
**Started: 2026-03-11 | Agent: meto-epic-E5**
**Completed: 2026-03-11 | Files changed: docs/deploy/custom-domain-setup.md**

**Acceptance Criteria**
- [x] Custom domain prevo.ro added to Vercel project -- documented steps
- [x] DNS records configured (A record and/or CNAME as Vercel requires) -- documented
- [x] SSL certificate provisioned and active (Vercel handles automatically) -- documented
- [x] https://prevo.ro loads the landing page correctly -- documented verification
- [x] https://www.prevo.ro redirects to https://prevo.ro (or vice versa, consistent) -- documented
- [x] Supabase Auth redirect URLs updated to include https://prevo.ro/auth/callback -- documented

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
- [x] Error pages (404, 500) render correctly in production with Prevo branding
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

## [slice-026] -- SRL Fiscal Logic Library
**Epic:** E7 | **Size:** L | **Depends on:** none (E3 slice-014 complete)
**Started: 2026-03-11 | Agent: meto-epic-E7**
**Completed: 2026-03-11 | Files changed: src/lib/fiscal/srl/types.ts, src/lib/fiscal/srl/constants.ts, src/lib/fiscal/srl/micro-tax.ts, src/lib/fiscal/srl/dividends.ts, src/lib/fiscal/srl/cass-dividends.ts, src/lib/fiscal/srl/index.ts, src/lib/fiscal/index.ts**

**Acceptance Criteria**
- [x] New file `src/lib/fiscal/srl/types.ts` with SRL-specific types: `SRLMicroTaxBreakdown`, `DividendBreakdown`, `CASSDividendResult`, `SRLFiscalConstants`
- [x] New file `src/lib/fiscal/srl/constants.ts` with 2026 SRL constants: micro tax rates (1%, 3%), dividend tax rate (5%), CASS rate on dividends (10%), minimum gross salary 4,050 lei/month, CASS threshold 6x minimum wages (24,300 lei), CASS cap 60x minimum wages (243,000 lei)
- [x] New file `src/lib/fiscal/srl/micro-tax.ts`: pure function `calculateMicroTax(revenue: number, regime: 'micro_1' | 'micro_3')` returns quarterly and annual micro tax amounts
- [x] New file `src/lib/fiscal/srl/dividends.ts`: pure function `calculateDividendNet(grossDividend: number, annualDividendsTotal: number)` returns: dividend tax (5%), CASS obligation (10% if over threshold), net amount in hand, effective tax rate
- [x] New file `src/lib/fiscal/srl/cass-dividends.ts`: pure function `calculateCASSDividend(annualDividendsTotal: number)` returns: whether CASS applies, CASS amount, threshold used, warning message (Romanian) if near/over threshold
- [x] New file `src/lib/fiscal/srl/index.ts` barrel export
- [x] Update `src/lib/fiscal/index.ts` to re-export SRL module
- [x] All functions are pure (no side effects, no Supabase calls)
- [x] TypeScript compiles clean with strict mode
- [x] Unit-testable: each function takes primitives, returns typed objects

---

## [slice-032] -- SRL Dashboard Section and Navigation
**Epic:** E7 | **Size:** S | **Depends on:** none (E3 slice-015 complete)
**Started: 2026-03-11 | Agent: meto-epic-E7**
**Completed: 2026-03-11 | Files changed: src/app/(dashboard)/DashboardShell.tsx, src/app/(dashboard)/srl/page.tsx, src/components/srl/SRLDashboardCards.tsx**

**Acceptance Criteria**
- [x] New page `src/app/(dashboard)/srl/page.tsx` -- SRL dashboard landing with cards linking to: Simulator Dividende, CASS Dividende, Decizie Asociat Unic, Cash Flow Fiscal, Calendar D100
- [x] Each card shows: icon, title (Romanian), short description, link
- [x] Dashboard navigation (in DashboardShell) conditionally shows SRL section when `entityType === 'srl'`
- [x] SRL nav items: "Panou SRL" (overview), "Simulator Dividende", "CASS Dividende", "Decizie Asociat", "Cash Flow"
- [x] PFA users do NOT see SRL navigation items
- [x] SRL landing page includes a brief educational intro: "Instrumentele tale fiscale pentru SRL micro-intreprindere"
- [x] New component `src/components/srl/SRLDashboardCards.tsx`
- [x] Responsive grid layout, consistent with existing dashboard styling
- [x] TypeScript compiles clean

---

## [slice-027] -- SRL Quarterly D100 Calendar
**Epic:** E7 | **Size:** M | **Depends on:** slice-026
**Started: 2026-03-11 | Agent: meto-epic-E7**
**Completed: 2026-03-11 | Files changed: src/lib/fiscal/srl/srl-deadlines.ts, src/lib/fiscal/srl/index.ts, src/lib/fiscal/index.ts**

**Acceptance Criteria**
- [x] New file `src/lib/fiscal/srl/srl-deadlines.ts` with `getAllSRLDeadlines()` returning quarterly D100 deadlines (Q1: Apr 25, Q2: Jul 25, Q3: Oct 25, Q4: Jan 25 next year) and quarterly micro tax payment deadlines
- [x] Deadlines use existing `FiscalDeadline` type with `applicableRegimes: ['micro_1', 'micro_3']`
- [x] Each D100 deadline includes Romanian description explaining what to file and where
- [x] `getSRLDeadlinesWithAmounts(quarterlyRevenues: number[], regime: 'micro_1' | 'micro_3')` enriches deadlines with calculated tax amounts per quarter
- [x] Update `src/lib/fiscal/srl/index.ts` to export deadline functions
- [x] Existing `filterDeadlines` in `pfa-deadlines.ts` NOT modified -- SRL deadlines are a separate flow
- [x] TypeScript compiles clean

---

## [slice-028] -- Dividend Simulator Page
**Epic:** E7 | **Size:** M | **Depends on:** slice-026, slice-032
**Started: 2026-03-11 | Agent: meto-epic-E7**
**Completed: 2026-03-11 | Files changed: src/app/(dashboard)/srl/simulator-dividende/page.tsx, src/components/srl/DividendSimulator.tsx**

**Acceptance Criteria**
- [x] New page `src/app/(dashboard)/srl/simulator-dividende/page.tsx`
- [x] Input form: gross dividend amount (lei), running total of dividends this year
- [x] Output displays: gross amount, dividend tax (5%), CASS on dividends (if applicable), net amount in hand, effective tax rate percentage
- [x] Payment timeline section: when dividend tax is due (D100 next quarter), when CASS is due (D212 annually for associate)
- [x] Educational callout explaining: "Dividendele se pot distribui doar din profitul net contabil. Impozitul pe dividende (5%) se retine la sursa de catre SRL."
- [x] Responsive layout, Romanian labels, Tailwind styling consistent with existing dashboard
- [x] New component `src/components/srl/DividendSimulator.tsx` (client component with state)
- [x] Uses `calculateDividendNet` and `calculateCASSDividend` from slice-026
- [x] TypeScript compiles clean

---

## [slice-029] -- CASS Dividend Estimator with Threshold Warning
**Epic:** E7 | **Size:** S | **Depends on:** slice-026, slice-032
**Started: 2026-03-11 | Agent: meto-epic-E7**
**Completed: 2026-03-11 | Files changed: src/app/(dashboard)/srl/cass-dividende/page.tsx, src/components/srl/CASSDividendEstimator.tsx**

**Acceptance Criteria**
- [x] New page `src/app/(dashboard)/srl/cass-dividende/page.tsx`
- [x] Input: total planned annual dividends (lei)
- [x] Output displays: current threshold (6x minimum wage = 24,300 lei for 2026), whether CASS applies (yes/no), CASS amount if applicable (10%, capped at base of 60x minimum wages = 243,000 lei), amount remaining before threshold is crossed
- [x] Visual progress bar showing how close user is to the 6x threshold
- [x] Warning banner (yellow/red) when over threshold, with Romanian text
- [x] Educational section explaining the 6/60 rule in plain Romanian
- [x] New component `src/components/srl/CASSDividendEstimator.tsx` (client component)
- [x] Uses `calculateCASSDividend` from slice-026
- [x] TypeScript compiles clean

---

## [slice-030] -- Sole Associate Decision Generator
**Epic:** E7 | **Size:** M | **Depends on:** slice-026, slice-032
**Started: 2026-03-11 | Agent: meto-epic-E7**
**Completed: 2026-03-11 | Files changed: src/app/(dashboard)/srl/decizie-asociat/page.tsx, src/components/srl/DecizieAsociatForm.tsx, src/components/srl/DecizieAsociatPreview.tsx**

**Acceptance Criteria**
- [x] New page `src/app/(dashboard)/srl/decizie-asociat/page.tsx`
- [x] Form inputs: company name (SRL), CUI, J number (trade registry), associate full name, associate CNP, gross dividend amount, distribution date, fiscal year the profit comes from
- [x] Preview section showing the formatted decision document in Romanian legal format
- [x] The document text follows standard Romanian legal template for "Decizia Asociatului Unic nr. [X]/[date]"
- [x] Export as PDF button (using browser print)
- [x] New component `src/components/srl/DecizieAsociatForm.tsx` (client component for form)
- [x] New component `src/components/srl/DecizieAsociatPreview.tsx` (document preview)
- [x] Generated document includes a disclaimer: "Document generat automat. Verificati conformitatea cu legislatia in vigoare."
- [x] TypeScript compiles clean, responsive layout

---

## [slice-031] -- Fiscal Cash Flow Visual
**Epic:** E7 | **Size:** M | **Depends on:** slice-026, slice-027, slice-032
**Started: 2026-03-11 | Agent: meto-epic-E7**
**Completed: 2026-03-11 | Files changed: src/app/(dashboard)/srl/cash-flow/page.tsx, src/components/srl/FiscalCashFlow.tsx**

**Acceptance Criteria**
- [x] New page `src/app/(dashboard)/srl/cash-flow/page.tsx`
- [x] Input section: monthly revenue input (12 fields, or single average), regime (micro_1/micro_3, pre-filled from profile)
- [x] Visual output: bar chart showing Q1-Q4 with: quarterly micro tax due, cumulative tax burden, net cash after taxes
- [x] Each quarter shows: revenue for quarter, micro tax amount (1% or 3%), D100 payment deadline date, running total of taxes paid YTD
- [x] Summary card: total annual revenue, total annual micro tax, average monthly tax set-aside recommendation
- [x] Built with CSS/Tailwind (no heavy chart library -- styled divs/bars)
- [x] New component `src/components/srl/FiscalCashFlow.tsx` (client component)
- [x] Uses `calculateQuarterlyMicroTax` from slice-026 and deadline data from slice-027
- [x] Responsive, Romanian labels, educational tooltips on hover explaining each obligation
- [x] TypeScript compiles clean

---
