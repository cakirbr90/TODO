# Roadmap / Task Backlog

Agents pick the **first unchecked item** in the lowest open phase. One item = one branch = one PR. Tick `[x]` when merged.

## Phase 0 — Setup
- [x] **P0-1** pnpm monorepo (`apps/api`, `apps/web`, `packages/shared`), root tsconfig, ESLint, Prettier
- [ ] **P0-2** `docker-compose.yml` with PostgreSQL 16 (+ `todo_test` DB), `.env.example` files
- [ ] **P0-3** API skeleton: Express app factory, env config (Zod), pino logger, errorHandler, `/health`, Vitest
- [ ] **P0-4** Prisma init + schema from [DATA_MODEL.md](DATA_MODEL.md) + first migration + seed (fake data)
- [ ] **P0-5** Web skeleton: Vite + Vue 3 + TS + Pinia + Router + Vitest; styling choice documented in ADR
- [ ] **P0-6** CI (GitHub Actions): install, lint, typecheck, test, `pnpm audit`

## Phase 1 — Auth (API)
- [ ] **P1-1** Shared Zod schemas for auth (`packages/shared`)
- [ ] **P1-2** `POST /auth/register`
- [ ] **P1-3** `POST /auth/login` + refresh token cookie
- [ ] **P1-4** `POST /auth/refresh` (rotation + reuse detection), `POST /auth/logout`
- [ ] **P1-5** `auth` middleware + `GET /auth/me`
- [ ] **P1-6** Security middleware: helmet, CORS, rate limit

## Phase 2 — Todos (API)
- [ ] **P2-1** Shared Zod schemas for todos
- [ ] **P2-2** `POST /todos`, `GET /todos/:id`
- [ ] **P2-3** `GET /todos` with pagination, filters, search, sort
- [ ] **P2-4** `PATCH /todos/:id`, `PATCH /todos/:id/toggle`
- [ ] **P2-5** `DELETE /todos/:id`
- [ ] **P2-6** Ownership + 401 integration tests for all todo endpoints

## Phase 3 — Frontend
- [ ] **P3-1** API client (axios + interceptors + silent refresh)
- [ ] **P3-2** `auth` store, Login & Register views, route guards
- [ ] **P3-3** `todos` store, TodosView with list, pagination, empty/loading/error states
- [ ] **P3-4** TodoForm (create/edit) with shared Zod validation
- [ ] **P3-5** Toggle (optimistic) & delete with confirm
- [ ] **P3-6** Filters, search, sort UI
- [ ] **P3-7** Responsive layout + accessibility pass

## Phase 4 — Quality & Release
- [ ] **P4-1** Playwright E2E for critical paths ([TESTING.md](TESTING.md))
- [ ] **P4-2** Coverage thresholds enforced in CI
- [ ] **P4-3** Security scan (Ares) & fixes
- [ ] **P4-4** Dockerfiles for api & web, full `docker compose up`
- [ ] **P4-5** README & docs final review
