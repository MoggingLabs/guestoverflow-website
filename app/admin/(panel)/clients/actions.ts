"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { getDb } from "@/lib/db";

function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function optStr(formData: FormData, key: string): string | null {
  return str(formData, key) || null;
}

function optInt(formData: FormData, key: string): number | null {
  const value = str(formData, key);
  if (!value) return null;
  const n = Number(value);
  return Number.isFinite(n) ? Math.round(n) : null;
}

export async function createClient(formData: FormData): Promise<void> {
  await requireAdmin();
  const sql = getDb();
  if (!sql) return;

  const row = {
    name: str(formData, "name"),
    venue_type: str(formData, "venue_type"),
    plan: str(formData, "plan") || "standard",
    mrr_cents: Math.round(Number(str(formData, "mrr_eur") || 0) * 100),
    start_date: optStr(formData, "start_date"),
    status: str(formData, "status") || "onboarding",
    services: formData.getAll("services").map(String),
    primary_contact: optStr(formData, "primary_contact"),
    notes: optStr(formData, "notes"),
  };
  if (!row.name || !row.venue_type) return;

  const [created] = await sql`
    insert into clients ${sql(row)} returning id
  `;
  revalidatePath("/admin/clients");
  redirect(`/admin/clients/${created.id}`);
}

export async function logAssessment(formData: FormData): Promise<void> {
  await requireAdmin();
  const sql = getDb();
  if (!sql) return;

  const clientId = str(formData, "client_id");
  const rag = str(formData, "rag");
  const reason = optStr(formData, "reason");
  // Amber/red require a written reason (mirrors the DB check constraint).
  if (!clientId || !rag || (rag !== "green" && !reason)) return;

  await sql`insert into health_assessments ${sql({
    client_id: clientId,
    rag,
    usage_trend: optStr(formData, "usage_trend"),
    sentiment: optInt(formData, "sentiment"),
    payment_ok: formData.get("payment_ok") !== null,
    reason,
    next_action: optStr(formData, "next_action"),
  })}`;
  revalidatePath(`/admin/clients/${clientId}`);
  revalidatePath("/admin/clients");
}

export async function addImplementation(formData: FormData): Promise<void> {
  await requireAdmin();
  const sql = getDb();
  if (!sql) return;

  const clientId = str(formData, "client_id");
  const title = str(formData, "title");
  if (!clientId || !title) return;

  await sql`insert into implementations ${sql({
    client_id: clientId,
    title,
    hypothesis: optStr(formData, "hypothesis"),
    target_metric: optStr(formData, "target_metric"),
    shipped_at: optStr(formData, "shipped_at"),
    review_due: optStr(formData, "review_due"),
    status: str(formData, "status") || "planned",
  })}`;
  revalidatePath(`/admin/clients/${clientId}`);
}

export async function updateImplementation(formData: FormData): Promise<void> {
  await requireAdmin();
  const sql = getDb();
  if (!sql) return;

  const id = str(formData, "id");
  const clientId = str(formData, "client_id");
  const status = str(formData, "status");
  if (!id || !status) return;

  await sql`
    update implementations
    set status = ${status},
        outcome_notes = coalesce(${optStr(formData, "outcome_notes")}, outcome_notes)
    where id = ${id}
  `;
  revalidatePath(`/admin/clients/${clientId}`);
  revalidatePath("/admin/clients");
}

export async function upsertFigures(formData: FormData): Promise<void> {
  await requireAdmin();
  const sql = getDb();
  if (!sql) return;

  const clientId = str(formData, "client_id");
  const month = str(formData, "month"); // yyyy-mm
  if (!clientId || !/^\d{4}-\d{2}$/.test(month)) return;

  const row = {
    client_id: clientId,
    month: `${month}-01`,
    bookings: optInt(formData, "bookings"),
    widget_sessions: optInt(formData, "widget_sessions"),
    no_shows: optInt(formData, "no_shows"),
    cancellations: optInt(formData, "cancellations"),
    covers_or_guests: optInt(formData, "covers_or_guests"),
    direct_share_pct: optInt(formData, "direct_share_pct"),
    venue_dashboard_logins: optInt(formData, "venue_dashboard_logins"),
    support_tickets: optInt(formData, "support_tickets"),
  };

  await sql`
    insert into monthly_figures ${sql(row)}
    on conflict (client_id, month) do update set
      bookings = excluded.bookings,
      widget_sessions = excluded.widget_sessions,
      no_shows = excluded.no_shows,
      cancellations = excluded.cancellations,
      covers_or_guests = excluded.covers_or_guests,
      direct_share_pct = excluded.direct_share_pct,
      venue_dashboard_logins = excluded.venue_dashboard_logins,
      support_tickets = excluded.support_tickets
  `;
  revalidatePath(`/admin/clients/${clientId}`);
  revalidatePath("/admin/clients");
}

export async function addTouchpoint(formData: FormData): Promise<void> {
  await requireAdmin();
  const sql = getDb();
  if (!sql) return;

  const clientId = str(formData, "client_id");
  const summary = str(formData, "summary");
  if (!clientId || !summary) return;

  await sql`insert into touchpoints ${sql({
    client_id: clientId,
    kind: str(formData, "kind") || "other",
    summary,
  })}`;
  revalidatePath(`/admin/clients/${clientId}`);
  revalidatePath("/admin/clients");
}

export async function updateNotes(formData: FormData): Promise<void> {
  await requireAdmin();
  const sql = getDb();
  if (!sql) return;

  const clientId = str(formData, "client_id");
  if (!clientId) return;
  await sql`
    update clients set notes = ${optStr(formData, "notes")} where id = ${clientId}
  `;
  revalidatePath(`/admin/clients/${clientId}`);
}
