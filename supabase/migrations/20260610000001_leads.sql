-- Leads captured by the public demo-request form (app/api/demo-request).
create table if not exists public.leads (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  business_name text not null,
  business_type text not null,
  preferred_date date,
  preferred_window text,
  message text,
  page_source text,
  status text not null default 'new' check (status in ('new', 'contacted', 'closed'))
);

-- Service-role access only: RLS on with no policies.
alter table public.leads enable row level security;
