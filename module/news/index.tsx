'use client'
import { Editor, Frame, useEditor } from '@craftjs/core'
import { Header } from '../common/components/header'
import { HeaderUserActions } from '../common/components/header-user-actions'
import { Image } from '../studio/user-components/image'
import { Text } from '../studio/user-components/text'
import { Container } from '../studio/user-components/container'
import { Tables } from '@/supabase/database.types'
import { useEffect } from 'react'


type Props = {
    news: Tables<'news'>
}

export const NewsPage = ({ news }: Props) => {



    return (
        <div className='w-full'>
            <HeaderUserActions />
            <Header />

            <div className='flex flex-col mt-5'>
                <Editor enabled={false} resolver={{ Container, Text, Image }} >
                    <LoadBlock news={news} />
                    <Frame>
                    </Frame>
                </Editor>
            </div>
        </div>
    )
}


const LoadBlock = ({ news }: Props) => {

    const { actions } = useEditor()

    useEffect(() => {
        if (!news.content) return
        actions.deserialize(JSON.parse(news.content as string))
    }, [news.content, actions])

    return null
}