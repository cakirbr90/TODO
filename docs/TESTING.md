# Testing

## Tools
| Scope | Tool | Location |
|---|---|---|
| API unit (services) | Vitest | `apps/api/src/**/*.test.ts` |
| API integration (HTTP + DB) | Vitest + Supertest | `apps/api/tests/integration/` |
| Web unit (stores, composables, components) | Vitest + Vue Test Utils | `apps/web/src/**/*.test.ts` |
| E2E | Playwright | `apps/web/e2e/` |

## Rules
- Every ROADMAP item ships with tests.
- Integration tests use a separate DB (`DATABASE_URL` → `todo_test`), migrated and truncated before each suite.
- Test data is fake only (`user1@example.test`, faker). No real/personal/production data.
- Each todo endpoint must have an **ownership test**: user B cannot read/update/delete user A's todo (→ 404).
- Each auth-protected endpoint has a 401 test without token.
- No network calls to external services in unit tests.

## Coverage
- `apps/api` services: ≥ 80% lines.
- `apps/web` stores: ≥ 70% lines.

## E2E Critical Paths
1. Register → login → see empty list.
2. Create, edit, toggle, delete todo.
3. Filter by status; search by title.
4. Access token expiry → silent refresh works.
5. Logout → protected route redirects to `/login`.

## Commands
```bash
pnpm test                      # all unit + integration
pnpm --filter api test:cov
pnpm --filter web test:e2e
```
