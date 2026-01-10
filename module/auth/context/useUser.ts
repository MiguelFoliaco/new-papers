import { Tables } from "@/supabase/database.types";
import { User } from "@supabase/supabase-js";
import { create } from "zustand";


export type IUserContext = {
    user?: User;
    userConfig?: Tables<'user_config'>;
    updateUser: (user: User) => void
    exit: () => void
}

export const useUser = create<IUserContext>(set => ({
    session: undefined,
    user: undefined,
    userConfig: undefined,
    updateUser: (user: User) => set(state => ({ ...state, user })),
    exit: () => set({ user: undefined, }),
}))