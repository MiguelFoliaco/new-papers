// pages/index.tsx
'use client';

import { Element, Frame } from '@craftjs/core';
import { Text } from '../user-components/text';
import { useTranslations } from '@/languages/context';

export function PageNew() {

    const { t } = useTranslations('studio')

    return (
        <div className="mx-auto">
            <h1 className="text-lg pt-4 font-semibold text-center">
                {t('title.create_or_update_content')}
            </h1>

            <div className='w-full h-[850] p-4 overflow-y-scroll border-t border-b border-base-content/20'>
                <Frame>
                    <Element is="div" canvas>
                        <Text />
                    </Element>
                </Frame>
            </div>
        </div>
    );
}
