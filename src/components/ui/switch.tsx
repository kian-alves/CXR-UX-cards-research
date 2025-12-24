import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const switchVariants = cva(
  [
    "peer inline-flex shrink-0 cursor-pointer items-center rounded-full",
    "border-2 border-transparent shadow-sm transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wex-switch-focus-ring",
    "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:cursor-not-allowed disabled:opacity-[var(--wex-component-switch-disabled-opacity)]",
    "data-[state=checked]:bg-wex-switch-checked-bg data-[state=unchecked]:bg-wex-switch-bg",
  ],
  {
    variants: {
      switchSize: {
        sm: "h-5 w-9",
        md: "h-6 w-11",
        lg: "h-7 w-14",
      },
    },
    defaultVariants: {
      switchSize: "md",
    },
  }
)

const thumbVariants = cva(
  [
    "pointer-events-none block rounded-full bg-wex-switch-thumb shadow-lg ring-0 transition-transform",
  ],
  {
    variants: {
      switchSize: {
        sm: "h-4 w-4 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
        md: "h-5 w-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
        lg: "h-6 w-6 data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0",
      },
    },
    defaultVariants: {
      switchSize: "md",
    },
  }
)

export interface SwitchProps
  extends Omit<React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>, "size">,
    VariantProps<typeof switchVariants> {}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, switchSize, "aria-label": ariaLabel = "Toggle", ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(switchVariants({ switchSize }), className)}
    aria-label={ariaLabel}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb className={thumbVariants({ switchSize })} />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch, switchVariants }
