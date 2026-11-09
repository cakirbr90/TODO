# Coding Standards

## General
- TypeScript `strict: true`; no `any` (use `unknown` + narrowing).
- ESLint + Prettier (2 spaces, single quotes, semicolons, width 100). CI fails on lint errors.
- Small functions, single responsibility; early returns over nesting.
- Comments: none if naming is self-explanatory; otherwise max 3 lines explaining *why*.
- No dead code, no commented-out code, no `console.log` (use the logger).

## Naming
| Item | Convention | Example |
|---|---|---|
| Files (ts) | kebab-case | `todo.service.ts` |
| Vue components | PascalCase | `TodoItem.vue` |
| Variables/functions | camelCase | `findTodosByUser` |
| Types/Classes | PascalCase | `TodoDto`, `NotFoundError` |
| Constants | UPPER_SNAKE | `MAX_PAGE_SIZE` |
| DB columns | camelCase (Prisma default) | `createdAt` |

## Backend
- Async handlers wrapped (or Express 5 native async) — errors go to `errorHandler`.
- Throw typed errors: `ValidationError`, `UnauthorizedError`, `NotFoundError`, `ConflictError`.
- Input validation via `validate(schema)` middleware with shared Zod schemas.
- Repositories return Prisma models; services map to DTOs.
- Logging: `pino`, structured JSON; never log passwords, tokens, emails.

## Frontend
- `<script setup lang="ts">` only; no Options API.
- Stores own API calls; components call store actions.

## Dependencies
- Prefer well-maintained libs; justify each new dependency in the PR.
- Lock file committed; exact versions resolved by pnpm.
