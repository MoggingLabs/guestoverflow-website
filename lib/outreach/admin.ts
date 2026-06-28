import "server-only";
import { getDb } from "@/lib/db";

/**
 * Read layer for the admin Outreach screens. Every query returns an empty
 * result when DATABASE_URL is unset so the pages render an empty state in
 * local dev without a database.
 */

export interface TemplateListItem {
  id: string;
  name: string;
  subject: string;
  updated_at: string;
}

export async function listTemplates(): Promise<TemplateListItem[]> {
  const sql = getDb();
  if (!sql) return [];
  return sql<TemplateListItem[]>`
    select id, name, subject, updated_at
    from outreach_templates order by updated_at desc
  `;
}

export interface CampaignListItem {
  id: string;
  name: string;
  status: string;
  steps: number;
  contacts: number;
  sent: number;
  scheduled: number;
  failed: number;
}

export async function listCampaigns(): Promise<CampaignListItem[]> {
  const sql = getDb();
  if (!sql) return [];
  return sql<CampaignListItem[]>`
    select c.id, c.name, c.status,
      (select count(*) from outreach_steps s where s.campaign_id = c.id)::int as steps,
      (select count(*) from outreach_enrollments e where e.campaign_id = c.id)::int as contacts,
      (select count(*) from outreach_messages m where m.campaign_id = c.id and m.status = 'sent')::int as sent,
      (select count(*) from outreach_messages m where m.campaign_id = c.id and m.status in ('scheduled','claimed'))::int as scheduled,
      (select count(*) from outreach_messages m where m.campaign_id = c.id and m.status = 'failed')::int as failed
    from outreach_campaigns c order by c.created_at desc
  `;
}

export interface OutreachCounts {
  suppressions: number;
  contacts: number;
  leads: number;
  sends: number;
}

export async function outreachCounts(): Promise<OutreachCounts> {
  const sql = getDb();
  if (!sql) return { suppressions: 0, contacts: 0, leads: 0, sends: 0 };
  const [row] = await sql<OutreachCounts[]>`
    select
      (select count(*) from outreach_suppressions)::int as suppressions,
      (select count(*) from outreach_contacts)::int as contacts,
      (select count(*) from leads)::int as leads,
      (select count(*) from outreach_sends where status = 'sent')::int as sends
  `;
  return row ?? { suppressions: 0, contacts: 0, leads: 0, sends: 0 };
}

export interface ProspectRow {
  id: string;
  email: string;
  name: string | null;
  business_name: string | null;
  fields: Record<string, string>;
  last_emailed_at: string | null;
  unsubscribed_at: string | null;
  suppressed: boolean;
}

export async function listProspects(): Promise<ProspectRow[]> {
  const sql = getDb();
  if (!sql) return [];
  return sql<ProspectRow[]>`
    select c.id, c.email, c.name, c.business_name, c.fields, c.last_emailed_at, c.unsubscribed_at,
      exists(select 1 from outreach_suppressions s where s.email = lower(c.email)) as suppressed
    from outreach_contacts c
    where c.source = 'prospect'
    order by c.created_at desc limit 500
  `;
}

export async function getProspect(id: string): Promise<ProspectRow | null> {
  const sql = getDb();
  if (!sql) return null;
  const [row] = await sql<ProspectRow[]>`
    select c.id, c.email, c.name, c.business_name, c.fields, c.last_emailed_at, c.unsubscribed_at,
      exists(select 1 from outreach_suppressions s where s.email = lower(c.email)) as suppressed
    from outreach_contacts c
    where c.id = ${id} and c.source = 'prospect'
  `;
  return row ?? null;
}

export interface SendListItem {
  id: number;
  to_email: string;
  subject: string | null;
  status: string;
  campaign_name: string | null;
  sent_at: string;
  is_test: boolean;
}

export async function listSends(limit = 300): Promise<SendListItem[]> {
  const sql = getDb();
  if (!sql) return [];
  return sql<SendListItem[]>`
    select s.id, s.to_email, s.subject, s.status, c.name as campaign_name, s.sent_at,
      (s.subject like '[TEST]%') as is_test
    from outreach_sends s
    left join outreach_campaigns c on c.id = s.campaign_id
    order by s.sent_at desc limit ${limit}
  `;
}

export interface SendDetail {
  id: number;
  to_email: string;
  subject: string | null;
  status: string;
  error: string | null;
  provider_message_id: string | null;
  campaign_name: string | null;
  sent_at: string;
  body_html: string | null;
  body_text: string | null;
}

export interface SendRecipientOption {
  value: string; // "lead:<id>" | "contact:<uuid>"
  email: string;
  name: string | null;
  business: string | null;
  group: "Prospects" | "Leads";
}

/** Leads + prospects, for the Send Email recipient picker. */
export async function listSendRecipients(): Promise<SendRecipientOption[]> {
  const sql = getDb();
  if (!sql) return [];
  const prospects = await sql<
    { id: string; email: string; name: string | null; business_name: string | null }[]
  >`select id, email, name, business_name from outreach_contacts where source = 'prospect' order by created_at desc limit 500`;
  const leads = await sql<
    { id: number; email: string; name: string | null; business_name: string | null }[]
  >`select id, email, name, business_name from leads order by created_at desc limit 500`;
  return [
    ...prospects.map((p) => ({
      value: `contact:${p.id}`,
      email: p.email,
      name: p.name,
      business: p.business_name,
      group: "Prospects" as const,
    })),
    ...leads.map((l) => ({
      value: `lead:${l.id}`,
      email: l.email,
      name: l.name,
      business: l.business_name,
      group: "Leads" as const,
    })),
  ];
}

export interface LoadedRecipient {
  type: "lead" | "contact";
  id: string;
  email: string;
  name: string | null;
  business_name: string | null;
  fields: Record<string, string>;
}

export async function getRecipient(value: string): Promise<LoadedRecipient | null> {
  const sql = getDb();
  if (!sql) return null;
  const sep = value.indexOf(":");
  if (sep < 0) return null;
  const type = value.slice(0, sep);
  const id = value.slice(sep + 1);
  if (type === "lead") {
    const [l] = await sql<{ id: number; email: string; name: string | null; business_name: string | null }[]>`
      select id, email, name, business_name from leads where id = ${Number(id)}
    `;
    return l
      ? { type: "lead", id: String(l.id), email: l.email, name: l.name, business_name: l.business_name, fields: {} }
      : null;
  }
  if (type === "contact") {
    const [c] = await sql<{ id: string; email: string; name: string | null; business_name: string | null; fields: Record<string, string> }[]>`
      select id, email, name, business_name, fields from outreach_contacts where id = ${id}
    `;
    return c
      ? { type: "contact", id: c.id, email: c.email, name: c.name, business_name: c.business_name, fields: c.fields ?? {} }
      : null;
  }
  return null;
}

export interface ConversationRow {
  email: string;
  raw_email: string;
  last_at: string;
  msg_count: number;
  sent_count: number;
  received_count: number;
  last_subject: string | null;
  last_dir: "sent" | "received";
  business_name: string | null;
  contact_name: string | null;
  source: string | null;
  is_client: boolean;
}

/** One row per external address that has any email activity (sent or received).
 *  `sinceDays` of 0 means all time. */
export async function listConversations(sinceDays = 0): Promise<ConversationRow[]> {
  const sql = getDb();
  if (!sql) return [];
  return sql<ConversationRow[]>`
    with msgs as (
      select lower(s.to_email) as email, s.to_email as raw, 'sent' as dir, s.subject, s.sent_at as at
        from outreach_sends s where s.to_email is not null
      union all
      select lower(i.from_email), i.from_email, 'received', i.subject, i.received_at
        from outreach_inbound i
    )
    select
      m.email,
      max(m.raw) as raw_email,
      max(m.at) as last_at,
      count(*)::int as msg_count,
      count(*) filter (where m.dir = 'sent')::int as sent_count,
      count(*) filter (where m.dir = 'received')::int as received_count,
      (array_agg(m.subject order by m.at desc))[1] as last_subject,
      (array_agg(m.dir order by m.at desc))[1] as last_dir,
      c.business_name, c.name as contact_name, c.source,
      exists(select 1 from public.clients cl where lower(cl.primary_contact) = m.email) as is_client
    from msgs m
    left join outreach_contacts c on lower(c.email) = m.email
    group by m.email, c.business_name, c.name, c.source
    having (${sinceDays}::int = 0 or max(m.at) >= now() - make_interval(days => ${sinceDays}::int))
    order by last_at desc
    limit 1000
  `;
}

export interface ThreadMessage {
  direction: "sent" | "received";
  subject: string | null;
  status: string | null;
  at: string;
  body_html: string | null;
  body_text: string | null;
  party: string;
}

export async function getThread(email: string): Promise<ThreadMessage[]> {
  const sql = getDb();
  if (!sql) return [];
  return sql<ThreadMessage[]>`
    select 'sent' as direction, s.subject, s.status, s.sent_at as at, s.body_html, s.body_text, s.to_email as party
      from outreach_sends s where lower(s.to_email) = lower(${email})
    union all
    select 'received', i.subject, null, i.received_at, i.body_html, i.body_text, i.from_email
      from outreach_inbound i where lower(i.from_email) = lower(${email})
    order by at asc
  `;
}

export interface ConversationMeta {
  business_name: string | null;
  contact_name: string | null;
  source: string | null;
  is_client: boolean;
}

export async function getConversationMeta(email: string): Promise<ConversationMeta> {
  const sql = getDb();
  if (!sql) return { business_name: null, contact_name: null, source: null, is_client: false };
  const [row] = await sql<ConversationMeta[]>`
    select c.business_name, c.name as contact_name, c.source,
      exists(select 1 from public.clients cl where lower(cl.primary_contact) = lower(${email})) as is_client
    from outreach_contacts c where lower(c.email) = lower(${email}) limit 1
  `;
  return row ?? { business_name: null, contact_name: null, source: null, is_client: false };
}

export async function getSend(id: number): Promise<SendDetail | null> {
  const sql = getDb();
  if (!sql) return null;
  const [row] = await sql<SendDetail[]>`
    select s.id, s.to_email, s.subject, s.status, s.error, s.provider_message_id,
      c.name as campaign_name, s.sent_at, s.body_html, s.body_text
    from outreach_sends s
    left join outreach_campaigns c on c.id = s.campaign_id
    where s.id = ${id}
  `;
  return row ?? null;
}

export interface CampaignDetail {
  campaign: {
    id: string;
    name: string;
    status: string;
    from_email: string | null;
    reply_to: string | null;
  };
  steps: {
    step_index: number;
    delay_hours: number;
    template_name: string;
    subject: string;
  }[];
  enrollments: {
    id: string;
    status: string;
    current_step: number;
    email: string;
    name: string | null;
    business_name: string | null;
    last_status: string | null;
  }[];
  recent: {
    to_email: string;
    subject: string | null;
    status: string;
    sent_at: string;
  }[];
  stats: { sent: number; scheduled: number; failed: number };
}

export async function getCampaignDetail(
  id: string,
): Promise<CampaignDetail | null> {
  const sql = getDb();
  if (!sql) return null;

  const [campaign] = await sql<CampaignDetail["campaign"][]>`
    select id, name, status, from_email, reply_to from outreach_campaigns where id = ${id}
  `;
  if (!campaign) return null;

  const steps = await sql<CampaignDetail["steps"]>`
    select s.step_index, s.delay_hours, t.name as template_name, t.subject
    from outreach_steps s join outreach_templates t on t.id = s.template_id
    where s.campaign_id = ${id} order by s.step_index
  `;

  const enrollments = await sql<CampaignDetail["enrollments"]>`
    select e.id, e.status, e.current_step, ct.email, ct.name, ct.business_name,
      (select m.status from outreach_messages m where m.enrollment_id = e.id
        order by m.step_index desc limit 1) as last_status
    from outreach_enrollments e join outreach_contacts ct on ct.id = e.contact_id
    where e.campaign_id = ${id} order by e.created_at desc limit 200
  `;

  const recent = await sql<CampaignDetail["recent"]>`
    select to_email, subject, status, sent_at from outreach_sends
    where campaign_id = ${id} order by sent_at desc limit 50
  `;

  const [stats] = await sql<CampaignDetail["stats"][]>`
    select
      count(*) filter (where status = 'sent')::int as sent,
      count(*) filter (where status in ('scheduled','claimed'))::int as scheduled,
      count(*) filter (where status = 'failed')::int as failed
    from outreach_messages where campaign_id = ${id}
  `;

  return {
    campaign,
    steps,
    enrollments,
    recent,
    stats: stats ?? { sent: 0, scheduled: 0, failed: 0 },
  };
}
