# API Specification

Base URL: `/api/v1` · JSON · Auth: `Authorization: Bearer <accessToken>` unless marked public.

## Error Format
```json
{ "error": { "code": "VALIDATION_ERROR", "message": "Human readable", "details": [] } }
```
| HTTP | code |
|---|---|
| 400 | VALIDATION_ERROR |
| 401 | UNAUTHORIZED |
| 403 | FORBIDDEN |
| 404 | NOT_FOUND |
| 409 | CONFLICT |
| 429 | RATE_LIMITED |
| 500 | INTERNAL_ERROR (no stack trace in response) |

## Auth (public)

### POST /auth/register
Req: `{ "email": string, "password": string }` → **201** `{ "user": UserDto }` · 409 if email exists.

### POST /auth/login
Req: `{ "email", "password" }` → **200** `{ "accessToken": string, "user": UserDto }` + `Set-Cookie: refreshToken` · 401 generic "Invalid credentials".

### POST /auth/refresh
Cookie `refreshToken` → **200** `{ "accessToken" }` + rotated cookie · 401.

### POST /auth/logout
Cookie `refreshToken` → **204**, cookie cleared.

### GET /auth/me (auth)
→ **200** `{ "user": UserDto }`

## Todos (auth, always scoped to current user)

### GET /todos
Query: `page=1`, `limit=20 (max 100)`, `status=TODO|DONE`, `priority=LOW|MEDIUM|HIGH`, `q=<title search>`, `sort=createdAt|dueDate|priority`, `order=asc|desc`
→ **200**
```json
{ "data": [TodoDto], "meta": { "page": 1, "limit": 20, "total": 42 } }
```

### POST /todos
Req: `{ "title": string, "description"?: string, "priority"?: Priority, "dueDate"?: ISO8601 }` → **201** `TodoDto`

### GET /todos/:id
→ **200** `TodoDto` · 404 if missing or not owned.

### PATCH /todos/:id
Req: any subset of `{ title, description, priority, dueDate, status }` → **200** `TodoDto`

### PATCH /todos/:id/toggle
→ **200** `TodoDto` (status flipped, `completedAt` updated)

### DELETE /todos/:id
→ **204**

## DTOs
```ts
type UserDto = { id: string; email: string; createdAt: string };
type TodoDto = {
  id: string; title: string; description: string | null;
  status: 'TODO' | 'DONE'; priority: 'LOW' | 'MEDIUM' | 'HIGH';
  dueDate: string | null; completedAt: string | null;
  createdAt: string; updatedAt: string;
};
```
Zod schemas for all requests/DTOs live in `packages/shared`.

## Health
`GET /health` (public) → `{ "status": "ok" }`
