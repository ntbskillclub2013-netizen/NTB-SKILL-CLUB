/** @jest-environment node */
import { getDatabaseUrl } from "./client";

describe("getDatabaseUrl (unit)", () => {
  it("throws when DATABASE_URL is missing", () => {
    expect(() => getDatabaseUrl({})).toThrow("DATABASE_URL");
  });

  it("rejects non-PostgreSQL URLs", () => {
    expect(() => getDatabaseUrl({ DATABASE_URL: "mysql://x" })).toThrow("PostgreSQL");
  });

  it("returns a postgres URL", () => {
    expect(getDatabaseUrl({ DATABASE_URL: "postgresql://u:p@h:5432/db" })).toBe("postgresql://u:p@h:5432/db");
  });
});
