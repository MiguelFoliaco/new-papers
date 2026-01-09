-- Create enum type
create type public.best_news_selection_type as enum (
  'editorial',
  'community',
  'sponsored',
  'ai_curated'
);


create table public.best_news (
  id uuid primary key default gen_random_uuid(),

  news_id uuid not null
    references public.news(id)
    on delete cascade,

  selected_by public.best_news_selection_type not null,
  dead_date timestamptz not null default (now() + interval '2 days'),
  created_at timestamptz not null default now()
);
