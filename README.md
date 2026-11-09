# Todo App

Full-stack todo application: **Vue 3 + Node.js (Express) + PostgreSQL**, JWT authentication.

## Requirements
- Node.js 20 LTS, pnpm 9
- Docker (for PostgreSQL)

## Setup
```bash
pnpm install
cp apps/api/.env.example apps/api/.env      # fill in local values
cp apps/web/.env.example apps/web/.env
docker compose up -d db
pnpm --filter api prisma migrate dev
```

## Run
```bash
pnpm --filter api dev   # http://localhost:3000
pnpm --filter web dev   # http://localhost:5173
```

## Test
```bash
pnpm lint && pnpm typecheck && pnpm test
pnpm --filter web test:e2e
```

## Documentation
- Agent rules: [CLAUDE.md](CLAUDE.md)
- Docs: [docs/](docs/)
