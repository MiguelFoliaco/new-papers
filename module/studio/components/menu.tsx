"use client"

import type React from "react"

import { useState } from "react"
import { HiHome, HiNewspaper, HiDocumentText, HiFolder, HiLogout, HiChevronLeft, HiChevronRight } from "react-icons/hi"
import { BiNews } from "react-icons/bi"
import { useTranslations } from "@/languages/context"
import { useRouter } from "next/navigation"

type MenuItem = {
    id: string
    label: string
    icon: React.ReactNode
    href?: string
    onClick?: () => void
    variant?: "default" | "danger"
}

type Props = {
    activeItem?: string
    onNavigate?: (itemId: string) => void
    onLogout?: () => void
    userName?: string
    userAvatar?: string
}

export const Menu = ({ activeItem: _activeItem = "home", onLogout, userName = "Usuario", userAvatar }: Props) => {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [activeItem, setActiveItem] = useState(_activeItem)
    const router = useRouter()
    const { t, lan } = useTranslations('common')
    const menuItems: MenuItem[] = [
        { id: "home", label: t('left-menu.home'), icon: <HiHome className="w-5 h-5" /> },
        { id: "studio", label: t('left-menu.create-post'), icon: <BiNews className="w-5 h-5" /> },
        { id: "my-news", label: t('left-menu.my-post'), icon: <BiNews className="w-5 h-5" /> },
        { id: "my-newspapers", label: t('left-menu.my-newpapers'), icon: <HiNewspaper className="w-5 h-5" /> },
        { id: "files", label: t('left-menu.files'), icon: <HiFolder className="w-5 h-5" /> },
    ]

    const handleItemClick = (item: MenuItem) => {
        router.push(`/my-zone?tab=${item.id}`)
        setActiveItem(item.id)
    }

    return (
        <aside
            className={`
        h-full bg-base-200 border-r border-base-300 
        flex flex-col transition-all duration-300 ease-in-out
        ${isCollapsed ? "w-16" : "w-64"}
      `}
        >
            {/* Header con logo */}
            <div className="p-4 border-b border-base-300">
                <div className="flex items-center justify-between">
                    {!isCollapsed && (
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                                <HiDocumentText className="w-5 h-5 text-primary-content" />
                            </div>
                            <span className="font-semibold text-base-content">New-Papers</span>
                        </div>
                    )}
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="btn btn-ghost btn-sm btn-square hover:bg-base-300"
                    >
                        {isCollapsed ? <HiChevronRight className="w-4 h-4" /> : <HiChevronLeft className="w-4 h-4" />}
                    </button>
                </div>
            </div>

            {/* Menu items */}
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => handleItemClick(item)}
                        className={`
              w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
              transition-all duration-200 group cursor-pointer 
              ${activeItem === item.id
                                ? "bg-primary text-primary-content shadow-md"
                                : "text-base-content/70 hover:bg-base-300 hover:text-base-content"
                            }
              ${isCollapsed ? "justify-center" : ""}
            `}
                        title={isCollapsed ? item.label : undefined}
                    >
                        <span
                            className={`shrink-0 transition-transform duration-200 ${activeItem !== item.id ? "group-hover:scale-110" : ""}`}
                        >
                            {item.icon}
                        </span>
                        {!isCollapsed && <span className="font-medium text-sm truncate">{item.label}</span>}
                        {!isCollapsed && activeItem === item.id && (
                            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-content/50" />
                        )}
                    </button>
                ))}
            </nav>

            {/* User section */}
            <div className="p-3 border-t border-base-300 space-y-2">
                {/* User info */}
                <div className={`flex items-center gap-3 p-2 rounded-lg bg-base-300/50 ${isCollapsed ? "justify-center" : ""}`}>
                    <div className="avatar">
                        <div className="w-8 h-8 rounded-full ring ring-secondary ring-offset-base-100">
                            {userAvatar ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={userAvatar || "/placeholder.svg"} alt={userName} />
                            ) : (
                                <div className="bg-secondary flex items-center justify-center text-secondary-content font-semibold text-sm">
                                    {userName.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div>
                    </div>
                    {!isCollapsed && (
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-base-content truncate">{userName}</p>
                            <p className="text-xs text-base-content/50">{t('left-menu.editor')}</p>
                        </div>
                    )}
                </div>

                {/* Logout button */}
                <button
                    onClick={onLogout}
                    className={`
            w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
            text-error/80 hover:bg-error/10 hover:text-error
            transition-all duration-200 group
            ${isCollapsed ? "justify-center" : ""}
          `}
                    title={isCollapsed ? "Cerrar sesión" : undefined}
                >
                    <span className="shrink-0 transition-transform duration-200 group-hover:scale-110">
                        <HiLogout className="w-5 h-5" />
                    </span>
                    {!isCollapsed && <span className="font-medium text-sm">{t('left-menu.logout')}</span>}
                </button>
            </div>
        </aside>
    )
}
