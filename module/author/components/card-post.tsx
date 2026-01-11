/* eslint-disable @next/next/no-img-element */
'use client'
import { useTranslations } from '@/languages/context'
import { formatNumber } from '@/module/utils/format-number'
import React from 'react'
import { InfoUser } from '../actions/get-info-user'
import { dateByLan } from '@/module/utils/date-by-lan'
import { FiBookmark, FiEye, FiHeart } from 'react-icons/fi'


type Props = {
    news: InfoUser['news'][0]
}

export const CardPost = ({ news }: Props) => {

    const { lan } = useTranslations('profile')

    return (
        <article
            key={news.id}
            className="bg-base-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group cursor-pointer"
        >
            <div className="h-36 overflow-hidden relative">
                <img
                    src={news.cover_image_url || "/placeholder.svg?height=150&width=300&query=article"}
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button className="absolute top-2 right-2 btn btn-circle btn-sm btn-ghost bg-base-100/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <FiBookmark className="w-4 h-4" />
                </button>
            </div>
            <div className="p-4">
                <div className="flex gap-1 mb-2">
                    {['#tag1', '#tag2', '#tag3'].slice(0, 2).map((tag) => (
                        <span key={tag} className="badge badge-ghost badge-xs">
                            {tag}
                        </span>
                    ))}
                </div>
                <h4 className="font-semibold text-base-content mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {news.title}
                </h4>
                <div className="flex items-center justify-between text-xs text-base-content/60">
                    <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                            <FiEye className="w-3 h-3" /> {formatNumber(10000)}
                        </span>
                        <span className="flex items-center gap-1">
                            <FiHeart className="w-3 h-3" /> {formatNumber(4578)}
                        </span>
                    </div>
                    <span>{dateByLan(new Date(news.created_at), lan)}</span>
                </div>
            </div>
        </article>
    )
}
