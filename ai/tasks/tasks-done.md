# Tasks Done

---

## [slice-001] -- Initialize Next.js App with TypeScript
**Epic:** E1 | **Size:** S | **Validated:** 2026-03-11 -- ALL PASS

---

## [slice-002] -- Configure Tailwind CSS with Fiskio Design Tokens
**Epic:** E1 | **Size:** S | **Validated:** 2026-03-11 -- ALL PASS

---

## [slice-003] -- Set Up Supabase Client and Environment Variables
**Epic:** E1 | **Size:** S | **Validated:** 2026-03-11 -- ALL PASS

---

## [slice-004] -- Establish Project Folder Structure and Shared Layout
**Epic:** E1 | **Size:** S | **Validated:** 2026-03-11 -- ALL PASS

---

## [slice-005] -- Configure ESLint and Dev Tooling
**Epic:** E1 | **Size:** XS | **Validated:** 2026-03-11 -- ALL PASS

---

## [slice-006] -- Supabase Auth Configuration and Middleware
**Epic:** E2 | **Size:** M | **Validated:** 2026-03-11 -- ALL PASS
- Middleware refreshes session, protects dashboard routes, redirects auth pages
- Auth callback route handles OAuth/magic link flows
- TypeScript compiles clean

---

## [slice-007] -- Sign Up, Sign In, Sign Out UI
**Epic:** E2 | **Size:** M | **Validated:** 2026-03-11 -- ALL PASS
- Sign-up at /inregistrare, sign-in at /autentificare
- Client-side validation, Romanian error messages, loading states
- Sign-out button in dashboard layout

---

## [slice-008] -- Fiscal Profiles Database Schema and RLS
**Epic:** E2 | **Size:** S | **Validated:** 2026-03-11 -- ALL PASS
- fiscal_profiles table with entity_type enum, regime, tva_status, caen
- RLS: SELECT/INSERT/UPDATE own row, no DELETE
- FiscalProfile TypeScript types

---

## [slice-009] -- Fiscal Profile Onboarding Flow
**Epic:** E2 | **Size:** M | **Validated:** 2026-03-11 -- ALL PASS
- 4-step wizard: entity type → regime → TVA → CAEN
- Saves to fiscal_profiles, redirects to /panou
- Middleware redirects users without profile to /onboarding

---

## [slice-010] -- Landing Page Hero and Value Proposition
**Epic:** E4 | **Size:** M | **Validated:** 2026-03-11 -- ALL PASS
- Hero, how it works, features, pricing (3 tiers), social proof
- All copy in Romanian, responsive, semantic HTML

---

## [slice-011] -- Waitlist Email Collection
**Epic:** E4 | **Size:** S | **Validated:** 2026-03-11 -- ALL PASS
- Waitlist table + RLS (anon insert only)
- API route validates email, inserts to Supabase
- Client form with validation, loading, success/error states

---

## [slice-012] -- SEO Metadata and Open Graph Tags
**Epic:** E4 | **Size:** S | **Validated:** 2026-03-11 -- ALL PASS
- Next.js metadata with OG/Twitter cards, JSON-LD
- robots.txt, sitemap.xml, canonical URL

---

## [slice-013] -- Landing Page Analytics and Performance
**Epic:** E4 | **Size:** XS | **Validated:** 2026-03-11 -- ALL PASS
- GA4 script (production only), waitlist_signup custom event
- Measurement ID via env var
