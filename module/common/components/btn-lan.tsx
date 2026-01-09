'use client';
import { useLan, LanguageState } from '@/languages'
import Image from 'next/image'

const flags: Record<LanguageState['lan'], string> = {
    'en': '/usa.svg',
    'es': '/colombia.svg',
    'jp': '/japan.svg',
}

export const ButtonLang = () => {

    const { lan, changeLan, languages } = useLan(state => state)

    return (
        <button className="btn btn-sm  btn-primary" onClick={changeLan} >
            {languages.common['btn.language'][lan]}
            <Image src={flags[lan]} alt={lan} width={20} height={20} />
        </button>
    )
}
