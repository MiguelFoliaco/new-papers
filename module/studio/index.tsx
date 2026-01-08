'use client'

import { Editor } from '@craftjs/core'
import { ButtonLang } from '../common/components/btn-lan'
import { PageNew } from './components/page'
import { Container } from './user-components/container'
import { Text } from './user-components/text'
import { PropertiesPanel } from './components/properties'

export const Studio = () => {
    return (
        <Editor resolver={{ Container, Text }}>

            <div className='grid grid-rows-15 h-screen'>
                <div className='row-span-1 border-b border-b-white/20 flex items-center px-3'>
                    <div className='ml-auto'>
                        <ButtonLang />
                    </div>
                </div>
                <div className='w-full flex justify-between h-full row-span-14'>
                    <div className='w-[15%]'></div>
                    <div className='w-[75%] border-l border-r border-white/20'>
                        <PageNew />
                    </div>
                    <div className='w-[20%]'>
                        <PropertiesPanel />
                    </div>
                </div>
            </div>
        </Editor>
    )
}
