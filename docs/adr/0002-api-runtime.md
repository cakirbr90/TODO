# ADR 0002 — API Runtime and Build

- **Status:** Accepted
- **Date:** 2026-11-09

## Context
The base tsconfig uses `module: ESNext` with `moduleResolution: Bundler` and `noEmit`. Plain Node 20 ESM cannot run such output directly, and `@todo/shared` is consumed as TypeScript source.

## Decision
- Run the API with `tsx` (`dev`: `tsx watch`, `start`: `tsx`) on Node 20+; no emit step. `tsc` is used for type checking only.
- `packages/shared` exposes its TypeScript source through `main`/`types`/`exports`; consumers resolve it via `workspace:*`.
- Local imports in the API use `.js` extensions so the code stays valid if an emit build is added later.
- Env is loaded with `dotenv` in `server.ts` only; `config/env.ts` validates via Zod and stays pure so tests need no `.env`.

## Consequences
- Simple dev/prod parity, no build artefacts. Slightly higher startup cost than compiled JS.
- If a compiled production image is required, add a `tsc`/bundler build and a NodeNext or bundled output in a new ADR.
