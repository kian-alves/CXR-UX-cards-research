"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  /** Indeterminate loading state - shows infinite animation */
  indeterminate?: boolean
  /** Show percentage label */
  showLabel?: boolean
  /** Custom label format function */
  labelFormat?: (value: number) => string
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, indeterminate, showLabel, labelFormat, "aria-label": ariaLabel = "Progress", ...props }, ref) => {
  const displayValue = value ?? 0
  const label = labelFormat ? labelFormat(displayValue) : `${displayValue}%`

  return (
    <div className="relative">
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          "relative h-3 w-full overflow-hidden rounded-full bg-wex-progress-track-bg",
          className
        )}
        value={indeterminate ? undefined : value}
        aria-label={ariaLabel}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn(
            "h-full bg-wex-progress-indicator-bg transition-all",
            indeterminate
              ? "w-1/3 animate-progress-indeterminate"
              : "w-full flex-1"
          )}
          style={
            indeterminate
              ? undefined
              : { transform: `translateX(-${100 - displayValue}%)` }
          }
        />
      </ProgressPrimitive.Root>
      {showLabel && !indeterminate && (
        <span className="absolute right-0 top-1/2 -translate-y-1/2 text-xs text-muted-foreground ml-2 -mr-10">
          {label}
        </span>
      )}
    </div>
  )
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
