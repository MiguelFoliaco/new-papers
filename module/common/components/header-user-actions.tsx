'use client';
import { useTranslations } from '@/languages/context';
import { useUser } from '@/module/auth/context/useUser';
import { User } from '@supabase/supabase-js';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react'
import { SearchNews } from './search';
import { dateByLanWithTime } from '@/module/utils/date-by-lan';
import { Tables } from '@/supabase/database.types';




export const HeaderUserActions = () => {

    const { user } = useUser()
    const refTime = useRef<HTMLSpanElement>(null)
    const { t, lan } = useTranslations('home')

    useEffect(() => {
        if (refTime.current == null) return
        const interval = setInterval(() => {
            if (refTime.current == null) return
            const time = dateByLanWithTime(new Date(), lan)
            refTime.current.innerText = time
        }, 1000)
        return () => clearInterval(interval)
    }, [refTime, lan])


    return (
        <div className='@container flex w-full border-b border-b-neutral/20 p-2 px-3  items-center'>
            <span ref={refTime} className='text-sm text-neutral w-40' />
            <div className='hidden lg:block w-[60%] ml-auto'>
                <SearchNews />
            </div>
            <div className='lg:ml-10 ml-auto'>
                {
                    user ?
                        <Link href={'/my-zone'}>
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



export const Avatar = ({ user, config, size = 32 }: { user?: User, config?: Tables<'user_config'>, size?: number }) => {

    const image = config?.avatar || user?.user_metadata?.avatar_url;

    if (image) {
        return <Image width={size} height={size} className=' rounded-full' src={image} alt="" />
    }

    const username = config?.username || user?.user_metadata?.username || user?.email || 'Unknown User'
    return (
        <span className='avatar avatar-online '>
            <div style={{ width: size, height: size }} className=" rounded-full border border-primary text-sm flex items-center justify-center">
                {username.slice(0, 1).toUpperCase()}
            </div>
        </span>
    )
}