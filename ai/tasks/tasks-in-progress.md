# Tasks In Progress

---

## [slice-004] -- Establish Project Folder Structure and Shared Layout
**Epic:** E1 | **Size:** S | **Depends on:** slice-001, slice-002
**Started: 2026-03-11 | Agent: meto-epic-E1**

**User Story**
As a developer, I want the folder structure and root layout established, so that all epics have clear directories to work in without conflicts.

**Acceptance Criteria**
- [ ] Route groups created: `src/app/(marketing)/`, `src/app/(auth)/`, `src/app/(dashboard)/`
- [ ] Root layout (`src/app/layout.tsx`) configured with HTML lang="ro", meta charset, viewport, and base metadata (title: "Fiskio", description in Romanian)
- [ ] Placeholder `page.tsx` in each route group so the routes resolve
- [ ] `src/components/` directory created with `ui/` subfolder
- [ ] `src/lib/` directory exists with `supabase/` subfolder (from slice-003)
- [ ] `src/types/` directory created for shared TypeScript types
- [ ] Folder structure matches the domain map in `ai/swarm/domain-map.md`
