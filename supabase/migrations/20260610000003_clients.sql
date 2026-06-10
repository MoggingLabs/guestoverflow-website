-- Client tracker: roster, implementation log, health history,
-- monthly figures, and touchpoints. Manual entry via the admin panel.

create table public.clients (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  venue_type text not null
    check (venue_type in ('restaurant', 'hotel', 'spa', 'tour_operator', 'salon', 'other')),
  plan text not null default 'standard',         -- e.g. standard | pilot_3mo_half_price | founding | custom
  mrr_cents integer not null default 0,
  currency char(3) not null default 'EUR',
  start_date date,
  status text not null default 'onboarding'
    check (status in ('onboarding', 'active', 'paused', 'churned')),
  health text not null default 'green' check (health in ('green', 'amber', 'red')),
  health_updated_at timestamptz,
  services text[] not null default '{}',          -- gbp_optimization | booking_widget | website_build
  primary_contact text,
  notes text
);

create table public.implementations (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  title text not null,
  hypothesis text,
  target_metric text,
  shipped_at date,
  review_due date,
  status text not null default 'planned' check (status in
    ('planned', 'shipped', 'working', 'not_working', 'needs_changes', 'abandoned')),
  outcome_notes text,
  created_at timestamptz not null default now()
);
create index implementations_client_idx on public.implementations (client_id);

-- Append-only: history shows the trajectory, not just the current state.
create table public.health_assessments (
  id bigint generated always as identity primary key,
  client_id uuid not null references public.clients(id) on delete cascade,
  rag text not null check (rag in ('green', 'amber', 'red')),
  usage_trend text check (usage_trend in ('up', 'flat', 'down')),
  sentiment smallint check (sentiment between 1 and 10),
  payment_ok boolean not null default true,
  reason text,
  next_action text,
  assessed_at timestamptz not null default now(),
  check (rag = 'green' or reason is not null)
);
create index health_assessments_client_idx on public.health_assessments (client_id);

create table public.monthly_figures (
  client_id uuid not null references public.clients(id) on delete cascade,
  month date not null,                            -- first of month
  bookings integer,
  widget_sessions integer,
  bookings_value_cents bigint,
  no_shows integer,
  cancellations integer,
  covers_or_guests integer,
  direct_share_pct numeric(5, 2),
  venue_dashboard_logins integer,
  support_tickets integer,
  primary key (client_id, month)
);

create table public.touchpoints (
  id bigint generated always as identity primary key,
  client_id uuid not null references public.clients(id) on delete cascade,
  kind text not null check (kind in ('call', 'email', 'visit', 'whatsapp', 'other')),
  summary text not null,
  occurred_at timestamptz not null default now()
);
create index touchpoints_client_idx on public.touchpoints (client_id);

alter table public.clients enable row level security;
alter table public.implementations enable row level security;
alter table public.health_assessments enable row level security;
alter table public.monthly_figures enable row level security;
alter table public.touchpoints enable row level security;

-- Keep clients.health in sync with the latest logged assessment.
create or replace function public.sync_client_health() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  update clients
  set health = new.rag, health_updated_at = new.assessed_at
  where id = new.client_id;
  return new;
end $$;

create trigger health_assessments_sync
after insert on public.health_assessments
for each row execute function public.sync_client_health();
