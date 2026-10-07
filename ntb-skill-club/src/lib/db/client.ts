import postgres from "postgres";

// Server-only: DATABASE_URL is not NEXT_PUBLIC_*, so it never reaches the browser.
export function getDatabaseUrl(env: NodeJS.ProcessEnv = process.env): string {
  const url = env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL chưa được thiết lập. Xem .env.example.");
  if (!/^postgres(ql)?:\/\//.test(url)) throw new Error("DATABASE_URL phải là chuỗi kết nối PostgreSQL.");
  return url;
}

let sql: ReturnType<typeof postgres> | undefined;

export function getDb() {
  sql ??= postgres(getDatabaseUrl());
  return sql;
}
