'use client';
import { useUser } from '@/module/auth/context/useUser';
import { format } from '@formkit/tempo'
import { User } from '@supabase/supabase-js';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react'




export const HeaderUserActions = () => {

    const { user } = useUser()
    const refTime = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        if (refTime.current == null) return
        const interval = setInterval(() => {
            if (refTime.current == null) return
            const time = getTimeWithSeccond()
            refTime.current.innerText = time
        }, 1000)
        return () => clearInterval(interval)
    }, [refTime])


    return (
        <div className='flex w-full border-b border-b-neutral/20 p-2 px-3 items-center'>
            <span ref={refTime} className='text-sm text-white' />

            <div className='ml-auto'>
                {
                    user ?
                        <Link href={'/profile'}>
                            <Avatar user={user} />
                        </Link>
                        :
                        <div className='flex gap-2 items-center'>
                            <Link className="link-primary text-sm" href={'/login'} >Login</Link>
                            <Link className="link-primary text-sm" href={'/register'} >Register</Link>
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


const getTimeWithSeccond = () => {
    return format(new Date(), 'D MMMM YYYY - HH:mm:ss')
}