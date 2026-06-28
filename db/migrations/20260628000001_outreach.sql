-- Outbound email outreach engine.
--
-- Contacts (recipients), reusable templates, multi-step drip campaigns,
-- per-recipient durable scheduled sends (the unit the worker claims and
-- sends), a send ledger, and a suppression/unsubscribe list enforced on
-- every send. Modeled on the SaaS app's scheduled_notifications +
-- notification_log pattern. Service-role access only (RLS on, no policies),
-- matching public.leads / public.clients.

-- Reusable email templates with {{merge}} fields (e.g. {{firstName}}).
create table if not exists public.outreach_templates (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  subject text not null,
  body_html text not null,
  body_text text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- A campaign is an ordered sequence of steps (the drip).
create table if not exists public.outreach_campaigns (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  status text not null default 'draft'
    check (status in ('draft', 'active', 'paused', 'archived')),
  from_email text,                 -- null -> falls back to OUTREACH_FROM_EMAIL / LEAD_FROM_EMAIL
  reply_to text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Steps within a campaign. delay_hours is measured from enrollment for the
-- first step, and from the previous step's send time for later steps.
create table if not exists public.outreach_steps (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references public.outreach_campaigns(id) on delete cascade,
  step_index integer not null,                     -- 0-based order
  template_id uuid not null references public.outreach_templates(id),
  delay_hours integer not null default 0 check (delay_hours >= 0),
  created_at timestamptz not null default now(),
  unique (campaign_id, step_index)
);
create index if not exists outreach_steps_campaign_idx
  on public.outreach_steps (campaign_id, step_index);

-- Recipients. Email is unique case-insensitively so we never store dupes.
create table if not exists public.outreach_contacts (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  name text,
  business_name text,
  source text not null default 'manual'
    check (source in ('lead', 'manual', 'csv', 'import')),
  lead_id bigint references public.leads(id) on delete set null,
  fields jsonb not null default '{}'::jsonb,        -- arbitrary extra merge vars
  unsubscribed_at timestamptz,
  bounced_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create unique index if not exists outreach_contacts_email_uq
  on public.outreach_contacts (lower(email));

-- A contact enrolled into a campaign. At most one enrollment per pair.
create table if not exists public.outreach_enrollments (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references public.outreach_campaigns(id) on delete cascade,
  contact_id uuid not null references public.outreach_contacts(id) on delete cascade,
  status text not null default 'active'
    check (status in ('active', 'completed', 'stopped')),
  stop_reason text,                                -- unsubscribed | bounced | replied | manual
  current_step integer not null default -1,        -- highest step a message exists for; -1 = none yet
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (campaign_id, contact_id)
);
create index if not exists outreach_enrollments_campaign_idx
  on public.outreach_enrollments (campaign_id, status);

-- Durable per-recipient scheduled send. The worker claims due rows via
-- FOR UPDATE SKIP LOCKED. unique(enrollment, step) makes scheduling idempotent.
create table if not exists public.outreach_messages (
  id uuid primary key default gen_random_uuid(),
  enrollment_id uuid not null references public.outreach_enrollments(id) on delete cascade,
  campaign_id uuid not null references public.outreach_campaigns(id) on delete cascade,
  contact_id uuid not null references public.outreach_contacts(id) on delete cascade,
  step_index integer not null,
  template_id uuid not null references public.outreach_templates(id),
  to_email text not null,
  due_at timestamptz not null,
  status text not null default 'scheduled'
    check (status in ('scheduled', 'claimed', 'sent', 'failed', 'skipped', 'cancelled')),
  attempts integer not null default 0,
  last_error text,
  provider_message_id text,
  subject_snapshot text,
  claimed_at timestamptz,
  sent_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists outreach_messages_due_idx
  on public.outreach_messages (status, due_at);
create unique index if not exists outreach_messages_enrollment_step_uq
  on public.outreach_messages (enrollment_id, step_index);

-- Suppression list: never email these addresses again (stored lowercased).
create table if not exists public.outreach_suppressions (
  email text primary key,
  reason text not null default 'unsubscribe'
    check (reason in ('unsubscribe', 'bounce', 'complaint', 'manual')),
  created_at timestamptz not null default now()
);

-- Append-only send ledger for analytics + audit.
create table if not exists public.outreach_sends (
  id bigint generated always as identity primary key,
  message_id uuid references public.outreach_messages(id) on delete set null,
  campaign_id uuid,
  contact_id uuid,
  to_email text not null,
  subject text,
  provider_message_id text,
  status text not null check (status in ('sent', 'failed', 'skipped')),
  error text,
  sent_at timestamptz not null default now()
);
create index if not exists outreach_sends_campaign_idx
  on public.outreach_sends (campaign_id, sent_at);

-- Service-role access only: RLS on, no policies (matches leads/clients).
alter table public.outreach_templates    enable row level security;
alter table public.outreach_campaigns     enable row level security;
alter table public.outreach_steps         enable row level security;
alter table public.outreach_contacts      enable row level security;
alter table public.outreach_enrollments   enable row level security;
alter table public.outreach_messages      enable row level security;
alter table public.outreach_suppressions  enable row level security;
alter table public.outreach_sends         enable row level security;
