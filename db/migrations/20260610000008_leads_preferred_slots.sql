-- Preferred demo time moves from a morning/afternoon window to concrete
-- 30-minute slots, multiple allowed (e.g. {15:00,15:30} = "3 to 4").
alter table public.leads drop column if exists preferred_window;
alter table public.leads add column if not exists preferred_slots text[];
