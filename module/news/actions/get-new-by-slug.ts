import { createClient } from "@/supabase/server"

export const getNewsBySlug = async (slug: string) => {
    const client = await createClient()
    const response = await client.from('news').select('*').eq('slug', slug).single()
    return response
}