'use server';

import { TablesInsert } from "@/supabase/database.types";
import { createClient } from "@/supabase/server";
import { getUserConfig } from "./get-user-config";


export const saveUserConfig = async (input: TablesInsert<'user_config'>) => {
    const client = await createClient()
    const user = await client.auth.getUser()

    if (!user.data.user) return { msg: 'No user', status: 'not_login' }


    const userConfigChange = await client.from('user_config').upsert({
        auth_id: user.data.user.id,
        rol: 'user',
        username: input?.username?.toLowerCase(),
        bio: input.bio,
        website: input.website,
        accept_newletters_email: input.accept_newletters_email,
        avatar: input.avatar,
        cover_image_url: input.cover_image_url,
        updated_at: new Date().toISOString(),
        status: true,
        id: input.id !== '' ? input.id : undefined,
    }).select('*').single()

    if (userConfigChange.error) return { msg: userConfigChange.error.message, status: 'error' }

    return { data: userConfigChange.data, status: 'success', msg: 'success' }
}


export const updateImagesUserConfig = async (id: string, cover_image?: string, avatar?: string) => {
    const client = await createClient()
    const user = await client.auth.getUser()

    if (!user.data.user) return { msg: 'No user', status: 'not_login' }

    const userConfigChange = await client.from('user_config').update({ cover_image_url: cover_image, avatar: avatar }).eq('id', id).select('*').single()

    if (userConfigChange.error) return { msg: userConfigChange.error.message, status: 'error' }

    return { data: userConfigChange.data, status: 'success', msg: 'success' }
}

type args = { reason: string, otherReason: string, duration: string }

export const disableAccount = async ({ reason, otherReason, duration }: args) => {
    const client = await createClient()
    const configUser = await getUserConfig()

    if (!configUser.user) return { msg: 'No user', status: 'not_login' }
    if (configUser.status !== 'success' || configUser.data == null) return configUser

    const userConfig = configUser.data
    // const user = configUser.user

    const userConfigChange = await client.from('user_config').update({
        status: false,
        request_delete_text: `
        # Request Disable: ${reason ?? 'Other'}
        # Other Reason: ${otherReason}
        # Duration: ${duration}
        `
    }).eq('id', userConfig.id).select('*').single()
    //const updateNews = await client.from('news').update({ status: false }).eq('author_id', user.id).select('*').single()
    if (userConfigChange.error) return { msg: userConfigChange.error.message, status: 'error' }

    return { data: userConfigChange.data, status: 'success', msg: 'success' }
}


export const activeAccount = async () => {
    const client = await createClient()
    const configUser = await getUserConfig()

    if (!configUser.user) return { msg: 'No user', status: 'not_login' }
    if (configUser.status !== 'success' || configUser.data == null) return configUser

    const userConfig = configUser.data
    // const user = configUser.user

    const userConfigChange = await client.from('user_config').update({ status: true, request_delete_text: '' }).eq('id', userConfig.id).select('*').single()
    //const updateNews = await client.from('news').update({ status: true }).eq('author_id', user.id).select('*').single()
    if (userConfigChange.error) return { msg: userConfigChange.error.message, status: 'error' }

    return { data: userConfigChange.data, status: 'success', msg: 'success' }
}