# PM Agent Memory -- pricepo-ro

*Read at session start. Update at session end.*

---

## Active Decisions
- E1 complete (5/5 tasks done)
- E2 complete (4/4 tasks done, in testing)
- E4 complete (4/4 tasks done, in testing)
- E3 sliced into 7 tasks (slice-014 to slice-020), all in tasks-todo.md

## Task Dependencies (current sprint -- E3)
- **Independent (start first):** slice-014 (fiscal logic lib, L) + slice-015 (dashboard layout, S) -- no dependencies
- **Wave 2 (after slice-014):** slice-016 (calendar, M) + slice-017 (estimator, M) + slice-018 (D212 guide, L) -- all depend on slice-014, can parallelize
- **Wave 3:** slice-019 (D212 export, M) depends on slice-018; slice-020 (email alerts, M) depends on slice-016
- **Critical path:** slice-014 -> slice-018 -> slice-019

## E3 Domain Awareness
- E3 owns: `/src/app/(dashboard)/`, `/src/components/calendar/`, `/src/components/estimator/`, `/src/components/d212/`, `/src/components/alerts/`, `/src/lib/fiscal/`, `/src/app/api/alerts/`
- E2 already created `src/app/(dashboard)/layout.tsx` with sign-out button -- slice-015 must update (not recreate) this file
- Fiscal profile types already in `src/types/index.ts`: `FiscalProfile`, `EntityType`, `FiscalRegime`, `TVAStatus`
- slice-020 adds `AlertPreference` type to `src/types/index.ts` -- shared file, needs coordination flag

## Patterns Found
- 7 epics total, aligned with 3 MVP phases
- Romanian language only (D007), education not accounting (D002), PFA first (D003)
- Tailwind v4 uses @theme inline in globals.css, not tailwind.config.ts
- Supabase client at `/src/lib/supabase/client.ts` and `server.ts`
- Tax rates 2026: CAS 25%, CASS 10%, income tax 10% (sistem real)
- D212 deadline: May 25 each year

## Watch Out
- slice-015 modifies dashboard layout already created by E2 -- potential conflict if E2 testing sends back changes
- slice-020 needs to write to `src/types/index.ts` (shared file) -- flag if conflict
- slice-019 needs a PDF library (jsPDF or html2pdf) -- new dependency, requires package.json coordination
- slice-014 is the biggest blocker -- 3 tasks depend on it. Prioritize it first.
- Norma de venit values vary by county and CAEN -- MVP covers top 20 CAEN codes only

## Next Actions
- After E3 is in progress: slice E5 (Deploy) -- landing page needs to ship fast per D006
- After E3 complete: E6 (ANAF Integration) is next
- E5 could potentially start now since E4 is done -- consider slicing E5 in parallel with E3 execution

## Session Log
- **2026-03-11 (session 1):** First planning session. Sliced E1 into 5 tasks.
- **2026-03-11 (session 2):** E1 complete. Sliced E2 (4 tasks) and E4 (4 tasks) for parallel swarm execution. 8 new tasks total (slice-006 to slice-013) in tasks-todo.md.
- **2026-03-11 (session 3):** E1 done, E2+E4 complete (in testing). Sliced E3 into 7 tasks (slice-014 to slice-020). Total 20 tasks in project. E3 is the MVP heart -- fiscal logic, calendar, estimator, D212 guide, export, and alerts.
