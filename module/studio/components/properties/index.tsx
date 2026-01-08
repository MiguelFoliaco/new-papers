"use client"

import type React from "react"

import { useState } from "react"
import {
    RiArrowDownSLine,
    RiArrowRightSLine,
    RiDeleteBinLine,
    RiFileCopyLine,
    RiEyeLine,
    RiEyeOffLine,
    RiLockLine,
    RiLockUnlockLine,
} from "react-icons/ri"
import { PositionSection } from "./position-section"
import { AlignmentSection } from "./alignment-section"
import { FillSection } from "./fill-section"
import { StrokeSection } from "./stroke-section"
import { EffectsSection } from "./effects-section"
import { TypographySection } from "./typography"

interface ElementProperties {
    name: string
    type: "frame" | "text" | "rectangle" | "ellipse" | "component"
    x: number
    y: number
    width: number
    height: number
    rotation: number
    opacity: number
    visible: boolean
    locked: boolean
    cornerRadius: number
    fills: { color: string; opacity: number }[]
    stroke: { color: string; width: number; opacity: number } | null
    effects: { type: "shadow" | "blur"; values: Record<string, number> }[]
    typography?: {
        fontFamily: string
        fontSize: number
        fontWeight: number
        lineHeight: number
        letterSpacing: number
    }
}

export const PropertiesPanel = () => {

    
    const [element, setElement] = useState<ElementProperties>({
        name: "Frame 1",
        type: "frame",
        x: 100,
        y: 200,
        width: 320,
        height: 480,
        rotation: 0,
        opacity: 100,
        visible: true,
        locked: false,
        cornerRadius: 8,
        fills: [{ color: "#1E1E1E", opacity: 100 }],
        stroke: { color: "#404040", width: 1, opacity: 100 },
        effects: [],
        typography: {
            fontFamily: "Inter",
            fontSize: 14,
            fontWeight: 400,
            lineHeight: 1.5,
            letterSpacing: 0,
        },
    })

    const [expandedSections, setExpandedSections] = useState({
        position: true,
        alignment: true,
        fill: true,
        stroke: true,
        effects: true,
        typography: true,
    })

    const toggleSection = (section: keyof typeof expandedSections) => {
        setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))
    }

    const updateElement = (updates: Partial<ElementProperties>) => {
        setElement((prev) => ({ ...prev, ...updates }))
    }

    return (
        <div className="w-full h-full bg-card border-l border-border flex flex-col overflow-hidden">
            {/* Header */}
            <div className="p-3 border-b border-border">
                <div className="flex items-center justify-between mb-2">
                    <input
                        type="text"
                        value={element.name}
                        onChange={(e) => updateElement({ name: e.target.value })}
                        className="input-figma flex-1 font-medium text-sm"
                    />
                    <div className="flex items-center gap-1 ml-2">
                        <button
                            onClick={() => updateElement({ visible: !element.visible })}
                            className="btn-figma"
                            title={element.visible ? "Hide" : "Show"}
                        >
                            {element.visible ? <RiEyeLine size={14} /> : <RiEyeOffLine size={14} />}
                        </button>
                        <button
                            onClick={() => updateElement({ locked: !element.locked })}
                            className="btn-figma"
                            title={element.locked ? "Unlock" : "Lock"}
                        >
                            {element.locked ? <RiLockLine size={14} /> : <RiLockUnlockLine size={14} />}
                        </button>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground capitalize px-2 py-0.5 bg-muted rounded">{element.type}</span>
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="w-full h-full overflow-y-auto">
                {/* Position & Size */}
                <CollapsibleSection
                    title="Position & Size"
                    expanded={expandedSections.position}
                    onToggle={() => toggleSection("position")}
                >
                    <PositionSection
                        x={element.x}
                        y={element.y}
                        width={element.width}
                        height={element.height}
                        rotation={element.rotation}
                        cornerRadius={element.cornerRadius}
                        onChange={(updates) => updateElement(updates)}
                    />
                </CollapsibleSection>

                <div className="divider-figma mx-3" />

                {/* Alignment */}
                <CollapsibleSection
                    title="Alignment"
                    expanded={expandedSections.alignment}
                    onToggle={() => toggleSection("alignment")}
                >
                    <AlignmentSection />
                </CollapsibleSection>

                <div className="divider-figma mx-3" />

                {/* Fill */}
                <CollapsibleSection title="Fill" expanded={expandedSections.fill} onToggle={() => toggleSection("fill")}>
                    <FillSection fills={element.fills} onChange={(fills) => updateElement({ fills })} />
                </CollapsibleSection>

                <div className="divider-figma mx-3" />

                {/* Stroke */}
                <CollapsibleSection title="Stroke" expanded={expandedSections.stroke} onToggle={() => toggleSection("stroke")}>
                    <StrokeSection stroke={element.stroke} onChange={(stroke) => updateElement({ stroke })} />
                </CollapsibleSection>

                <div className="divider-figma mx-3" />

                {/* Effects */}
                {/* <CollapsibleSection
                    title="Effects"
                    expanded={expandedSections.effects}
                    onToggle={() => toggleSection("effects")}
                >
                    <EffectsSection effects={element.effects} onChange={(effects) => updateElement({ effects })} />
                </CollapsibleSection> */}

                {element.type === "text" && (
                    <>
                        <div className="divider-figma mx-3" />
                        <CollapsibleSection
                            title="Typography"
                            expanded={expandedSections.typography}
                            onToggle={() => toggleSection("typography")}
                        >
                            <TypographySection
                                typography={element.typography!}
                                onChange={(typography) => updateElement({ typography })}
                            />
                        </CollapsibleSection>
                    </>
                )}

                {/* Opacity */}
                <div className="px-3 py-2">
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground w-16">Opacity</span>
                        <input
                            type="range"
                            min={0}
                            max={100}
                            value={element.opacity}
                            onChange={(e) => updateElement({ opacity: Number(e.target.value) })}
                            className="range"
                        />
                        <input
                            type="number"
                            min={0}
                            max={100}
                            value={element.opacity}
                            onChange={(e) => updateElement({ opacity: Number(e.target.value) })}
                            className="input-sm text-center"
                        />
                        <span className="text-xs text-muted-foreground">%</span>
                    </div>
                </div>
            </div>

            {/* Footer Actions */}
            <div className="p-3 border-t border-border flex items-center justify-between">
                <button className="btn-figma" title="Duplicate">
                    <RiFileCopyLine size={16} />
                </button>
                <button className="btn-figma text-destructive hover:text-destructive hover:bg-destructive/10" title="Delete">
                    <RiDeleteBinLine size={16} />
                </button>
            </div>
        </div>
    )
}

interface CollapsibleSectionProps {
    title: string
    expanded: boolean
    onToggle: () => void
    children: React.ReactNode
}

const CollapsibleSection = ({ title, expanded, onToggle, children }: CollapsibleSectionProps) => {
    return (
        <div className="px-3 py-2">
            <button onClick={onToggle} className="section-header w-full mb-2">
                <span>{title}</span>
                {expanded ? <RiArrowDownSLine size={14} /> : <RiArrowRightSLine size={14} />}
            </button>
            {expanded && children}
        </div>
    )
}
