/**
 * Email provider port + adapters (mirrors the SaaS notifications design).
 *
 *  - ResendEmailAdapter  — production, Resend REST API via native fetch.
 *  - SmtpEmailAdapter    — dev/test, nodemailer → mailpit (:1025).
 *  - ConsoleEmailAdapter — CI/log-only, never touches the network.
 *
 * Swapping providers is a single factory branch; the sender and worker
 * never know which adapter is live. No Next-only imports — the worker uses
 * this directly.
 */
import { createTransport, type Transporter } from "nodemailer";
import type { MailDriver, OutreachConfig } from "./config";

export interface OutboundEmail {
  to: string;
  from: string;
  replyTo?: string;
  subject: string;
  html: string;
  text: string;
  /** Extra SMTP/HTTP headers, e.g. List-Unsubscribe (RFC 8058). */
  headers?: Record<string, string>;
}

export interface SendReceipt {
  providerMessageId: string | null;
}

export interface EmailPort {
  readonly driver: MailDriver;
  send(message: OutboundEmail): Promise<SendReceipt>;
}

/** Resend over its REST API (no SDK — one POST, auditable surface). */
export class ResendEmailAdapter implements EmailPort {
  readonly driver = "resend" as const;

  constructor(private readonly apiKey: string) {}

  async send(message: OutboundEmail): Promise<SendReceipt> {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        authorization: `Bearer ${this.apiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: message.from,
        to: [message.to],
        subject: message.subject,
        html: message.html,
        text: message.text,
        ...(message.replyTo ? { reply_to: message.replyTo } : {}),
        ...(message.headers ? { headers: message.headers } : {}),
      }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`Resend ${res.status}: ${body.slice(0, 300)}`);
    }
    const data = (await res.json()) as { id?: string };
    return { providerMessageId: data.id ?? null };
  }
}

/** Local dev / integration tests: mailpit on :1025 (inspect at :8025). */
export class SmtpEmailAdapter implements EmailPort {
  readonly driver = "smtp" as const;
  private readonly transporter: Transporter;

  constructor(host: string, port: number) {
    this.transporter = createTransport({ host, port, secure: false });
  }

  async send(message: OutboundEmail): Promise<SendReceipt> {
    const info = (await this.transporter.sendMail({
      from: message.from,
      to: message.to,
      replyTo: message.replyTo,
      subject: message.subject,
      html: message.html,
      text: message.text,
      headers: message.headers,
    })) as { messageId?: string };
    return { providerMessageId: info.messageId ?? null };
  }
}

/** CI / log-only. */
export class ConsoleEmailAdapter implements EmailPort {
  readonly driver = "console" as const;

  async send(message: OutboundEmail): Promise<SendReceipt> {
    console.log(
      JSON.stringify({ msg: "outreach_email", to: message.to, subject: message.subject }),
    );
    return { providerMessageId: null };
  }
}

/** Build the live adapter from config. */
export function createEmailPort(config: OutreachConfig): EmailPort {
  switch (config.mailDriver) {
    case "resend": {
      if (!config.resendApiKey) {
        if (config.isProd) {
          throw new Error("OUTREACH_MAIL_DRIVER=resend requires RESEND_API_KEY");
        }
        // Dev without a key: don't fail, just log.
        return new ConsoleEmailAdapter();
      }
      return new ResendEmailAdapter(config.resendApiKey);
    }
    case "smtp":
      return new SmtpEmailAdapter(config.smtpHost, config.smtpPort);
    case "console":
      return new ConsoleEmailAdapter();
  }
}
