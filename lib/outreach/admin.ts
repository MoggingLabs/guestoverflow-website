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
}

export async function outreachCounts(): Promise<OutreachCounts> {
  const sql = getDb();
  if (!sql) return { suppressions: 0, contacts: 0, leads: 0 };
  const [row] = await sql<OutreachCounts[]>`
    select
      (select count(*) from outreach_suppressions)::int as suppressions,
      (select count(*) from outreach_contacts)::int as contacts,
      (select count(*) from leads)::int as leads
  `;
  return row ?? { suppressions: 0, contacts: 0, leads: 0 };
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
