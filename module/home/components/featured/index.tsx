'use client';
import { useTranslations } from '@/languages/context';

export const Featured = () => {

    const { t } = useTranslations('home')
    return (
        <div className='mt-5'>
            <h2 className="text-2xl font-bold">{t('featured.title')}</h2>
        </div>
    )
}
