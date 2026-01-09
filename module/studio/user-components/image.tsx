'use client';

import { useEditor, useNode } from "@craftjs/core";
import { BiImage } from "react-icons/bi";

type ImageProps = {
    src?: string;
    alt?: string;
    width?: number;
    height?: number;
    objectFit?: "cover" | "contain" | "fill";
    borderRadius?: number;
};

export const Image = ({
    src,
    alt,
    width,
    height,
    objectFit,
    borderRadius,
}: ImageProps) => {
    const { enable } = useEditor(state => ({ enable: state.options.enabled }))
    const {
        connectors: { connect, drag },
        actions: { setProp },
        selected,
    } = useNode((node) => ({
        selected: node.events.selected,
    }));

    return (
        <div
            ref={(ref) => {
                if (ref) {
                    connect(drag(ref))
                }
            }}
            className={`border transition-all flex flex-col ${selected ? "border-primary" : "border-primary/20"
                }`}
            style={{
                border: enable ? "1px solid color-mix(in oklab,var(--color-neutral) 20%, transparent)" : "none",
                borderRadius,
            }}
        >
            {/* Top controls */}
            {selected && (
                <div className="border-b border-neutral/20 bg-base-100 p-2 flex items-center gap-2">
                    <div className="flex items-center gap-2">
                        <BiImage className="text-base-content/60" />
                        <input
                            type="text"
                            placeholder="Image URL"
                            className="input input-xs flex-1"
                            value={src}
                            onChange={(e) =>
                                setProp((props: ImageProps) => {
                                    props.src = e.target.value;
                                })
                            }
                        />
                    </div>

                    <select
                        className="select select-xs"
                        value={objectFit}
                        onChange={(e) =>
                            setProp((props: ImageProps) => {
                                props.objectFit = e.target.value as ImageProps["objectFit"];
                            })
                        }
                    >
                        <option value="cover">Cover</option>
                        <option value="contain">Contain</option>
                        <option value="fill">Fill</option>
                    </select>

                    <div className="flex items-center gap-2 border-l border-neutral/20 pl-2">
                        <label className="label text-xs">Width</label>
                        <input type="number" value={width} onChange={(e) => setProp((props: ImageProps) => props.width = parseInt(e.target.value))} className="input input-xs" />
                    </div>
                    <div className="flex items-center gap-2  pl-2">
                        <label className="label text-xs">Height</label>
                        <input type="number" value={height} onChange={(e) => setProp((props: ImageProps) => props.height = parseInt(e.target.value))} className="input input-xs" />
                    </div>
                </div>
            )}

            {/* Image area */}
            <div className="flex-1 flex items-center justify-center ">
                {src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={src}
                        alt={alt}
                        className="w-full h-full"
                        style={{
                            objectFit,
                            borderRadius,
                            width,
                            height,
                        }}
                        draggable={false}
                    />
                ) : (
                    <BiImage size={32} className="text-base-content/40" />
                )}
            </div>
        </div>
    );
};

Image.craft = {
    displayName: "Image",
    props: {
        src: "",
        alt: "image",
        width: 200,
        height: 150,
        objectFit: "cover",
        borderRadius: 0,
    },
    rules: {
        canDrag: () => true,
    },
};
