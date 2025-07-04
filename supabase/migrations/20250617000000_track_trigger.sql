-- create table if it doesn't exist yet
create table if not exists public.traffic (
  id          uuid        primary key default gen_random_uuid(),
  project     text        not null,
  visits      int         default 1,
  last_visit  timestamptz default now()
);

-- row-level security stays ON
alter table public.traffic enable row level security;

-- Drop old policy if it exists
drop policy if exists traffic_anon_insert on public.traffic;

-- allow anon insert (only project + visits)
create policy traffic_anon_insert
  on public.traffic
  for insert
  to anon
  with check (true);