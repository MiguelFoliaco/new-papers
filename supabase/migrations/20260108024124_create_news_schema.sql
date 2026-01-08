create table public.news (
  id uuid primary key default gen_random_uuid(),

  author_id uuid not null
    references auth.users(id)
    on delete cascade,

  title text not null,

  -- Short text shown on home / cards
  cover_text text not null,

  -- Image URL for home list / cover
  cover_image_url text,

  -- Main content stored as JSON (blocks, markdown, rich editor, etc)
  content jsonb not null,

  -- Publication logic
  published_at timestamptz,
  is_published boolean default false,

  -- Allow updates flag
  allow_updates boolean default true,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);


create table public.news_comments (
  id uuid primary key default gen_random_uuid(),

  news_id uuid not null
    references public.news(id)
    on delete cascade,

  user_id uuid not null
    references auth.users(id)
    on delete cascade,

  -- Self reference for replies
  parent_id uuid
    references public.news_comments(id)
    on delete cascade,

  content text not null,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);


create table public.news_likes (
  news_id uuid not null
    references public.news(id)
    on delete cascade,

  user_id uuid not null
    references auth.users(id)
    on delete cascade,

  created_at timestamptz not null default now(),

  primary key (news_id, user_id)
);

create table public.news_favorites (
  news_id uuid not null
    references public.news(id)
    on delete cascade,

  user_id uuid not null
    references auth.users(id)
    on delete cascade,

  created_at timestamptz not null default now(),

  primary key (news_id, user_id)
);


-- News
create index on public.news (published_at desc);
create index on public.news (author_id);
create index on public.news (is_published);

-- Comments
create index on public.news_comments (news_id);

-- Likes & favorites
create index on public.news_likes (news_id);
create index on public.news_favorites (news_id);



create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_news_updated_at
before update on public.news
for each row
execute function public.set_updated_at();

create trigger set_news_comments_updated_at
before update on public.news_comments
for each row
execute function public.set_updated_at();
