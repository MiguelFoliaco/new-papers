"use client"
import { useTranslations } from "@/languages/context"
import { dateByLan } from "@/module/utils/date-by-lan"
import {
    FiClock,
    FiFileText,
    FiUsers,
    FiBookOpen,
    FiArrowRight,
    FiEdit3,
    FiEye,
    FiHeart,
    FiMoreHorizontal,
    FiTrendingUp,
} from "react-icons/fi"

type UserActivity = {
    id: string
    title: string
    type: "edit" | "view" | "publish" | "comment"
    timestamp: string
    paper_slug?: string
}

type FollowingUser = {
    id: string
    name: string
    avatar_url: string | null
    role: string
    papers_count: number
}

type RecentPaper = {
    id: string
    title: string
    slug: string
    cover_image_url: string | null
    author_name: string
    author_avatar: string | null
    updated_at: string
    views_count: number
}

type Props = {
    username: string
    recentActivity: UserActivity[]
    following: FollowingUser[]
    recentPapers: RecentPaper[]
}

// Mock data para desarrollo
const mockData: Props = {
    username: "Carlos",
    recentActivity: [
        { id: "1", title: 'Editaste "Introducción a React 19"', type: "edit", timestamp: "Hace 2 horas" },
        { id: "2", title: 'Publicaste "Guía de TypeScript"', type: "publish", timestamp: "Hace 5 horas" },
        { id: "3", title: 'Viste "Novedades de Next.js 15"', type: "view", timestamp: "Ayer" },
        { id: "4", title: 'Comentaste en "CSS Grid Tips"', type: "comment", timestamp: "Hace 2 días" },
    ],
    following: [
        { id: "1", name: "María García", avatar_url: null, role: "Editor Senior", papers_count: 24 },
        { id: "2", name: "Juan López", avatar_url: null, role: "Periodista", papers_count: 18 },
        { id: "3", name: "Ana Martínez", avatar_url: null, role: "Columnista", papers_count: 32 },
        { id: "4", name: "Pedro Ruiz", avatar_url: null, role: "Redactor", papers_count: 15 },
    ],
    recentPapers: [
        {
            id: "1",
            title: "Tendencias tecnológicas 2025",
            slug: "tendencias-2025",
            cover_image_url: null,
            author_name: "María García",
            author_avatar: null,
            updated_at: "Hace 1 hora",
            views_count: 1250,
        },
        {
            id: "2",
            title: "El futuro del periodismo digital",
            slug: "futuro-periodismo",
            cover_image_url: null,
            author_name: "Juan López",
            author_avatar: null,
            updated_at: "Hace 3 horas",
            views_count: 890,
        },
        {
            id: "3",
            title: "Cómo escribir mejores titulares",
            slug: "mejores-titulares",
            cover_image_url: null,
            author_name: "Ana Martínez",
            author_avatar: null,
            updated_at: "Hace 5 horas",
            views_count: 2100,
        },
        {
            id: "4",
            title: "Herramientas para periodistas",
            slug: "herramientas-periodistas",
            cover_image_url: null,
            author_name: "Pedro Ruiz",
            author_avatar: null,
            updated_at: "Ayer",
            views_count: 760,
        },
        {
            id: "5",
            title: "SEO para artículos de noticias",
            slug: "seo-noticias",
            cover_image_url: null,
            author_name: "María García",
            author_avatar: null,
            updated_at: "Hace 2 días",
            views_count: 1540,
        },
        {
            id: "6",
            title: "Fotografía para medios digitales",
            slug: "fotografia-digital",
            cover_image_url: null,
            author_name: "Juan López",
            author_avatar: null,
            updated_at: "Hace 3 días",
            views_count: 980,
        },
    ],
}

const getActivityIcon = (type: UserActivity["type"]) => {
    switch (type) {
        case "edit":
            return <FiEdit3 className="w-4 h-4" />
        case "view":
            return <FiEye className="w-4 h-4" />
        case "publish":
            return <FiFileText className="w-4 h-4" />
        case "comment":
            return <FiHeart className="w-4 h-4" />
    }
}

const getActivityColor = (type: UserActivity["type"]) => {
    switch (type) {
        case "edit":
            return "bg-info/20 text-info"
        case "view":
            return "bg-secondary/20 text-secondary"
        case "publish":
            return "bg-success/20 text-success"
        case "comment":
            return "bg-accent/20 text-accent"
    }
}

export const HomeContent = ({
    username = mockData.username,
    recentActivity = mockData.recentActivity,
    following = mockData.following,
    recentPapers = mockData.recentPapers,
}: Partial<Props>) => {

    const { t, lan } = useTranslations('home');

    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
            {/* Header con saludo */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-base-content">
                        {t('user.hello')}, <span className="text-primary">{username}</span>
                    </h1>
                    <p className="text-base-content/60 mt-1">{t('user.summary')}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-base-content/50">
                    <FiClock className="w-4 h-4" />
                    <span>{dateByLan(new Date(), lan)}</span>
                </div>
            </div>

            {/* Grid principal: Actividad reciente y Siguiendo */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Actividad reciente */}
                <div className="card bg-base-100 border border-base-content/10 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="card-body p-4 sm:p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <FiClock className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <h2 className="font-semibold text-base-content">{t('user.activity-recent')}</h2>
                                    <p className="text-xs text-base-content/50">{t('user.last-modified')}</p>
                                </div>
                            </div>
                            <button className="btn btn-ghost btn-sm btn-circle">
                                <FiMoreHorizontal className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="space-y-3">
                            {recentActivity.map((activity) => (
                                <div
                                    key={activity.id}
                                    className="flex items-center gap-3 p-3 rounded-xl bg-base-200/50 hover:bg-base-200 transition-colors duration-200 cursor-pointer group"
                                >
                                    <div
                                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${getActivityColor(activity.type)}`}
                                    >
                                        {getActivityIcon(activity.type)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-base-content truncate group-hover:text-primary transition-colors">
                                            {activity.title}
                                        </p>
                                        <p className="text-xs text-base-content/50">{activity.timestamp}</p>
                                    </div>
                                    <FiArrowRight className="w-4 h-4 text-base-content/30 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
                                </div>
                            ))}
                        </div>

                        <button className="btn btn-ghost btn-sm w-full mt-4 text-primary hover:bg-primary/10">
                            Ver toda la actividad
                            <FiArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Siguiendo */}
                <div className="card bg-base-100 border border-base-content/10 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="card-body p-4 sm:p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                                    <FiUsers className="w-5 h-5 text-secondary" />
                                </div>
                                <div>
                                    <h2 className="font-semibold text-base-content">Siguiendo</h2>
                                    <p className="text-xs text-base-content/50">Autores que sigues</p>
                                </div>
                            </div>
                            <span className="badge badge-secondary badge-outline">{following.length}</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {following.map((user) => (
                                <div
                                    key={user.id}
                                    className="flex items-center gap-3 p-3 rounded-xl bg-base-200/50 hover:bg-base-200 transition-colors duration-200 cursor-pointer group"
                                >
                                    <div className="avatar placeholder shrink-0">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary">
                                            {user.avatar_url ? (
                                                <img src={user.avatar_url || "/placeholder.svg"} alt={user.name} />
                                            ) : (
                                                <span className="text-white text-sm font-medium">
                                                    {user.name
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("")}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-base-content truncate group-hover:text-primary transition-colors">
                                            {user.name}
                                        </p>
                                        <p className="text-xs text-base-content/50">{user.role}</p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className="text-sm font-semibold text-base-content">{user.papers_count}</p>
                                        <p className="text-xs text-base-content/50">papers</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="btn btn-ghost btn-sm w-full mt-4 text-secondary hover:bg-secondary/10">
                            Ver todos
                            <FiArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Últimos papers actualizados */}
            <div className="card bg-base-100 border border-base-content/10 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="card-body p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                                <FiBookOpen className="w-5 h-5 text-accent" />
                            </div>
                            <div>
                                <h2 className="font-semibold text-base-content">Últimos papers actualizados</h2>
                                <p className="text-xs text-base-content/50">Contenido reciente de la comunidad</p>
                            </div>
                        </div>
                        <button className="btn btn-ghost btn-sm text-accent hover:bg-accent/10">
                            Ver todos
                            <FiArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {recentPapers.map((paper) => (
                            <div
                                key={paper.id}
                                className="group p-4 rounded-xl bg-base-200/50 hover:bg-base-200 border border-transparent hover:border-accent/20 transition-all duration-300 cursor-pointer"
                            >
                                {/* Cover image placeholder */}
                                <div className="aspect-video rounded-lg bg-gradient-to-br from-base-300 to-base-200 mb-3 overflow-hidden relative">
                                    {paper.cover_image_url ? (
                                        <img
                                            src={paper.cover_image_url || "/placeholder.svg"}
                                            alt={paper.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <FiFileText className="w-8 h-8 text-base-content/20" />
                                        </div>
                                    )}
                                    <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-full bg-base-100/80 backdrop-blur-sm text-xs">
                                        <FiTrendingUp className="w-3 h-3 text-success" />
                                        <span className="text-base-content/70">{paper.views_count.toLocaleString()}</span>
                                    </div>
                                </div>

                                {/* Content */}
                                <h3 className="font-medium text-base-content group-hover:text-accent transition-colors line-clamp-2 mb-2">
                                    {paper.title}
                                </h3>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="avatar placeholder">
                                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary/50 to-secondary/50">
                                                {paper.author_avatar ? (
                                                    <img src={paper.author_avatar || "/placeholder.svg"} alt={paper.author_name} />
                                                ) : (
                                                    <span className="text-white text-xs">
                                                        {paper.author_name
                                                            .split(" ")
                                                            .map((n) => n[0])
                                                            .join("")}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <span className="text-xs text-base-content/60 truncate max-w-[100px]">{paper.author_name}</span>
                                    </div>
                                    <span className="text-xs text-base-content/40">{paper.updated_at}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
