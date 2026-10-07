# PROJECT_STATE

Project: NTB SKILL CLUB
Current Day: 02
Current Phase: Database Foundation

## Stack
Next.js (App Router), React, TypeScript, ESLint (flat config), Jest + Testing Library, plain CSS with design tokens in `src/app/globals.css`.

Database: PostgreSQL (Supabase-compatible) via `postgres` (postgres.js). Migrations: plain SQL in `db/migrations/`, applied by `scripts/migrate.mjs` (`npm run db:migrate`, tracked in `schema_migrations`). No ORM.

## Current structure
- `src/app/` — layout, home, `/preview`, `globals.css`
- `src/components/` — Button, Card, Badge, Fields (Input/Select/Textarea), StatusBadge (+ test), States (Loading/Empty/Error)
- `src/lib/db/` — `client.ts` (server-only connection), `schema.ts` (status constants + row types), tests
- `db/migrations/0001_foundation.sql`, `scripts/migrate.mjs`, `.env.example`
- `docs/days/DAY_01.md`, `DAY_02.md`

## Tables actually created (migration written, NOT yet applied anywhere)
`accounts`, `members`, `member_cards`. Deferred: departments, positions, member_positions (DAY 09–10).

## Implemented foundation
NTB tokens (pastel red primary, pastel yellow accent), 6-status system with icon + label, shared components, Vietnamese UI text, responsive layout.

## Preview route
`/preview`

## Verification status
Lint: NOT RUN · Unit tests: NOT RUN · Build: NOT RUN · Migration: NOT RUN · Database connection: NOT VERIFIED · Integration tests: NOT RUN. Sandbox has no network and no PostgreSQL, so nothing could be installed or executed.

## Known issues
- Migration SQL has never run against a real PostgreSQL.
- Dependencies never installed; versions in `package.json` are unverified.
- Primary red is slightly deeper than pastel to keep white-text contrast readable.

## Next day
DAY 03 — Time Engine + Terms + Quarters only, continuing this codebase. First verify DAY 01/02 locally.
