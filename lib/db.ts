import "server-only";
import postgres from "postgres";

/**
 * Direct Postgres connection via DATABASE_URL. Works identically against
 * local PostgreSQL and a Supabase project's connection string — the
 * migrations in supabase/migrations/ define the same schema either way.
 * Returns null when unconfigured so the public site degrades gracefully.
 */
declare global {
  var __gfSql: ReturnType<typeof postgres> | undefined;
}

export type Sql = ReturnType<typeof postgres>;

export function getDb(): Sql | null {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  globalThis.__gfSql ??= postgres(url, {
    max: 5,
    // Supabase's pooled connection strings require this off; harmless locally.
    prepare: false,
  });
  return globalThis.__gfSql;
}
