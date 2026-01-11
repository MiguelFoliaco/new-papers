/* eslint-disable @next/next/no-img-element */
"use client"

import { useState } from "react"
import {
    FiGlobe,
    FiCalendar,
    FiMail,
    FiShare2,
    FiBookOpen,
    FiHeart,
    FiUsers,
    FiAward,
    FiExternalLink,
    FiCopy,
    FiCheck,
    FiMessageCircle,
    FiTrendingUp,
} from "react-icons/fi"
import { FaTwitter, FaLinkedinIn, FaGithub, FaMediumM, FaYoutube, FaDribbble } from "react-icons/fa"
import { InfoUser } from "./actions/get-info-user"
import { formatNumber } from "../utils/format-number"
import { FeatureCardProfile } from "./components/featured-card-profile"
import { CardPost } from "./components/card-post"


type AuthorStats = {
    publications: number
    totalViews: number
    totalLikes: number
    followers: number
    following: number
}


type Props = {
    info: InfoUser
    stats?: AuthorStats
    socialLinks?: {
        twitter?: string
        linkedin?: string
        github?: string
        medium?: string
        youtube?: string
        dribbble?: string
    }
    skills?: string[]
    isOwnProfile?: boolean
    isFollowing?: boolean
    onFollow?: () => void
    onMessage?: () => void
}

const defaultStats: AuthorStats = {
    publications: 24,
    totalViews: 45200,
    totalLikes: 3420,
    followers: 1250,
    following: 180,
}


const defaultSkills = [
    "Diseño UX/UI",
    "Desarrollo Web",
    "Escritura Técnica",
    "Marketing Digital",
    "Fotografía",
    "Edición de Video",
]



const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
    })
}

const getRolIcon = (rol: string) => {
    const rolLower = rol.toLowerCase()
    if (rolLower.includes("developer") || rolLower.includes("desarrollador")) return <FaGithub />
    if (rolLower.includes("writer") || rolLower.includes("escritor")) return <FiBookOpen />
    if (rolLower.includes("designer") || rolLower.includes("diseñador")) return <FaDribbble />
    if (rolLower.includes("teacher") || rolLower.includes("profesor")) return <FiAward />
    return <FiAward />
}

export const AuthorProfilePage = ({
    info,
    stats = defaultStats,
    socialLinks = { twitter: "#", linkedin: "#", github: "#" },
    skills = defaultSkills,
    isOwnProfile = false,
    isFollowing = false,
    onFollow,
    onMessage,
}: Props) => {

    const user = info.user
    const news = info.news

    const [copied, setCopied] = useState(false)
    const [activeTab, setActiveTab] = useState<"publications" | "about">("publications")
    const [following, setFollowing] = useState(isFollowing)

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleFollow = () => {
        setFollowing(!following)
        onFollow?.()
    }

    return (
        <div className="min-h-screen bg-base-200">
            {/* Hero Section con Cover */}
            <div className="relative">
                {/* Cover Image */}
                <div className="h-48 sm:h-56 md:h-72 lg:h-80 w-full overflow-hidden">
                    {user.cover_image_url ? (
                        <img src={user.cover_image_url || "/placeholder.svg"} alt="Cover" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-linear-to-br from-primary/30 via-secondary/20 to-accent/30" />
                    )}
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-linear-to-t from-base-200 via-base-200/50 to-transparent" />
                </div>

                {/* Profile Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2">
                    <div className="max-w-5xl mx-auto lg:px-4 px-6">
                        <div className="flex lg:flex-col flex-row lg:items-center items-end gap-4">
                            {/* Avatar */}
                            <div className="relative">
                                <div className="lg:w-28 lg:h-28 w-36 h-36 rounded-full border-4 border-base-100 overflow-hidden bg-base-100 shadow-xl">
                                    {user.avatar ? (
                                        <img
                                            src={user.avatar || "/placeholder.svg"}
                                            alt={user.username}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-linear-to-br from-primary to-secondary flex items-center justify-center">
                                            <span className="lg:text-4xl text-5xl font-bold text-primary-content">
                                                {user.username.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                {/* Status indicator */}
                                {user.status && (
                                    <div className="absolute bottom-2 right-2 w-5 h-5 bg-success rounded-full border-3 border-base-100" />
                                )}
                            </div>

                            {/* Name & Role - Mobile centered, Desktop left aligned */}
                            <div className="lg:text-center  text-left mb-2">
                                <h1 className="lg:text-2xl text-3xl font-bold text-base-content">{user.username}</h1>
                                <div className="flex items-center lg:justify-center justify-start gap-2 mt-1">
                                    <span className="text-primary">{getRolIcon(user.rol)}</span>
                                    <span className="text-base-content/70 font-medium">{user.rol}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-5xl mx-auto lg:px-4 px-6 lg:pt-20 pt-24 pb-12">
                {/* Action Buttons & Stats Row */}
                <div className="flex flex-col lg:flex-row gap-6 mb-8">
                    {/* Stats Cards */}
                    <div className="flex-1 grid lg:grid-cols-3 lg:mt-8 gap-3">
                        <div className="bg-base-100 rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                            <FiBookOpen className="w-5 h-5 mx-auto text-primary mb-1" />
                            <p className="lg:text-xl text-2xl font-bold text-base-content">{news.length}</p>
                            <p className="text-xs text-base-content/60">Publicaciones</p>
                        </div>
                        {/* VIEWS STATS */}
                        {/* <div className="bg-base-100 rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                            <FiEye className="w-5 h-5 mx-auto text-secondary mb-1" />
                            <p className="text-xl sm:text-2xl font-bold text-base-content">{formatNumber(stats.totalViews)}</p>
                            <p className="text-xs text-base-content/60">Vistas</p>
                        </div> */}
                        <div className="bg-base-100 rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                            <FiUsers className="w-5 h-5 mx-auto text-accent mb-1" />
                            <p className="lg:text-xl text-2xl font-bold text-base-content">{formatNumber(stats.followers)}</p>
                            <p className="text-xs text-base-content/60">Seguidores</p>
                        </div>
                        <div className="bg-base-100 rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                            <FiHeart className="w-5 h-5 mx-auto text-error mb-1" />
                            <p className="lg:text-xl text-2xl font-bold text-base-content">{formatNumber(stats.totalLikes)}</p>
                            <p className="text-xs text-base-content/60">Likes</p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center justify-center lg:justify-end gap-2">
                        {!isOwnProfile ? (
                            <>
                                <button
                                    onClick={handleFollow}
                                    className={`btn ${following ? "btn-outline btn-primary" : "btn-primary"} min-w-[120px]`}
                                >
                                    {following ? (
                                        <>
                                            <FiCheck className="w-4 h-4" />
                                            Siguiendo
                                        </>
                                    ) : (
                                        <>
                                            <FiUsers className="w-4 h-4" />
                                            Seguir
                                        </>
                                    )}
                                </button>
                                <button onClick={onMessage} className="btn btn-outline btn-secondary">
                                    <FiMessageCircle className="w-4 h-4" />
                                    Mensaje
                                </button>
                            </>
                        ) : (
                            <button className="btn btn-outline btn-primary">Editar perfil</button>
                        )}
                        <div className="dropdown dropdown-end">
                            <button tabIndex={0} className="btn btn-ghost btn-square">
                                <FiShare2 className="w-5 h-5" />
                            </button>
                            <ul tabIndex={0} className="dropdown-content z-1 menu p-2 shadow-lg bg-base-100 rounded-xl w-52 mt-2">
                                <li>
                                    <button onClick={handleCopyLink} className="flex items-center gap-2">
                                        {copied ? <FiCheck className="w-4 h-4 text-success" /> : <FiCopy className="w-4 h-4" />}
                                        {copied ? "Copiado!" : "Copiar enlace"}
                                    </button>
                                </li>
                                <li>
                                    <a
                                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <FaTwitter className="w-4 h-4" /> Compartir en Twitter
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <FaLinkedinIn className="w-4 h-4" /> Compartir en LinkedIn
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 mb-6 border-b border-base-300">
                    <button
                        onClick={() => setActiveTab("publications")}
                        className={`px-4 py-3 font-medium text-sm transition-colors relative ${activeTab === "publications" ? "text-primary" : "text-base-content/60 hover:text-base-content"
                            }`}
                    >
                        Publicaciones
                        {activeTab === "publications" && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab("about")}
                        className={`px-4 py-3 font-medium text-sm transition-colors relative ${activeTab === "about" ? "text-primary" : "text-base-content/60 hover:text-base-content"
                            }`}
                    >
                        Acerca de
                        {activeTab === "about" && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                        )}
                    </button>
                </div>

                {/* Tab Content */}
                {activeTab === "publications" ? (
                    <div className="space-y-6">
                        {/* Featured Publication */}
                        {news[0] &&
                            <FeatureCardProfile news={news[0]} />}

                        {/* Publications Grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                            {
                                news.slice(1).map((pub) => <CardPost key={pub.id} news={pub} />)}
                        </div>

                        {/* Load More */}
                        <div className="text-center pt-4">
                            <button className="btn btn-outline btn-primary btn-wide">Ver más publicaciones</button>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Bio & Info */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Bio Card */}
                            <div className="bg-base-100 rounded-2xl p-6 shadow-sm">
                                <h3 className="font-semibold text-base-content mb-4 flex items-center gap-2">
                                    <FiBookOpen className="w-5 h-5 text-primary" />
                                    Biografía
                                </h3>
                                <p className="text-base-content/80 leading-relaxed">
                                    {user.bio ||
                                        "Este autor aún no ha agregado una biografía. Las grandes historias comienzan con pequeños pasos, y pronto este espacio estará lleno de experiencias, conocimientos y pasiones que definirán su camino profesional."}
                                </p>
                            </div>

                            {/* Skills */}
                            <div className="bg-base-100 rounded-2xl p-6 shadow-sm">
                                <h3 className="font-semibold text-base-content mb-4 flex items-center gap-2">
                                    <FiAward className="w-5 h-5 text-secondary" />
                                    Habilidades y especialidades
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-4 py-2 bg-base-200 hover:bg-primary/10 hover:text-primary rounded-full text-sm font-medium transition-colors cursor-default"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Activity Timeline */}
                            <div className="bg-base-100 rounded-2xl p-6 shadow-sm">
                                <h3 className="font-semibold text-base-content mb-4 flex items-center gap-2">
                                    <FiTrendingUp className="w-5 h-5 text-accent" />
                                    Actividad reciente
                                </h3>
                                <div className="space-y-4">
                                    {[
                                        { action: "Publicó un nuevo artículo", time: "Hace 2 días", icon: <FiBookOpen /> },
                                        { action: "Recibió 100 nuevos seguidores", time: "Hace 5 días", icon: <FiUsers /> },
                                        { action: "Comentó en una publicación", time: "Hace 1 semana", icon: <FiMessageCircle /> },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-base-200 flex items-center justify-center text-primary shrink-0">
                                                {item.icon}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm text-base-content">{item.action}</p>
                                                <p className="text-xs text-base-content/60">{item.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Info Card */}
                            <div className="bg-base-100 rounded-2xl p-6 shadow-sm">
                                <h3 className="font-semibold text-base-content mb-4">Información</h3>
                                <div className="space-y-4">
                                    {user.website && (
                                        <a
                                            href={user.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 text-sm text-base-content/70 hover:text-primary transition-colors"
                                        >
                                            <FiGlobe className="w-5 h-5 shrink-0" />
                                            <span className="truncate">{user.website.replace(/^https?:\/\//, "")}</span>
                                            <FiExternalLink className="w-4 h-4 shrink-0 ml-auto" />
                                        </a>
                                    )}
                                    <div className="flex items-center gap-3 text-sm text-base-content/70">
                                        <FiCalendar className="w-5 h-5 shrink-0" />
                                        <span>Se unió en {formatDate(user.created_at)}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-base-content/70">
                                        <FiMail className="w-5 h-5 shrink-0" />
                                        <span>Contactar por mensaje</span>
                                    </div>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="bg-base-100 rounded-2xl p-6 shadow-sm">
                                <h3 className="font-semibold text-base-content mb-4">Redes sociales</h3>
                                <div className="flex flex-wrap gap-2">
                                    {socialLinks.twitter && (
                                        <a
                                            href={socialLinks.twitter}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-circle btn-ghost hover:bg-[#1DA1F2]/10 hover:text-[#1DA1F2]"
                                        >
                                            <FaTwitter className="w-5 h-5" />
                                        </a>
                                    )}
                                    {socialLinks.linkedin && (
                                        <a
                                            href={socialLinks.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-circle btn-ghost hover:bg-[#0A66C2]/10 hover:text-[#0A66C2]"
                                        >
                                            <FaLinkedinIn className="w-5 h-5" />
                                        </a>
                                    )}
                                    {socialLinks.github && (
                                        <a
                                            href={socialLinks.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-circle btn-ghost hover:bg-base-content/10"
                                        >
                                            <FaGithub className="w-5 h-5" />
                                        </a>
                                    )}
                                    {socialLinks.medium && (
                                        <a
                                            href={socialLinks.medium}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-circle btn-ghost hover:bg-base-content/10"
                                        >
                                            <FaMediumM className="w-5 h-5" />
                                        </a>
                                    )}
                                    {socialLinks.youtube && (
                                        <a
                                            href={socialLinks.youtube}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-circle btn-ghost hover:bg-[#FF0000]/10 hover:text-[#FF0000]"
                                        >
                                            <FaYoutube className="w-5 h-5" />
                                        </a>
                                    )}
                                    {socialLinks.dribbble && (
                                        <a
                                            href={socialLinks.dribbble}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-circle btn-ghost hover:bg-[#EA4C89]/10 hover:text-[#EA4C89]"
                                        >
                                            <FaDribbble className="w-5 h-5" />
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Following Stats */}
                            <div className="bg-base-100 rounded-2xl p-6 shadow-sm">
                                <div className="grid grid-cols-2 gap-4 text-center">
                                    <div className="cursor-pointer hover:bg-base-200 rounded-xl p-3 transition-colors">
                                        <p className="text-2xl font-bold text-base-content">{formatNumber(stats.followers)}</p>
                                        <p className="text-xs text-base-content/60">Seguidores</p>
                                    </div>
                                    <div className="cursor-pointer hover:bg-base-200 rounded-xl p-3 transition-colors">
                                        <p className="text-2xl font-bold text-base-content">{formatNumber(stats.following)}</p>
                                        <p className="text-xs text-base-content/60">Siguiendo</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
