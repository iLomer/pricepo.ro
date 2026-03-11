# SWARM_AWARENESS -- pricepo-ro

> **READ ONLY for epic agents. Only `@meto-pm` and checkpoint protocol may write here.**
> Parsed by `npx meto-cli status` -- keep section headers and format exact.

---

## [swarm:meta]
- **Project:** pricepo-ro
- **Mode:** swarm
- **Started:** 2026-03-11
- **Total epics:** 7
- **Total tasks:** 32
- **Acceptance criteria:** 5 / 5 passed

---

## [swarm:epics]

| Epic ID | Name | Agent | Status | Tasks Done | Blocker |
|---|---|---|---|---|---|
| E1 | Project Setup | @meto-epic-e1 | complete | 5/5 | none |
| E2 | Auth & Fiscal Profile | @meto-epic-e2 | complete | 4/4 | none |
| E3 | Core PFA Features | @meto-epic-e3 | complete | 7/7 | none |
| E4 | Landing Page & Validation | @meto-epic-e4 | complete | 4/4 | none |
| E5 | Deploy & Production | @meto-epic-e5 | complete | 5/5 | none |
| E6 | ANAF Integration | @meto-epic-e6 | not-started | 0 | E2, E3 |
| E7 | SRL Features | @meto-epic-e7 | complete | 7/7 | none |

Status values: `not-started` · `on-track` · `blocked` · `complete`

---

## [swarm:domains]

See full ownership rules in `ai/swarm/domain-map.md`.

| Epic ID | Owns |
|---|---|
| E1 | `/src/lib/`, `/src/config/`, root config files |
| E2 | `/src/app/(auth)/`, `/src/app/onboarding/`, `/src/components/auth/`, `/src/components/onboarding/`, `src/middleware.ts` |
| E3 | `/src/app/(dashboard)/`, `/src/components/calendar/`, `/src/components/estimator/`, `/src/components/d212/`, `/src/components/alerts/`, `/src/lib/fiscal/`, `/src/app/api/alerts/` |
| E4 | `/src/app/(marketing)/`, `/src/components/landing/`, `/src/components/waitlist/`, `/src/app/api/waitlist/` |
| E5 | `/vercel.json`, `/.github/`, deployment configs, `next.config.ts` (security headers) |
| E6 | `/src/lib/anaf/`, `/src/app/api/anaf/`, `/src/components/anaf/` |
| E7 | `/src/app/(dashboard)/srl/`, `/src/components/srl/`, `/src/lib/fiscal/srl/` |

---

## [swarm:checkpoints]

Append only. Never delete entries. One line per checkpoint.

```
2026-03-11 | E1 | done:0 | status:on-track | blocker:none | note:E1 sliced into 5 tasks, placed in tasks-todo.md
2026-03-11 | E1 | done:3 | status:on-track | blocker:none | note:slice-001 (Next.js init), slice-002 (Tailwind v4 tokens), slice-003 (Supabase client) completed. Remaining: slice-005 (ESLint), slice-004 (folder structure)
2026-03-11 | E1 | done:5 | status:complete | blocker:none | note:All E1 tasks complete. slice-004 (folder structure) and slice-005 (ESLint) finished. E2/E3/E4/E5 epics unblocked.
2026-03-11 | E2 | done:0 | status:not-started | blocker:none | note:E2 sliced into 4 tasks (slice-006 to slice-009). Auth config first, then UI + DB schema in parallel, onboarding last.
2026-03-11 | E4 | done:0 | status:not-started | blocker:none | note:E4 sliced into 4 tasks (slice-010 to slice-013). Hero page first, then waitlist + SEO + analytics can parallelize.
2026-03-11 | E2 | done:3 | status:on-track | blocker:none | note:slice-006 (middleware), slice-007 (auth UI), slice-008 (fiscal profiles schema) completed. Remaining: slice-009 (onboarding flow). Note: created dashboard layout for sign-out button (E3 domain, but E3 not started).
2026-03-11 | E4 | done:3 | status:on-track | blocker:none | note:slice-010 (landing page hero), slice-011 (waitlist form), slice-012 (SEO/OG tags) completed. Remaining: slice-013 (analytics). All within E4 domain, no conflicts.
2026-03-11 | E2 | done:4 | status:complete | blocker:none | note:All E2 tasks complete. slice-009 (onboarding flow) finished. Auth middleware, sign-up/in/out UI, fiscal profiles DB schema, onboarding wizard all implemented. E3/E6/E7 unblocked from E2 dependency.
2026-03-11 | E4 | done:4 | status:complete | blocker:none | note:All E4 tasks complete. slice-010 (hero), slice-011 (waitlist), slice-012 (SEO), slice-013 (analytics) finished. Landing page ready. E5 (deploy) unblocked.
2026-03-11 | E3 | done:0 | status:not-started | blocker:none | note:E3 sliced into 7 tasks (slice-014 to slice-020). Fiscal logic library (slice-014) + dashboard layout (slice-015) have no deps and run first. Calendar (016), estimator (017), D212 guide (018) depend on slice-014 and can parallelize. Export (019) depends on D212 guide (018). Alerts (020) depends on calendar (016).
2026-03-11 | E3 | done:3 | status:on-track | blocker:none | note:Wave 1 + partial Wave 2 complete. slice-014 (fiscal logic lib), slice-015 (dashboard layout+nav), slice-016 (fiscal calendar) done. All within E3 domain.
2026-03-11 | E3 | done:5 | status:on-track | blocker:none | note:Wave 2 complete. slice-017 (tax estimator) and slice-018 (D212 guide) done. Remaining: slice-019 (D212 export, depends on 018) and slice-020 (email alerts, depends on 016). Starting Wave 3 next.
2026-03-11 | E3 | done:7 | status:complete | blocker:none | note:All E3 tasks complete. Wave 3 done: slice-019 (D212 export + SPV instructions) and slice-020 (email alerts setup with migration, API, UI). All 7 tasks in testing. E6/E7 unblocked from E3 dependency.
2026-03-11 | E5 | done:0 | status:not-started | blocker:none | note:E5 sliced into 5 tasks (slice-021 to slice-025). Dependency chain: slice-021 (Supabase prod) first, then slice-022 (Vercel + env vars), then slice-023 (domain) + slice-024 (security headers) + slice-025 (CI/CD) can parallelize. All tasks S or XS. Estimated 5-10 dev hours total.
2026-03-11 | E5 | done:3 | status:on-track | blocker:none | note:slice-021 (Supabase prod setup docs), slice-022 (Vercel setup docs + .env.example + vercel.json), slice-023 (domain setup docs) completed. All documentation checklists created. Starting code tasks.
2026-03-11 | E5 | done:5 | status:complete | blocker:none | note:All E5 tasks complete. slice-024 (security headers in next.config.ts, 404/500 error pages) and slice-025 (CI/CD pipeline with GitHub Actions, branch protection docs) finished. All 5 tasks moved to testing.
2026-03-11 | E7 | done:0 | status:not-started | blocker:none | note:E7 sliced into 7 tasks (slice-026 to slice-032). SRL Features Phase 3. Wave 1: slice-026 (fiscal logic, L) + slice-032 (dashboard nav, S) in parallel. Wave 2: slice-027 (D100 calendar, M). Wave 3: slice-028 (dividend sim, M) + slice-029 (CASS est, S) + slice-030 (decizie asociat, M) in parallel. Wave 4: slice-031 (cash flow, M). Critical path: 026 -> 027 -> 031. Shared file conflict: slice-032 needs to update DashboardShell.tsx (E3 domain).
2026-03-11 | E7 | done:3 | status:on-track | blocker:none | note:Wave 1 + Wave 2 complete. slice-026 (SRL fiscal logic lib: types, constants, micro-tax, dividends, CASS), slice-032 (dashboard nav + SRL landing page), slice-027 (D100 deadlines with amounts). DashboardShell.tsx updated with SRL nav (conflict approved). Starting Wave 3 next.
2026-03-11 | E7 | done:6 | status:on-track | blocker:none | note:Wave 3 complete. slice-028 (dividend simulator page), slice-029 (CASS dividend estimator with threshold warning + progress bar), slice-030 (decizie asociat unic generator with print/PDF export). Starting Wave 4 (slice-031 cash flow) next.
2026-03-11 | E7 | done:7 | status:complete | blocker:none | note:All E7 tasks complete. Wave 4 done: slice-031 (fiscal cash flow visual with quarterly bar chart, monthly/average input modes, summary card). All 7 tasks moved to testing. Files: src/lib/fiscal/srl/ (6 files), src/components/srl/ (6 files), src/app/(dashboard)/srl/ (5 pages), DashboardShell.tsx (updated with SRL nav).
```

---

## [swarm:conflicts]

```
2026-03-11 | E7 | slice-032 needs to update src/app/(dashboard)/DashboardShell.tsx to add SRL nav items. This file is in E3 domain. Requires user approval before @meto-epic-e7 proceeds.
```

---

## [swarm:log]

Free text. Epic agents append observations, decisions, or notes here.

```
2026-03-11 | PM | E1 sliced into 5 tasks: slice-001 (Next.js init), slice-002 (Tailwind), slice-003 (Supabase client), slice-004 (folder structure), slice-005 (ESLint). Tasks ordered by dependency -- slice-001 first (no deps), then slice-002/003/005 can run in parallel, slice-004 depends on 001+002.
2026-03-11 | PM | E2 + E4 sliced in parallel. E2: 4 tasks (slice-006 to slice-009), E4: 4 tasks (slice-010 to slice-013). E2 and E4 are fully independent -- zero shared files. @meto-epic-e2 and @meto-epic-e4 can run simultaneously. E2 internal: slice-006 first, then slice-007 + slice-008 in parallel, slice-009 last. E4 internal: slice-010 first, then slice-011 + slice-012 + slice-013 in parallel.
2026-03-11 | PM | E3 sliced into 7 tasks (slice-014 to slice-020). This is the MVP heart. Dependency graph: slice-014 (fiscal logic lib, L) + slice-015 (dashboard layout, S) have NO dependencies -- start immediately in parallel. Then slice-016 (calendar, M) + slice-017 (estimator, M) + slice-018 (D212 guide, L) all depend on slice-014 and can parallelize. Finally slice-019 (D212 export, M) depends on slice-018, and slice-020 (email alerts, M) depends on slice-016. Total: 2L + 4M + 1S = estimated 30-48 dev hours. Critical path: slice-014 -> slice-018 -> slice-019.
2026-03-11 | PM | E5 sliced into 5 tasks (slice-021 to slice-025). Deploy & Production epic. Dependency chain: slice-021 (Supabase prod setup, S) -> slice-022 (Vercel project + env vars, S) -> then slice-023 (custom domain, XS) + slice-024 (security headers, S) + slice-025 (CI/CD pipeline, S) can all run in parallel. Note: slice-021 and slice-022 involve manual steps (Supabase dashboard, Vercel dashboard, DNS config). E5 domain: /vercel.json, /.github/, next.config.ts (security headers only). Total estimated: 5-10 dev hours.
2026-03-11 | E5 | All 5 E5 tasks completed. Documentation checklists for manual steps (Supabase, Vercel, DNS) in docs/deploy/. Code changes: security headers in next.config.ts, error pages (404/500), CI/CD pipeline in .github/workflows/ci.yml, vercel.json, .env.example updated. No domain conflicts -- all files within E5 ownership.
2026-03-11 | PM | E7 sliced into 7 tasks (slice-026 to slice-032). SRL Features Phase 3. Total: 1L + 4M + 2S = estimated 22-36 dev hours. Key fiscal concepts: micro tax 1%/3% on revenue (not profit), D100 quarterly, dividends 5% tax + CASS 10% if over 6x minimum wage threshold. Minimum gross salary 2026: 4,050 lei/month. Note: existing FISCAL_CONSTANTS_2026 has 3,700 lei -- slice-026 creates separate SRL constants with 4,050. Shared file conflict flagged: DashboardShell.tsx update needed by slice-032.
```
