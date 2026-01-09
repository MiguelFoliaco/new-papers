'use client';
import { useTranslations } from '@/languages/context';
import { useEffect, useState } from 'react';
import { BestNewType, getBestNews } from '../../actions/get-best';
import { useToast } from '@/module/common/hook/useToast';
import { CardNewFeatured } from './card';

export const Featured = () => {

    const { t } = useTranslations('home')
    const { openToast } = useToast()
    const [loaded, setLoaded] = useState(false)
    const [newBest, setNewBest] = useState<BestNewType>()

    useEffect(() => {
        getBestNews()
            .then(res => {
                if (res.status !== 'success') {
                    return openToast(res.msg, 'error')
                }
                if (res.data) {
                    setNewBest(res.data)
                }
            })
            .finally(() => {
                setLoaded(true)
            })
    }, [openToast])

    return (
        <div >
            <h2 className="text-2xl font-bold lg:px-0 px-3">{t('featured.title')}</h2>


            <div className='mt-2'>
                {
                    loaded && newBest ?
                        <CardNewFeatured newBest={newBest!} />
                        :
                        <div className='flex flex-col items-center justify-center min-h-[300px]'>
                            <span className='loading loading-md loading-infinity' />
                            <p className='mt-2 text-2xl'>¿Que veremos hoy...?</p>
                        </div>
                }
            </div>
        </div>
    )
}
