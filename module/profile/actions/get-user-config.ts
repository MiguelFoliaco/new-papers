'use server'

import { createClient } from "@/supabase/server"

export const getUserConfig = async () => {
    const client = await createClient()
    const user = await client.auth.getUser()
    if (!user.data.user) {
        return { msg: 'No user', status: 'not_login' }
    }
    const userConfig = await client.from('user_config').select('*').eq('auth_id', user.data.user.id).maybeSingle()

    if (!userConfig.data) {
        return { msg: userConfig.error?.message, status: 'error' }
    }

    return {
        data: userConfig.data,
        status: 'success',
        msg: 'success'
    }
}