'use client';

import Image from 'next/image';
import { HomeContent } from '../home/components/user/home-content';
import { ButtonLang } from '../common/components/btn-lan';
import { CONSTANT } from '@/constant';

export const HomeUser = ({ leftMenu }: { leftMenu: React.ReactNode }) => {
    return (
        <div className="h-screen flex flex-col">

            {/* HEADER */}
            <header className="sticky top-0 z-20 h-14 bg-base-200 border-b border-neutral/20 flex items-center justify-between px-4">
                <Image
                    alt="new-papers"
                    src={CONSTANT.LOGO}
                    width={200}
                    height={40}
                    className="h-10 w-auto object-contain"
                />
                <ButtonLang />
            </header>

            {/* BODY */}
            <div className="flex flex-1 overflow-hidden">

                {/* SIDEBAR */}
                <aside className="w-72 shrink-0 border-r border-neutral/20 sticky top-14 h-[calc(100vh-3.5rem)]">
                    {leftMenu}
                </aside>

                {/* CONTENT */}
                <main className="flex-1 overflow-y-auto border-r border-neutral/20">
                    <HomeContent />
                </main>

            </div>
        </div>
    );
};
