import { create } from "zustand";
import { home } from './home';
import { common } from "./common";


const languages = { home, common };


export type LanguageState = {
    lan: 'en' | 'es' | 'jp';
    changeLan: () => void;
    languages: typeof languages;
}

export const useLan = create<LanguageState>((set, get) => ({
    languages,
    lan: 'es',
    changeLan: () => {
        const currentLan = get().lan;
        const newLan = currentLan === 'en' ? 'es' : currentLan === 'es' ? 'jp' : 'en';
        set({ lan: newLan });
    },
}))