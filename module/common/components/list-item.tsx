"use client"

import { FiClock, FiUser, FiStar, FiUsers, FiZap, FiCpu, FiChevronRight } from "react-icons/fi"
import { BestNewListType, BestNewRegionType } from "../actions/get-news"

type Props = {
    newBest: BestNewListType[number] | BestNewRegionType[number]
}

const getBadgeConfig = (selectedBy: BestNewListType[0]["selected_by"]) => {
    switch (selectedBy) {
        case "editorial":
            return {
                icon: FiStar,
                label: "Editorial",
                className: "bg-amber-500/20 text-amber-400",
            }
        case "community":
            return {
                icon: FiUsers,
                label: "Comunidad",
                className: "bg-emerald-500/20 text-emerald-400",
            }
        case "sponsored":
            return {
                icon: FiZap,
                label: "Patrocinado",
                className: "bg-purple-500/20 text-purple-400",
            }
        case "ai_curated":
            return {
                icon: FiCpu,
                label: "IA",
                className: "bg-cyan-500/20 text-cyan-400",
            }
        default:
            return {
                icon: FiStar,
                label: "Destacado",
                className: "bg-base-300 text-base-content",
            }
    }
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
        day: "numeric",
        month: "short",
    })
}

export const CardNewCompact = ({ newBest }: Props) => {
    const { new: new_best } = newBest
    const badgeConfig = getBadgeConfig((newBest as BestNewListType[0])?.selected_by)
    const BadgeIcon = badgeConfig.icon

    return (
        <a
            href={`/new/${new_best.slug}`}
            className="group flex gap-4 p-3 rounded-xl bg-base-200/50 border border-base-content/5 transition-all duration-200 hover:bg-base-200 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
        >
            {/* Thumbnail */}
            <div className="relative shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden">
                {new_best.cover_image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={new_best.cover_image_url || "/placeholder.svg"}
                        alt={new_best.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full bg-linear-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                        <span className="text-2xl opacity-30">📰</span>
                    </div>
                )}

                {/* Badge overlay */}
                <div className="absolute bottom-1 left-1">
                    <span
                        className={`inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-medium rounded ${badgeConfig.className}`}
                    >
                        <BadgeIcon className="w-2.5 h-2.5" />
                        {badgeConfig.label}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                {/* Title */}
                <h3 className="text-sm sm:text-base font-semibold text-base-content leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-200">
                    {new_best.title}
                </h3>

                {/* Meta info */}
                <div className="flex items-center gap-3 text-xs text-base-content/50">
                    <span className="inline-flex items-center gap-1">
                        <FiUser className="w-3 h-3" />
                        <span className="truncate max-w-20">{new_best.author_id}</span>
                    </span>
                    <span className="inline-flex items-center gap-1">
                        <FiClock className="w-3 h-3" />
                        {formatDate(new_best.created_at)}
                    </span>
                </div>
            </div>

            {/* Arrow indicator */}
            <div className="shrink-0 self-center">
                <FiChevronRight className="w-5 h-5 text-base-content/30 transition-all duration-200 group-hover:text-primary group-hover:translate-x-0.5" />
            </div>
        </a>
    )
}


