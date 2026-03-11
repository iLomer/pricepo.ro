# Product Vision — Prevo (prevo.ro)

## What We Are Building
Prevo — the first fiscal education platform for Romanian PFA and SRL owners. Not accounting software, not a digital accountant — active fiscal education personalized to your entity, updated with current legislation, actionable from day one.

## The Problem We Solve
Romanian entrepreneurs (700K+ active PFAs, hundreds of thousands of small SRLs) pay monthly for accounting services they wouldn't need if they understood the fiscal system. They live with three permanent fears:

1. **Fear of making mistakes** — "If I file something wrong, ANAF will fine me."
2. **Fear of not knowing** — "I don't know what declarations I have, when, and how much I owe."
3. **Fear of running out of money** — "I don't know how much I can take out without being unable to pay taxes."

Prevo eliminates fear at the source — through knowledge, not delegation.

## Core Principle: Read-Only Data, Smarter Education
Prevo reads data (ANAF e-Factura) to power smarter education — it never becomes a bookkeeping tool. Users manage invoices in their accounting tool; Prevo translates that data into plain-language fiscal insights.

## Target Users

### Primary — PFA owners
Freelancer IT, consultant, designer, creator with active PFA. 1–20 transactions/month. Pays 30–100 EUR/month for accounting they could handle in 2–3 hours/year.

MVP regimes: PFA norma de venit, PFA sistem real, PFA TVA payer / non-payer.

### Secondary — SRL microenterprise
Sole associate, 0 employees, simple services. Can't plan dividends due to no visibility on future quarterly obligations. Pays 70–100 EUR/month for accounting.

MVP regimes: SRL micro 1%/3%, no employees, non-TVA payer.

## Core Value Proposition
Independence over delegation. Prevo doesn't sell cheaper accounting — it sells **the last time you need an accountant.**

| | Competitors (SOLO/StartCo/Keez) | Prevo |
|---|---|---|
| Model | Delegation — someone does it for you | Education — you do it, knowing how |
| User understands? | No (intentionally) | Yes (that's the whole product) |
| Scales without people? | No | Yes |
| Cost | 30–100 EUR/month | 25–40 lei/month |
| Long-term result | Permanent dependency | Permanent independence |

## MVP Features

### PFA Features
- Fiscal profile onboarding (5 min: entity type, regime, TVA, CAEN)
- Personalized fiscal calendar (your deadlines, 30 days ahead)
- Live tax estimator (add income → see what to set aside)
- Interactive D212 guides (each field explained, auto calculations, file ready to submit)
- e-Factura sync (OAuth2 with SPV ANAF) — read-only, powers estimator and calendar
- Legislative alerts (relevant OUGs translated to concrete impact)
- Fiscal library (terms explained in normal Romanian)

### SRL Features
- Dividend simulator (input amount → net in hand + all taxes + payment timeline)
- Fiscal cash flow (visibility on all future quarterly obligations)
- Sole Associate Decision generator (pre-filled document, signed, archived)
- Quarterly D100 calendar (micro tax calculated on current revenue)
- CASS dividend estimator (6/60 minimum wage threshold, auto warning)

## ANAF API Integration
- `logincert.anaf.ro` — OAuth2 auth with qualified digital certificate
- `api.anaf.ro` — e-Factura download (read-only), SPV message listing
- `webserviced.anaf.ro/SPVWS2` — fiscal vector reading, obligations status, declaration duplicates

ANAF data is consumed read-only to power the estimator, alerts, and calendar with real numbers. Prevo never stores, manages, or displays invoices as a ledger.

Limitation: declaration submission is not available programmatically. Prevo pre-fills everything and guides the user to the final click in SPV.

## Business Model

| Tier | Price | Includes |
|---|---|---|
| Free (forever) | 0 | Personalized fiscal calendar, deadline alerts, fiscal library, 1 profile |
| Annual | 299 lei/year (~25 lei/mo) | Interactive declaration guides, auto tax calculations, e-Factura sync, legislative alerts, export ready-to-submit files, dividend simulator (SRL) |
| Lifetime | 799 lei | Everything in Annual + all future updates + beta access |

Validation: Landing page with waitlist. Target: 200 emails in 30 days organic.

## MVP Phases

### Phase 1 — PFA only (months 1-3)
- Fiscal profile onboarding PFA
- Personalized fiscal calendar
- Live annual tax estimator
- Interactive D212 guide with calculations
- Export file + SPV submission instructions
- Email deadline alerts

### Phase 2 — ANAF Integration (months 3-5)
- OAuth2 with SPV ANAF
- Auto e-Factura sync (read-only — data feeds estimator, alerts, calendar)
- Fiscal vector reading from SPV
- Automatic legislative alerts

### Phase 3 — SRL (months 5-8)
- SRL micro profile onboarding
- Complete dividend simulator
- Quarterly D100 calendar
- Sole Associate Decision generator
- Visual fiscal cash flow

## Success Metrics (6 months)

| Metric | Target |
|---|---|
| Registered users | 500+ |
| Paying subscribers | 100+ |
| ARR | ~30,000 lei |
| Annual churn | <20% |
| NPS | >50 |

## Out of Scope (v1)
- Mobile app
- Complex entities (monthly TVA, multiple employees, import/export)
- Actual declaration submission via API (ANAF limitation)
- Replacing invoicing software (SmartBill mandatory via e-Factura)
- Transaction ledgers, invoice management, or any bookkeeping features
