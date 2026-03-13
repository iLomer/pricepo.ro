# Tasks Todo

---

## [slice-047] -- What-If Comparison Tax Calculation Logic
**Epic:** E11 | **Size:** S | **Depends on:** none

**User Story**
As a PFA owner, I want the estimator to calculate taxes for a different regime alongside my current one, so that I can see which regime saves me more money.

**Acceptance Criteria**
- [ ] New function `calculateComparisonBreakdown(income: number, expenses: number, caenCode: string, currentRegime: FiscalRegime, compareRegime: FiscalRegime)` in `src/lib/fiscal/pfa-taxes.ts` (or new file `src/lib/fiscal/comparison.ts`)
- [ ] Returns `{ current: TaxBreakdown; comparison: TaxBreakdown; savings: number; savingsPercent: number; recommendation: string }` typed interface
- [ ] Handles norma_venit vs sistem_real comparison correctly (norma uses CAEN-based value, sistem real uses income - expenses)
- [ ] `recommendation` field returns a plain Romanian string explaining which regime is better and why (e.g., "La venitul tau, norma de venit te costa cu 3,200 lei mai putin pe an")
- [ ] Exported via barrel file `src/lib/fiscal/index.ts`
- [ ] Pure function, no side effects, TypeScript strict mode

**Out of Scope**
- SRL regime comparison (SRL only has micro_1 currently)
- UI rendering (handled in slice-048/049)

---

## [slice-048] -- What-If Comparison Toggle on Estimator
**Epic:** E11 | **Size:** S | **Depends on:** slice-047

**User Story**
As a PFA owner on the estimator page, I want to toggle "Compara cu alt regim" so that I can activate the side-by-side comparison view.

**Acceptance Criteria**
- [ ] New toggle/button added below the income inputs in `TaxEstimator.tsx`: "Compara cu alt regim"
- [ ] When toggled ON, shows a regime selector dropdown (norma_venit or sistem_real -- excludes the user's current regime)
- [ ] When toggled ON and a comparison regime is selected, calls `calculateComparisonBreakdown` from slice-047
- [ ] When toggled OFF, hides the comparison and shows only the standard `TaxBreakdownDisplay`
- [ ] Toggle state managed via local component state (no persistence needed)
- [ ] If current regime is norma_venit, comparison defaults to sistem_real (and vice versa)
- [ ] Romanian labels: "Compara cu alt regim", "Regim de comparatie", "Ascunde comparatia"
- [ ] Responsive at 375px, consistent with existing Tailwind styling

**Out of Scope**
- Side-by-side visual layout (handled in slice-049)
- Persisting comparison preference

---

## [slice-049] -- Side-by-Side Regime Comparison Display
**Epic:** E11 | **Size:** M | **Depends on:** slice-048

**User Story**
As a PFA owner comparing regimes, I want to see both tax breakdowns side-by-side with the difference highlighted, so that I can immediately understand the financial impact of switching.

**Acceptance Criteria**
- [ ] New component `src/components/estimator/RegimeComparison.tsx`
- [ ] Two-column layout on desktop, stacked on mobile -- each column shows the full TaxBreakdownDisplay for one regime
- [ ] Column headers show regime name: "Regimul tau actual: Norma de venit" vs "Comparatie: Sistem real"
- [ ] Difference row at the bottom: "Economisesti X lei/an cu [regime]" in green if savings, red if costlier
- [ ] Each line item (CAS, CASS, impozit, total) shows the delta between regimes with color coding (green = less tax, red = more)
- [ ] Summary card: "Recomandat: [regime] -- economisesti [X] lei/an ([Y]% mai putin)" with Romanian explanation
- [ ] Visual emphasis (border, background color) on the recommended/cheaper column
- [ ] Integrated into `TaxEstimator.tsx` -- replaces `TaxBreakdownDisplay` when comparison is active
- [ ] Responsive: at mobile widths, stacks vertically with a clear divider between regimes
- [ ] All copy in Romanian, no external links
- [ ] TypeScript strict, no `any`

**Out of Scope**
- More than 2 regimes compared simultaneously
- Saving or exporting the comparison

---

## [slice-050] -- Fiscal Year Timeline Data Aggregation
**Epic:** E11 | **Size:** S | **Depends on:** none

**User Story**
As a PFA/SRL owner, I want the calendar to aggregate all my fiscal obligations into a timeline with cumulative totals, so that I can see when my cash gets tight across the year.

**Acceptance Criteria**
- [ ] New function `buildAnnualTimeline(deadlines: FiscalDeadline[], taxBreakdown?: TaxBreakdown)` in new file `src/lib/fiscal/timeline.ts`
- [ ] Returns `TimelineEntry[]` where each entry has: `{ month: number; monthName: string; deadlines: FiscalDeadline[]; paymentAmount: number; cumulativeAmount: number; isPaymentMonth: boolean }`
- [ ] Maps known payment deadlines to their amounts using TaxBreakdown data (e.g., May 25 = CAS + CASS + impozit for PFA; quarterly dates for SRL micro tax)
- [ ] For deadlines without a calculable amount (declarations), `paymentAmount` is 0
- [ ] `cumulativeAmount` accumulates across the year, showing total cash committed to taxes by each month
- [ ] Exported via `src/lib/fiscal/index.ts`
- [ ] Pure function, TypeScript strict

**Out of Scope**
- Visual rendering (handled in slice-051/052)
- TVA payment amounts (complex, varies per month)

---

## [slice-051] -- Annual Timeline Visual on Calendar Page
**Epic:** E11 | **Size:** M | **Depends on:** slice-050

**User Story**
As a PFA/SRL owner on the calendar page, I want to see an annual timeline view showing all months with payment bars and deadlines, so that I can visualize my fiscal year at a glance.

**Acceptance Criteria**
- [ ] New component `src/components/calendar/AnnualTimeline.tsx`
- [ ] 12-column horizontal layout (one per month, Jan-Dec) with abbreviated Romanian month names
- [ ] Each month column shows: vertical bar proportional to payment amount (if any), small dots/icons for deadlines in that month, the payment amount in lei below the bar
- [ ] Current month highlighted with distinct border/background
- [ ] Months with no deadlines show a minimal/empty state
- [ ] Toggle on calendar page: "Vezi pe luni" (existing list) vs "Vezi pe anul intreg" (timeline) -- default to list view
- [ ] Horizontal scroll on mobile with snap-to-month behavior
- [ ] Built with CSS/Tailwind (no chart library)
- [ ] Uses `buildAnnualTimeline` from slice-050
- [ ] Integrated into `/calendar` page.tsx -- adds the toggle and conditionally renders `AnnualTimeline` or `FiscalCalendar`
- [ ] All copy in Romanian
- [ ] Responsive at 375px

**Out of Scope**
- Cumulative totals overlay (handled in slice-052)
- Click-to-expand month detail

---

## [slice-052] -- Timeline Cumulative Totals and Cash Pressure Indicator
**Epic:** E11 | **Size:** S | **Depends on:** slice-051

**User Story**
As a PFA/SRL owner viewing the annual timeline, I want to see cumulative tax amounts and a visual indicator of when cash pressure peaks, so that I can plan my savings accordingly.

**Acceptance Criteria**
- [ ] Cumulative total line/area rendered on top of the `AnnualTimeline` component -- shows running total of all tax payments across the year
- [ ] Summary row below the timeline: "Total taxe 2026: X lei" and "Luna cu cea mai mare plata: [month] (Y lei)"
- [ ] "Cash pressure" visual: months where cumulative payments jump significantly get a warning color (e.g., May for PFA when D212 payments hit)
- [ ] Tooltip or inline text on high-pressure months: "In [month] platesti [X] lei -- pune deoparte [Y] lei/luna pana atunci"
- [ ] Cumulative line uses a stepped appearance (jumps at payment months, flat between)
- [ ] Built with CSS/Tailwind, consistent with AnnualTimeline styling
- [ ] All copy in Romanian

**Out of Scope**
- Editing amounts from the timeline
- Notification/alert integration

---

## [slice-053] -- Guided Checklist Data Model and Persistence
**Epic:** E11 | **Size:** M | **Depends on:** none

**User Story**
As a first-year PFA owner, I want a guided checklist that tracks my progress through key fiscal setup steps, so that I don't miss anything important.

**Acceptance Criteria**
- [ ] New file `src/lib/checklists/types.ts` with interfaces: `ChecklistTemplate` (id, title, description, entityType, steps[]), `ChecklistStep` (id, label, description, wikiSlug?, completed), `UserChecklistProgress` (userId, checklistId, completedSteps: string[], startedAt, lastUpdatedAt)
- [ ] New file `src/lib/checklists/templates.ts` with at least 3 checklist templates:
  - "Primul an ca PFA" (8-10 steps: inregistrare ANAF, alege regim, depune D212, plateste CAS/CASS, etc.)
  - "Treci de la norma la sistem real" (5-6 steps)
  - "Primul trimestru ca SRL micro" (6-8 steps)
- [ ] Each step has a `wikiSlug` linking to relevant wiki-fiscal topic (e.g., step about CAS links to `/wiki-fiscal/cas`)
- [ ] Supabase migration: `checklist_progress` table with columns (user_id, checklist_id, completed_steps jsonb, started_at, updated_at) with RLS (users read/write own rows only)
- [ ] API route `src/app/api/checklists/progress/route.ts` with GET (fetch progress) and PUT (toggle step completion)
- [ ] Progress is persisted per user per checklist -- survives page refresh
- [ ] TypeScript strict, all types exported via barrel

**Out of Scope**
- Dashboard UI rendering (handled in slice-054)
- Admin interface for creating checklists
- Automatic checklist assignment based on profile age

---

## [slice-054] -- Guided Checklist Banners on Dashboard
**Epic:** E11 | **Size:** M | **Depends on:** slice-053

**User Story**
As a PFA/SRL owner visiting my dashboard, I want to see a contextual checklist banner for my situation (e.g., "Primul an ca PFA"), so that I get step-by-step guidance without searching for it.

**Acceptance Criteria**
- [ ] New component `src/components/checklists/ChecklistBanner.tsx` -- renders a single checklist with progress
- [ ] Banner shows: checklist title, progress bar (X/Y steps complete), expandable list of steps
- [ ] Each step shows: checkbox (toggleable), label, short description, link to wiki topic if `wikiSlug` is set
- [ ] Checking/unchecking a step calls the API from slice-053 to persist immediately
- [ ] Completed steps show strikethrough text and muted color
- [ ] When all steps are complete: banner shows success state "Ai terminat! Stii tot ce trebuie." with a dismiss option
- [ ] Integrated into `/panou/page.tsx` -- appears between the profile summary and the tax estimate card
- [ ] Checklist selection logic: show "Primul an ca PFA" for PFA users, "Primul trimestru ca SRL micro" for SRL users (simple entity_type match for now)
- [ ] If user has completed and dismissed the checklist, don't show it
- [ ] Responsive at 375px, uses Tailwind, consistent with existing dashboard card styling
- [ ] All copy in Romanian

**Out of Scope**
- Multiple simultaneous checklists
- Checklist recommendation engine
- Push notifications for incomplete steps

---

## [slice-055] -- Source Citations Cleanup -- Exact Article Numbers
**Epic:** E11 | **Size:** M | **Depends on:** none

**User Story**
As a PFA/SRL owner reading wiki topics or using the estimator, I want to see exact legislative article numbers (e.g., "Codul Fiscal, art. 148 alin. (1)") instead of vague descriptions, so that I can verify any claim against the actual law like a textbook footnote.

**Acceptance Criteria**
- [ ] Update all `sources` arrays in `src/lib/fiscal/biblioteca.ts` (19 topics) to include exact article numbers in the `act` field. Examples:
  - CAS: "Codul Fiscal, art. 148-150" instead of "Codul Fiscal (Legea 227/2015)"
  - CASS: "Codul Fiscal, art. 170-174"
  - Impozit pe venit: "Codul Fiscal, art. 68-69"
  - Norma de venit: "Codul Fiscal, art. 69"
  - TVA: "Codul Fiscal, art. 286-331 (Titlul VII)"
  - Micro: "Codul Fiscal, art. 47-56 (Titlul III)"
  - Dividende: "Codul Fiscal, art. 97"
  - D212: "Codul de Procedura Fiscala, art. 120-122"
  - D100: "Codul de Procedura Fiscala, art. 107"
  - D300: "Codul Fiscal, art. 323"
- [ ] Update `relevance` field to be more specific (e.g., "Cota CAS de 25%, pragurile de 12x si 24x salarii minime, baza de calcul" instead of "Reglementeaza CAS pentru activitati independente")
- [ ] Add OUG/HG references where rates were recently changed:
  - OUG 89/2025 for micro 1% flat rate
  - OUG 8/2026 for D212 early filing discount change (5% to 3%)
  - HG for minimum wage 4,050 lei/luna (include HG number if known, otherwise "HG privind salariul minim brut pe tara garantat in plata pentru anul 2026")
- [ ] Update the display in `wiki-fiscal/[slug]/page.tsx`: render sources as numbered footnotes (e.g., "[1] Codul Fiscal, art. 148-150 -- Cota CAS de 25%...")
- [ ] Add footnote-style superscript references in content body where specific claims are made (at minimum in the first content section that states a rate or threshold) -- e.g., "Cota este 25%[1]"
- [ ] Estimator `TaxBreakdownDisplay.tsx`: add a small "Baza legala" collapsed section at the bottom listing the 3-4 key sources for the calculation shown (CAS art., CASS art., impozit art.)
- [ ] No external URLs in the source display -- text-only footnotes like a textbook
- [ ] All 19 topics have at least 2 sources each with exact article numbers
- [ ] TypeScript compiles clean

**Out of Scope**
- Linking to external legislative databases (Monitorul Oficial, legislatie.just.ro)
- Adding sources to SRL fiscal logic files (can be a follow-up)
- Changing the LegislativeSource type structure (the existing fields are sufficient)

---
