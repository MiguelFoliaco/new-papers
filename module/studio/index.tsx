'use client'

import { Editor } from '@craftjs/core'
import { ButtonLang } from '../common/components/btn-lan'
import { PageNew } from './components/page'
import { Container } from './user-components/container'
import { Text } from './user-components/text'
import { PanelComponents } from './components/properties'

import { Image } from './user-components/image'
import { useState } from 'react'
import ImageNext from 'next/image'
import { CONSTANT } from '@/constant'
import { SaveButton } from './components/save-button'

export const Studio = ({ leftMenu }: { leftMenu: React.ReactNode }) => {

    const [isEdit, setisEdit] = useState(true)


    return (
        <Editor
            resolver={{ Container, Text, Image }}
            enabled={isEdit}
        >

            <div className='grid grid-rows-15 h-screen'>
                <div className='row-span-1 bg-base-200 border-b border-b-neutral/20 flex justify-between items-center px-3'>
                    <div className='flex items-center gap-2'>
                        <SaveButton />
                        <button className='btn btn-sm shadow-none btn-neutral' onClick={() => setisEdit(!isEdit)}>
                            {isEdit ? 'Preview' : 'Edit'}
                        </button>
                    </div>
                    <ImageNext
                        className='mx-auto w-auto h-10 object-contain'
                        alt='new-papers'
                        src={CONSTANT.LOGO}
                        width={200}
                        height={40}
                    />
                    <div className=' gap-2 flex'>
                        <ButtonLang />
                    </div>
                </div>
                <div className='w-full flex justify-between h-full row-span-14'>
                    <div className='w-fit'>
                        {leftMenu}
                    </div>
                    <div className='w-[75%] border-l border-r border-neutral/20'>
                        <PageNew />
                    </div>
                    <div className='w-[20%]'>
                        <PanelComponents />
                    </div>
                </div>
            </div>
        </Editor >
    )
}
