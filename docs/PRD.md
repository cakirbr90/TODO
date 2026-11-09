# Product Requirements (PRD)

## Goal
A simple, secure todo app where authenticated users manage their personal tasks.

## Users
- **Registered user** — manages own todos only.

## MVP Scope

### Auth
| ID | User Story | Acceptance Criteria |
|---|---|---|
| AUTH-1 | As a visitor, I can register with email + password. | Email unique & valid; password ≥ 8 chars, 1 letter + 1 digit; returns 201; password stored hashed. |
| AUTH-2 | As a user, I can log in. | Valid credentials → access + refresh token; invalid → 401 with generic message. |
| AUTH-3 | As a user, my session refreshes silently. | Expired access token + valid refresh → new token pair; invalid refresh → 401, redirect to login. |
| AUTH-4 | As a user, I can log out. | Refresh token revoked; client clears tokens. |

### Todos
| ID | User Story | Acceptance Criteria |
|---|---|---|
| TODO-1 | I can create a todo. | Title required (1–200 chars); optional description (≤ 2000), priority (LOW/MEDIUM/HIGH, default MEDIUM), dueDate. |
| TODO-2 | I can list my todos. | Only own todos; paginated (default 20); sorted by createdAt desc. |
| TODO-3 | I can filter/search todos. | Filter by status, priority; search in title; sort by dueDate/priority/createdAt. |
| TODO-4 | I can edit a todo. | Partial update; 404 if not found or not owned. |
| TODO-5 | I can toggle completion. | Status TODO ↔ DONE; `completedAt` set/cleared. |
| TODO-6 | I can delete a todo. | Hard delete; 204; 404 if not owned. |

### UI
| ID | Requirement |
|---|---|
| UI-1 | Responsive (mobile ≥ 360px, desktop). |
| UI-2 | Loading, empty and error states on every list/form. |
| UI-3 | Form validation feedback inline. |
| UI-4 | Basic accessibility: labels, keyboard navigation, focus states. |

## Non-Functional
- API p95 < 200 ms locally for list endpoints.
- No PII in logs.
- Test coverage ≥ 80% on api services.

## Out of Scope (MVP)
Sharing/collaboration, tags/categories, attachments, reminders/notifications, OAuth/social login, password reset email.
