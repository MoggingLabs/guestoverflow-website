"use client";

import { useState } from "react";

function esc(s: string): string {
  return s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c] ?? c);
}
function toHtml(text: string): string {
  return text
    .split(/\n{2,}/)
    .map((p) => `<p>${esc(p).replace(/\n/g, "<br/>")}</p>`)
    .join("");
}

/**
 * Editable, live-previewed single email. The template is pre-merged with the
 * recipient's info server-side; here you can change anything for this one send.
 * The body you see/edit is exactly what's sent (HTML generated from it, plus an
 * unsubscribe footer added server-side).
 */
export function IndividualEmailComposer({
  action,
  recipientValue,
  toEmail,
  fromLabel,
  initialSubject,
  initialBody,
}: {
  action: (formData: FormData) => void | Promise<void>;
  recipientValue: string;
  toEmail: string;
  fromLabel: string;
  initialSubject: string;
  initialBody: string;
}) {
  const [subject, setSubject] = useState(initialSubject);
  const [body, setBody] = useState(initialBody);

  const previewHtml = `<!doctype html><html><body style="margin:0;background:#f5f4f1">
    <div style="font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:#1a1a1a;padding:18px;max-width:600px;margin:0 auto;">
      ${toHtml(body)}
      <hr style="border:none;border-top:1px solid #e3e1dc;margin:24px 0 12px"/>
      <p style="font-size:12px;color:#8a8a8a;margin:0">Guest Overflow · <a href="#" style="color:#8a8a8a">Unsubscribe</a></p>
    </div></body></html>`;

  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!window.confirm(`Send this email to ${toEmail}?`)) e.preventDefault();
      }}
      className="space-y-3"
    >
      <input type="hidden" name="recipient" value={recipientValue} />

      <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-cream-faint">
        <span>To: <span className="text-cream-dim">{toEmail}</span></span>
        <span>From: <span className="text-cream-dim">{fromLabel}</span></span>
      </div>

      <label className="block text-xs text-cream-dim">
        Subject
        <input
          name="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="mt-1.5 block w-full rounded-md border border-line bg-raised px-3 py-2 text-sm text-cream focus:border-amber-deep focus:outline-none"
        />
      </label>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <label className="block text-xs text-cream-dim">
          Body — edit freely for this recipient
          <textarea
            name="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="mt-1.5 block h-80 w-full resize-y rounded-md border border-line bg-raised px-3 py-2 text-sm text-cream focus:border-amber-deep focus:outline-none"
          />
        </label>
        <div className="text-xs text-cream-dim">
          Live preview
          <div className="mt-1.5 h-80 overflow-hidden rounded-md border border-line bg-white">
            <iframe title="preview" sandbox="" srcDoc={previewHtml} className="h-full w-full border-0" />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="rounded-md bg-amber px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-amber-bright"
      >
        Send email
      </button>
    </form>
  );
}
