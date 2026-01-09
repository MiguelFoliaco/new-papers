import { useTranslations } from '@/languages/context'
import { Element, useEditor } from '@craftjs/core'
import { BiBox, BiImage, BiText } from 'react-icons/bi'
import { Text } from '../../user-components/text'
import { Container } from '../../user-components/container'
import { Image } from '../../user-components/image'

export const PanelComponents = () => {

    const { t } = useTranslations('studio')
    const { connectors } = useEditor()

    return (
        <div className='w-full pb-2'>
            <p className='bg-base-200 border-b border-neutral/20 px-3 pb-2 pt-4 '>{t('components.title')}</p>

            <div className='grid grid-cols-2 gap-2 p-3 items-center justify-items-center'>
                <div ref={ref => {
                    if (ref) {
                        connectors.create(ref, <Element is={Container} background='transparent' canvas />)
                    }
                }} className='flex flex-col justify-center items-center transition-all w-30 h-30 border-primary/50 hover:border-primary border cursor-pointer hover:text-primary '>
                    <BiBox className='text-2xl' />
                    <p className='text-sm text-center mt-2'>{t('components.container')}</p>
                </div>
                <div ref={ref => {
                    if (ref) {
                        connectors.create(ref, <Text />)
                    }
                }} className='flex flex-col justify-center items-center transition-all w-30 h-30 border-primary/50 hover:border-primary border cursor-pointer hover:text-primary '>
                    <BiText className='text-2xl' />
                    <p className='text-sm text-center mt-2'>{t('components.text')}</p>
                </div>
                <div ref={ref => {
                    if (ref) {
                        connectors.create(ref, <Image auto src={"https://placehold.co/600x400"} alt='' />)
                    }
                }} className='flex flex-col justify-center items-center transition-all w-30 h-30 border-primary/50 hover:border-primary border cursor-pointer hover:text-primary '>
                    <BiImage className='text-2xl' />
                    <p className='text-sm text-center mt-2'>{t('components.image')}</p>
                </div>
            </div>
        </div>
    )
}
