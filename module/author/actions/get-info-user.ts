'use server';

import { createClient } from "@/supabase/server";
import { cache } from "react";


const select = `
  id,
  auth_id,
  username,
  rol,
  accept_newletters_email,
  avatar,
  created_at,
  updated_at,
  cover_image_url,
  website,
  bio,
  status,
  request_delete,
  request_delete_text
`

const selectNews = `
  id,
  author_id,
  title,
  slug,
  cover_image_url,
  cover_text,
  created_at
`

export const getInfoUser = cache(async (username: string) => {
  const client = await createClient()

  const userConfig = await client.from('user_config').select(select).eq('username', username).single()
  if (userConfig.error) return { msg: userConfig.error.message, status: 'error' }

  const news = await client.from('news').select(selectNews).eq('author_id', userConfig.data.auth_id).order('created_at', { ascending: false })

  return {
    data: { user: userConfig.data, news: news.data || [] },
    status: 'success',
    msg: 'success'
  }
})

export type InfoUser = NonNullable<Awaited<ReturnType<typeof getInfoUser>>['data']>