"use client"

import {
  RiAlignLeft,
  RiAlignCenter,
  RiAlignRight,
  RiAlignTop,
  RiAlignVertically,
  RiAlignBottom,
  RiLayoutRowLine,
  RiLayoutColumnLine,
} from "react-icons/ri"

export const AlignmentSection = () => {
  return (
    <div className="space-y-2">
      {/* Horizontal Alignment */}
      <div className="flex items-center gap-1">
        <button className="btn-figma flex-1" title="Align Left">
          <RiAlignLeft size={14} />
        </button>
        <button className="btn-figma flex-1" title="Align Center Horizontally">
          <RiAlignCenter size={14} />
        </button>
        <button className="btn-figma flex-1" title="Align Right">
          <RiAlignRight size={14} />
        </button>
        <div className="w-px h-4 bg-border mx-1" />
        <button className="btn-figma flex-1" title="Align Top">
          <RiAlignTop size={14} />
        </button>
        <button className="btn-figma flex-1" title="Align Center Vertically">
          <RiAlignVertically size={14} />
        </button>
        <button className="btn-figma flex-1" title="Align Bottom">
          <RiAlignBottom size={14} />
        </button>
      </div>

      {/* Distribution */}
      <div className="flex items-center gap-1">
        <button className="btn-figma flex-1" title="Distribute Horizontally">
          <RiLayoutRowLine size={14} />
        </button>
        <button className="btn-figma flex-1" title="Distribute Vertically">
          <RiLayoutColumnLine size={14} />
        </button>
      </div>
    </div>
  )
}
