'use client';

import { UserConfig, useUser } from "@/module/auth/context/useUser";
import { User } from "@supabase/supabase-js";
import { useEffect } from "react";


type LayoutClientProps = {
    children: React.ReactNode;
    user: User | null;
    userConfig: UserConfig | null
}

export const LayoutClient = ({ children, user, userConfig }: LayoutClientProps) => {

    const updateUser = useUser(state => state.updateUser)
    const updateUserConfig = useUser(state => state.updateUserConfig)

    useEffect(() => {
        if (user) {
            updateUser(user)
        }
        if (userConfig) {
            updateUserConfig(userConfig)
        }
    }, [user, updateUser, userConfig, updateUserConfig])


    return children
}
