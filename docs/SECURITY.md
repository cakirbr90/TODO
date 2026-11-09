# Security

Aligned with OWASP Top 10, GDPR and ISO 27001 principles.

## Authentication
- Passwords hashed with bcrypt (cost 12). Never stored or logged in plain text.
- Access JWT: 15 min, HS256, secret from env (`JWT_ACCESS_SECRET`, ≥ 32 random chars).
- Refresh token: random 256-bit, stored **hashed** in DB, httpOnly + Secure + SameSite=Strict cookie, rotated on every use; reuse of a revoked token revokes all user tokens.
- Login errors are generic ("Invalid credentials") — no user enumeration.

## Authorization
- Every todo query filters by `userId` from the verified JWT. Never trust `userId` from the request body/params.
- Not-owned resources return 404 (not 403) to avoid leaking existence.

## API Hardening
- `helmet`, CORS allowlist (`CORS_ORIGIN` env), JSON body limit 100kb.
- Rate limit: auth endpoints 10 req/min/IP; others 100 req/min/IP.
- Zod validation on all inputs; Prisma only (no raw SQL string concatenation).
- Error responses never include stack traces or internal details.

## Secrets & Data
- Secrets only in `.env` (git-ignored). `.env.example` contains placeholders only.
- No credentials, tokens, real/production or personal data in code, tests, seeds, logs, docs or commits.
- Logs: no passwords, tokens, emails; mask identifiers where needed.
- User deletion cascades todos and tokens (right to erasure).

## Frontend
- Access token kept in memory only (no localStorage/sessionStorage).
- No `v-html` with user content.

## Checks
- `pnpm audit` in CI (fail on high/critical).
- Secret scanning before merge (Ares agent).
