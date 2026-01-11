/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NodeData } from "@craftjs/core";

export const findTitle = (data: Record<string, NodeData>) => {
    const keys = Object.keys(data);

    // @ts-ignore
    const keyTitle = keys.find(e => data[e].type.resolvedName === 'Text') as string

    const titleNode = data[keyTitle];

    const titleH1 = titleNode.props?.raw?.blocks?.find((e: { type: string }) => e?.type?.includes('header'));
    return titleH1?.text
}

export const findText = (data: Record<string, NodeData>) => {
    const keys = Object.keys(data);

    // @ts-ignore
    const keyTitle = keys.filter(e => data[e].type.resolvedName === 'Text')
    let indexRandom = random(0, keyTitle.length - 1)
    
    while (keyTitle[indexRandom].trim() === '') {
        indexRandom = random(0, keyTitle.length - 1)
    }
    const titleNode = data[keyTitle[indexRandom]];
    const titleH1 = titleNode.props?.raw?.blocks?.find((e: { type: string }) => e?.type?.includes('unstyled'));
    return ((titleH1?.text || '') as string)
}


export const findImage = (data: Record<string, NodeData>) => {
    const keys = Object.keys(data);

    // @ts-ignore
    const keyImage = keys.reverse().find(e => data[e].type.resolvedName === 'Image') as string
    const imageNode = data[keyImage];
    return imageNode.props.src
}


const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);