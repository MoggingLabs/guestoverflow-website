-- Where the lead's guests find them today — surfaces no-website
-- businesses so we can route them to the GBP-first offering.
alter table public.leads add column if not exists web_presence text;
