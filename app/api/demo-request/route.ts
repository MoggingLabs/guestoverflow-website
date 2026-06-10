import { NextResponse, type NextRequest } from "next/server";
import { demoRequestSchema } from "@/lib/validations";
import { getDb } from "@/lib/db";

export const runtime = "nodejs";

// Simple per-IP rate limit. In-memory is fine at this scale; resets on
// deploy, which is acceptable for a lead form.
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; windowStart: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now - entry.windowStart > WINDOW_MS) {
    hits.set(ip, { count: 1, windowStart: now });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

async function sendEmails(lead: {
  name: string;
  email: string;
  businessName: string;
  businessType: string;
  preferredDate?: string;
  preferredWindow?: string;
  message?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.LEAD_FROM_EMAIL;
  const notify = process.env.LEAD_NOTIFY_EMAIL;
  if (!apiKey || !from) return;

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);

  const preferred =
    [lead.preferredDate, lead.preferredWindow].filter(Boolean).join(", ") ||
    "No preference given";

  if (notify) {
    await resend.emails.send({
      from,
      to: notify,
      subject: `New demo request — ${lead.businessName} (${lead.businessType})`,
      text: [
        `Name: ${lead.name}`,
        `Email: ${lead.email}`,
        `Business: ${lead.businessName} (${lead.businessType})`,
        `Preferred time: ${preferred}`,
        lead.message ? `Message: ${lead.message}` : null,
      ]
        .filter(Boolean)
        .join("\n"),
    });
  }

  await resend.emails.send({
    from,
    to: lead.email,
    subject: "Your GuestFlow demo request",
    text: `Hi ${lead.name.split(" ")[0]},

Thanks for requesting a GuestFlow demo for ${lead.businessName}. We'll confirm your slot within one business day.

In the meantime, feel free to reply to this email with anything you'd like us to cover.

— The GuestFlow team`,
  });
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 },
    );
  }

  const parsed = demoRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check the form and try again." },
      { status: 400 },
    );
  }

  // Honeypot tripped: pretend success, store nothing.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const { name, email, businessName, businessType } = parsed.data;
  const lead = {
    name,
    email,
    business_name: businessName,
    business_type: businessType,
    preferred_date: parsed.data.preferredDate || null,
    preferred_window: parsed.data.preferredWindow || null,
    message: parsed.data.message || null,
    page_source: parsed.data.pageSource || null,
    status: "new",
  };

  const sql = getDb();
  if (sql) {
    try {
      await sql`insert into leads ${sql(lead)}`;
    } catch (err) {
      console.error("[demo-request] Lead insert failed:", err);
      return NextResponse.json(
        { ok: false, error: "Something went wrong. Please email us instead." },
        { status: 500 },
      );
    }
  } else {
    // No database configured (local dev): keep the lead visible in logs.
    console.log("[demo-request] Lead received (no DATABASE_URL):", lead);
  }

  // The lead is saved — email failures must never surface as a form error.
  try {
    await sendEmails(parsed.data);
  } catch (err) {
    console.error("[demo-request] Email send failed:", err);
  }

  return NextResponse.json({ ok: true });
}
