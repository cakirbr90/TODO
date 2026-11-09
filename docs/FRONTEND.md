# Frontend

Vue 3 + Vite + TypeScript + Pinia + Vue Router. Composition API with `<script setup lang="ts">` only.

## Structure (`apps/web/src`)
```
api/          # axios instance + typed endpoint functions (auth.ts, todos.ts)
stores/       # Pinia: auth.ts, todos.ts
router/       # routes + guards
views/        # page components (LoginView, RegisterView, TodosView, NotFoundView)
components/   # reusable UI (TodoItem, TodoForm, TodoFilters, Pagination, BaseButton, BaseInput)
composables/  # useXxx reusable logic
types/        # re-exports from packages/shared
```

## Routes
| Path | View | Guard |
|---|---|---|
| `/login` | LoginView | guest only |
| `/register` | RegisterView | guest only |
| `/` | TodosView | auth required |
| `/:pathMatch(.*)*` | NotFoundView | — |

## State
- `auth` store: `user`, `accessToken` (memory only, never localStorage), `login()`, `logout()`, `refresh()`, `fetchMe()`.
- `todos` store: `items`, `meta`, `filters`, `loading`, `error`, CRUD actions; optimistic update for toggle.

## API Client
- Axios instance `baseURL = import.meta.env.VITE_API_URL`, `withCredentials: true`.
- Request interceptor adds Bearer token.
- Response interceptor: on 401 → call `/auth/refresh` once (single in-flight promise), retry; on failure → logout + redirect `/login`.

## UI Rules
- Every async view shows loading, empty and error state.
- Form validation reuses Zod schemas from `packages/shared`.
- Components: PascalCase files, props typed with `defineProps<T>()`, emits typed.
- No business logic in components — use stores/composables.
- Accessibility: every input has a label; buttons are `<button>`; visible focus.
- Styling: scoped CSS or a single utility library chosen in Faz 0 (document in ADR).
