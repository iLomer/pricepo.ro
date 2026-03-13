# Epics -- Prevo (prevo.ro)

High-level orientation. Full task definitions live in `tasks-backlog.md`.
Aligned with MVP phases from product vision. Refine with @meto-pm.

---

## E1 -- Project Setup
**Goal:** Initialize the Next.js app with Tailwind CSS, configure Supabase client, establish the development environment, and set up the project structure for a Romanian fiscal education platform.
**Status:** Complete -- all 5 tasks done (slice-001 through slice-005)
**Tasks:** slice-001, slice-002, slice-003, slice-004, slice-005

---

## E2 -- Auth & Fiscal Profile
**Goal:** Implement sign up, sign in, sign out using Supabase Auth with RLS. Build the fiscal profile onboarding flow (5 min: entity type PFA/SRL, regime, TVA status, CAEN code) that personalizes the entire experience.
**Status:** Complete -- 4 tasks done (slice-006 through slice-009)
**Tasks:** slice-006 (Auth config + middleware), slice-007 (Sign up/in/out UI), slice-008 (Fiscal profiles DB + RLS), slice-009 (Onboarding flow)

---

## E3 -- Core PFA Features (Phase 1)
**Goal:** Build the primary PFA features: personalized fiscal calendar, live tax estimator, interactive D212 guide with auto calculations, export ready-to-submit files, and email deadline alerts. This is the heart of the MVP.
**Status:** Complete -- 7 tasks done (slice-014 through slice-020)
**Tasks:** slice-014 (Fiscal logic library), slice-015 (Dashboard layout), slice-016 (Fiscal calendar), slice-017 (Tax estimator), slice-018 (D212 guide), slice-019 (D212 export + SPV instructions), slice-020 (Email deadline alerts)

---

## E4 -- Landing Page & Validation
**Goal:** Build a waitlist landing page for prevo.ro. Communicate the Prevo value proposition, collect emails, target 200 signups in 30 days organic. Deploy to Vercel with custom domain.
**Status:** Complete -- 4 tasks done (slice-010 through slice-013)
**Tasks:** slice-010 (Hero + value prop), slice-011 (Waitlist email collection), slice-012 (SEO + OG tags), slice-013 (Analytics)

---

## E5 -- Deploy & Production
**Goal:** Deploy to Vercel, configure custom domain (prevo.ro), set up environment variables for production, Supabase production project, and CI/CD pipeline.
**Status:** Complete -- 5 tasks done (slice-021 through slice-025)
**Tasks:** slice-021 (Supabase production setup), slice-022 (Vercel project + env vars), slice-023 (Custom domain prevo.ro), slice-024 (Security headers + hardening), slice-025 (CI/CD GitHub Actions)

---

## E6 -- ANAF Integration (Phase 2)
**Goal:** OAuth2 integration with SPV ANAF, automatic e-Factura sync (read-only), fiscal vector reading, and automatic legislative alerts. Requires qualified digital certificate per user. e-Factura data is consumed read-only by the estimator, alerts, and calendar -- it is NOT displayed as a ledger or used for bookkeeping (see D008).
**Status:** Not started (Phase 2 -- after PFA features validated)
**Tasks:** To be sliced by @meto-pm

---

## E7 -- SRL Features (Phase 3)
**Goal:** SRL micro features: dividend simulator, quarterly D100 calendar, Sole Associate Decision generator, visual fiscal cash flow, and CASS dividend estimator. Built on existing SRL onboarding (E2) and dashboard infrastructure (E3).
**Status:** Sliced -- 7 tasks (slice-026 through slice-032) in tasks-todo.md
**Dependency graph:**
- **Wave 1 (no deps, parallel):** slice-026 (SRL fiscal logic, L) + slice-032 (SRL dashboard nav, S)
- **Wave 2 (after slice-026, parallel):** slice-027 (D100 calendar, M)
- **Wave 3 (after slice-026 + slice-032, parallel):** slice-028 (Dividend simulator, M) + slice-029 (CASS estimator, S) + slice-030 (Decizie Asociat, M)
- **Wave 4 (after slice-026 + slice-027 + slice-032):** slice-031 (Fiscal cash flow, M)
**Tasks:** slice-026 (SRL fiscal logic library), slice-027 (D100 calendar deadlines), slice-028 (Dividend simulator), slice-029 (CASS dividend estimator), slice-030 (Sole Associate Decision generator), slice-031 (Fiscal cash flow visual), slice-032 (SRL dashboard + navigation)

---

## E8 -- CAEN Expense Deductibility Guide [DROPPED]
**Goal:** ~~Add an educational layer to the Registru (transaction ledger) that helps PFA sistem real users understand which expenses are deductible for their specific CAEN code.~~
**Status:** DROPPED -- Product pivot (D008). Prevo does not offer bookkeeping features. The Registru feature this epic depended on has been removed entirely.
**Dropped date:** 2026-03-11
**Dropped tasks:** slice-033, slice-034, slice-035, slice-036

---

## E9 -- Source Citations for Fiscal Data
**Goal:** Add verifiable legislative source citations to all fiscal content in Prevo. Every tax rate, deadline, threshold, formula, and fiscal rule should reference the specific law, OUG, HG, or ANAF order it comes from. Users should be able to verify any claim against the original legislation.
**Status:** Sliced -- 5 tasks (slice-037 through slice-041) in tasks-todo.md
**Scope:**
- Extend BibliotecaTopic interface and fiscal data types with a `sources` field
- Research and populate citations for all 19 wiki topics
- Research and populate citations for PFA tax logic (pfa-taxes.ts, pfa-deadlines.ts, norma-venit.ts)
- Research and populate citations for SRL fiscal logic (srl/constants.ts, srl/micro-tax.ts, etc.)
- Display sources in wiki topic pages (footer section) and fiscal calculation UIs
**Dependency graph:**
- **Wave 1 (no deps):** slice-037 (Data model + types)
- **Wave 2 (after slice-037, parallel):** slice-038 (Wiki topic citations) + slice-039 (PFA/SRL fiscal logic citations)
- **Wave 3 (after slice-037):** slice-040 (Wiki sources UI)
- **Wave 4 (after slice-040 + slice-039):** slice-041 (Estimator/calendar sources UI)
**Tasks:** slice-037 (Citation data model), slice-038 (Wiki topic citations data), slice-039 (Fiscal logic citations data), slice-040 (Wiki sources display UI), slice-041 (Estimator and calendar sources UI)

---

## E10 -- Legislative Monitor (Alerte Legislative)
**Goal:** Build a curated legislative feed that makes recent Romanian fiscal legislation changes accessible within Prevo. Summarize new OUGs, laws, and ANAF orders in plain Romanian, explain the concrete impact on PFA/SRL users, and link to official sources. Ties into the existing "Alerte legislative" feature from the product vision and the existing /alerte page.
**Status:** Sliced -- 5 tasks (slice-042 through slice-046) in tasks-todo.md
**Scope:**
- Data model for legislative updates (Supabase table with RLS)
- Static seed data: curate the most impactful recent fiscal legislation changes (2024-2026)
- Public /legislatie page with chronological feed of legislative changes
- Per-update detail view with plain-language summary + impact analysis + official source links
- Integration with dashboard: "Ce s-a schimbat recent" widget on /panou
**Dependency graph:**
- **Wave 1 (no deps, parallel):** slice-042 (Data model + types) + slice-043 (Seed legislative data)
- **Wave 2 (after slice-042 + slice-043):** slice-044 (Legislative feed page)
- **Wave 3 (after slice-044):** slice-045 (Detail page with impact analysis)
- **Wave 4 (after slice-044):** slice-046 (Dashboard widget)
**Tasks:** slice-042 (Legislative update data model), slice-043 (Seed legislative data), slice-044 (Legislative feed page), slice-045 (Legislative detail + impact page), slice-046 (Dashboard legislative widget)

---

## E11 -- UX Differentiators (Scenario Comparison, Timeline, Checklists, Citations Cleanup)
**Goal:** Four high-impact features that integrate into existing pages to differentiate Prevo from competitors. What-If Scenario Comparison on the estimator, Fiscal Year Timeline on the calendar, Guided Checklists on the dashboard, and Source Citations Cleanup across wiki and estimator. No new routes -- all changes enhance existing pages.
**Status:** Sliced -- 9 tasks (slice-047 through slice-055) in tasks-todo.md
**Scope:**
- What-If Scenario Comparison: toggle on `/estimator` to compare two regimes side-by-side (e.g., norma vs sistem real)
- Fiscal Year Timeline: annual timeline on `/calendar` showing cumulative payment amounts across the year
- Guided Checklists: contextual banners on `/panou` with interactive checklist steps for key fiscal moments (e.g., first year as PFA)
- Source Citations Cleanup: update existing vague sources in biblioteca.ts to exact article numbers, display as text footnotes
**Dependency graph:**
- **Wave 1 (all independent, parallel):** slice-047 (Comparison logic) + slice-050 (Timeline logic) + slice-053 (Checklist data model) + slice-055 (Citations cleanup)
- **Wave 2 (after slice-047):** slice-048 (Comparison UI toggle) + slice-049 (Side-by-side display)
- **Wave 3 (after slice-050):** slice-051 (Timeline UI)
- **Wave 4 (after slice-053):** slice-054 (Checklist UI on dashboard)
- Note: slice-049 depends on slice-048, slice-051 depends on slice-050, slice-054 depends on slice-053
**Tasks:** slice-047 (Comparison tax calculation), slice-048 (Comparison toggle UI), slice-049 (Side-by-side breakdown display), slice-050 (Timeline data aggregation), slice-051 (Timeline visual on calendar), slice-052 (Timeline cumulative totals), slice-053 (Checklist data + persistence), slice-054 (Checklist banners on dashboard), slice-055 (Citations cleanup -- exact article numbers)
