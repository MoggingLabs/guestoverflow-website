/**
 * Stateless one-click unsubscribe tokens.
 *
 * Token = base64url(lower(email)) + "." + HMAC-SHA256(lower(email), secret).
 * The email is recoverable from the token, so the unsubscribe route needs no
 * lookup table; the HMAC makes tokens unforgeable. Constant-time compare.
 */
import { createHmac, timingSafeEqual } from "node:crypto";

function b64url(input: string): string {
  return Buffer.from(input, "utf8").toString("base64url");
}

function fromB64url(input: string): string {
  return Buffer.from(input, "base64url").toString("utf8");
}

function sign(email: string, secret: string): string {
  return createHmac("sha256", secret).update(email).digest("base64url");
}

export function unsubscribeToken(email: string, secret: string): string {
  const normalized = email.trim().toLowerCase();
  return `${b64url(normalized)}.${sign(normalized, secret)}`;
}

/** Returns the email if the token is valid, else null. */
export function verifyUnsubscribeToken(
  token: string,
  secret: string,
): string | null {
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return null;
  const emailPart = token.slice(0, dot);
  const sigPart = token.slice(dot + 1);

  let email: string;
  try {
    email = fromB64url(emailPart);
  } catch {
    return null;
  }
  if (!email) return null;

  const expected = sign(email, secret);
  const a = Buffer.from(sigPart);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return null;
  return timingSafeEqual(a, b) ? email : null;
}

export function buildUnsubscribeUrl(
  siteUrl: string,
  email: string,
  secret: string,
): string {
  const token = unsubscribeToken(email, secret);
  return `${siteUrl}/api/outreach/unsubscribe?token=${encodeURIComponent(token)}`;
}
