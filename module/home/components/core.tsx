import { CardNewCompactList } from '@/module/common/components/list-news'
import { Featured } from './featured'

export const CoreHome = () => {
    return (
        <div className='lg:py-4'>
            <Featured />

            <div className='mt-4 divider'></div>
            <CardNewCompactList
                query=''
                title='Lo ultimo'
            />


            <div className='mt-4 divider'></div>
            <div className='grid gap-10 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 mt-4'>
                <CardNewCompactList
                    type='region'
                    query='ebf5031a-dbaf-4cd8-ae52-77ac5ad8d47c'
                    title='Lo que pasa en el mundo'
                />
                <CardNewCompactList
                    type='region'
                    query='a96c4cf5-05e1-4e33-9ba5-0d5bea5aaa86'
                    title='En tu ciudad'
                />
            </div>
        </div>
    )
}
