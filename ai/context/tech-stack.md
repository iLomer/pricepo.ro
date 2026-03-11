# Tech Stack — Prevo (prevo.ro)

## Stack Overview

| Layer | Choice | Reason |
|---|---|---|
| UI | Next.js (React) | SSR for SEO ("fara contabil pfa", "declaratie unica pfa"), file-based routing, API routes built-in |
| API | Next.js API Routes | Co-located with frontend, serverless-ready, handles ANAF API calls |
| Database | Supabase (PostgreSQL) | Managed Postgres with real-time subscriptions, auto-generated APIs, fiscal profile per user |
| Auth | Supabase Auth | Built-in email/password, OAuth providers, row-level security for fiscal data |
| Hosting | Vercel | Zero-config Next.js deploys, edge functions, preview deployments |

## Key Libraries
- **Tailwind CSS** -- utility-first styling
- **TypeScript** -- strict mode throughout

## ANAF Integration Stack

| Service | Endpoint | Purpose |
|---|---|---|
| Auth | `logincert.anaf.ro` | OAuth2 with qualified digital certificate |
| e-Factura | `api.anaf.ro` | Upload/download invoices, list SPV messages |
| Fiscal data | `webserviced.anaf.ro/SPVWS2` | Fiscal vector, obligations status, declaration duplicates |

### ANAF Auth Flow
1. User authenticates once with qualified digital certificate
2. Prevo obtains OAuth2 token, stores securely in Supabase
3. Automatic sync from that point forward

### ANAF Limitation
Declaration submission is NOT available programmatically. Prevo pre-fills everything and guides the user to the final click in SPV.

## Key Decisions
| Decision | Choice | Reason |
|---|---|---|
| Language | Romanian only (v1) | Target users are Romanian, fiscal system is Romanian |
| SEO priority | High | Organic search is primary acquisition channel |
| Notifications | Email-first (MVP) | Push notifications in v2 |
| ANAF integration | Official APIs only | No scraping, legal and reliable |
