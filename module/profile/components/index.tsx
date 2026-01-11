'use client'
import { CONSTANT } from "@/constant"
import { ButtonLang } from "@/module/common/components/btn-lan"
import Image from "next/image"
import { FormEditUser } from "./form-edit-user"
import { useUser } from "@/module/auth/context/useUser"
import { BsQuestionSquareFill } from "react-icons/bs"
import { useTranslations } from "@/languages/context"
import { AuthorColorPicker } from "./colors/picker"


type Props = {
    leftMenu: React.ReactNode
}

export const ProfilePage = ({ leftMenu }: Props) => {

    const { userConfig } = useUser()
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
        <div className="flex flex-1 2xl:overflow-hidden md:overflow-scroll">

            {/* SIDEBAR */}
            <aside className="max-w-72 w-fit shrink-0 border-r border-neutral/20 sticky top-14 h-[calc(100vh-3.5rem)]">
                {leftMenu}
            </aside>

            {/* CONTENT */}
            <main className=" flex-1 flex flex-col min-w-0 overflow-y-auto border-r  border-neutral/20 pb-10 2xl:pb-0">
                <div className="flex  2xl:flex-row flex-col justify-between 2xl:h-full h-fit gap-10 2xl:gap-0  2xl:w-full  w-[90%] mx-auto 2xl:mx-0 ">
                    <div className={
                        `transition-all  relative flex-1 flex flex-col items-center justify-center  2xl:pt-0 
                        ${!userConfig?.rol && 'pt-20'}
                        `
                    }>
                        {
                            !userConfig?.rol &&
                            <div className="absolute top-4 left-0 right-0 mx-auto flex items-center justify-center gap-2 mt-4">
                                <BsQuestionSquareFill size={30} className="text-primary 2xl:block hidden" />
                                <p className="text-center text-lg  2xl:text-2xl">{t('first-title')} <i className="font-bold text-primary">{t('question.who-are-you')}</i></p>
                            </div>
                        }
                        <FormEditUser />
                    </div>
                    <AuthorColorPicker />
                </div>
            </main>

        </div>
    </div>
}