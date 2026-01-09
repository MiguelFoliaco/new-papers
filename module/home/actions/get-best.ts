'use server';

import { createClient } from "@/supabase/server";

const select = `
new_best:news_id(
    author_id,
    title,
    slug,
    cover_image_url,
    cover_text,
    created_at,
    id
),
selected_by
`
export const getBestNews = async () => {
    const client = await createClient()
    const bestNew = await client.from('best_news').select(select).maybeSingle();

    if (bestNew.data == null) {
        return {
            msg: 'error_get_data',
            data: null,
            status: 'fail'
        }
    }
    return {
        msg: 'success',
        data: bestNew.data,
        status: 'success'
    }
}

export type BestNewType = NonNullable<Awaited<ReturnType<typeof getBestNews>>['data']>