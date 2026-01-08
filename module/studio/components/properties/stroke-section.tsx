"use client"

import { RiAddLine, RiDeleteBinLine, RiEyeLine, RiEyeOffLine } from "react-icons/ri"
import { useState } from "react"

interface StrokeSectionProps {
  stroke: { color: string; width: number; opacity: number } | null
  onChange: (stroke: { color: string; width: number; opacity: number } | null) => void
}

export const StrokeSection = ({ stroke, onChange }: StrokeSectionProps) => {
  const [visible, setVisible] = useState(true)

  const addStroke = () => {
    onChange({ color: "#FFFFFF", width: 1, opacity: 100 })
  }

  const removeStroke = () => {
    onChange(null)
  }

  if (!stroke) {
    return (
      <button
        onClick={addStroke}
        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        <RiAddLine size={12} />
        <span>Add stroke</span>
      </button>
    )
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <div
          className="w-6 h-6 rounded border border-border cursor-pointer shrink-0 relative overflow-hidden"
          style={{ backgroundColor: stroke.color }}
        >
          <input
            type="color"
            value={stroke.color}
            onChange={(e) => onChange({ ...stroke, color: e.target.value })}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
        <input
          type="text"
          value={stroke.color.toUpperCase()}
          onChange={(e) => onChange({ ...stroke, color: e.target.value })}
          className="input-figma flex-1 min-w-[70px] font-mono text-xs"
        />
        <div className="flex items-center gap-1 shrink-0">
          <button onClick={() => setVisible(!visible)} className="btn-figma">
            {visible ? <RiEyeLine size={12} /> : <RiEyeOffLine size={12} />}
          </button>
          <button onClick={removeStroke} className="btn-figma text-destructive hover:text-destructive">
            <RiDeleteBinLine size={12} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center gap-1 min-w-0">
          <span className="text-xs text-muted-foreground shrink-0">W</span>
          <input
            type="number"
            min={0}
            value={stroke.width}
            onChange={(e) => onChange({ ...stroke, width: Number(e.target.value) })}
            className="input-figma flex-1 min-w-0"
          />
        </div>
        <div className="flex items-center gap-1 min-w-0">
          <input
            type="number"
            min={0}
            max={100}
            value={stroke.opacity}
            onChange={(e) => onChange({ ...stroke, opacity: Number(e.target.value) })}
            className="input-figma flex-1 min-w-0"
          />
          <span className="text-xs text-muted-foreground shrink-0">%</span>
        </div>
      </div>
    </div>
  )
}
