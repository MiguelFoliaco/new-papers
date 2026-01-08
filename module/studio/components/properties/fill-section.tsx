"use client"

import { RiAddLine, RiDeleteBinLine, RiEyeLine, RiEyeOffLine } from "react-icons/ri"
import { useState } from "react"

interface FillSectionProps {
  fills: { color: string; opacity: number }[]
  onChange: (fills: { color: string; opacity: number }[]) => void
}

export const FillSection = ({ fills, onChange }: FillSectionProps) => {
  const [hiddenFills, setHiddenFills] = useState<Set<number>>(new Set())

  const addFill = () => {
    onChange([...fills, { color: "#FFFFFF", opacity: 100 }])
  }

  const removeFill = (index: number) => {
    onChange(fills.filter((_, i) => i !== index))
  }

  const updateFill = (index: number, updates: Partial<{ color: string; opacity: number }>) => {
    onChange(fills.map((fill, i) => (i === index ? { ...fill, ...updates } : fill)))
  }

  const toggleFillVisibility = (index: number) => {
    const newHidden = new Set(hiddenFills)
    if (newHidden.has(index)) {
      newHidden.delete(index)
    } else {
      newHidden.add(index)
    }
    setHiddenFills(newHidden)
  }

  return (
    <div className="space-y-2">
      {fills.map((fill, index) => (
        <div key={index} className="flex flex-wrap items-center gap-2">
          <div
            className="w-6 h-6 rounded border border-border cursor-pointer shrink-0 relative overflow-hidden"
            style={{ backgroundColor: fill.color }}
          >
            <input
              type="color"
              value={fill.color}
              onChange={(e) => updateFill(index, { color: e.target.value })}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          <input
            type="text"
            value={fill.color.toUpperCase()}
            onChange={(e) => updateFill(index, { color: e.target.value })}
            className="input-figma flex-1 min-w-[70px] font-mono text-xs"
          />
          <div className="flex items-center gap-1 shrink-0">
            <input
              type="number"
              min={0}
              max={100}
              value={fill.opacity}
              onChange={(e) => updateFill(index, { opacity: Number(e.target.value) })}
              className="input-figma w-11 text-center"
            />
            <span className="text-xs text-muted-foreground">%</span>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <button onClick={() => toggleFillVisibility(index)} className="btn-figma">
              {hiddenFills.has(index) ? <RiEyeOffLine size={12} /> : <RiEyeLine size={12} />}
            </button>
            <button onClick={() => removeFill(index)} className="btn-figma text-destructive hover:text-destructive">
              <RiDeleteBinLine size={12} />
            </button>
          </div>
        </div>
      ))}
      <button
        onClick={addFill}
        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        <RiAddLine size={12} />
        <span>Add fill</span>
      </button>
    </div>
  )
}
