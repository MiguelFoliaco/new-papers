"use client"

import { RiAddLine, RiDeleteBinLine, RiEyeLine, RiEyeOffLine } from "react-icons/ri"
import { useState } from "react"

interface Effect {
  type: "shadow" | "blur"
  values: Record<string, number>
}

interface EffectsSectionProps {
  effects: Effect[]
  onChange: (effects: Effect[]) => void
}

export const EffectsSection = ({ effects, onChange }: EffectsSectionProps) => {
  const [hiddenEffects, setHiddenEffects] = useState<Set<number>>(new Set())

  const addShadow = () => {
    onChange([
      ...effects,
      {
        type: "shadow",
        values: { x: 0, y: 4, blur: 8, spread: 0, opacity: 25 },
      },
    ])
  }

  const addBlur = () => {
    onChange([
      ...effects,
      {
        type: "blur",
        values: { radius: 8 },
      },
    ])
  }

  const removeEffect = (index: number) => {
    onChange(effects.filter((_, i) => i !== index))
  }

  const updateEffect = (index: number, values: Record<string, number>) => {
    onChange(
      effects.map((effect, i) => (i === index ? { ...effect, values: { ...effect.values, ...values } } : effect)),
    )
  }

  const toggleEffectVisibility = (index: number) => {
    const newHidden = new Set(hiddenEffects)
    if (newHidden.has(index)) {
      newHidden.delete(index)
    } else {
      newHidden.add(index)
    }
    setHiddenEffects(newHidden)
  }

  return (
    <div className="space-y-3">
      {effects.map((effect, index) => (
        <div key={index} className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-foreground capitalize truncate">
              {effect.type === "shadow" ? "Drop Shadow" : "Layer Blur"}
            </span>
            <div className="flex items-center gap-1 shrink-0">
              <button onClick={() => toggleEffectVisibility(index)} className="btn-figma">
                {hiddenEffects.has(index) ? <RiEyeOffLine size={12} /> : <RiEyeLine size={12} />}
              </button>
              <button onClick={() => removeEffect(index)} className="btn-figma text-destructive hover:text-destructive">
                <RiDeleteBinLine size={12} />
              </button>
            </div>
          </div>

          {effect.type === "shadow" && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-muted-foreground mb-0.5">X</span>
                <input
                  type="number"
                  value={effect.values.x}
                  onChange={(e) => updateEffect(index, { x: Number(e.target.value) })}
                  className="input-figma text-center min-w-0"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-muted-foreground mb-0.5">Y</span>
                <input
                  type="number"
                  value={effect.values.y}
                  onChange={(e) => updateEffect(index, { y: Number(e.target.value) })}
                  className="input-figma text-center min-w-0"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-muted-foreground mb-0.5">Blur</span>
                <input
                  type="number"
                  value={effect.values.blur}
                  min={0}
                  onChange={(e) => updateEffect(index, { blur: Number(e.target.value) })}
                  className="input-figma text-center min-w-0"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-muted-foreground mb-0.5">Spread</span>
                <input
                  type="number"
                  value={effect.values.spread}
                  onChange={(e) => updateEffect(index, { spread: Number(e.target.value) })}
                  className="input-figma text-center min-w-0"
                />
              </div>
            </div>
          )}

          {effect.type === "blur" && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-muted-foreground shrink-0">Radius</span>
              <input
                type="range"
                min={0}
                max={50}
                value={effect.values.radius}
                onChange={(e) => updateEffect(index, { radius: Number(e.target.value) })}
                className="flex-1 min-w-[60px] h-1 bg-muted rounded-full appearance-none cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 
                  [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-primary 
                  [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
              />
              <input
                type="number"
                min={0}
                value={effect.values.radius}
                onChange={(e) => updateEffect(index, { radius: Number(e.target.value) })}
                className="input-figma w-12 text-center shrink-0"
              />
            </div>
          )}
        </div>
      ))}

      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={addShadow}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <RiAddLine size={12} />
          <span>Shadow</span>
        </button>
        <span className="text-muted-foreground">|</span>
        <button
          onClick={addBlur}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <RiAddLine size={12} />
          <span>Blur</span>
        </button>
      </div>
    </div>
  )
}
