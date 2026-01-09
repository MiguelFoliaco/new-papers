import { useTranslations } from '@/languages/context'
import { Element, useEditor } from '@craftjs/core'
import { BiBox, BiImage, BiText } from 'react-icons/bi'
import { Text } from '../../user-components/text'
import { Container } from '../../user-components/container'
import { Image } from '../../user-components/image'

export const PanelComponents = () => {

    const { t } = useTranslations('studio')
    const { connectors, query } = useEditor()

    return (
        <div className='w-full py-2'>
            <p className='border-b border-neutral/20 px-3 py-2 '>{t('components.title')}</p>

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
                        connectors.create(ref, <Text text='new text' />)
                    }
                }} className='flex flex-col justify-center items-center transition-all w-30 h-30 border-primary/50 hover:border-primary border cursor-pointer hover:text-primary '>
                    <BiText className='text-2xl' />
                    <p className='text-sm text-center mt-2'>{t('components.text')}</p>
                </div>
                <div ref={ref => {
                    if (ref) {
                        connectors.create(ref, <Image src={"https://placehold.co/600x400"} alt='placeholder' />)
                    }
                }} className='flex flex-col justify-center items-center transition-all w-30 h-30 border-primary/50 hover:border-primary border cursor-pointer hover:text-primary '>
                    <BiImage className='text-2xl' />
                    <p className='text-sm text-center mt-2'>{t('components.image')}</p>
                </div>
            </div>
        </div>
    )
}
