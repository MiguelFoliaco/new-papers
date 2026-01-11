"use client"

import type React from "react"

import { useState } from "react"
import {
    IoCheckmark,
    IoColorPaletteOutline,
    IoSparkles,
    IoText,
    IoLayersOutline,
    IoContrastOutline,
    IoRefresh,
    IoEyeOutline,
} from "react-icons/io5"

type ColorGroup = {
    id: string
    label: string
    icon: React.ReactNode
    description: string
    colors: {
        value: string
        name: string
    }[]
}

type SelectedColors = {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
}

type Props = {
    initialColors?: Partial<SelectedColors>
    onChange?: (colors: SelectedColors) => void
    className?: string
}

const colorGroups: ColorGroup[] = [
    {
        id: "primary",
        label: "Color Principal",
        icon: <IoColorPaletteOutline className="w-4 h-4" />,
        description: "Define tu identidad visual",
        colors: [
            { value: "#3b82f6", name: "Azul" },
            { value: "#8b5cf6", name: "Violeta" },
            { value: "#ec4899", name: "Rosa" },
            { value: "#ef4444", name: "Rojo" },
            { value: "#f97316", name: "Naranja" },
            { value: "#eab308", name: "Amarillo" },
            { value: "#22c55e", name: "Verde" },
            { value: "#14b8a6", name: "Teal" },
            { value: "#06b6d4", name: "Cyan" },
            { value: "#6366f1", name: "Indigo" },
        ],
    },
    {
        id: "secondary",
        label: "Color Secundario",
        icon: <IoLayersOutline className="w-4 h-4" />,
        description: "Complementa tu estilo",
        colors: [
            { value: "#64748b", name: "Slate" },
            { value: "#6b7280", name: "Gris" },
            { value: "#78716c", name: "Stone" },
            { value: "#71717a", name: "Zinc" },
            { value: "#737373", name: "Neutral" },
            { value: "#a1a1aa", name: "Gris claro" },
            { value: "#9ca3af", name: "Gris cool" },
            { value: "#a8a29e", name: "Stone claro" },
        ],
    },
    {
        id: "accent",
        label: "Color de Acento",
        icon: <IoSparkles className="w-4 h-4" />,
        description: "Destaca elementos importantes",
        colors: [
            { value: "#fbbf24", name: "Amber" },
            { value: "#f472b6", name: "Pink" },
            { value: "#a78bfa", name: "Purple" },
            { value: "#60a5fa", name: "Sky" },
            { value: "#34d399", name: "Emerald" },
            { value: "#fb923c", name: "Orange" },
            { value: "#f87171", name: "Red" },
            { value: "#2dd4bf", name: "Teal" },
        ],
    },
    {
        id: "background",
        label: "Fondo",
        icon: <IoContrastOutline className="w-4 h-4" />,
        description: "Color base de tu perfil",
        colors: [
            { value: "#ffffff", name: "Blanco" },
            { value: "#f8fafc", name: "Slate 50" },
            { value: "#f5f5f4", name: "Stone 100" },
            { value: "#fafaf9", name: "Warm" },
            { value: "#18181b", name: "Zinc 900" },
            { value: "#1f2937", name: "Gray 800" },
            { value: "#0f172a", name: "Slate 900" },
            { value: "#171717", name: "Neutral 900" },
        ],
    },
    {
        id: "text",
        label: "Texto",
        icon: <IoText className="w-4 h-4" />,
        description: "Color principal del texto",
        colors: [
            { value: "#0f172a", name: "Slate 900" },
            { value: "#18181b", name: "Zinc 900" },
            { value: "#171717", name: "Neutral 900" },
            { value: "#1c1917", name: "Stone 900" },
            { value: "#f8fafc", name: "Slate 50" },
            { value: "#fafafa", name: "Zinc 50" },
            { value: "#fafaf9", name: "Stone 50" },
            { value: "#f5f5f5", name: "Neutral 100" },
        ],
    },
]

const defaultColors: SelectedColors = {
    primary: "#3b82f6",    // Color principal de acciones (botones, links)
    secondary: "#64748b",  // Color secundario / complementario
    accent: "#fbbf24",     // Color de énfasis / highlights
    background: "#ffffff",// Fondo principal
    text: "#0f172a",       // Texto principal
}

export const AuthorColorPicker = ({ initialColors, onChange, className }: Props) => {
    const [selectedColors, setSelectedColors] = useState<SelectedColors>({
        ...defaultColors,
        ...initialColors,
    })
    const [showPreview, setShowPreview] = useState(false)

    const handleColorSelect = (groupId: string, colorValue: string) => {
        const newColors = {
            ...selectedColors,
            [groupId]: colorValue,
        }
        setSelectedColors(newColors)
        onChange?.(newColors)
    }

    const handleReset = () => {
        setSelectedColors(defaultColors)
        onChange?.(defaultColors)
    }

    const isDarkBackground = (color: string) => {
        const hex = color.replace("#", "")
        const r = Number.parseInt(hex.substr(0, 2), 16)
        const g = Number.parseInt(hex.substr(2, 2), 16)
        const b = Number.parseInt(hex.substr(4, 2), 16)
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
        return luminance < 0.5
    }

    return (
        <div className={`bg-base-100 rounded-2xl lg:rounded-none lg:border-t-0 lg:border-b-0 border border-base-300 overflow-hidden ${className || ""}`}>
            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-base-300 bg-base-200/30">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                            <IoColorPaletteOutline className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-base-content">Personaliza tu perfil</h3>
                            <p className="text-sm text-base-content/60">Elige los colores que te representan</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button type="button" onClick={() => setShowPreview(!showPreview)} className="btn btn-sm btn-ghost gap-2">
                            <IoEyeOutline className="w-4 h-4" />
                            <span className="hidden sm:inline">Vista previa</span>
                        </button>
                        <button type="button" onClick={handleReset} className="btn btn-sm btn-ghost gap-2">
                            <IoRefresh className="w-4 h-4" />
                            <span className="hidden sm:inline">Restablecer</span>
                        </button>
                    </div>
                </div>

                {/* Selected colors preview bar */}
                <div className="flex items-center gap-2 mt-4 p-3 bg-base-100 rounded-xl">
                    <span className="text-xs text-base-content/60 mr-2 shrink-0">Seleccionados:</span>
                    <div className="flex items-center gap-1.5 flex-wrap">
                        {Object.entries(selectedColors).map(([key, value]) => (
                            <div key={key} className="tooltip tooltip-bottom" data-tip={key.charAt(0).toUpperCase() + key.slice(1)}>
                                <div
                                    className="w-6 h-6 rounded-lg border-2 border-base-300 shadow-sm transition-transform hover:scale-110"
                                    style={{ backgroundColor: value }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Color Groups */}
            <div className="p-4 sm:p-6 space-y-6">
                {colorGroups.map((group) => (
                    <div key={group.id} className="space-y-3">
                        <div className="flex items-center gap-2">
                            <span className="text-base-content/70">{group.icon}</span>
                            <div>
                                <h4 className="text-sm font-medium text-base-content">{group.label}</h4>
                                <p className="text-xs text-base-content/50">{group.description}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-10 gap-2">
                            {group.colors.map((color) => {
                                const isSelected = selectedColors[group.id as keyof SelectedColors] === color.value
                                const isDark = isDarkBackground(color.value)
                                return (
                                    <button
                                        key={color.value}
                                        type="button"
                                        onClick={() => handleColorSelect(group.id, color.value)}
                                        className={`
                                            group relative aspect-square rounded-xl transition-all duration-200
                                            hover:scale-110 hover:z-10 hover:shadow-lg
                                            focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                                            ${isSelected ? "ring-2 ring-primary ring-offset-2 scale-110 z-10 shadow-lg" : "border border-base-300"}
                                        `}
                                        style={{ backgroundColor: color.value }}
                                        title={color.name}
                                    >
                                        {isSelected && (
                                            <IoCheckmark
                                                className={`absolute inset-0 m-auto w-4 h-4 ${isDark ? "text-white" : "text-black"}`}
                                            />
                                        )}
                                        <span
                                            className={`
                                            absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] whitespace-nowrap
                                            opacity-0 group-hover:opacity-100 transition-opacity text-base-content/70
                                        `}
                                        >
                                            {color.name}
                                        </span>
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Live Preview */}
            {showPreview && (
                <div className="p-4 sm:p-6 border-t border-base-300 bg-base-200/20">
                    <h4 className="text-sm font-medium text-base-content mb-4 flex items-center gap-2">
                        <IoEyeOutline className="w-4 h-4" />
                        Vista previa en vivo
                    </h4>
                    <div
                        className="rounded-xl overflow-hidden border border-base-300 shadow-lg"
                        style={{ backgroundColor: selectedColors.background }}
                    >
                        {/* Mini header preview */}
                        <div className="h-16 relative" style={{ backgroundColor: selectedColors.primary }}>
                            <div className="absolute -bottom-6 left-4">
                                <div
                                    className="w-12 h-12 rounded-full border-4 flex items-center justify-center text-white font-bold"
                                    style={{
                                        backgroundColor: selectedColors.secondary,
                                        borderColor: selectedColors.background,
                                    }}
                                >
                                    TU
                                </div>
                            </div>
                        </div>
                        {/* Mini content preview */}
                        <div className="pt-8 pb-4 px-4">
                            <h5 className="font-semibold" style={{ color: selectedColors.text }}>
                                Tu Nombre
                            </h5>
                            <p className="text-sm opacity-70" style={{ color: selectedColors.text }}>
                                @tunombre
                            </p>
                            <div className="flex gap-2 mt-3">
                                <button
                                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-white"
                                    style={{ backgroundColor: selectedColors.primary }}
                                >
                                    Seguir
                                </button>
                                <button
                                    className="px-3 py-1.5 rounded-lg text-xs font-medium"
                                    style={{
                                        backgroundColor: `${selectedColors.accent}20`,
                                        color: selectedColors.accent,
                                    }}
                                >
                                    Mensaje
                                </button>
                            </div>
                            <div
                                className="mt-3 p-2 rounded-lg text-xs"
                                style={{
                                    backgroundColor: `${selectedColors.secondary}15`,
                                    color: selectedColors.text,
                                }}
                            >
                                <span style={{ color: selectedColors.accent }}>12</span> publicaciones
                                <span className="mx-2">·</span>
                                <span style={{ color: selectedColors.accent }}>1.2k</span> seguidores
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
