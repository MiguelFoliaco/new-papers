create table public.history(
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  type  text not null check (type in ('post-update','post-create','post-publish', 'comment', 'favorite')),
  created_at timestamptz not null default now()
)

-- In a trigger, manage the deletion of history after each entry.