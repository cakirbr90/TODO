# ADR 0001 — Tech Stack

- **Status:** Accepted
- **Date:** 2026-11-09

## Context
We need a full-stack todo app with authentication, developed mainly by AI agents (Pantheon). The stack must be popular (good model knowledge), type-safe end to end, and easy to test.

## Decision
- **Frontend:** Vue 3 + Vite + TypeScript + Pinia + Vue Router
- **Backend:** Node.js 20 + Express + TypeScript + Zod
- **ORM/DB:** Prisma + PostgreSQL 16
- **Auth:** JWT access token + rotating refresh token (httpOnly cookie)
- **Monorepo:** pnpm workspaces with `packages/shared` for Zod schemas/types
- **Tests:** Vitest, Supertest, Playwright

## Alternatives Considered
- NestJS + TypeORM — more structure, but heavier for a small app.
- Plain JS + `pg` — no type safety, more runtime bugs from agents.

## Consequences
- + Shared schemas keep API and UI contracts in sync.
- + Prisma migrations give a clear, reviewable DB history.
- − Express needs manual structure; enforced via [ARCHITECTURE.md](../ARCHITECTURE.md).
