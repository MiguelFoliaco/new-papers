import NotFound from '@/app/not-found'
import { AuthorProfilePage } from '@/module/author'
import { getInfoUser } from '@/module/author/actions/get-info-user'
import { createClient } from '@/supabase/server'
import React from 'react'


type Props = {
    params: Promise<{ username: string }>
}

const PageAuthor = async ({ params }: Props) => {

    const username = (await params).username
    const dataUser = await getInfoUser(username)

    if (!dataUser.data) return <NotFound />

    return (
        <>
            <AuthorProfilePage
                info={dataUser.data}
            />
        </>
    )
}

export default PageAuthor