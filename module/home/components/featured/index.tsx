'use client';
import { useTranslations } from '@/languages/context';
import { useEffect, useState } from 'react';
import { BestNewType, getBestNews } from '../../actions/get-best';
import { useToast } from '@/module/common/hook/useToast';

export const Featured = () => {

    const { t } = useTranslations('home')
    const { openToast } = useToast()
    const [loaded, setLoaded] = useState(false)
    const [newBest, setNewBest] = useState<BestNewType>()

    useEffect(() => {
        getBestNews()
            .then(res => {
                if (res.data) {
                    setNewBest(res.data)
                }
                if (res.status !== 'success') {
                    openToast(res.msg, 'error')
                }
            })
            .finally(() => {
                setLoaded(true)
            })
    }, [])

    return (
        <div className='mt-5'>
            <h2 className="text-2xl font-bold">{t('featured.title')}</h2>


            <div className='mt-2'>
                {
                    loaded ?
                        null
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
