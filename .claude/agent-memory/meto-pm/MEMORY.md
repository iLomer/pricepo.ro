# PM Agent Memory -- pricepo-ro

*Read at session start. Update at session end.*

---

## Active Decisions
- E1 complete (5/5 tasks done)
- E2 complete (4/4 tasks done)
- E3 complete (7/7 tasks done)
- E4 complete (4/4 tasks done)
- E5 complete (5/5 tasks done)
- E7 sliced into 7 tasks (slice-026 to slice-032), all in tasks-todo.md

## Task Dependencies (current sprint -- E7)
- **Wave 1 (no deps, parallel):** slice-026 (SRL fiscal logic, L) + slice-032 (SRL dashboard nav, S)
- **Wave 2 (after slice-026):** slice-027 (D100 calendar deadlines, M)
- **Wave 3 (after slice-026 + slice-032, parallel):** slice-028 (Dividend simulator, M) + slice-029 (CASS estimator, S) + slice-030 (Decizie Asociat, M)
- **Wave 4 (after slice-026 + slice-027 + slice-032):** slice-031 (Fiscal cash flow, M)
- **Critical path:** slice-026 -> slice-027 -> slice-031

## E7 Domain Awareness
- E7 owns: `/src/app/(dashboard)/srl/`, `/src/components/srl/`, `/src/lib/fiscal/srl/`
- slice-032 needs to update `DashboardShell.tsx` (E3 domain) -- CONFLICT FLAGGED in SWARM_AWARENESS
- slice-026 updates `src/lib/fiscal/index.ts` to re-export SRL module -- this file is in E3 domain, minor update (append only)
- Existing FISCAL_CONSTANTS_2026 has minimum salary 3,700 lei -- SRL constants use 4,050 lei (2026 updated value) in separate file
- No SRL code exists yet (only .gitkeep placeholders in components/srl/ and lib/fiscal/srl/)

## Key SRL Fiscal Constants (2026)
- Micro tax: 1% (micro_1) or 3% (micro_3) of revenue
- Dividend tax: 5% (retained at source by SRL)
- CASS on dividends: 10% if annual dividends > 6x minimum wage (24,300 lei)
- CASS cap: base capped at 60x minimum wages (243,000 lei)
- Minimum gross salary 2026: 4,050 lei/month
- D100 quarterly deadlines: Apr 25, Jul 25, Oct 25, Jan 25

## Patterns Found
- 7 epics total, aligned with 3 MVP phases
- Romanian language only (D007), education not accounting (D002), PFA first (D003)
- Tailwind v4 uses @theme inline in globals.css, not tailwind.config.ts
- Supabase client at `/src/lib/supabase/client.ts` and `server.ts`
- PFA tax rates 2026: CAS 25%, CASS 10%, income tax 10% (sistem real)
- D212 deadline: May 25 each year
- 32 total tasks across 7 epics (25 done, 7 in todo)
- DashboardShell already receives entityType prop -- conditional SRL nav is straightforward
- FiscalDeadline type already supports micro_1/micro_3 regimes
- PFA deadlines in pfa-deadlines.ts, SRL deadlines will be separate srl-deadlines.ts

## Watch Out
- slice-032 modifies DashboardShell.tsx -- shared file, needs user approval
- slice-026 updates src/lib/fiscal/index.ts -- minor shared file edit (append re-export)
- Minimum salary discrepancy: existing constants say 3,700, E7 uses 4,050 -- keep separate to avoid breaking PFA calculations
- No heavy chart libraries for v1 cash flow visual -- pure CSS/Tailwind bars

## Next Actions
- After E7 complete: E6 (ANAF Integration) is the last epic -- Phase 2
- E6 depends on E2 and E3 (both complete), can be sliced any time
- Consider updating FISCAL_CONSTANTS_2026 minimum salary from 3,700 to 4,050 as a separate chore task

## Session Log
- **2026-03-11 (session 1):** First planning session. Sliced E1 into 5 tasks.
- **2026-03-11 (session 2):** E1 complete. Sliced E2 (4 tasks) and E4 (4 tasks) for parallel swarm execution.
- **2026-03-11 (session 3):** E1 done, E2+E4 complete. Sliced E3 into 7 tasks. Total 20 tasks.
- **2026-03-11 (session 4):** E1-E4 complete. Sliced E5 into 5 tasks. Total 25 tasks.
- **2026-03-11 (session 5):** E1-E5 complete. Sliced E7 (SRL Features) into 7 tasks (slice-026 to slice-032). Total 32 tasks. Flagged DashboardShell.tsx conflict. E7 estimated 22-36 dev hours. 1L + 4M + 2S.
