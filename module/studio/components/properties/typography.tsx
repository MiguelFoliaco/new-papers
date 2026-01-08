"use client"

interface TypographySectionProps {
  typography: {
    fontFamily: string
    fontSize: number
    fontWeight: number
    lineHeight: number
    letterSpacing: number
  }
  onChange: (typography: TypographySectionProps["typography"]) => void
}

const fontWeights = [
  { value: 100, label: "Thin" },
  { value: 200, label: "Extra Light" },
  { value: 300, label: "Light" },
  { value: 400, label: "Regular" },
  { value: 500, label: "Medium" },
  { value: 600, label: "Semi Bold" },
  { value: 700, label: "Bold" },
  { value: 800, label: "Extra Bold" },
  { value: 900, label: "Black" },
]

export const TypographySection = ({ typography, onChange }: TypographySectionProps) => {
  const update = (updates: Partial<typeof typography>) => {
    onChange({ ...typography, ...updates })
  }

  return (
    <div className="space-y-2">
      {/* Font Family */}
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-xs text-muted-foreground shrink-0 w-12">Font</span>
        <select
          value={typography.fontFamily}
          onChange={(e) => update({ fontFamily: e.target.value })}
          className="input-figma flex-1 min-w-0"
        >
          <option value="Inter">Inter</option>
          <option value="Roboto">Roboto</option>
          <option value="Open Sans">Open Sans</option>
          <option value="Montserrat">Montserrat</option>
          <option value="Poppins">Poppins</option>
          <option value="SF Pro">SF Pro</option>
        </select>
      </div>

      {/* Font Weight */}
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-xs text-muted-foreground shrink-0 w-12">Weight</span>
        <select
          value={typography.fontWeight}
          onChange={(e) => update({ fontWeight: Number(e.target.value) })}
          className="input-figma flex-1 min-w-0"
        >
          {fontWeights.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Font Size & Line Height */}
      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center gap-1 min-w-0">
          <span className="text-xs text-muted-foreground shrink-0 w-7">Size</span>
          <input
            type="number"
            min={1}
            value={typography.fontSize}
            onChange={(e) => update({ fontSize: Number(e.target.value) })}
            className="input-figma flex-1 min-w-0"
          />
        </div>
        <div className="flex items-center gap-1 min-w-0">
          <span className="text-xs text-muted-foreground shrink-0 w-7">Line</span>
          <input
            type="number"
            step={0.1}
            min={0.5}
            value={typography.lineHeight}
            onChange={(e) => update({ lineHeight: Number(e.target.value) })}
            className="input-figma flex-1 min-w-0"
          />
        </div>
      </div>

      {/* Letter Spacing */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-muted-foreground shrink-0">Spacing</span>
        <input
          type="range"
          min={-5}
          max={10}
          step={0.1}
          value={typography.letterSpacing}
          onChange={(e) => update({ letterSpacing: Number(e.target.value) })}
          className="flex-1 min-w-[60px] h-1 bg-muted rounded-full appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 
            [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-primary 
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
        />
        <input
          type="number"
          step={0.1}
          value={typography.letterSpacing}
          onChange={(e) => update({ letterSpacing: Number(e.target.value) })}
          className="input-figma w-12 text-center shrink-0"
        />
      </div>
    </div>
  )
}
