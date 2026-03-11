# Definition of Done — pricepo-ro

Every task must meet these criteria before moving to done.

## Universal Checks
- [ ] TypeScript compiles with no errors (`npx tsc --noEmit`)
- [ ] No `any` types in changed files
- [ ] No `console.log` in committed code
- [ ] No commented-out code in committed files
- [ ] Error states handled (loading, empty, error UI)

## Stack-Specific Checks
- [ ] Supabase migrations applied and tested locally
- [ ] Environment variables documented in `.env.example`
- [ ] Responsive on mobile (tested at 375px width minimum)
- [ ] API routes return proper HTTP status codes
- [ ] Row-level security policies reviewed for new tables
