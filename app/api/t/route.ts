import { createHash } from "node:crypto";
import { type NextRequest } from "next/server";
import { isbot } from "isbot";
import { UAParser } from "ua-parser-js";
import { z } from "zod";
import { getDb } from "@/lib/db";

export const runtime = "nodejs";

const EVENT_NAMES = [
  "page_view",
  "page_engaged",
  "scroll_depth",
  "cta_clicked",
  "widget_opened",
  "widget_step",
  "widget_completed",
  "widget_theme_changed",
  "demo_form_started",
  "form_field_completed",
  "demo_form_abandoned",
  "demo_form_submitted",
  "demo_form_error",
  "rage_click",
  "js_error",
] as const;

const batchSchema = z.object({
  sid: z.uuid(),
  utm: z.record(z.string(), z.string().max(100)).optional(),
  referrer: z.string().max(500).nullish(),
  events: z
    .array(
      z.object({
        event: z.enum(EVENT_NAMES),
        props: z
          .record(z.string().max(50), z.union([z.string().max(400), z.number(), z.boolean()]))
          .default({}),
        path: z.string().max(200),
        ts: z.number(),
      }),
    )
    .min(1)
    .max(25),
});

// Per-IP ingest rate limit (in-memory; resets on deploy).
const WINDOW_MS = 60 * 1000;
const MAX_EVENTS_PER_WINDOW = 120;
const hits = new Map<string, { count: number; windowStart: number }>();

function rateLimited(ip: string, count: number): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now - entry.windowStart > WINDOW_MS) {
    hits.set(ip, { count, windowStart: now });
    return false;
  }
  entry.count += count;
  return entry.count > MAX_EVENTS_PER_WINDOW;
}

/** Daily-rotating salt derived from the secret — never stored anywhere. */
function dailySalt(): string {
  const day = new Date().toISOString().slice(0, 10);
  const secret = process.env.ADMIN_SESSION_SECRET ?? "guestflow-dev-secret";
  return createHash("sha256").update(`${secret}:${day}`).digest("hex");
}

function hostnameOnly(referrer: string | null | undefined): string | null {
  if (!referrer) return null;
  try {
    const host = new URL(referrer).hostname;
    // Self-referrals carry no acquisition signal.
    return host.includes("localhost") || host.includes("guestflow") ? null : host;
  } catch {
    return null;
  }
}

const NO_CONTENT = new Response(null, { status: 204 });

export async function POST(request: NextRequest) {
  const ua = request.headers.get("user-agent") ?? "";
  if (!ua || isbot(ua)) return NO_CONTENT;

  let parsed;
  try {
    parsed = batchSchema.safeParse(await request.json());
  } catch {
    return NO_CONTENT;
  }
  if (!parsed.success) return NO_CONTENT;

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip, parsed.data.events.length)) return NO_CONTENT;

  const visitorId = createHash("sha256")
    .update(`${dailySalt()}${ip}${ua}`)
    .digest("hex");

  const parser = new UAParser(ua);
  const deviceType = parser.getDevice().type;
  const device =
    deviceType === "mobile" || deviceType === "tablet" ? deviceType : "desktop";
  const browser = parser.getBrowser().name ?? null;
  const os = parser.getOS().name ?? null;
  const country = request.headers.get("x-vercel-ip-country");
  const referrer = hostnameOnly(parsed.data.referrer);
  const utm =
    parsed.data.utm && Object.keys(parsed.data.utm).length > 0
      ? parsed.data.utm
      : null;

  const rows = parsed.data.events.map((e) => ({
    ts: new Date(e.ts),
    visitor_id: visitorId,
    session_id: parsed.data.sid,
    event: e.event,
    props: e.props,
    url_path: e.path,
    referrer,
    utm,
    device,
    browser,
    os,
    country,
  }));

  const sql = getDb();
  if (!sql) {
    if (process.env.NODE_ENV === "development") {
      console.debug(`[analytics] ${rows.length} events (no DATABASE_URL)`);
    }
    return NO_CONTENT;
  }

  try {
    await sql`insert into events ${sql(rows)}`;
  } catch (err) {
    console.error("[analytics] insert failed:", err);
  }
  return NO_CONTENT;
}
