-- Prospects: CSV-imported cold-outreach contacts (source='prospect') that you
-- email one-by-one from the Prospects tab. Reuses outreach_contacts; the rich
-- per-prospect fields live in the existing `fields` jsonb. last_emailed_at
-- records the most recent one-off send so the table can show contact state.

alter table public.outreach_contacts
  drop constraint if exists outreach_contacts_source_check;
alter table public.outreach_contacts
  add constraint outreach_contacts_source_check
  check (source in ('lead', 'manual', 'csv', 'import', 'prospect'));

alter table public.outreach_contacts
  add column if not exists last_emailed_at timestamptz;
