// pages/index.tsx
'use client';

import { Element, Frame } from '@craftjs/core';
import { Text } from '../user-components/text';
import { useTranslations } from '@/languages/context';

export function PageNew() {

    const { t } = useTranslations('studio')

    return (
            <div className="mx-auto">
                <h1 className="text-lg font-semibold text-center">
                    {t('title.create_or_update_content')}
                </h1>

                <div className='w-full h-full p-4 '>
                    <Frame>
                        <Element is="div" canvas>
                            <Text text={t('placeholder')} fontSize={16} />
                        </Element>
                    </Frame>
                </div>
            </div>
    );
}
