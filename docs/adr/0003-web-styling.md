# ADR 0003 — Web Styling

- **Status:** Accepted
- **Date:** 2026-11-09

## Context
[FRONTEND.md](../FRONTEND.md) requires scoped CSS or a single utility library, chosen in Phase 0. The UI is small (auth forms, todo list, filters) and built mostly by AI agents.

## Decision
- Use Vue SFC `<style scoped>` with plain CSS. No utility or component library.
- Shared tokens (colors, spacing) go in CSS custom properties in a global stylesheet when first needed.

## Alternatives Considered
- Tailwind CSS — fast, but adds a dependency, build config and class-heavy templates for a small UI.
- Component library (Vuetify, PrimeVue) — heavy, imposes design and bundle size.

## Consequences
- + Zero extra dependencies; styles co-located with components.
- − No ready-made design system; consistency relies on BaseButton/BaseInput and CSS variables.
