import { type NextRequest } from "next/server";
import { getDb } from "@/lib/db";
import { loadOutreachConfig } from "@/lib/outreach/config";
import { insertInbound } from "@/lib/outreach/repo";

// Receives parsed inbound emails (replies) from the Cloudflare Email Worker.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function parseAddress(input: unknown): { email: string; name: string | null } {
  if (input && typeof input === "object") {
    const o = input as { email?: string; address?: string; name?: string };
    return { email: (o.email || o.address || "").trim(), name: o.name?.trim() || null };
  }
  const s = String(input ?? "");
  const m = s.match(/^\s*"?([^"<]*)"?\s*<([^>]+)>\s*$/);
  if (m) return { email: m[2]!.trim(), name: m[1]!.trim() || null };
  return { email: s.trim(), name: null };
}

function str(v: unknown): string | null {
  return typeof v === "string" && v.trim() ? v : null;
}

function authorized(req: NextRequest, expected: string | undefined): boolean {
  if (!expected) return false;
  const auth = req.headers.get("authorization") ?? "";
  const candidates = [
    auth.startsWith("Bearer ") ? auth.slice(7) : "",
    req.headers.get("x-inbound-token") ?? "",
    req.nextUrl.searchParams.get("token") ?? "",
  ];
  return candidates.some((t) => t.length > 0 && t === expected);
}

export async function POST(request: NextRequest): Promise<Response> {
  const config = loadOutreachConfig();
  if (!authorized(request, config.inboundSecret)) {
    return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ ok: false, error: "invalid json" }, { status: 400 });
  }

  const from = parseAddress(body.from);
  if (!from.email.includes("@")) {
    return Response.json({ ok: false, error: "missing 'from'" }, { status: 400 });
  }

  const sql = getDb();
  if (!sql) return Response.json({ ok: false, error: "no database" }, { status: 503 });

  const receivedRaw = str(body.receivedAt) ?? str(body.date);
  const receivedAt = receivedRaw ? new Date(receivedRaw) : null;

  const { stored } = await insertInbound(sql, {
    fromEmail: from.email,
    fromName: from.name,
    toEmail: parseAddress(body.to).email || str(body.to),
    subject: str(body.subject),
    bodyText: str(body.text) ?? str(body.bodyText),
    bodyHtml: str(body.html) ?? str(body.bodyHtml),
    messageId: str(body.messageId) ?? str(body["message-id"]),
    inReplyTo: str(body.inReplyTo) ?? str(body["in-reply-to"]),
    receivedAt: receivedAt && !Number.isNaN(receivedAt.getTime()) ? receivedAt : null,
  });

  return Response.json({ ok: true, stored });
}
