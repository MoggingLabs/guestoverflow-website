-- Store the exact rendered email on each send-ledger row, so the admin "Sent"
-- view can show precisely what the recipient received (even if the template is
-- later edited). Nullable: skipped/failed rows have no rendered body.
alter table public.outreach_sends add column if not exists body_html text;
alter table public.outreach_sends add column if not exists body_text text;
