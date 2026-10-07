# DAY 02 — DATABASE FOUNDATION

Status: NOT VERIFIED
Implementation: COMPLETE (unverified)
Migration: NOT RUN
Tests: NOT RUN
Lint: NOT RUN
Build: NOT RUN

Database:
PostgreSQL / Supabase-compatible (postgres.js, plain SQL migrations, no ORM)

Created files:
- db/migrations/0001_foundation.sql
- scripts/migrate.mjs
- src/lib/db/client.ts, schema.ts
- src/lib/db/client.test.ts (unit), schema.test.ts (static migration check, unit), constraints.integration.test.ts (integration; skipped without TEST_DATABASE_URL)
- .env.example
- docs/days/DAY_02.md

Modified files:
- package.json (dependency `postgres`, script `db:migrate`)
- PROJECT_STATE.md

Tables:
- accounts (id, email, status, last_login_at, created_at, updated_at, deleted_at)
- members (id, account_id, full_name, created_at, updated_at, deleted_at)
- member_cards (id, member_id, card_code, status, issued_at, created_at, updated_at)

Constraints:
- UUID primary keys (gen_random_uuid), same type for all foreign keys
- members.account_id → accounts.id, member_cards.member_id → members.id; both ON DELETE RESTRICT and UNIQUE (1 account : 1 member : 1 card)
- Unique lower(email); unique card_code
- CHECK: status lists (accounts: active/inactive/locked/pending/restricted; cards: active/inactive/revoked), non-blank email/full_name/card_code
- NOT NULL on required columns; timestamptz defaults to database now(); updated_at maintained by trigger
- Soft delete via deleted_at on accounts and members

Indexes:
- accounts_email_key (unique, lower(email)); unique indexes implied by UNIQUE on members.account_id, member_cards.member_id, member_cards.card_code. No other indexes yet.

Known issues:
- Migration never executed; SQL syntax and constraint behaviour unverified.
- Dependency versions unverified.
- Deferred departments/positions/member_positions to DAY 09–10.
- member_cards has no deleted_at: cards are revoked via status.

Environment limitations:
- No network (cannot npm install) and no PostgreSQL in the sandbox. No credentials were used or invented.

How to verify locally:
1. npm install
2. Copy .env.example to .env.local, set DATABASE_URL, then `npm run db:migrate`
3. Set TEST_DATABASE_URL (migrated disposable DB), then `npm run lint && npm run test && npm run build`

Instructions for DAY 03:
Continue from this exact project.
Do not replace the project.
Implement Time Engine + Terms + Quarters only.
