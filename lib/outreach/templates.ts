/**
 * Email template rendering: {{merge}} substitution, a minimal responsive
 * HTML layout, and a mandatory unsubscribe footer (compliance — every
 * outreach email must carry a one-click opt-out).
 *
 * HTML merge values are escaped; subject and plain-text are not (plain
 * contexts can't be broken by an apostrophe in a business name).
 */

export type MergeVars = Record<string, string>;

export interface TemplateInput {
  subject: string;
  bodyHtml: string;
  bodyText: string;
}

export interface RenderedEmail {
  subject: string;
  html: string;
  text: string;
}

const TOKEN = /\{\{\s*([\w.]+)\s*\}\}/g;

const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (c) => HTML_ESCAPES[c] ?? c);
}

/** Replace {{key}} occurrences from `vars` (missing keys → empty string). */
export function applyVars(
  template: string,
  vars: MergeVars,
  opts: { escapeHtml?: boolean } = {},
): string {
  return template.replace(TOKEN, (_match, key: string) => {
    const value = vars[key] ?? "";
    return opts.escapeHtml ? escapeHtml(value) : value;
  });
}

/** Build the standard merge vars for a contact row. */
export function contactMergeVars(contact: {
  email: string;
  name?: string | null;
  business_name?: string | null;
  fields?: Record<string, string> | null;
}): MergeVars {
  const name = (contact.name ?? "").trim();
  const firstName = name ? name.split(/\s+/)[0]! : "";
  return {
    email: contact.email,
    name,
    firstName,
    first_name: firstName,
    business: contact.business_name ?? "",
    businessName: contact.business_name ?? "",
    business_name: contact.business_name ?? "",
    ...(contact.fields ?? {}),
  };
}

export function wrapHtml(bodyHtml: string, unsubscribeUrl: string): string {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f5f4f1;">
    <div style="max-width:560px;margin:0 auto;padding:28px 24px;font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1a1a1a;font-size:15px;line-height:1.6;">
      ${bodyHtml}
      <hr style="border:none;border-top:1px solid #e3e1dc;margin:28px 0 14px;" />
      <p style="font-size:12px;color:#8a8a8a;margin:0;">
        Guest Overflow · You're receiving this because we believe Guest Overflow could help your business.
        <a href="${escapeHtml(unsubscribeUrl)}" style="color:#8a8a8a;text-decoration:underline;">Unsubscribe</a>.
      </p>
    </div>
  </body>
</html>`;
}

export function textFooter(unsubscribeUrl: string): string {
  return `\n\n—\nGuest Overflow\nUnsubscribe: ${unsubscribeUrl}`;
}

/** Render a template against merge vars, wrapping HTML + appending opt-out. */
export function renderEmail(
  template: TemplateInput,
  vars: MergeVars,
  unsubscribeUrl: string,
): RenderedEmail {
  const subject = applyVars(template.subject, vars);
  const html = wrapHtml(
    applyVars(template.bodyHtml, vars, { escapeHtml: true }),
    unsubscribeUrl,
  );
  const text = applyVars(template.bodyText, vars) + textFooter(unsubscribeUrl);
  return { subject, html, text };
}
