"use client";

import { useState } from "react";

// Sample data so the preview reads like a real email.
const SAMPLE: Record<string, string> = {
  firstName: "Ana",
  first_name: "Ana",
  name: "Ana Silva",
  business: "Garagem 33",
  businessName: "Garagem 33",
  business_name: "Garagem 33",
  city: "Vila Verde",
  channel: "TheFork",
  hook: "172k seguidores no Instagram",
  website: "@garagem33",
  email: "ana@exemplo.pt",
};

function merge(t: string): string {
  return t.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_m, k: string) => SAMPLE[k] ?? `{{${k}}}`);
}
function esc(s: string): string {
  return s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c] ?? c);
}
function toHtml(text: string): string {
  return merge(text)
    .split(/\n{2,}/)
    .map((p) => `<p>${esc(p).replace(/\n/g, "<br/>")}</p>`)
    .join("");
}

/**
 * Edit a template (name / subject / body) with a live preview rendered with
 * sample data — exactly how a recipient would see it. Works for every template.
 */
export function TemplateEditor({
  action,
  initialName,
  initialSubject,
  initialBody,
}: {
  action: (formData: FormData) => void | Promise<void>;
  initialName: string;
  initialSubject: string;
  initialBody: string;
}) {
  const [name, setName] = useState(initialName);
  const [subject, setSubject] = useState(initialSubject);
  const [body, setBody] = useState(initialBody);

  const previewHtml = `<!doctype html><html><body style="margin:0;background:#f5f4f1">
    <div style="font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:#1a1a1a;padding:18px;max-width:600px;margin:0 auto;">
      <p style="font-size:12px;color:#8a8a8a;margin:0 0 8px">Assunto: <strong>${esc(merge(subject))}</strong></p>
      ${toHtml(body)}
      <hr style="border:none;border-top:1px solid #e3e1dc;margin:24px 0 12px"/>
      <p style="font-size:12px;color:#8a8a8a;margin:0">Guest Overflow · <a href="#" style="color:#8a8a8a">Unsubscribe</a></p>
    </div></body></html>`;

  return (
    <form action={action} className="space-y-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="block text-xs text-cream-dim">
          Name (prefix with an industry to group it)
          <input name="name" value={name} onChange={(e) => setName(e.target.value)} className={cls} />
        </label>
        <label className="block text-xs text-cream-dim">
          Subject
          <input name="subject" value={subject} onChange={(e) => setSubject(e.target.value)} className={cls} />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <label className="block text-xs text-cream-dim">
          Body — plain text. Merge fields: {"{{firstName}}"}, {"{{business}}"}, {"{{city}}"}, {"{{channel}}"}, {"{{hook}}"}.
          <textarea
            name="body_text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className={`${cls} h-96 resize-y`}
          />
        </label>
        <div className="text-xs text-cream-dim">
          Preview (sample data)
          <div className="mt-1.5 h-96 overflow-hidden rounded-md border border-line bg-white">
            <iframe title="template-preview" sandbox="" srcDoc={previewHtml} className="h-full w-full border-0" />
          </div>
        </div>
      </div>

      <button type="submit" className="rounded-md bg-amber px-4 py-2 text-sm font-medium text-ink hover:bg-amber-bright">
        Save template
      </button>
    </form>
  );
}

const cls =
  "mt-1.5 block w-full rounded-md border border-line bg-raised px-3 py-2 text-sm text-cream focus:border-amber-deep focus:outline-none";
