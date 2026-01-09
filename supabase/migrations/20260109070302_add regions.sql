
-- REGIONS

create table
    public.regions (
        id uuid primary key default gen_random_uuid (),
        name text not null,
        slug text not null unique,
        type text not null check (type in ('zone', 'country', 'city', 'other')),
        parent_id uuid references public.regions (id) on delete cascade,
        created_at timestamptz not null default now ()
    );

-- NEWS  REGIONS (MANY TO MANY)
create table
    public.news_regions (
        news_id uuid not null references public.news (id) on delete cascade,
        region_id uuid not null references public.regions (id) on delete cascade,
        created_at timestamptz not null default now (),
        primary key (news_id, region_id)
    );


-- INDEXES

create index idx_regions_parent_id on public.regions (parent_id);

create index idx_regions_slug on public.regions (slug);

create index idx_news_regions_news_id on public.news_regions (news_id);

create index idx_news_regions_region_id on public.news_regions (region_id);