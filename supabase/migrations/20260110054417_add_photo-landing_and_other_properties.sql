alter table public.user_config
add column cover_image_url text;

alter table public.user_config
add column website text;

alter table public.user_config
add column bio text;

alter table public.user_config
add column status boolean;

alter table public.user_config
add column request_delete boolean;

alter table public.user_config
add column request_delete_text text;