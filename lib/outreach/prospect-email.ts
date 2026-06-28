/**
 * Build the cold email for a single prospect: resolve the template (explicit
 * override, else the industry's "· 1. Apresentação" intro) and render it with
 * the prospect's merge fields + a one-click unsubscribe link. Shared by the
 * Prospects preview page and the send action so both show the same thing.
 */
import type { Sql } from "@/lib/db";
import { loadOutreachConfig } from "./config";
import * as repo from "./repo";
import { contactMergeVars, renderEmail } from "./templates";
import { buildUnsubscribeUrl } from "./unsubscribe";

export interface BuiltProspectEmail {
  ok: boolean;
  reason?: string;
  templateName?: string;
  subject?: string;
  html?: string;
  text?: string;
  unsubscribeUrl?: string;
}

export async function buildProspectEmail(
  sql: Sql,
  contact: repo.ContactRow,
  templateOverrideId?: string | null,
): Promise<BuiltProspectEmail> {
  const industry = String(contact.fields?.industry ?? "");

  let template: repo.TemplateRow | null = null;
  if (templateOverrideId) template = await repo.getTemplate(sql, templateOverrideId);
  if (!template && industry) template = await repo.getIntroTemplateForIndustry(sql, industry);
  if (!template) {
    return {
      ok: false,
      reason: industry
        ? `No intro template found for "${industry}".`
        : "Prospect has no industry set, so no template can be chosen.",
    };
  }

  const config = loadOutreachConfig();
  const unsubscribeUrl = buildUnsubscribeUrl(config.siteUrl, contact.email, config.secret);
  const rendered = renderEmail(
    { subject: template.subject, bodyHtml: template.body_html, bodyText: template.body_text },
    contactMergeVars(contact),
    unsubscribeUrl,
  );
  return {
    ok: true,
    templateName: template.name,
    subject: rendered.subject,
    html: rendered.html,
    text: rendered.text,
    unsubscribeUrl,
  };
}
