# SWARM_AWARENESS -- pricepo-ro

> **READ ONLY for epic agents. Only `@meto-pm` and checkpoint protocol may write here.**
> Parsed by `npx meto-cli status` -- keep section headers and format exact.

---

## [swarm:meta]
- **Project:** pricepo-ro
- **Mode:** swarm
- **Started:** 2026-03-11
- **Total epics:** 7
- **Total tasks:** 5
- **Acceptance criteria:** 3 / 5 passed

---

## [swarm:epics]

| Epic ID | Name | Agent | Status | Tasks Done | Blocker |
|---|---|---|---|---|---|
| E1 | Project Setup | @meto-epic-e1 | on-track | 3/5 | none |
| E2 | Auth & Fiscal Profile | @meto-epic-e2 | not-started | 0 | E1 |
| E3 | Core PFA Features | @meto-epic-e3 | not-started | 0 | E1, E2 |
| E4 | Landing Page & Validation | @meto-epic-e4 | not-started | 0 | E1 |
| E5 | Deploy & Production | @meto-epic-e5 | not-started | 0 | E1 |
| E6 | ANAF Integration | @meto-epic-e6 | not-started | 0 | E2, E3 |
| E7 | SRL Features | @meto-epic-e7 | not-started | 0 | E2, E3 |

Status values: `not-started` · `on-track` · `blocked` · `complete`

---

## [swarm:domains]

See full ownership rules in `ai/swarm/domain-map.md`.

| Epic ID | Owns |
|---|---|
| E1 | `/src/lib/`, `/src/config/`, root config files |
| E2 | `/src/app/(auth)/`, `/src/app/onboarding/`, `/src/components/auth/`, `/src/components/onboarding/` |
| E3 | `/src/app/(dashboard)/`, `/src/components/calendar/`, `/src/components/estimator/`, `/src/components/d212/` |
| E4 | `/src/app/(marketing)/`, `/src/components/landing/`, `/src/components/waitlist/` |
| E5 | `/vercel.json`, `/.github/`, deployment configs |
| E6 | `/src/lib/anaf/`, `/src/app/api/anaf/`, `/src/components/anaf/` |
| E7 | `/src/app/(dashboard)/srl/`, `/src/components/srl/`, `/src/lib/fiscal/srl/` |

---

## [swarm:checkpoints]

Append only. Never delete entries. One line per checkpoint.

```
2026-03-11 | E1 | done:0 | status:on-track | blocker:none | note:E1 sliced into 5 tasks, placed in tasks-todo.md
2026-03-11 | E1 | done:3 | status:on-track | blocker:none | note:slice-001 (Next.js init), slice-002 (Tailwind v4 tokens), slice-003 (Supabase client) completed. Remaining: slice-005 (ESLint), slice-004 (folder structure)
```

---

## [swarm:conflicts]

```
```

---

## [swarm:log]

Free text. Epic agents append observations, decisions, or notes here.

```
2026-03-11 | PM | E1 sliced into 5 tasks: slice-001 (Next.js init), slice-002 (Tailwind), slice-003 (Supabase client), slice-004 (folder structure), slice-005 (ESLint). Tasks ordered by dependency -- slice-001 first (no deps), then slice-002/003/005 can run in parallel, slice-004 depends on 001+002.
```
