-- Inbound emails (replies received from prospects/clients), captured via the
-- /api/outreach/inbound webhook (fed by a Cloudflare Email Worker). Together
-- with outreach_sends this gives the full two-way conversation per address.
create table if not exists public.outreach_inbound (
  id bigint generated always as identity primary key,
  from_email text not null,
  from_name text,
  to_email text,
  subject text,
  body_text text,
  body_html text,
  message_id text,
  in_reply_to text,
  contact_id uuid references public.outreach_contacts(id) on delete set null,
  received_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);
create index if not exists outreach_inbound_from_idx
  on public.outreach_inbound (lower(from_email), received_at);
-- De-dupe on provider Message-ID when present.
create unique index if not exists outreach_inbound_message_id_uq
  on public.outreach_inbound (message_id) where message_id is not null;

alter table public.outreach_inbound enable row level security;
