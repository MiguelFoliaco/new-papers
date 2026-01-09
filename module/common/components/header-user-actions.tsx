'use client';
import { useTranslations } from '@/languages/context';
import { useUser } from '@/module/auth/context/useUser';
import { format } from '@formkit/tempo'
import { User } from '@supabase/supabase-js';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react'




export const HeaderUserActions = () => {

    const { user } = useUser()
    const refTime = useRef<HTMLSpanElement>(null)
    const { t, lan } = useTranslations('home')

    useEffect(() => {
        if (refTime.current == null) return
        const interval = setInterval(() => {
            if (refTime.current == null) return
            const time = getTimeWithSeccond(lan)
            refTime.current.innerText = time
        }, 1000)
        return () => clearInterval(interval)
    }, [refTime, lan])


    return (
        <div className='flex w-full border-b border-b-neutral/20 p-2 px-3 items-center'>
            <span ref={refTime} className='text-sm text-neutral' />

            <div className='ml-auto'>
                {
                    user ?
                        <Link href={'/profile'}>
                            <Avatar user={user} />
                        </Link>
                        :
                        <div className='flex gap-2 items-center'>
                            <Link className="link-primary text-sm" href={'/auth/login'} >{t('header-user.login')}</Link>
                            <Link className="link-neutral text-sm" href={'/auth/register'} >{t('header-user.register')}</Link>
                        </div>
                }
            </div>
        </div>
    )
}



export const Avatar = ({ user }: { user: User }) => {

    const image = user?.user_metadata?.avatar_url;

    if (image) {
        return <Image width={32} height={32} className='w-8 h-8 rounded-full' src={image} alt="" />
    }

    const username = user?.user_metadata?.username || user?.email || 'Unknown User'
    return (
        <span className='avatar avatar-online '>
            <div className="w-8 h-8 rounded-full border border-primary text-sm flex items-center justify-center">
                {username.slice(0, 1).toUpperCase()}
            </div>
        </span>
    )
}


const getTimeWithSeccond = (en: 'es' | 'jp' | 'en') => {
    const localeByEn = {
        'en': 'en-US',
        'jp': 'ja-JP',
        'es': 'es-CO'
    }
    return format(new Date(), 'D MMMM YYYY - HH:mm:ss', localeByEn[en])
}