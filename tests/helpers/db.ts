import postgres from "postgres";
import type { Sql } from "@/lib/db";

/** Disposable connection to the integration-test database (mailpit + pg via docker compose). */
export const TEST_DATABASE_URL =
  process.env.TEST_DATABASE_URL ??
  "postgres://postgres:postgres@localhost:5544/guestoverflow_test";

export function testSql(): Sql {
  return postgres(TEST_DATABASE_URL, {
    prepare: false,
    max: 4,
    onnotice: () => {},
  });
}

const OUTREACH_TABLES = [
  "outreach_sends",
  "outreach_messages",
  "outreach_enrollments",
  "outreach_steps",
  "outreach_campaigns",
  "outreach_templates",
  "outreach_contacts",
  "outreach_suppressions",
] as const;

export async function resetOutreach(sql: Sql): Promise<void> {
  await sql.unsafe(
    `truncate ${OUTREACH_TABLES.map((t) => `public.${t}`).join(", ")} restart identity cascade`,
  );
}
