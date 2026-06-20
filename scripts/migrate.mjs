// Idempotent database migration runner.
//
// Applies every db/migrations/*.sql that has not run yet, in filename order,
// each inside its own transaction, recording applied versions in
// public.schema_migrations. Safe to run on every deploy: already-applied
// migrations are skipped, so a fresh database is initialised in full and an
// up-to-date one is a no-op. Connects via DATABASE_URL.
//
// In the container the deploy runs: `docker compose run --rm web node scripts/migrate.mjs`
// (compose provides DATABASE_URL). `postgres` is a zero-dependency package the
// Dockerfile copies into the runner image's node_modules.
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import postgres from "postgres";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("[migrate] DATABASE_URL is not set; refusing to run.");
  process.exit(1);
}

const here = path.dirname(fileURLToPath(import.meta.url));
const migrationsDir = path.join(here, "..", "db", "migrations");

const sql = postgres(url, { max: 1, prepare: false, onnotice: () => {} });

try {
  await sql`
    create table if not exists public.schema_migrations (
      version text primary key,
      applied_at timestamptz not null default now()
    )
  `;

  const files = (await readdir(migrationsDir))
    .filter((f) => f.endsWith(".sql"))
    .sort();

  const applied = new Set(
    (await sql`select version from public.schema_migrations`).map(
      (r) => r.version,
    ),
  );

  let count = 0;
  for (const file of files) {
    if (applied.has(file)) continue;
    const ddl = await readFile(path.join(migrationsDir, file), "utf8");
    process.stdout.write(`[migrate] applying ${file} ... `);
    // Each migration + its bookkeeping row commit together, or not at all.
    await sql.begin(async (tx) => {
      await tx.unsafe(ddl);
      await tx`insert into public.schema_migrations (version) values (${file})`;
    });
    process.stdout.write("done\n");
    count += 1;
  }

  console.log(
    count > 0
      ? `[migrate] applied ${count} migration(s); schema up to date.`
      : "[migrate] no pending migrations; schema up to date.",
  );
} catch (err) {
  console.error("[migrate] FAILED:", err?.message ?? err);
  process.exitCode = 1;
} finally {
  await sql.end({ timeout: 5 });
}
