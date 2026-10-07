// Applies db/migrations/*.sql in filename order. Each file runs in one transaction
// and is recorded in schema_migrations, so re-running only applies new files.
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import postgres from "postgres";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL chưa được thiết lập. Xem .env.example.");
  process.exit(1);
}

const dir = path.join(import.meta.dirname, "..", "db", "migrations");
const files = (await readdir(dir)).filter((f) => f.endsWith(".sql")).sort();
const sql = postgres(url, { max: 1, onnotice: () => {} });

try {
  await sql`CREATE TABLE IF NOT EXISTS schema_migrations (
    name text PRIMARY KEY,
    applied_at timestamptz NOT NULL DEFAULT now()
  )`;
  const applied = new Set((await sql`SELECT name FROM schema_migrations`).map((r) => r.name));

  for (const file of files) {
    if (applied.has(file)) continue;
    const body = await readFile(path.join(dir, file), "utf8");
    await sql.begin(async (tx) => {
      await tx.unsafe(body);
      await tx`INSERT INTO schema_migrations (name) VALUES (${file})`;
    });
    console.log(`Applied ${file}`);
  }
  console.log("Migrations up to date.");
} finally {
  await sql.end();
}
