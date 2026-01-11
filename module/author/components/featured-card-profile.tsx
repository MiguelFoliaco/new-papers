'use client'
/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { InfoUser } from '../actions/get-info-user'
import { FiEye, FiHeart, FiMessageCircle, FiTrendingUp } from 'react-icons/fi'
import { formatNumber } from '@/module/utils/format-number'
import { dateByLan } from '@/module/utils/date-by-lan'
import { useTranslations } from '@/languages/context'


type Props = {
    news: InfoUser['news'][0]
}

export const FeatureCardProfile = ({ news }: Props) => {

    const { lan } = useTranslations('profile')


    return (
        <div className="bg-base-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group">
            <div className="flex flex-col md:flex-row">
                <div className="md:w-2/5 h-48 md:h-auto overflow-hidden">
                    <img
                        src={
                            news.cover_image_url ||
                            "https://placehold.co/600x400?text=No+Image"
                        }
                        alt={news.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </div>
                <div className="md:w-3/5 p-5 md:p-6 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="badge badge-primary badge-sm">Destacado</span>
                        <span className="badge badge-ghost badge-sm">
                            <FiTrendingUp className="w-3 h-3 mr-1" />
                            Trending
                        </span>
                    </div>
                    <h3 className="text-xl font-bold text-base-content mb-2 group-hover:text-primary transition-colors">
                        {news.title}
                    </h3>
                    <p className="text-base-content/70 text-sm mb-4 line-clamp-2">{news.cover_text.substring(0, 100)}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {['React', 'Next.js', 'Tailwind'].map((tag) => (
                            <span key={tag} className="badge badge-outline badge-sm">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <div className="mt-auto flex items-center justify-between text-sm text-base-content/60">
                        <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                                <FiEye className="w-4 h-4" /> {formatNumber(10025848)}
                            </span>
                            <span className="flex items-center gap-1">
                                <FiHeart className="w-4 h-4" /> {formatNumber(2548)}
                            </span>
                            <span className="flex items-center gap-1">
                                <FiMessageCircle className="w-4 h-4" /> {45}
                            </span>
                        </div>
                        <span>{dateByLan(new Date(news.created_at), lan)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
