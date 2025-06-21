create table users (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  name text,
  created_at timestamp with time zone default now()
);