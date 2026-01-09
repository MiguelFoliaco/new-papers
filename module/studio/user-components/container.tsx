'use client';

import { useTranslations } from "@/languages/context";
import { useEditor, useNode } from "@craftjs/core";
import React from "react";
import { BiGrid, BiTrash } from "react-icons/bi";
import { MdPadding } from "react-icons/md";

type ContainerProps = {
    padding?: number;
    gridTemplateColumns?: string;
    gridAutoFlow?: "row" | "column";
    gridGap?: number;
    background?: string;
    children?: React.ReactNode;
};

export const Container = ({ children }: ContainerProps) => {
    const { t } = useTranslations('studio')
    const { id } = useNode()
    const { enable, actions } = useEditor(state => ({ enable: state.options.enabled }))

    const {
        connectors: { connect, drag },
        actions: { setProp },
        padding,
        gridTemplateColumns,
        gridAutoFlow,
        gridGap,
        background,
    } = useNode((node) => ({
        padding: node.data.props.padding,
        gridTemplateColumns: node.data.props.gridTemplateColumns,
        gridAutoFlow: node.data.props.gridAutoFlow,
        gridGap: node.data.props.gridGap,
        background: node.data.props.background,
    }));

    return (
        <div
            ref={(ref) => {
                if (ref) {
                    connect(drag(ref))
                }
            }}
            className="my-2 mx-0  w-full  min-h-[200px]"
            style={{
                border: enable ? ' 1px solid color-mix(in oklab,var(--color-neutral) 20%, transparent)' : 'none ',
            }}
        >
            {
                /* Toolbar */
                enable &&
                <div className="w-full border-b border-neutral/20 p-4 flex flex-wrap items-center gap-3">

                    {/* Padding */}
                    <div className="flex items-center gap-2">
                        <MdPadding />
                        <label className="text-sm">{t('container.padding')}</label>
                        <input
                            type="number"
                            className="input input-sm w-20"
                            value={padding}
                            onChange={(e) =>
                                setProp((props: ContainerProps) => {
                                    props.padding = Number(e.target.value);
                                })
                            }
                        />
                    </div>

                    {/* Direction */}
                    <div className="flex items-center gap-2">
                        <BiGrid />
                        <select
                            className="select select-sm"
                            value={gridAutoFlow}
                            onChange={(e) =>
                                setProp((props: ContainerProps) => {
                                    props.gridAutoFlow = e.target.value as "row" | "column";
                                })
                            }
                        >
                            <option value="row">{t('container.row')}</option>
                            <option value="column">{t('container.col')}</option>
                        </select>
                    </div>

                    {/* Gap */}
                    <div className="flex items-center gap-2">
                        <MdPadding />
                        <label className="text-sm">{t('container.spacing')}</label>
                        <input
                            type="number"
                            className="input input-sm w-20"
                            value={gridGap}
                            onChange={(e) =>
                                setProp((props: ContainerProps) => {
                                    props.gridGap = Number(e.target.value);
                                })
                            }
                        />
                    </div>

                    {/* 2 Columns */}
                    <button
                        type="button"
                        onClick={() =>
                            setProp((props: ContainerProps) => {
                                props.gridTemplateColumns =
                                    gridTemplateColumns === "1fr 1fr" ? "1fr" : "1fr 1fr";
                            })
                        }
                        className={`btn btn-sm ${gridTemplateColumns === "1fr 1fr"
                            ? "btn-primary"
                            : "btn-ghost"
                            }`}
                    >
                        <BiGrid />
                        2 {t('container.cols')}
                    </button>

                    {/* 3 Columns */}
                    <button
                        type="button"
                        onClick={() =>
                            setProp((props: ContainerProps) => {
                                props.gridTemplateColumns =
                                    gridTemplateColumns === "1fr 1fr 1fr"
                                        ? "1fr"
                                        : "1fr 1fr 1fr";
                            })
                        }
                        className={`btn btn-sm ${gridTemplateColumns === "1fr 1fr 1fr"
                            ? "btn-primary"
                            : "btn-ghost"
                            }`}
                    >
                        <BiGrid />
                        3 {t('container.cols')}
                    </button>

                    {/* Delete */}
                    <button
                        className="ml-auto cursor-pointer mr-2"
                        type="button"
                        onClick={() => {

                            const check = confirm('Are you sure you want to delete this container?')

                            if (check) {
                                actions.delete(id)
                            }
                        }}
                    >
                        <BiTrash className="text-base-content/60" />

                    </button>
                </div>
            }

            {/* Content */}
            <div
                className="w-full  min-h-[200px] grid"
                style={{
                    padding,
                    gridTemplateColumns,
                    gridAutoFlow,
                    gap: gridGap,
                    background,
                }}
            >
                {children}
            </div>
        </div>
    );
};

Container.craft = {
    displayName: "Container",
    props: {
        padding: 5,
        gridTemplateColumns: "1fr",
        gridAutoFlow: "row",
        gridGap: 10,
        background: "transparent",
    },
    rules: {
        canDrag: () => true,
    },
};
