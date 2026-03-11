# PM Agent Memory -- pricepo-ro

*Read at session start. Update at session end.*

---

## Active Decisions
- E1 complete (5/5 tasks done)
- E2 complete (4/4 tasks done)
- E3 complete (7/7 tasks done)
- E4 complete (4/4 tasks done)
- E5 sliced into 5 tasks (slice-021 to slice-025), all in tasks-todo.md

## Task Dependencies (current sprint -- E5)
- **Wave 1 (start first):** slice-021 (Supabase production setup, S) -- no dependencies
- **Wave 2 (after slice-021):** slice-022 (Vercel project + env vars, S) -- depends on slice-021
- **Wave 3 (after slice-022):** slice-023 (custom domain, XS) + slice-024 (security headers, S) + slice-025 (CI/CD, S) -- all depend on slice-022, can parallelize
- **Critical path:** slice-021 -> slice-022 -> slice-023

## E5 Domain Awareness
- E5 owns: `/vercel.json`, `/.github/`, deployment configs
- slice-024 modifies `next.config.ts` for security headers -- shared file, flag if conflict
- slice-021 and slice-022 are largely manual (Supabase dashboard, Vercel dashboard, DNS)
- slice-025 creates `.github/workflows/ci.yml` -- new directory, no conflicts
- Env vars needed: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, NEXT_PUBLIC_GA_MEASUREMENT_ID

## Patterns Found
- 7 epics total, aligned with 3 MVP phases
- Romanian language only (D007), education not accounting (D002), PFA first (D003)
- Tailwind v4 uses @theme inline in globals.css, not tailwind.config.ts
- Supabase client at `/src/lib/supabase/client.ts` and `server.ts`
- Tax rates 2026: CAS 25%, CASS 10%, income tax 10% (sistem real)
- D212 deadline: May 25 each year
- 25 total tasks across 5 epics so far

## Watch Out
- slice-024 modifies next.config.ts -- shared file, coordinate with other epics
- slice-021 and slice-022 require manual dashboard work -- developer needs Supabase and Vercel access
- slice-023 requires DNS access to pricepo.ro domain registrar
- Supabase Auth redirect URLs must be updated in both Supabase dashboard AND code when moving to production

## Next Actions
- After E5 complete: E6 (ANAF Integration) is next -- Phase 2
- E6 depends on E2 and E3 (both complete), so it can be sliced any time
- E7 (SRL Features) depends on E2 and E3, also unblocked

## Session Log
- **2026-03-11 (session 1):** First planning session. Sliced E1 into 5 tasks.
- **2026-03-11 (session 2):** E1 complete. Sliced E2 (4 tasks) and E4 (4 tasks) for parallel swarm execution. 8 new tasks total (slice-006 to slice-013) in tasks-todo.md.
- **2026-03-11 (session 3):** E1 done, E2+E4 complete (in testing). Sliced E3 into 7 tasks (slice-014 to slice-020). Total 20 tasks in project. E3 is the MVP heart -- fiscal logic, calendar, estimator, D212 guide, export, and alerts.
- **2026-03-11 (session 4):** E1-E4 all complete. Sliced E5 (Deploy & Production) into 5 tasks (slice-021 to slice-025). All S/XS size. Dependency chain: 021 -> 022 -> (023 + 024 + 025 in parallel). Estimated 5-10 dev hours. Total project: 25 tasks.
