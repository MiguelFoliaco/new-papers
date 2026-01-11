'use client'
import { CONSTANT } from "@/constant"
import { ButtonLang } from "@/module/common/components/btn-lan"
import Image from "next/image"
import { FormEditUser } from "./form-edit-user"
import { useUser } from "@/module/auth/context/useUser"
import { BsQuestionSquareFill } from "react-icons/bs"
import { useTranslations } from "@/languages/context"


type Props = {
    leftMenu: React.ReactNode
}

export const ProfilePage = ({ leftMenu }: Props) => {

    const { user, userConfig } = useUser()
    const { t } = useTranslations('profile')

    return <div className="h-screen flex flex-col">
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
            <aside className="max-w-72 w-fit shrink-0 border-r border-neutral/20 sticky top-14 h-[calc(100vh-3.5rem)]">
                {leftMenu}
            </aside>

            {/* CONTENT */}
            <main className="flex-1 min-w-0 overflow-y-auto border-r  border-neutral/20">
                {
                    !userConfig?.rol &&
                    <div className="flex items-center justify-center gap-2 mt-4">
                        <BsQuestionSquareFill size={30} className="text-primary" />
                        <p className="text-center  text-2xl">{t('first-title')} <i className="font-bold text-primary">{t('question.who-are-you')}</i></p>
                    </div>
                }
                <FormEditUser user={user!} userConfig={userConfig!} />
            </main>

        </div>
    </div>
}