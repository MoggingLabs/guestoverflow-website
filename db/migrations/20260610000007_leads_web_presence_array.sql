-- "Where do guests find you today?" is now multi-select.
-- Guarded so re-running on an already-converted column is a no-op.
do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'leads'
      and column_name = 'web_presence' and data_type <> 'ARRAY'
  ) then
    alter table public.leads
      alter column web_presence type text[]
      using case
        when web_presence is null then null
        else array[web_presence]
      end;
  end if;
end $$;
