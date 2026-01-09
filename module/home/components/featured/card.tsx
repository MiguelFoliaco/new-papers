"use client"

import type { BestNewType } from "../../actions/get-best"
import { FiClock, FiUser, FiArrowRight, FiStar, FiUsers, FiZap, FiCpu } from "react-icons/fi"

type Props = {
    newBest: BestNewType
}

const getBadgeConfig = (selectedBy: BestNewType["selected_by"]) => {
    switch (selectedBy) {
        case "editorial":
            return {
                icon: FiStar,
                label: "Selección Editorial",
                className: "bg-amber-500/20 text-amber-400 border-amber-500/30",
            }
        case "community":
            return {
                icon: FiUsers,
                label: "Favorito de la Comunidad",
                className: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
            }
        case "sponsored":
            return { icon: FiZap, label: "Patrocinado", className: "bg-purple-500/30 text-purple-400 border-purple-500/30" }
        case "ai_curated":
            return { icon: FiCpu, label: "Curado por IA", className: "bg-cyan-500/30 text-cyan-400 border-cyan-500/30" }
        default:
            return { icon: FiStar, label: "Destacado", className: "bg-base-300 text-base-content" }
    }
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
        day: "numeric",
        month: "short",
        year: "numeric",
    })
}

export const CardNewFeatured = ({ newBest }: Props) => {
    const { new: new_best, selected_by } = newBest
    const badgeConfig = getBadgeConfig(selected_by)
    const BadgeIcon = badgeConfig.icon

    return (
        <article className="group relative w-[90%] lg:w-full lg:max-w-[60vw] mx-auto overflow-hidden rounded-2xl bg-linear-to-br from-base-200/50 to-base-200/50 border border-base-content/10 transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
            {/* Background gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-base-300 via-transparent via-30% lg:to-neutral/50 to-neutral/40  to-40% opacity-60 z-10 pointer-events-none" />

            {/* Cover image */}
            <div className="relative aspect-21/9 sm:aspect-2/1 md:aspect-21/9 w-full overflow-hidden">
                {new_best.cover_image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={new_best.cover_image_url || "/placeholder.svg"}
                        alt={new_best.title}
                        className="w-full lg:max-w-[60vw] h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full bg-linear-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center">
                        <span className="text-6xl opacity-20">📰</span>
                    </div>
                )}

                {/* Badge */}
                <div className="absolute top-4 left-4 z-10">
                    <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full border backdrop-blur-sm ${badgeConfig.className}`}
                    >
                        <BadgeIcon className="w-3.5 h-3.5" />
                        {badgeConfig.label}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="relative z-20 p-5 sm:p-6 space-y-4">
                {/* Title */}
                <h2 className="text-xl sm:text-2xl font-bold text-base-content leading-tight line-clamp-2 group-hover:text-primary transition-colors duration-300">
                    {new_best.title}
                </h2>

                {/* Cover text / excerpt */}
                <p className="text-sm sm:text-base text-base-content/70 leading-relaxed line-clamp-2 sm:line-clamp-3">
                    {new_best.cover_text}
                </p>

                {/* Footer */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-base-content/10">
                    {/* Meta info */}
                    <div className="flex items-center gap-4 text-xs sm:text-sm text-base-content/50">
                        <span className="inline-flex items-center gap-1.5">
                            <FiUser className="w-3.5 h-3.5" />
                            <span className="truncate max-w-[100px] sm:max-w-none">{new_best.author_id}</span>
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <FiClock className="w-3.5 h-3.5" />
                            {formatDate(new_best.created_at)}
                        </span>
                    </div>

                    {/* CTA */}
                    <a
                        href={`/new/${new_best.slug}`}
                        className="lg:mt-0 mt-2 flex lg:inline-flex w-full lg:w-fit justify-center items-center gap-2 px-4 py-2 text-sm font-medium text-primary-content bg-primary rounded-lg transition-all duration-200 hover:bg-primary/90 hover:gap-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-base-300"
                    >
                        Leer más
                        <FiArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </a>
                </div>
            </div>

            {/* Subtle glow effect on hover */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-linear-to-r from-primary/5 via-transparent to-secondary/5" />
        </article>
    )
}
