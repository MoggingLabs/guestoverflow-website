-- Aggregation functions powering the admin dashboards. Called with the
-- service role's RPC interface; revoked from public roles.

create or replace function public.admin_daily_visitors(p_from timestamptz, p_to timestamptz)
returns table (day date, visitors bigint, sessions bigint, page_views bigint)
language sql stable security definer set search_path = public as $$
  select ts::date as day,
         count(distinct visitor_id) as visitors,
         count(distinct session_id) as sessions,
         count(*) filter (where event = 'page_view') as page_views
  from events
  where ts >= p_from and ts < p_to
  group by 1 order by 1;
$$;

create or replace function public.admin_funnel(p_from timestamptz, p_to timestamptz, p_split text default null)
returns table (
  segment text, landed bigint, engaged bigint, widget_opened bigint,
  widget_completed bigint, form_started bigint, form_submitted bigint
)
language sql stable security definer set search_path = public as $$
  with first_touch as (
    select distinct on (session_id) session_id,
      coalesce(nullif(utm->>'source', ''), nullif(referrer, ''), '(direct)') as source,
      coalesce(device, 'unknown') as device
    from events
    where ts >= p_from and ts < p_to and event = 'page_view'
    order by session_id, ts
  ),
  flags as (
    select session_id,
      bool_or(event = 'page_engaged')        as engaged,
      bool_or(event = 'widget_opened')       as widget_opened,
      bool_or(event = 'widget_completed')    as widget_completed,
      bool_or(event = 'demo_form_started')   as form_started,
      bool_or(event = 'demo_form_submitted') as form_submitted
    from events
    where ts >= p_from and ts < p_to
    group by session_id
  )
  select case p_split when 'source' then ft.source
                      when 'device' then ft.device
                      else 'all' end as segment,
    count(*)                                 as landed,
    count(*) filter (where f.engaged)          as engaged,
    count(*) filter (where f.widget_opened)    as widget_opened,
    count(*) filter (where f.widget_completed) as widget_completed,
    count(*) filter (where f.form_started)     as form_started,
    count(*) filter (where f.form_submitted)   as form_submitted
  from first_touch ft
  join flags f using (session_id)
  group by 1 order by 2 desc;
$$;

create or replace function public.admin_top_sources(p_from timestamptz, p_to timestamptz, p_limit int default 10)
returns table (source text, sessions bigint, conversions bigint)
language sql stable security definer set search_path = public as $$
  with first_touch as (
    select distinct on (session_id) session_id,
      coalesce(nullif(utm->>'source', ''), nullif(referrer, ''), '(direct)') as source
    from events
    where ts >= p_from and ts < p_to and event = 'page_view'
    order by session_id, ts
  ),
  conv as (
    select distinct session_id from events
    where ts >= p_from and ts < p_to and event = 'demo_form_submitted'
  )
  select ft.source, count(*) as sessions, count(c.session_id) as conversions
  from first_touch ft
  left join conv c using (session_id)
  group by 1 order by 2 desc limit p_limit;
$$;

create or replace function public.admin_top_pages(p_from timestamptz, p_to timestamptz, p_limit int default 10)
returns table (url_path text, views bigint, sessions bigint)
language sql stable security definer set search_path = public as $$
  select url_path, count(*) as views, count(distinct session_id) as sessions
  from events
  where ts >= p_from and ts < p_to and event = 'page_view'
  group by 1 order by 2 desc limit p_limit;
$$;

create or replace function public.admin_countries(p_from timestamptz, p_to timestamptz, p_limit int default 10)
returns table (country char(2), sessions bigint)
language sql stable security definer set search_path = public as $$
  select coalesce(country, '??') as country, count(distinct session_id) as sessions
  from events
  where ts >= p_from and ts < p_to and event = 'page_view'
  group by 1 order by 2 desc limit p_limit;
$$;

create or replace function public.admin_devices(p_from timestamptz, p_to timestamptz)
returns table (device text, sessions bigint)
language sql stable security definer set search_path = public as $$
  select coalesce(device, 'unknown') as device, count(distinct session_id) as sessions
  from events
  where ts >= p_from and ts < p_to and event = 'page_view'
  group by 1 order by 2 desc;
$$;

create or replace function public.admin_recent_sessions(p_limit int default 20)
returns table (
  session_id uuid, entry_path text, pages bigint, country char(2),
  device text, browser text, first_seen timestamptz, last_seen timestamptz
)
language sql stable security definer set search_path = public as $$
  select e.session_id,
         (array_agg(e.url_path order by e.ts) filter (where e.event = 'page_view'))[1] as entry_path,
         count(*) filter (where e.event = 'page_view') as pages,
         max(e.country) as country,
         max(e.device) as device,
         max(e.browser) as browser,
         min(e.ts) as first_seen,
         max(e.ts) as last_seen
  from events e
  group by e.session_id
  order by max(e.ts) desc
  limit p_limit;
$$;

create or replace function public.admin_form_field_funnel(p_from timestamptz, p_to timestamptz)
returns table (field text, sessions_completed bigint, median_hesitation_ms numeric)
language sql stable security definer set search_path = public as $$
  select props->>'field' as field,
         count(distinct session_id) as sessions_completed,
         percentile_cont(0.5) within group (order by (props->>'hesitation_ms')::numeric)
           as median_hesitation_ms
  from events
  where event = 'form_field_completed' and ts >= p_from and ts < p_to
  group by 1;
$$;

create or replace function public.admin_form_abandons(p_from timestamptz, p_to timestamptz)
returns table (last_field text, abandons bigint)
language sql stable security definer set search_path = public as $$
  select coalesce(props->>'last_field', '(none)') as last_field, count(*) as abandons
  from events
  where event = 'demo_form_abandoned' and ts >= p_from and ts < p_to
  group by 1 order by 2 desc;
$$;

create or replace function public.admin_error_groups(p_from timestamptz, p_to timestamptz, p_limit int default 25)
returns table (event text, message text, occurrences bigint, last_seen timestamptz, sample_path text)
language sql stable security definer set search_path = public as $$
  select event,
         coalesce(props->>'message', '(no message)') as message,
         count(*) as occurrences,
         max(ts) as last_seen,
         max(url_path) as sample_path
  from events
  where event in ('js_error', 'demo_form_error') and ts >= p_from and ts < p_to
  group by 1, 2 order by 3 desc limit p_limit;
$$;

create or replace function public.admin_rage_clicks(p_from timestamptz, p_to timestamptz, p_limit int default 25)
returns table (selector text, url_path text, occurrences bigint, last_seen timestamptz)
language sql stable security definer set search_path = public as $$
  select coalesce(props->>'selector', '(unknown)') as selector,
         url_path,
         count(*) as occurrences,
         max(ts) as last_seen
  from events
  where event = 'rage_click' and ts >= p_from and ts < p_to
  group by 1, 2 order by 3 desc limit p_limit;
$$;

create or replace function public.admin_clients_portfolio()
returns table (
  id uuid, name text, venue_type text, plan text, mrr_cents integer,
  status text, health text, services text[], start_date date,
  bookings_this_month integer, bookings_last_month integer,
  open_implementations bigint, reviews_due bigint,
  last_contact timestamptz
)
language sql stable security definer set search_path = public as $$
  select c.id, c.name, c.venue_type, c.plan, c.mrr_cents, c.status, c.health,
         c.services, c.start_date,
         cur.bookings as bookings_this_month,
         prev.bookings as bookings_last_month,
         (select count(*) from implementations i
            where i.client_id = c.id and i.status in ('planned', 'shipped', 'needs_changes'))
           as open_implementations,
         (select count(*) from implementations i
            where i.client_id = c.id and i.status = 'shipped'
              and i.review_due is not null and i.review_due <= current_date)
           as reviews_due,
         (select max(t.occurred_at) from touchpoints t where t.client_id = c.id)
           as last_contact
  from clients c
  left join monthly_figures cur
    on cur.client_id = c.id and cur.month = date_trunc('month', current_date)::date
  left join monthly_figures prev
    on prev.client_id = c.id
   and prev.month = (date_trunc('month', current_date) - interval '1 month')::date
  order by case c.health when 'red' then 0 when 'amber' then 1 else 2 end,
           c.mrr_cents desc;
$$;

-- Service-role only. The anon/authenticated roles may not exist on this
-- Postgres instance, so revoke conditionally.
do $$
begin
  if exists (select 1 from pg_roles where rolname = 'anon') then
    revoke execute on all functions in schema public from anon;
  end if;
  if exists (select 1 from pg_roles where rolname = 'authenticated') then
    revoke execute on all functions in schema public from authenticated;
  end if;
end $$;
