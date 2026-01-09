'use client';
import { useLan } from '@/languages';
import Link from 'next/link'
import { useMemo } from 'react';
import { ButtonLang } from './btn-lan';
import { CONSTANT } from '@/constant';

export const Header = () => {

    const { languages, lan } = useLan()

    const texts = useMemo(() => {
        return (key: keyof typeof languages.home) => languages.home[key][lan]
    }, [lan, languages])

    return (
        <div className="flex items-center p-3 border-b border-b-neutral/40">
            {/* <h3 className="text-xl font-medium text-base-100">Template with login - NextJS + Supabase</h3> */}

            <ul className='flex justify-between w-6/12'>
                <li>
                    <Link className="link-primary text-sm" href={'/'} >{texts('navbar.item_1')}</Link>
                </li>
                <li>
                    <Link className="link text-sm hover:text-primary" href={'/latest'} >{texts('navbar.item_2')}</Link>
                </li>
                <li>
                    <Link className="link text-sm hover:text-primary" href={'/categories'} >{texts('navbar.item_3')}</Link>
                </li>
                <li>
                    <Link className="link text-sm hover:text-primary" href={'/for-you'} >{texts('navbar.item_4')}</Link>
                </li>
                <li>
                    <Link className="link text-sm hover:text-primary" href={'/following'} >{texts('navbar.item_5')}</Link>
                </li>
            </ul>

            <div className='ml-auto select-none w-40 h-10 bg-no-repeat bg-cover' style={{ backgroundImage: `url(${CONSTANT.LOGO})` }} />
            <div className='ml-auto'>
                <ButtonLang />
            </div>


            {/* {
                    user ?
                        <Link className="join-item btn btn-primary btn-sm shadow-none" href={'/admin'} >Admin</Link>
                        :
                        <>
                            <Link className="join-item btn btn-primary btn-sm shadow-none" href={'/auth/login'} >Login</Link>
                            <Link className="join-item btn btn-neutral btn-outline btn-sm shadow-none" href={'/auth/signup'} >Sign Up</Link>
                        </>
                } */}
        </div>
    )
}
