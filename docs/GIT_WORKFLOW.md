# Git Workflow

## Branches
- `main` — always releasable, protected; no direct pushes.
- Feature branches from `main`:
  `feat/<roadmap-id>-<short-desc>` · `fix/<short-desc>` · `chore/...` · `docs/...` · `test/...`
  Example: `feat/P1-2-login-endpoint`

## Commits — Conventional Commits
```
<type>(<scope>): <subject>
```
Types: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `ci`, `perf`.
Scopes: `api`, `web`, `shared`, `db`, `infra`, `docs`.
Example: `feat(api): add POST /todos endpoint`

## Pull Requests
- One ROADMAP item per PR; keep < ~400 changed lines when possible.
- Fill [.github/pull_request_template.md](../.github/pull_request_template.md).
- Required before merge: lint, typecheck, tests green; Metis review approved; no security findings.
- Merge strategy: **squash merge**; PR title follows Conventional Commits.
- Delete branch after merge.
