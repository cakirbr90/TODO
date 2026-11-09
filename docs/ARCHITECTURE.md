# Architecture

## Overview
```mermaid
flowchart LR
  B[Browser<br/>Vue 3 SPA] -- HTTPS/JSON --> A[Express API]
  A -- Prisma --> D[(PostgreSQL)]
```

## Monorepo
pnpm workspaces:
```
apps/api        Express backend
apps/web        Vue 3 frontend
packages/shared Zod schemas + inferred TS types (DTOs), used by api & web
```

## Backend Layers (`apps/api/src`)
```
app.ts                 # express app factory (no listen) → testable
server.ts              # listen()
config/env.ts          # Zod-validated env vars
routes/                # route definitions, attach middleware
controllers/           # HTTP in/out only, no business logic
services/              # business logic
repositories/          # Prisma access only
middlewares/           # auth, validate, errorHandler, rateLimit
errors/                # AppError classes
lib/prisma.ts          # PrismaClient singleton
```
Flow: `route → validate(zod) → auth → controller → service → repository → prisma`.

Rules:
- Controllers never import Prisma.
- Services throw `AppError` subclasses; `errorHandler` maps them to the format in [API_SPEC.md](API_SPEC.md).

## Frontend (`apps/web/src`)
See [FRONTEND.md](FRONTEND.md).

## Auth Flow
```mermaid
sequenceDiagram
  participant W as Web
  participant A as API
  W->>A: POST /api/v1/auth/login
  A-->>W: accessToken (body) + refreshToken (httpOnly cookie)
  W->>A: GET /api/v1/todos (Authorization: Bearer access)
  A-->>W: 401 (expired)
  W->>A: POST /api/v1/auth/refresh (cookie)
  A-->>W: new accessToken (+ rotated refresh cookie)
  W->>A: retry original request
```
- Access token: 15 min, kept in memory (Pinia).
- Refresh token: 7 days, httpOnly + Secure + SameSite=Strict cookie, stored hashed in DB, rotated on use.

## Environments
| Env | DB | Notes |
|---|---|---|
| local | docker compose | `.env` |
| test | separate DB `todo_test` | reset per test run |
