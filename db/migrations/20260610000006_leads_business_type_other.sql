-- Free-text business description captured when a lead picks "Other"
-- as their business type (required in that case, enforced in the app).
alter table public.leads add column if not exists business_type_other text;
