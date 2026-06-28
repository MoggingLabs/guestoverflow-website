/**
 * Outreach runtime configuration, read from the environment.
 *
 * Shared by the Next.js admin server actions/routes AND the standalone
 * worker process, so this module stays free of any Next-only or
 * browser-only imports. Falls back to the existing lead-email env vars so
 * the outreach engine works with zero new config in the simplest setup.
 */

export type MailDriver = "resend" | "smtp" | "console";

export interface OutreachConfig {
  isProd: boolean;
  /** resend (prod default) | smtp (dev/test → mailpit) | console (CI/log-only) */
  mailDriver: MailDriver;
  resendApiKey: string | undefined;
  smtpHost: string;
  smtpPort: number;
  /** RFC 5322 From, e.g. `Guest Overflow <hello@guestoverflow.com>` */
  fromEmail: string;
  replyTo: string | undefined;
  /** Public site origin, used to build unsubscribe links (no trailing slash). */
  siteUrl: string;
  /** HMAC key for stateless unsubscribe tokens. */
  secret: string;
  /** Max messages a single worker tick claims+sends. */
  batchSize: number;
  /** Per-recipient max attempts before a message is marked failed. */
  maxAttempts: number;
}

function trimTrailingSlash(s: string): string {
  return s.endsWith("/") ? s.slice(0, -1) : s;
}

export function loadOutreachConfig(
  env: NodeJS.ProcessEnv = process.env,
): OutreachConfig {
  const isProd = env.NODE_ENV === "production";
  const mailDriver = (env.OUTREACH_MAIL_DRIVER as MailDriver | undefined) ??
    (isProd ? "resend" : "smtp");

  return {
    isProd,
    mailDriver,
    // Prefer a dedicated outreach key so cold-outreach volume/reputation is
    // isolated from transactional (lead) email; fall back to the shared key.
    resendApiKey: env.OUTREACH_RESEND_API_KEY ?? env.RESEND_API_KEY,
    smtpHost: env.OUTREACH_SMTP_HOST ?? env.SMTP_HOST ?? "localhost",
    smtpPort: Number(env.OUTREACH_SMTP_PORT ?? env.SMTP_PORT ?? 1025),
    fromEmail:
      env.OUTREACH_FROM_EMAIL ??
      env.LEAD_FROM_EMAIL ??
      "Guest Overflow <hello@guestoverflow.com>",
    replyTo: env.OUTREACH_REPLY_TO ?? env.LEAD_REPLY_TO,
    siteUrl: trimTrailingSlash(
      env.NEXT_PUBLIC_SITE_URL ?? "https://guestoverflow.com",
    ),
    secret:
      env.OUTREACH_SECRET ??
      env.ADMIN_SESSION_SECRET ??
      "guestoverflow-dev-secret",
    batchSize: Math.max(1, Number(env.OUTREACH_BATCH ?? 25)),
    maxAttempts: Math.max(1, Number(env.OUTREACH_MAX_ATTEMPTS ?? 5)),
  };
}
