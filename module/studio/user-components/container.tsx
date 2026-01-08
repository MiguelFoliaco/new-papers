import { useNode } from "@craftjs/core";
import React from "react";

type ContainerProps = {
    background?: string
    padding?: number
    children: React.ReactNode
}

export const Container = ({ background, padding = 0, children }: ContainerProps) => {

    const { connectors: { connect, drag } } = useNode()


    return (
        <div ref={ref => {
            if (ref) {
                connect(drag(ref as HTMLElement))
            }
        }} className="my-2 mx-0 border border-gray-300 min-h-[100px] " style={{ margin: "5px 0", background, padding: `${padding}px` }}>
            {children}
        </div>
    )
}

Container.craft = {
    displayName: 'Container',
    props: {
        padding: 20,
        background: '#ffffff',
    },
    rules: {
        canDrag: () => true,
    },
};
