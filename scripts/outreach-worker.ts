/**
 * Standalone outreach worker.
 *
 * Runs as its own container/process (separate from the Next.js web server),
 * polling Postgres for due outreach messages and sending them via the
 * configured email provider. Durable facts live in Postgres — restarting the
 * worker or wiping its memory loses nothing; claiming uses FOR UPDATE SKIP
 * LOCKED so any number of replicas cooperate safely.
 *
 *   pnpm worker            # local (tsx)
 *   node dist/...          # production container command
 */
import postgres from "postgres";
import { loadOutreachConfig } from "../lib/outreach/config";
import { createEmailPort } from "../lib/outreach/email";
import { tick } from "../lib/outreach/sender";

const POLL_MS = Math.max(1_000, Number(process.env.OUTREACH_POLL_MS ?? 15_000));

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error("[outreach-worker] DATABASE_URL is not set; refusing to start.");
  process.exit(1);
}

const config = loadOutreachConfig();
const email = createEmailPort(config);
const sql = postgres(databaseUrl, { prepare: false, max: 4, onnotice: () => {} });

let stopped = false;
let inFlight: Promise<unknown> = Promise.resolve();

function log(obj: Record<string, unknown>): void {
  console.log(JSON.stringify({ ts: new Date().toISOString(), ...obj }));
}

async function runTick(): Promise<void> {
  try {
    const result = await tick({ sql, email, config });
    if (result.claimed > 0) log({ msg: "outreach_tick", ...result });
  } catch (err) {
    log({
      level: "error",
      msg: "outreach_tick_failed",
      error: err instanceof Error ? err.message : String(err),
    });
  }
}

function loop(): void {
  if (stopped) return;
  setTimeout(() => {
    inFlight = runTick().then(loop);
  }, POLL_MS);
}

async function shutdown(signal: string): Promise<void> {
  if (stopped) return;
  stopped = true;
  log({ msg: "outreach_worker_stopping", signal });
  await inFlight;
  await sql.end({ timeout: 5 });
  process.exit(0);
}

process.on("SIGTERM", () => void shutdown("SIGTERM"));
process.on("SIGINT", () => void shutdown("SIGINT"));

log({ msg: "outreach_worker_started", driver: email.driver, pollMs: POLL_MS });
// Kick an immediate tick, then settle into the poll cadence.
inFlight = runTick().then(loop);
