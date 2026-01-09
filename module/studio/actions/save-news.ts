'use server';

import { TablesInsert } from "@/supabase/database.types";
import { createClient } from "@/supabase/server";


export type saveNewsProps = TablesInsert<'news'>

export const saveNews = async (args: saveNewsProps) => {
    const client = await createClient()
    const user = await client.auth.getUser()
    if (!user.data.user) return { msg: 'No user', status: 'not_login' }
    const response = await client.from('news').insert({
        ...args,
        author_id: user.data.user.id,
    });
    if (response.error) return { msg: response.error.message, status: 'error' }
    return {
        msg: 'News saved successfully',
        status: 'success'
    }
}