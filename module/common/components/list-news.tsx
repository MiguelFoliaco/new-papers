'use client';
import { FiChevronRight } from "react-icons/fi"
import { CardNewCompact } from "./list-item"
import { useEffect, useState } from "react"
import { BestNewListType, BestNewRegionType, getNews, getNewsByRegion } from "../actions/get-news"

/* List wrapper component */
type ListProps = {
    title?: string,
    query: string
    type?: 'query' | 'region'
}

export const CardNewCompactList = ({ title = "Últimas noticias", query, type = 'query' }: ListProps) => {

    const [news, setNews] = useState<(BestNewListType | BestNewRegionType)>([]);

    useEffect(() => {
        if (type === 'query') {
            getNews({
                limit: 5,
                search: query,
                offset: 0,
                order: 'desc'
            })
                .then((res) => {
                    if (res) {
                        if (res.data) {
                            setNews(res.data as BestNewListType)
                        }
                    }
                })
        }
        if (type === 'region') {
            getNewsByRegion({
                limit: 5,
                region: query,
                offset: 0,
                order: 'desc'
            })
                .then((res) => {
                    if (res) {
                        if (res.data) {
                            setNews(res.data)
                        }
                    }
                })
        }
    }, [query, type])


    return (
        <section className="w-full space-y-4 lg:px-0 px-3">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-base-content">{title}</h2>
                <a
                    href="/news"
                    className="text-sm text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                >
                    Ver todas
                    <FiChevronRight className="w-4 h-4" />
                </a>
            </div>

            {/* List */}
            <div className="space-y-2">
                {news.map((item) => (
                    <CardNewCompact key={item.new.id} newBest={item} />
                ))}
            </div>
        </section>
    )
}