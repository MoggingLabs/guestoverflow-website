-- First-party analytics events. Cookieless model: visitor_id is a
-- server-side sha256(daily_salt || ip || ua) — raw IP/UA are never stored,
-- and the salt rotates daily so cross-day linkage is impossible.
create table if not exists public.events (
  id bigint generated always as identity primary key,
  ts timestamptz not null default now(),
  visitor_id text not null,
  session_id uuid not null,
  event text not null,
  props jsonb not null default '{}'::jsonb,
  url_path text not null default '/',
  referrer text,                 -- hostname only, derived server-side
  utm jsonb,                     -- {source, medium, campaign, term, content}
  device text,                   -- desktop | mobile | tablet
  browser text,
  os text,
  country char(2)
);

create index if not exists events_ts_idx on public.events (ts);
create index if not exists events_event_ts_idx on public.events (event, ts);
create index if not exists events_session_idx on public.events (session_id);
create index if not exists events_props_gin on public.events using gin (props);

alter table public.events enable row level security;
