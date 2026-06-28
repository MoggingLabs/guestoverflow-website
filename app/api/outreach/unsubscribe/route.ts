import { type NextRequest } from "next/server";
import { getDb } from "@/lib/db";
import { loadOutreachConfig } from "@/lib/outreach/config";
import { unsubscribeEmail } from "@/lib/outreach/repo";
import { escapeHtml } from "@/lib/outreach/templates";
import { verifyUnsubscribeToken } from "@/lib/outreach/unsubscribe";

// Needs node crypto + a DB write; never cache.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function htmlPage(title: string, body: string, status: number): Response {
  const doc = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex" />
    <title>${escapeHtml(title)} · Guest Overflow</title>
  </head>
  <body style="margin:0;font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background:#f5f4f1;color:#1a1a1a;">
    <div style="max-width:520px;margin:14vh auto 0;padding:32px;background:#fff;border:1px solid #e3e1dc;border-radius:14px;">
      <h1 style="font-size:20px;margin:0 0 10px;">${escapeHtml(title)}</h1>
      <p style="font-size:15px;line-height:1.6;color:#444;margin:0;">${body}</p>
    </div>
  </body>
</html>`;
  return new Response(doc, {
    status,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

/** Verify the token, record the unsubscribe. Returns the email or null. */
async function applyUnsubscribe(token: string | null): Promise<string | null> {
  if (!token) return null;
  const email = verifyUnsubscribeToken(token, loadOutreachConfig().secret);
  if (!email) return null;
  const sql = getDb();
  if (sql) await unsubscribeEmail(sql, email);
  return email;
}

export async function GET(request: NextRequest): Promise<Response> {
  const email = await applyUnsubscribe(request.nextUrl.searchParams.get("token"));
  if (!email) {
    return htmlPage(
      "Link not valid",
      "This unsubscribe link is invalid or has expired. If you keep receiving emails, reply to one and we'll remove you.",
      400,
    );
  }
  return htmlPage(
    "You're unsubscribed",
    `<strong>${escapeHtml(email)}</strong> has been removed. You won't receive further outreach emails from Guest Overflow.`,
    200,
  );
}

// RFC 8058 one-click unsubscribe (List-Unsubscribe-Post). Mail clients POST
// here directly; the token rides in the query string of the List-Unsubscribe URL.
export async function POST(request: NextRequest): Promise<Response> {
  const email = await applyUnsubscribe(request.nextUrl.searchParams.get("token"));
  return new Response(email ? "Unsubscribed" : "Invalid token", {
    status: email ? 200 : 400,
  });
}
