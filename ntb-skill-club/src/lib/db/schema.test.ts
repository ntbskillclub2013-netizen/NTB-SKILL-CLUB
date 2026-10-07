/** @jest-environment node */
import { readFileSync } from "node:fs";
import path from "node:path";
import { ACCOUNT_STATUSES, CARD_STATUSES } from "./schema";

// Static check of the migration text (unit test, NOT a database test).
const sql = readFileSync(path.join(process.cwd(), "db/migrations/0001_foundation.sql"), "utf8");

const tableBody = (name: string) => sql.match(new RegExp(`CREATE TABLE ${name} \\(([\\s\\S]*?)\\n\\);`))?.[1] ?? "";
const checkValues = (body: string) =>
  [...(body.match(/status IN \(([^)]*)\)/)?.[1].matchAll(/'(\w+)'/g) ?? [])].map((m) => m[1]);

describe("0001_foundation.sql (static)", () => {
  it.each(["accounts", "members", "member_cards"])("%s has a uuid primary key and timestamptz metadata", (t) => {
    const body = tableBody(t);
    expect(body).toMatch(/id\s+uuid PRIMARY KEY/);
    expect(body).toMatch(/created_at\s+timestamptz NOT NULL/);
    expect(body).toMatch(/updated_at\s+timestamptz NOT NULL/);
  });

  it("keeps status lists in sync with TypeScript constants", () => {
    expect(checkValues(tableBody("accounts"))).toEqual([...ACCOUNT_STATUSES]);
    expect(checkValues(tableBody("member_cards"))).toEqual([...CARD_STATUSES]);
  });

  it("enforces relationships with RESTRICT foreign keys", () => {
    expect(tableBody("members")).toMatch(/account_id uuid NOT NULL UNIQUE REFERENCES accounts \(id\) ON DELETE RESTRICT/);
    expect(tableBody("member_cards")).toMatch(/member_id\s+uuid NOT NULL UNIQUE REFERENCES members \(id\) ON DELETE RESTRICT/);
  });

  it("enforces case-insensitive unique email and unique card code", () => {
    expect(sql).toMatch(/CREATE UNIQUE INDEX accounts_email_key ON accounts \(lower\(email\)\)/);
    expect(tableBody("member_cards")).toMatch(/card_code\s+text NOT NULL UNIQUE/);
  });

  it("does not create future-day tables", () => {
    expect([...sql.matchAll(/CREATE TABLE (\w+)/g)].map((m) => m[1])).toEqual(["accounts", "members", "member_cards"]);
  });
});
