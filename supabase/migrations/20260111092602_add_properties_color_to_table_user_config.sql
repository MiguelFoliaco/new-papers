
ALTER TABLE public.user_config 
ADD COLUMN colors jsonb DEFAULT '{}'::jsonb;
