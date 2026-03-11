# Epics -- Fiskio (pricepo.ro)

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
**Goal:** Build a waitlist landing page for pricepo.ro. Communicate the Fiskio value proposition, collect emails, target 200 signups in 30 days organic. Deploy to Vercel with custom domain.
**Status:** Complete -- 4 tasks done (slice-010 through slice-013)
**Tasks:** slice-010 (Hero + value prop), slice-011 (Waitlist email collection), slice-012 (SEO + OG tags), slice-013 (Analytics)

---

## E5 -- Deploy & Production
**Goal:** Deploy to Vercel, configure custom domain (pricepo.ro), set up environment variables for production, Supabase production project, and CI/CD pipeline.
**Status:** Sliced -- 5 tasks (slice-021 through slice-025) in tasks-todo.md
**Tasks:** slice-021 (Supabase production setup), slice-022 (Vercel project + env vars), slice-023 (Custom domain pricepo.ro), slice-024 (Security headers + hardening), slice-025 (CI/CD GitHub Actions)

---

## E6 -- ANAF Integration (Phase 2)
**Goal:** OAuth2 integration with SPV ANAF, automatic e-Factura sync, fiscal vector reading, and automatic legislative alerts. Requires qualified digital certificate per user.
**Status:** Not started (Phase 2 -- after PFA features validated)
**Tasks:** To be sliced by @meto-pm

---

## E7 -- SRL Features (Phase 3)
**Goal:** SRL micro onboarding, dividend simulator, quarterly D100 calendar, Sole Associate Decision generator, and visual fiscal cash flow.
**Status:** Not started (Phase 3 -- after ANAF integration)
**Tasks:** To be sliced by @meto-pm
