'use server';

import { createClient } from "@/supabase/server";


type Args = {
    order?: 'asc' | 'desc';
    limit?: number;
    offset?: number;
    search?: string;
};

const select = `
new:news_id(
    author_id,
    title,
    slug,
    cover_image_url,
    cover_text,
    created_at,
    id
),
selected_by
`;

export const getNews = async ({
    order = 'desc',
    limit = 10,
    offset = 0,
    search = ''
}: Args) => {
    const supabase = await createClient();

    let query = supabase
        .from('best_news')
        .select(select, { count: 'exact' })
        .order('created_at', { ascending: order === 'asc' })
        .range(offset, offset + limit - 1);

    // 🔍 Search by title
    if (search.trim()) {
        query = query.ilike('news_id.title', `%${search}%`);
    }

    const { data, error, count } = await query;

    if (error) {
        console.error('[getNews]', error);
        throw new Error('Failed to fetch news');
    }

    return {
        data,
        pagination: {
            total: count ?? 0,
            limit,
            offset,
            hasMore: (offset + limit) < (count ?? 0)
        }
    };
};

export type BestNewListType = NonNullable<Awaited<ReturnType<typeof getNews>>['data']>


const selectWithRegion = `
    new:news_id(
        author_id,
        title,
        slug,
        cover_image_url,
        cover_text,
        created_at,
        id
    ),
    region:region_id(
        name,
        slug
    )
`

export const getNewsByRegion = async ({
    region,
    limit = 10,
    offset = 0,
    order = 'desc',
}: Args & { region: string }) => {
    const supabase = await createClient();

    const response = supabase
        .from('news_regions')
        .select(selectWithRegion, { count: 'exact' })
        .eq('region_id', region)
        .order('created_at', { ascending: order === 'asc' })
        .range(offset, offset + limit - 1);

    const { data, error, count } = await response;

    if (error) {
        console.error('[getNews]', error);
        throw new Error('Failed to fetch news');
    }

    return {
        data,
        pagination: {
            total: count ?? 0,
            limit,
            offset,
            hasMore: (offset + limit) < (count ?? 0)
        }
    };
}


export type BestNewRegionType = NonNullable<Awaited<ReturnType<typeof getNewsByRegion>>['data']>