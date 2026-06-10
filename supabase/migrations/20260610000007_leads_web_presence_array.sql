-- "Where do guests find you today?" is now multi-select.
alter table public.leads
  alter column web_presence type text[]
  using case
    when web_presence is null then null
    else array[web_presence]
  end;
