import { create } from "zustand";
import { home } from './home';
import { common } from "./common";
import { useMemo } from "react";
import { studio } from "./studio";


export const languages = { home, common, studio };


export type LanguageState = {
    lan: 'en' | 'es' | 'jp';
    changeLan: () => void;
    languages: typeof languages;
}

let lan: 'en' | 'es' | 'jp' = 'es';
if (typeof localStorage !== 'undefined') {
    lan = localStorage.getItem('lan') as 'en' | 'es' | 'jp' || 'en';
}

export const useLan = create<LanguageState>((set, get) => ({
    languages,
    lan,
    changeLan: () => {
        const currentLan = get().lan;
        const newLan = currentLan === 'en' ? 'es' : currentLan === 'es' ? 'jp' : 'en';
        set({ lan: newLan });
        localStorage.setItem('lan', newLan);
    },
}))



export function useTranslations<
    TNamespace extends keyof typeof languages
>(namespace: TNamespace) {
    const { languages, lan } = useLan();

    const t = useMemo(() => {
        return (
            key: keyof (typeof languages)[TNamespace]
        ) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return languages[namespace][key][lan];
        };
    }, [languages, lan, namespace]);

    return { t, lan };
}