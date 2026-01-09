/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NodeData } from "@craftjs/core";

export const findTitle = (data: Record<string, NodeData>) => {
    const keys = Object.keys(data);

    // @ts-ignore
    const keyTitle = keys.reverse().find(e => data[e].type.resolvedName === 'Text') as string
    
    const titleNode = data[keyTitle];
    
    const titleH1 = titleNode.props?.raw?.blocks?.find((e: any) => e?.type?.includes('header'));
    return titleNode?.props?.text || titleH1?.text
}


export const findImage = (data: Record<string, NodeData>) => {
    const keys = Object.keys(data);

    // @ts-ignore
    const keyImage = keys.reverse().find(e => data[e].type.resolvedName === 'Image') as string
    const imageNode = data[keyImage];
    return imageNode.props.src
}