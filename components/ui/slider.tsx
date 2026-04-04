"use client"

import * as React from "react"
import { Slider as BaseSlider } from "@base-ui/react/slider"
import { cn } from "@/lib/utils"

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: BaseSlider.Root.Props) {
  const _values = React.useMemo(() => {
    if (Array.isArray(value)) return value;
    if (Array.isArray(defaultValue)) return defaultValue;
    return [value ?? defaultValue ?? min];
  }, [value, defaultValue, min]);

  return (
    <BaseSlider.Root
      className={cn("relative flex w-full touch-none select-none items-center", className)}
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      {...props}
    >
      <BaseSlider.Control className="relative flex w-full touch-none items-center select-none h-1.5">
        <BaseSlider.Track
          data-slot="slider-track"
          className="relative h-1.5 grow overflow-hidden rounded-full bg-zinc-100 select-none w-full"
        >
          <BaseSlider.Indicator
            data-slot="slider-range"
            className="absolute h-full bg-zinc-900 select-none"
          />
        </BaseSlider.Track>
        {_values.map((_, index) => (
          <BaseSlider.Thumb
            key={index}
            data-slot="slider-thumb"
            className="block h-5 w-5 rounded-full border-2 border-zinc-900 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50"
          />
        ))}
      </BaseSlider.Control>
    </BaseSlider.Root>
  )
}

export { Slider }

