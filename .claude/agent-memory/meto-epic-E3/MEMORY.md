# Epic Agent Memory -- Core Feature (E3)

*Read at session start. Update at session end. Keep it concise.*

---

## Current State
- **Status:** complete
- **Tasks completed:** 7/7
- **Checkpoint count:** 3

## Session Log

### Session 1 -- 2026-03-11
**Completed all 7 E3 tasks in 3 waves:**

**Wave 1 (no deps):**
- slice-014: PFA Fiscal Logic Library -- types.ts, pfa-taxes.ts, pfa-deadlines.ts, norma-venit.ts, index.ts
- slice-015: Dashboard Layout + Navigation -- server layout with auth check, client DashboardShell, sidebar + bottom nav + hamburger

**Wave 2 (depends on slice-014):**
- slice-016: Fiscal Calendar -- FiscalCalendar + DeadlineCard components, urgency colors, 30-day filter
- slice-017: Tax Estimator -- TaxEstimator + TaxBreakdownDisplay, 300ms debounce, norma/sistem real modes
- slice-018: D212 Guide -- D212Guide + D212Step + D212Summary, 8-9 step wizard, auto-calculations

**Wave 3 (final):**
- slice-019: D212 Export -- D212Export + SPVInstructions, copy-to-clipboard, text download, integrated as final guide step
- slice-020: Email Alerts -- migration, API routes (GET/PUT preferences + cron send), AlertPreferences UI, alerte page

## Key Decisions
- Dashboard layout split: server component (auth/redirect) + client component (DashboardShell with navigation)
- D212 export uses plain text download (not jsPDF) for MVP simplicity -- PDF gen can be added later
- Alert send route uses placeholder logging, ready for Resend API integration
- Added AlertPreference type to shared src/types/index.ts (E2 domain file, but types are shared)
- Norma de venit values are national averages (20 CAEN codes) -- county-specific data needs future update
- 2026 minimum gross salary: 3,700 lei/month used for all CAS/CASS thresholds

## Files Created/Modified
- `src/lib/fiscal/` -- types.ts, pfa-taxes.ts, pfa-deadlines.ts, norma-venit.ts, index.ts
- `src/app/(dashboard)/` -- layout.tsx, DashboardShell.tsx, panou/page.tsx, calendar/page.tsx, estimator/page.tsx, d212/page.tsx, alerte/page.tsx
- `src/components/calendar/` -- FiscalCalendar.tsx, DeadlineCard.tsx, index.ts
- `src/components/estimator/` -- TaxEstimator.tsx, TaxBreakdownDisplay.tsx, index.ts
- `src/components/d212/` -- D212Guide.tsx, D212Step.tsx, D212Summary.tsx, D212Export.tsx, SPVInstructions.tsx, index.ts
- `src/components/alerts/` -- AlertPreferences.tsx, index.ts
- `src/app/api/alerts/` -- preferences/route.ts, send/route.ts
- `supabase/migrations/20260311140000_create_alert_preferences.sql`
- `src/types/index.ts` -- added AlertPreference type
