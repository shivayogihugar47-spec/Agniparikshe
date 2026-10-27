import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
  {
    variants: {
      variant: {
        default: "bg-brand text-white",
        secondary: "bg-brand-tint text-brand border border-brand/20",
        critical: "bg-critical-tint text-critical border border-critical/20 font-semibold",
        high: "bg-high-tint text-high border border-high/20 font-semibold",
        medium: "bg-medium-tint text-medium border border-medium/20 font-semibold",
        low: "bg-low-tint text-low border border-low/20 font-semibold",
        success: "bg-success-tint text-success border border-success/20 font-semibold",
        outline: "border border-border text-text bg-surface",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
