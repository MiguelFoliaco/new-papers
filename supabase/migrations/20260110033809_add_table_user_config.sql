create table public.user_config(
    id uuid primary key default gen_random_uuid(),
    auth_id uuid not null references auth.users(id) on delete cascade,
    username text unique not null,
    rol text not null check (rol in ('admin','editor','user','ia')),
    accept_newletters_email boolean default FALSE not null,
    avatar text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
)