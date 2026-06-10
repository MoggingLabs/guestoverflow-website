import "server-only";
import { getDb } from "@/lib/db";

/**
 * Read layer for the admin dashboards. Aggregations live as SQL
 * functions in supabase/migrations/20260610000004_admin_queries.sql so
 * the exact same logic runs locally and on Supabase. Every query
 * returns [] when DATABASE_URL is unset so pages render an empty state.
 */

export type DailyVisitors = {
  day: string;
  visitors: number;
  sessions: number;
  page_views: number;
};

export type FunnelRow = {
  segment: string;
  landed: number;
  engaged: number;
  widget_opened: number;
  widget_completed: number;
  form_started: number;
  form_submitted: number;
};

export type SourceRow = { source: string; sessions: number; conversions: number };
export type PageRow = { url_path: string; views: number; sessions: number };
export type CountryRow = { country: string; sessions: number };
export type DeviceRow = { device: string; sessions: number };
export type RecentSession = {
  session_id: string;
  entry_path: string | null;
  pages: number;
  country: string | null;
  device: string | null;
  browser: string | null;
  first_seen: string;
  last_seen: string;
};
export type FieldFunnelRow = {
  field: string;
  sessions_completed: number;
  median_hesitation_ms: number | null;
};
export type AbandonRow = { last_field: string; abandons: number };
export type ErrorGroup = {
  event: string;
  message: string;
  occurrences: number;
  last_seen: string;
  sample_path: string;
};
export type RageClickRow = {
  selector: string;
  url_path: string;
  occurrences: number;
  last_seen: string;
};

export type Lead = {
  id: number;
  created_at: string;
  name: string;
  email: string;
  business_name: string;
  business_type: string;
  preferred_date: string | null;
  preferred_window: string | null;
  message: string | null;
  page_source: string | null;
  status: "new" | "contacted" | "closed";
};

export type PortfolioClient = {
  id: string;
  name: string;
  venue_type: string;
  plan: string;
  mrr_cents: number;
  status: string;
  health: "green" | "amber" | "red";
  services: string[];
  start_date: string | null;
  bookings_this_month: number | null;
  bookings_last_month: number | null;
  open_implementations: number;
  reviews_due: number;
  last_contact: string | null;
};

export type Client = {
  id: string;
  name: string;
  venue_type: string;
  plan: string;
  mrr_cents: number;
  currency: string;
  start_date: string | null;
  status: string;
  health: "green" | "amber" | "red";
  health_updated_at: string | null;
  services: string[];
  primary_contact: string | null;
  notes: string | null;
};

export type Implementation = {
  id: string;
  client_id: string;
  title: string;
  hypothesis: string | null;
  target_metric: string | null;
  shipped_at: string | null;
  review_due: string | null;
  status: string;
  outcome_notes: string | null;
  created_at: string;
};

export type HealthAssessment = {
  id: number;
  rag: "green" | "amber" | "red";
  usage_trend: string | null;
  sentiment: number | null;
  payment_ok: boolean;
  reason: string | null;
  next_action: string | null;
  assessed_at: string;
};

export type MonthlyFigures = {
  client_id: string;
  month: string;
  bookings: number | null;
  widget_sessions: number | null;
  bookings_value_cents: number | null;
  no_shows: number | null;
  cancellations: number | null;
  covers_or_guests: number | null;
  direct_share_pct: number | null;
  venue_dashboard_logins: number | null;
  support_tickets: number | null;
};

export type Touchpoint = {
  id: number;
  kind: string;
  summary: string;
  occurred_at: string;
};

async function rows<T>(query: Promise<unknown> | null): Promise<T[]> {
  if (!query) return [];
  try {
    return (await query) as T[];
  } catch (err) {
    console.error("[admin/queries]", err);
    return [];
  }
}

export function dailyVisitors(from: Date, to: Date) {
  const sql = getDb();
  return rows<DailyVisitors>(
    sql ? sql`select * from admin_daily_visitors(${from}, ${to})` : null,
  );
}

export function funnel(from: Date, to: Date, split?: "source" | "device") {
  const sql = getDb();
  return rows<FunnelRow>(
    sql ? sql`select * from admin_funnel(${from}, ${to}, ${split ?? null})` : null,
  );
}

export function topSources(from: Date, to: Date) {
  const sql = getDb();
  return rows<SourceRow>(
    sql ? sql`select * from admin_top_sources(${from}, ${to})` : null,
  );
}

export function topPages(from: Date, to: Date) {
  const sql = getDb();
  return rows<PageRow>(
    sql ? sql`select * from admin_top_pages(${from}, ${to})` : null,
  );
}

export function countries(from: Date, to: Date) {
  const sql = getDb();
  return rows<CountryRow>(
    sql ? sql`select * from admin_countries(${from}, ${to})` : null,
  );
}

export function devices(from: Date, to: Date) {
  const sql = getDb();
  return rows<DeviceRow>(
    sql ? sql`select * from admin_devices(${from}, ${to})` : null,
  );
}

export function recentSessions(limit = 15) {
  const sql = getDb();
  return rows<RecentSession>(
    sql ? sql`select * from admin_recent_sessions(${limit})` : null,
  );
}

export function fieldFunnel(from: Date, to: Date) {
  const sql = getDb();
  return rows<FieldFunnelRow>(
    sql ? sql`select * from admin_form_field_funnel(${from}, ${to})` : null,
  );
}

export function formAbandons(from: Date, to: Date) {
  const sql = getDb();
  return rows<AbandonRow>(
    sql ? sql`select * from admin_form_abandons(${from}, ${to})` : null,
  );
}

export function errorGroups(from: Date, to: Date) {
  const sql = getDb();
  return rows<ErrorGroup>(
    sql ? sql`select * from admin_error_groups(${from}, ${to})` : null,
  );
}

export function rageClicks(from: Date, to: Date) {
  const sql = getDb();
  return rows<RageClickRow>(
    sql ? sql`select * from admin_rage_clicks(${from}, ${to})` : null,
  );
}

export function leads(status?: string) {
  const sql = getDb();
  if (!sql) return Promise.resolve([] as Lead[]);
  return rows<Lead>(
    status
      ? sql`select * from leads where status = ${status} order by created_at desc limit 200`
      : sql`select * from leads order by created_at desc limit 200`,
  );
}

export function clientsPortfolio() {
  const sql = getDb();
  return rows<PortfolioClient>(
    sql ? sql`select * from admin_clients_portfolio()` : null,
  );
}

export async function clientById(id: string): Promise<Client | null> {
  const sql = getDb();
  if (!sql) return null;
  const result = await rows<Client>(
    sql`select * from clients where id = ${id}`,
  );
  return result[0] ?? null;
}

export function clientImplementations(clientId: string) {
  const sql = getDb();
  return rows<Implementation>(
    sql
      ? sql`select * from implementations where client_id = ${clientId}
            order by coalesce(shipped_at, created_at::date) desc, created_at desc`
      : null,
  );
}

export function clientAssessments(clientId: string) {
  const sql = getDb();
  return rows<HealthAssessment>(
    sql
      ? sql`select * from health_assessments where client_id = ${clientId}
            order by assessed_at desc limit 20`
      : null,
  );
}

export function clientFigures(clientId: string) {
  const sql = getDb();
  return rows<MonthlyFigures>(
    sql
      ? sql`select * from monthly_figures where client_id = ${clientId}
            order by month`
      : null,
  );
}

export function clientTouchpoints(clientId: string) {
  const sql = getDb();
  return rows<Touchpoint>(
    sql
      ? sql`select * from touchpoints where client_id = ${clientId}
            order by occurred_at desc limit 30`
      : null,
  );
}
