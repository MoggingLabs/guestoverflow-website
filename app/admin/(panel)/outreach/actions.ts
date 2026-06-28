"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { getDb } from "@/lib/db";
import { loadOutreachConfig } from "@/lib/outreach/config";
import { createEmailPort } from "@/lib/outreach/email";
import { buildProspectEmail } from "@/lib/outreach/prospect-email";
import { missingRequired, parseProspectsCsv } from "@/lib/outreach/prospects";
import * as repo from "@/lib/outreach/repo";
import { enrollContact } from "@/lib/outreach/scheduler";
import { contactMergeVars, renderEmail } from "@/lib/outreach/templates";
import { buildUnsubscribeUrl } from "@/lib/outreach/unsubscribe";

const OUTREACH = "/admin/outreach";

function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

export async function createTemplate(formData: FormData): Promise<void> {
  await requireAdmin();
  const sql = getDb();
  if (!sql) return;
  const name = str(formData, "name");
  const subject = str(formData, "subject");
  const bodyText = str(formData, "body_text");
  const bodyHtml = str(formData, "body_html") || textToHtml(bodyText);
  if (!name || !subject || !bodyText) return;
  await sql`
    insert into outreach_templates (name, subject, body_html, body_text)
    values (${name}, ${subject}, ${bodyHtml}, ${bodyText})
  `;
  revalidatePath(OUTREACH);
}

/** Naive text→HTML for templates authored as plain text (paragraph per blank line). */
function textToHtml(text: string): string {
  return text
    .split(/\n{2,}/)
    .map((p) => `<p>${p.replace(/\n/g, "<br/>")}</p>`)
    .join("\n");
}

export async function createCampaign(formData: FormData): Promise<void> {
  await requireAdmin();
  const sql = getDb();
  if (!sql) return;
  const name = str(formData, "name");
  if (!name) return;
  const fromEmail = str(formData, "from_email") || null;
  const replyTo = str(formData, "reply_to") || null;
  const [row] = await sql<{ id: string }[]>`
    insert into outreach_campaigns (name, from_email, reply_to)
    values (${name}, ${fromEmail}, ${replyTo}) returning id
  `;
  revalidatePath(OUTREACH);
  redirect(`${OUTREACH}/${row!.id}`);
}

export async function addStep(
  campaignId: string,
  formData: FormData,
): Promise<void> {
  await requireAdmin();
  const sql = getDb();
  if (!sql) return;
  const templateId = str(formData, "template_id");
  const delayHours = Math.max(0, Number(formData.get("delay_hours") ?? 0));
  if (!templateId) return;
  const [{ next }] = await sql<{ next: number }[]>`
    select coalesce(max(step_index) + 1, 0)::int as next
    from outreach_steps where campaign_id = ${campaignId}
  `;
  await sql`
    insert into outreach_steps (campaign_id, step_index, template_id, delay_hours)
    values (${campaignId}, ${next!}, ${templateId}, ${delayHours})
  `;
  revalidatePath(`${OUTREACH}/${campaignId}`);
}

export async function setCampaignStatus(
  campaignId: string,
  status: "draft" | "active" | "paused" | "archived",
): Promise<void> {
  await requireAdmin();
  const sql = getDb();
  if (!sql) return;
  await sql`
    update outreach_campaigns set status = ${status}, updated_at = now() where id = ${campaignId}
  `;
  revalidatePath(`${OUTREACH}/${campaignId}`);
  revalidatePath(OUTREACH);
}

/** Import every lead into this campaign as a contact and enroll it. Idempotent. */
export async function importLeads(campaignId: string): Promise<void> {
  await requireAdmin();
  const sql = getDb();
  if (!sql) return;
  const rows = await sql<
    { id: number; email: string; name: string | null; business_name: string | null }[]
  >`select id, email, name, business_name from leads order by created_at desc`;
  for (const lead of rows) {
    if (!lead.email?.includes("@")) continue;
    const contact = await repo.upsertContact(sql, {
      email: lead.email,
      name: lead.name,
      business_name: lead.business_name,
      source: "lead",
      lead_id: lead.id,
    });
    await enrollContact(sql, campaignId, contact.id);
  }
  revalidatePath(`${OUTREACH}/${campaignId}`);
}

/** Paste recipients as `email, name, business` lines (cold/CSV import). */
export async function importPasted(
  campaignId: string,
  formData: FormData,
): Promise<void> {
  await requireAdmin();
  const sql = getDb();
  if (!sql) return;
  const raw = str(formData, "contacts");
  const lines = raw.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  for (const line of lines) {
    const [email, name, business] = line.split(",").map((s) => s.trim());
    if (!email || !email.includes("@")) continue;
    const contact = await repo.upsertContact(sql, {
      email,
      name: name || null,
      business_name: business || null,
      source: "csv",
    });
    await enrollContact(sql, campaignId, contact.id);
  }
  revalidatePath(`${OUTREACH}/${campaignId}`);
}

/** Send a one-off test of a step to an arbitrary address (no enrollment, no logging). */
export async function sendTest(
  campaignId: string,
  formData: FormData,
): Promise<void> {
  await requireAdmin();
  const sql = getDb();
  if (!sql) return;
  const to = str(formData, "to");
  const stepIndex = Math.max(0, Number(formData.get("step_index") ?? 0));
  if (!to.includes("@")) return;

  const step = await repo.getStep(sql, campaignId, stepIndex);
  if (!step) return;
  const template = await repo.getTemplate(sql, step.template_id);
  if (!template) return;
  const campaign = await repo.getCampaign(sql, campaignId);

  const config = loadOutreachConfig();
  const email = createEmailPort(config);
  const unsubscribeUrl = buildUnsubscribeUrl(config.siteUrl, to, config.secret);
  const rendered = renderEmail(
    {
      subject: template.subject,
      bodyHtml: template.body_html,
      bodyText: template.body_text,
    },
    contactMergeVars({ email: to, name: "Test Contact", business_name: "Test Business" }),
    unsubscribeUrl,
  );

  const receipt = await email.send({
    to,
    from: campaign?.from_email ?? config.fromEmail,
    replyTo: campaign?.reply_to ?? config.replyTo,
    subject: `[TEST] ${rendered.subject}`,
    html: rendered.html,
    text: rendered.text,
    headers: {
      "List-Unsubscribe": `<${unsubscribeUrl}>`,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    },
  });

  // Log the test send so it appears in the Sent view with its rendered body.
  await repo.recordSend(sql, {
    messageId: null,
    campaignId,
    contactId: null,
    toEmail: to,
    subject: `[TEST] ${rendered.subject}`,
    providerMessageId: receipt.providerMessageId,
    status: "sent",
    bodyHtml: rendered.html,
    bodyText: rendered.text,
  });

  revalidatePath(`${OUTREACH}/${campaignId}`);
  revalidatePath(`${OUTREACH}/conversations`);
}

const PROSPECTS = `${OUTREACH}/prospects`;

/** Import prospects from a pasted CSV or uploaded file (source='prospect'). */
export async function importProspects(formData: FormData): Promise<void> {
  await requireAdmin();
  const sql = getDb();
  if (!sql) return;

  const file = formData.get("file");
  let text = "";
  if (file && typeof file !== "string" && file.size > 0) text = await file.text();
  if (!text.trim()) text = str(formData, "csv");
  if (!text.trim()) return;

  const { prospects } = parseProspectsCsv(text);
  let imported = 0;
  let skipped = 0;
  for (const p of prospects) {
    if (!p.email.includes("@")) {
      skipped += 1;
      continue;
    }
    await repo.upsertProspect(sql, {
      email: p.email,
      firstName: p.firstName,
      business: p.business,
      fields: p.fields,
    });
    imported += 1;
  }
  revalidatePath(PROSPECTS);
  redirect(`${PROSPECTS}?imported=${imported}&skipped=${skipped}`);
}

/** Send a one-off cold email to a single prospect (suppression-checked, logged). */
export async function sendProspectEmail(
  contactId: string,
  templateId: string | null,
): Promise<void> {
  await requireAdmin();
  const sql = getDb();
  if (!sql) return;

  const contact = await repo.getContact(sql, contactId);
  if (!contact) redirect(`${PROSPECTS}?error=${encodeURIComponent("Prospect not found.")}`);

  // Compliance + uniform-info gates (mirrors the table's send-enabled rule).
  if (contact!.unsubscribed_at || (await repo.isSuppressed(sql, contact!.email))) {
    redirect(`${PROSPECTS}?error=${encodeURIComponent("That address is unsubscribed/suppressed.")}`);
  }
  const missing = missingRequired(contact!);
  if (missing.length > 0) {
    redirect(`${PROSPECTS}?error=${encodeURIComponent(`Missing required: ${missing.join(", ")}`)}`);
  }

  const built = await buildProspectEmail(sql, contact!, templateId);
  if (!built.ok) {
    redirect(`${PROSPECTS}?error=${encodeURIComponent(built.reason ?? "Could not build email.")}`);
  }

  const config = loadOutreachConfig();
  const email = createEmailPort(config);
  try {
    const receipt = await email.send({
      to: contact!.email,
      from: config.fromEmail,
      replyTo: config.replyTo,
      subject: built.subject!,
      html: built.html!,
      text: built.text!,
      headers: {
        "List-Unsubscribe": `<${built.unsubscribeUrl}>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      },
    });
    await repo.recordSend(sql, {
      messageId: null,
      campaignId: null,
      contactId: contact!.id,
      toEmail: contact!.email,
      subject: built.subject!,
      providerMessageId: receipt.providerMessageId,
      status: "sent",
      bodyHtml: built.html,
      bodyText: built.text,
    });
    await repo.markContactEmailed(sql, contact!.id);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    redirect(`${PROSPECTS}?error=${encodeURIComponent(`Send failed: ${msg.slice(0, 120)}`)}`);
  }

  revalidatePath(PROSPECTS);
  revalidatePath(`${OUTREACH}/conversations`);
  redirect(`${PROSPECTS}?sent=${encodeURIComponent(contact!.email)}`);
}
