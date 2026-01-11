'use server'

import { createClient } from "@/supabase/server"

export const getUserConfig = async () => {
    const client = await createClient()
    const user = await client.auth.getUser()
    if (!user.data.user) {
        return { msg: 'No user', status: 'not_login' }
    }
    const userConfig = await client.from('user_config').select('*').eq('auth_id', user.data.user.id).maybeSingle()

    if (userConfig.error) {
        return { msg: userConfig.error?.message, status: 'error' }
    }

    return {
        data: userConfig.data,
        user: user.data.user,
        status: 'success',
        msg: 'success'
    }
}