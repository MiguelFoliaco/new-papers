"use client"

import { RiLink, RiLinkUnlink } from "react-icons/ri"
import { useState } from "react"

interface PositionSectionProps {
  x: number
  y: number
  width: number
  height: number
  rotation: number
  cornerRadius: number
  onChange: (
    updates: Partial<{
      x: number
      y: number
      width: number
      height: number
      rotation: number
      cornerRadius: number
    }>,
  ) => void
}

export const PositionSection = ({ x, y, width, height, rotation, cornerRadius, onChange }: PositionSectionProps) => {
  const [linked, setLinked] = useState(true)
  const aspectRatio = width / height

  const handleWidthChange = (newWidth: number) => {
    if (linked) {
      onChange({ width: newWidth, height: Math.round(newWidth / aspectRatio) })
    } else {
      onChange({ width: newWidth })
    }
  }

  const handleHeightChange = (newHeight: number) => {
    if (linked) {
      onChange({ height: newHeight, width: Math.round(newHeight * aspectRatio) })
    } else {
      onChange({ height: newHeight })
    }
  }

  return (
    <div className="space-y-2">
      {/* X, Y Position */}
      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center gap-1 min-w-0">
          <span className="text-xs text-muted-foreground shrink-0 w-4">X</span>
          <input
            type="number"
            value={x}
            onChange={(e) => onChange({ x: Number(e.target.value) })}
            className="input-figma flex-1 min-w-0"
          />
        </div>
        <div className="flex items-center gap-1 min-w-0">
          <span className="text-xs text-muted-foreground shrink-0 w-4">Y</span>
          <input
            type="number"
            value={y}
            onChange={(e) => onChange({ y: Number(e.target.value) })}
            className="input-figma flex-1 min-w-0"
          />
        </div>
      </div>

      {/* Width, Height */}
      <div className="flex items-center gap-2">
        <div className="grid grid-cols-2 gap-2 flex-1 min-w-0">
          <div className="flex items-center gap-1 min-w-0">
            <span className="text-xs text-muted-foreground shrink-0 w-4">W</span>
            <input
              type="number"
              value={width}
              onChange={(e) => handleWidthChange(Number(e.target.value))}
              className="input-figma flex-1 min-w-0"
            />
          </div>
          <div className="flex items-center gap-1 min-w-0">
            <span className="text-xs text-muted-foreground shrink-0 w-4">H</span>
            <input
              type="number"
              value={height}
              onChange={(e) => handleHeightChange(Number(e.target.value))}
              className="input-figma flex-1 min-w-0"
            />
          </div>
        </div>
        <button
          onClick={() => setLinked(!linked)}
          className={`btn-figma shrink-0 ${linked ? "active" : ""}`}
          title={linked ? "Unlink dimensions" : "Link dimensions"}
        >
          {linked ? <RiLink size={14} /> : <RiLinkUnlink size={14} />}
        </button>
      </div>

      {/* Rotation & Corner Radius */}
      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center gap-1 min-w-0">
          <span className="text-xs text-muted-foreground shrink-0 w-4">°</span>
          <input
            type="number"
            value={rotation}
            onChange={(e) => onChange({ rotation: Number(e.target.value) })}
            className="input-figma flex-1 min-w-0"
          />
        </div>
        <div className="flex items-center gap-1 min-w-0">
          <span className="text-xs text-muted-foreground shrink-0 w-4">⌒</span>
          <input
            type="number"
            value={cornerRadius}
            min={0}
            onChange={(e) => onChange({ cornerRadius: Number(e.target.value) })}
            className="input-figma flex-1 min-w-0"
          />
        </div>
      </div>
    </div>
  )
}
