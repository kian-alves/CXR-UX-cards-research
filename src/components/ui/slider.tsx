import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cn } from "@/lib/utils"

export interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  /** Shows current value(s) as labels */
  showValue?: boolean
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, orientation = "horizontal", showValue, value, defaultValue, "aria-label": ariaLabel = "Slider", ...props }, ref) => {
  const isVertical = orientation === "vertical"
  const currentValue = value ?? defaultValue ?? [0]
  const thumbCount = Array.isArray(currentValue) ? currentValue.length : 1

  // Generate aria-labels for thumbs (range sliders get "min" and "max" labels)
  const getThumbLabel = (index: number): string => {
    if (thumbCount === 1) return ariaLabel
    if (thumbCount === 2) return index === 0 ? `${ariaLabel} minimum` : `${ariaLabel} maximum`
    return `${ariaLabel} value ${index + 1}`
  }

  return (
    <div className={cn("relative", isVertical && "h-full")}>
      <SliderPrimitive.Root
        ref={ref}
        orientation={orientation}
        value={value}
        defaultValue={defaultValue}
        className={cn(
          "relative flex touch-none select-none",
          isVertical
            ? "h-full w-5 flex-col items-center"
            : "w-full items-center",
          className
        )}
        {...props}
      >
        <SliderPrimitive.Track
          className={cn(
            "relative grow overflow-hidden rounded-full bg-wex-slider-track-bg",
            isVertical ? "w-2 h-full" : "h-2 w-full"
          )}
        >
          <SliderPrimitive.Range
            className={cn(
              "absolute bg-wex-slider-range-bg",
              isVertical ? "w-full" : "h-full"
            )}
          />
        </SliderPrimitive.Track>
        {Array.from({ length: thumbCount }).map((_, i) => (
          <SliderPrimitive.Thumb
            key={i}
            aria-label={getThumbLabel(i)}
            className="block h-5 w-5 rounded-full border-2 border-wex-slider-thumb-border bg-wex-slider-thumb-bg shadow transition-colors cursor-grab active:cursor-grabbing focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wex-slider-focus-ring disabled:pointer-events-none disabled:opacity-[var(--wex-component-slider-disabled-opacity)]"
          />
        ))}
      </SliderPrimitive.Root>
      {showValue && (
        <div
          className={cn(
            "text-sm text-muted-foreground",
            isVertical ? "mt-2 text-center" : "mt-1 flex justify-between"
          )}
        >
          {Array.isArray(currentValue) ? (
            currentValue.map((v, i) => (
              <span key={i}>{v}</span>
            ))
          ) : (
            <span>{currentValue}</span>
          )}
        </div>
      )}
    </div>
  )
})
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
