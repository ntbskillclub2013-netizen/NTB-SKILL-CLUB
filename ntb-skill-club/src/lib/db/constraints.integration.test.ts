/** @jest-environment node */
// Integration test: needs a real PostgreSQL with migrations applied (npm run db:migrate).
// Skipped unless TEST_DATABASE_URL is set. Every case runs in a transaction that is rolled back.
import postgres from "postgres";

const url = process.env.TEST_DATABASE_URL;
const run = url ? describe : describe.skip;

run("database constraints (integration)", () => {
  const sql = postgres(url ?? "postgresql://unused", { max: 1 });
  afterAll(() => sql.end());

  const inRollback = async (fn: (tx: postgres.TransactionSql) => Promise<void>) => {
    const rollback = new Error("rollback");
    await sql.begin(async (tx) => {
      await fn(tx);
      throw rollback;
    }).catch((e) => {
      if (e !== rollback) throw e;
    });
  };

  it("rejects duplicate emails regardless of case", async () => {
    await inRollback(async (tx) => {
      await tx`INSERT INTO accounts (email) VALUES ('a@example.test')`;
      await expect(tx`INSERT INTO accounts (email) VALUES ('A@Example.test')`).rejects.toThrow();
    });
  });

  it("rejects an invalid account status", async () => {
    await inRollback(async (tx) => {
      await expect(tx`INSERT INTO accounts (email, status) VALUES ('b@example.test', 'bogus')`).rejects.toThrow();
    });
  });

  it("requires an existing account and allows one member per account", async () => {
    await inRollback(async (tx) => {
      await expect(
        tx`INSERT INTO members (account_id, full_name) VALUES (gen_random_uuid(), 'Test')`,
      ).rejects.toThrow();
    });
    await inRollback(async (tx) => {
      const [{ id }] = await tx`INSERT INTO accounts (email) VALUES ('c@example.test') RETURNING id`;
      await tx`INSERT INTO members (account_id, full_name) VALUES (${id}, 'Test')`;
      await expect(tx`INSERT INTO members (account_id, full_name) VALUES (${id}, 'Test 2')`).rejects.toThrow();
    });
  });
});
