alter table public.news
add column slug text;

update public.news
set
    slug = lower(regexp_replace (title, '[^a-zA-Z0-9]+', '-', 'g'))
where
    slug is null;

update public.news
set
    slug = trim(
        both '-'
        from
            slug
    );

alter table public.news
alter column slug
set
    not null;

create unique index news_slug_unique on public.news (lower(slug));