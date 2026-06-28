/**
 * Outreach data access. Every function takes the postgres.js `Sql` client so
 * it is equally usable from Next.js server actions and the standalone worker,
 * and trivially testable against a throwaway database.
 */
import type { Sql } from "@/lib/db";

export interface TemplateRow {
  id: string;
  name: string;
  subject: string;
  body_html: string;
  body_text: string;
}

export interface CampaignRow {
  id: string;
  name: string;
  status: "draft" | "active" | "paused" | "archived";
  from_email: string | null;
  reply_to: string | null;
}

export interface StepRow {
  id: string;
  campaign_id: string;
  step_index: number;
  template_id: string;
  delay_hours: number;
}

export interface ContactRow {
  id: string;
  email: string;
  name: string | null;
  business_name: string | null;
  source: "lead" | "manual" | "csv" | "import";
  lead_id: number | null;
  fields: Record<string, string>;
  unsubscribed_at: Date | null;
  bounced_at: Date | null;
}

export interface EnrollmentRow {
  id: string;
  campaign_id: string;
  contact_id: string;
  status: "active" | "completed" | "stopped";
  stop_reason: string | null;
  current_step: number;
}

export interface MessageRow {
  id: string;
  enrollment_id: string;
  campaign_id: string;
  contact_id: string;
  step_index: number;
  template_id: string;
  to_email: string;
  due_at: Date;
  status: "scheduled" | "claimed" | "sent" | "failed" | "skipped" | "cancelled";
  attempts: number;
  last_error: string | null;
  provider_message_id: string | null;
  subject_snapshot: string | null;
}

export interface NewContact {
  email: string;
  name?: string | null;
  business_name?: string | null;
  source?: ContactRow["source"];
  lead_id?: number | null;
  fields?: Record<string, string>;
}

/** Insert or update a contact, keyed on lower(email). Returns the row. */
export async function upsertContact(
  sql: Sql,
  c: NewContact,
): Promise<ContactRow> {
  const rows = await sql<ContactRow[]>`
    insert into outreach_contacts (email, name, business_name, source, lead_id, fields)
    values (
      ${c.email.trim()},
      ${c.name ?? null},
      ${c.business_name ?? null},
      ${c.source ?? "manual"},
      ${c.lead_id ?? null},
      ${sql.json(c.fields ?? {})}
    )
    on conflict (lower(email)) do update set
      name = coalesce(excluded.name, outreach_contacts.name),
      business_name = coalesce(excluded.business_name, outreach_contacts.business_name),
      lead_id = coalesce(excluded.lead_id, outreach_contacts.lead_id),
      updated_at = now()
    returning *
  `;
  return rows[0]!;
}

export interface NewProspect {
  email: string;
  firstName: string;
  business: string;
  fields: Record<string, string>;
}

/** Upsert a CSV-imported prospect (source='prospect'); fields are replaced. */
export async function upsertProspect(
  sql: Sql,
  p: NewProspect,
): Promise<ContactRow> {
  const rows = await sql<ContactRow[]>`
    insert into outreach_contacts (email, name, business_name, source, fields)
    values (${p.email.trim()}, ${p.firstName || null}, ${p.business || null}, 'prospect', ${sql.json(p.fields)})
    on conflict (lower(email)) do update set
      name = coalesce(excluded.name, outreach_contacts.name),
      business_name = coalesce(excluded.business_name, outreach_contacts.business_name),
      source = 'prospect',
      fields = excluded.fields,
      updated_at = now()
    returning *
  `;
  return rows[0]!;
}

export async function markContactEmailed(sql: Sql, id: string): Promise<void> {
  await sql`
    update outreach_contacts set last_emailed_at = now(), updated_at = now() where id = ${id}
  `;
}

/** The "· 1. Apresentação" intro template for an industry label, if present. */
export async function getIntroTemplateForIndustry(
  sql: Sql,
  industry: string,
): Promise<TemplateRow | null> {
  const rows = await sql<TemplateRow[]>`
    select id, name, subject, body_html, body_text
    from outreach_templates where name like ${`${industry} · 1.%`}
    order by name limit 1
  `;
  return rows[0] ?? null;
}

export async function getCampaign(
  sql: Sql,
  id: string,
): Promise<CampaignRow | null> {
  const rows = await sql<CampaignRow[]>`
    select id, name, status, from_email, reply_to from outreach_campaigns where id = ${id}
  `;
  return rows[0] ?? null;
}

export async function listSteps(sql: Sql, campaignId: string): Promise<StepRow[]> {
  return sql<StepRow[]>`
    select id, campaign_id, step_index, template_id, delay_hours
    from outreach_steps where campaign_id = ${campaignId} order by step_index
  `;
}

export async function getStep(
  sql: Sql,
  campaignId: string,
  stepIndex: number,
): Promise<StepRow | null> {
  const rows = await sql<StepRow[]>`
    select id, campaign_id, step_index, template_id, delay_hours
    from outreach_steps where campaign_id = ${campaignId} and step_index = ${stepIndex}
  `;
  return rows[0] ?? null;
}

export async function getTemplate(
  sql: Sql,
  id: string,
): Promise<TemplateRow | null> {
  const rows = await sql<TemplateRow[]>`
    select id, name, subject, body_html, body_text from outreach_templates where id = ${id}
  `;
  return rows[0] ?? null;
}

export async function getContact(
  sql: Sql,
  id: string,
): Promise<ContactRow | null> {
  const rows = await sql<ContactRow[]>`
    select * from outreach_contacts where id = ${id}
  `;
  return rows[0] ?? null;
}

export async function getEnrollment(
  sql: Sql,
  id: string,
): Promise<EnrollmentRow | null> {
  const rows = await sql<EnrollmentRow[]>`
    select id, campaign_id, contact_id, status, stop_reason, current_step
    from outreach_enrollments where id = ${id}
  `;
  return rows[0] ?? null;
}

/** Create an enrollment, or return the existing one for (campaign, contact). */
export async function createOrGetEnrollment(
  sql: Sql,
  campaignId: string,
  contactId: string,
): Promise<EnrollmentRow> {
  const rows = await sql<EnrollmentRow[]>`
    insert into outreach_enrollments (campaign_id, contact_id)
    values (${campaignId}, ${contactId})
    on conflict (campaign_id, contact_id) do update set updated_at = now()
    returning id, campaign_id, contact_id, status, stop_reason, current_step
  `;
  return rows[0]!;
}

export interface ScheduleMessageInput {
  enrollmentId: string;
  campaignId: string;
  contactId: string;
  stepIndex: number;
  templateId: string;
  toEmail: string;
  dueAt: Date;
}

/** Idempotent: one message per (enrollment, step). Returns the row or null if it already existed. */
export async function scheduleMessage(
  sql: Sql,
  m: ScheduleMessageInput,
): Promise<MessageRow | null> {
  const rows = await sql<MessageRow[]>`
    insert into outreach_messages
      (enrollment_id, campaign_id, contact_id, step_index, template_id, to_email, due_at)
    values
      (${m.enrollmentId}, ${m.campaignId}, ${m.contactId}, ${m.stepIndex},
       ${m.templateId}, ${m.toEmail}, ${m.dueAt})
    on conflict (enrollment_id, step_index) do nothing
    returning *
  `;
  return rows[0] ?? null;
}

export async function setEnrollmentStep(
  sql: Sql,
  enrollmentId: string,
  step: number,
): Promise<void> {
  await sql`
    update outreach_enrollments set current_step = ${step}, updated_at = now()
    where id = ${enrollmentId}
  `;
}

export async function completeEnrollment(
  sql: Sql,
  enrollmentId: string,
): Promise<void> {
  await sql`
    update outreach_enrollments set status = 'completed', updated_at = now()
    where id = ${enrollmentId} and status = 'active'
  `;
}

export async function stopEnrollment(
  sql: Sql,
  enrollmentId: string,
  reason: string,
): Promise<void> {
  await sql`
    update outreach_enrollments
    set status = 'stopped', stop_reason = ${reason}, updated_at = now()
    where id = ${enrollmentId} and status = 'active'
  `;
}

/** Stop all active enrollments for a contact and cancel their pending messages. */
export async function stopEnrollmentsForContact(
  sql: Sql,
  contactId: string,
  reason: string,
): Promise<void> {
  await sql`
    update outreach_enrollments
    set status = 'stopped', stop_reason = ${reason}, updated_at = now()
    where contact_id = ${contactId} and status = 'active'
  `;
  await sql`
    update outreach_messages set status = 'cancelled', updated_at = now()
    where contact_id = ${contactId} and status in ('scheduled', 'claimed')
  `;
}

export async function isSuppressed(sql: Sql, email: string): Promise<boolean> {
  const rows = await sql<{ email: string }[]>`
    select email from outreach_suppressions where email = ${email.trim().toLowerCase()}
  `;
  return rows.length > 0;
}

export async function addSuppression(
  sql: Sql,
  email: string,
  reason: "unsubscribe" | "bounce" | "complaint" | "manual",
): Promise<void> {
  await sql`
    insert into outreach_suppressions (email, reason)
    values (${email.trim().toLowerCase()}, ${reason})
    on conflict (email) do nothing
  `;
}

/** Mark a contact unsubscribed (idempotent). */
export async function markContactUnsubscribed(
  sql: Sql,
  email: string,
): Promise<void> {
  await sql`
    update outreach_contacts set unsubscribed_at = now(), updated_at = now()
    where lower(email) = ${email.trim().toLowerCase()} and unsubscribed_at is null
  `;
}

/**
 * Full unsubscribe by email (used by the public unsubscribe route): add to
 * the suppression list, mark the contact, stop any active enrollments, and
 * cancel their pending messages. Idempotent.
 */
export async function unsubscribeEmail(
  sql: Sql,
  email: string,
  reason: "unsubscribe" | "complaint" = "unsubscribe",
): Promise<void> {
  const normalized = email.trim().toLowerCase();
  await sql`
    insert into outreach_suppressions (email, reason)
    values (${normalized}, ${reason})
    on conflict (email) do nothing
  `;
  await sql`
    update outreach_contacts set unsubscribed_at = now(), updated_at = now()
    where lower(email) = ${normalized} and unsubscribed_at is null
  `;
  await sql`
    update outreach_enrollments e
    set status = 'stopped', stop_reason = ${reason}, updated_at = now()
    from outreach_contacts c
    where e.contact_id = c.id and lower(c.email) = ${normalized} and e.status = 'active'
  `;
  await sql`
    update outreach_messages m
    set status = 'cancelled', updated_at = now()
    from outreach_contacts c
    where m.contact_id = c.id and lower(c.email) = ${normalized}
      and m.status in ('scheduled', 'claimed')
  `;
}

export interface RecordSendInput {
  messageId: string | null;
  campaignId: string | null;
  contactId: string | null;
  toEmail: string;
  subject: string | null;
  providerMessageId: string | null;
  status: "sent" | "failed" | "skipped";
  error?: string | null;
  /** Exact rendered email (stored on sent rows for the admin preview). */
  bodyHtml?: string | null;
  bodyText?: string | null;
}

export async function recordSend(sql: Sql, s: RecordSendInput): Promise<void> {
  await sql`
    insert into outreach_sends
      (message_id, campaign_id, contact_id, to_email, subject,
       provider_message_id, status, error, body_html, body_text)
    values
      (${s.messageId}, ${s.campaignId}, ${s.contactId}, ${s.toEmail},
       ${s.subject ?? null}, ${s.providerMessageId ?? null}, ${s.status}, ${s.error ?? null},
       ${s.bodyHtml ?? null}, ${s.bodyText ?? null})
  `;
}

export interface InboundEmailInput {
  fromEmail: string;
  fromName?: string | null;
  toEmail?: string | null;
  subject?: string | null;
  bodyText?: string | null;
  bodyHtml?: string | null;
  messageId?: string | null;
  inReplyTo?: string | null;
  receivedAt?: Date | null;
}

/** Store a received email, matching it to a contact by sender address. Deduped on Message-ID. */
export async function insertInbound(
  sql: Sql,
  m: InboundEmailInput,
): Promise<{ stored: boolean }> {
  const from = m.fromEmail.trim().toLowerCase();
  const received = m.receivedAt ?? null;
  const rows = await sql<{ id: number }[]>`
    insert into outreach_inbound
      (from_email, from_name, to_email, subject, body_text, body_html,
       message_id, in_reply_to, contact_id, received_at)
    values (
      ${from}, ${m.fromName ?? null}, ${m.toEmail ?? null}, ${m.subject ?? null},
      ${m.bodyText ?? null}, ${m.bodyHtml ?? null}, ${m.messageId ?? null}, ${m.inReplyTo ?? null},
      (select id from outreach_contacts where lower(email) = ${from} limit 1),
      coalesce(${received}, now())
    )
    on conflict (message_id) where message_id is not null do nothing
    returning id
  `;
  return { stored: rows.length > 0 };
}

/**
 * Claim up to `limit` due messages atomically (FOR UPDATE SKIP LOCKED), plus
 * any 'claimed' rows whose lease expired (a crashed worker). Concurrency-safe
 * across any number of workers.
 */
export async function claimDueMessages(
  sql: Sql,
  limit: number,
  leaseMinutes = 10,
): Promise<MessageRow[]> {
  return sql<MessageRow[]>`
    update outreach_messages
    set status = 'claimed', claimed_at = now(), updated_at = now()
    where id in (
      select id from outreach_messages
      where (status = 'scheduled' and due_at <= now())
         or (status = 'claimed' and claimed_at < now() - make_interval(mins => ${leaseMinutes}))
      order by due_at
      limit ${limit}
      for update skip locked
    )
    returning *
  `;
}

export async function markMessageSent(
  sql: Sql,
  id: string,
  providerMessageId: string | null,
  subject: string,
): Promise<void> {
  await sql`
    update outreach_messages
    set status = 'sent', sent_at = now(), provider_message_id = ${providerMessageId},
        subject_snapshot = ${subject}, last_error = null, updated_at = now()
    where id = ${id}
  `;
}

export async function markMessageSkipped(
  sql: Sql,
  id: string,
  reason: string,
): Promise<void> {
  await sql`
    update outreach_messages
    set status = 'skipped', last_error = ${reason}, updated_at = now()
    where id = ${id}
  `;
}

/** Re-arm a claimed message back to scheduled at a new due time (e.g. paused campaign). */
export async function deferMessage(
  sql: Sql,
  id: string,
  dueAt: Date,
): Promise<void> {
  await sql`
    update outreach_messages set status = 'scheduled', due_at = ${dueAt}, updated_at = now()
    where id = ${id}
  `;
}

export async function recordMessageFailure(
  sql: Sql,
  id: string,
  attempts: number,
  maxAttempts: number,
  error: string,
  nextDueAt: Date,
): Promise<"failed" | "scheduled"> {
  const next = attempts >= maxAttempts ? "failed" : "scheduled";
  if (next === "failed") {
    await sql`
      update outreach_messages
      set status = 'failed', attempts = ${attempts}, last_error = ${error}, updated_at = now()
      where id = ${id}
    `;
  } else {
    await sql`
      update outreach_messages
      set status = 'scheduled', attempts = ${attempts}, last_error = ${error},
          due_at = ${nextDueAt}, claimed_at = null, updated_at = now()
      where id = ${id}
    `;
  }
  return next;
}
