# CLAUDE.md — Agent Rules for Todo App

This is the **primary rule file** for all agents (Pantheon: Zeus, Athena, Prometheus, Themis, Metis, Charon, Ares, Heracles). Read it fully before any task.

## Project
Full-stack Todo app with JWT auth. Each user sees only their own todos.

## Stack
| Layer | Tech |
|---|---|
| Frontend | Vue 3 (Composition API, `<script setup>`), Vite, TypeScript, Pinia, Vue Router, Axios |
| Backend | Node.js 20 LTS, Express, TypeScript, Prisma ORM, Zod |
| Database | PostgreSQL 16 |
| Auth | JWT (access + refresh), bcrypt |
| Test | Vitest, Supertest, Playwright |
| Tooling | pnpm workspaces, ESLint, Prettier, Docker Compose |

## Repository Layout
```
apps/
  api/        # Express + Prisma backend
  web/        # Vue 3 frontend
packages/
  shared/     # Shared TS types & Zod schemas (DTOs)
docs/         # Project documentation (source of truth)
docker-compose.yml
```

## Commands
```bash
pnpm install                 # install all
docker compose up -d db      # start PostgreSQL
pnpm --filter api dev        # backend  → http://localhost:3000
pnpm --filter web dev        # frontend → http://localhost:5173
pnpm --filter api prisma migrate dev
pnpm test                    # all unit/integration tests
pnpm lint && pnpm typecheck
pnpm --filter web test:e2e   # Playwright
```

## Source-of-Truth Documents
| Topic | File |
|---|---|
| Requirements | [docs/PRD.md](docs/PRD.md) |
| Architecture | [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) |
| Data model | [docs/DATA_MODEL.md](docs/DATA_MODEL.md) |
| API contract | [docs/API_SPEC.md](docs/API_SPEC.md) |
| Frontend | [docs/FRONTEND.md](docs/FRONTEND.md) |
| Coding standards | [docs/CODING_STANDARDS.md](docs/CODING_STANDARDS.md) |
| Testing | [docs/TESTING.md](docs/TESTING.md) |
| Security | [docs/SECURITY.md](docs/SECURITY.md) |
| Git workflow | [docs/GIT_WORKFLOW.md](docs/GIT_WORKFLOW.md) |
| Task backlog | [docs/ROADMAP.md](docs/ROADMAP.md) |
| Decisions | [docs/adr/](docs/adr/) |

If code and docs disagree, **docs win** — or update the doc in the same PR with justification.

## Agent Workflow
1. **Pick task** from [docs/ROADMAP.md](docs/ROADMAP.md) (first unchecked item in the lowest open phase).
2. **Plan** — list files to touch; check API_SPEC / DATA_MODEL for contracts.
3. **Implement** on a feature branch (see GIT_WORKFLOW).
4. **Test** — add/update tests; `pnpm lint && pnpm typecheck && pnpm test` must pass.
5. **Commit & PR** — Conventional Commits, fill PR template.
6. **Review** — Metis reviews against CODING_STANDARDS + SECURITY.
7. **Mark done** — tick the item in ROADMAP.md.

## Hard Rules
- TypeScript strict mode everywhere; no `any` without justification.
- Validate all external input with Zod (shared schemas in `packages/shared`).
- Every todo query MUST be scoped by `userId` from the JWT.
- No secrets, credentials, real/production or personal data in code, tests, fixtures, logs or docs. Use `.env` (git-ignored) and `.env.example` with placeholders only.
- Comments: none if naming is self-explanatory; otherwise max 3 lines.
- Do not change the API contract or Prisma schema without updating the corresponding doc.
- Do not add new dependencies without a short reason in the PR description.
- Keep PRs small: one ROADMAP item per PR.
