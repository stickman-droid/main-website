import * as React from "react"
import { cn } from "@/lib/utils"

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType
}

export function Heading({ as: Component = "h1", className, ...props }: TypographyProps) {
  return (
    <Component
      className={cn("font-heading tracking-tight", className)}
      {...props}
    />
  )
}

export function Text({ as: Component = "p", className, ...props }: TypographyProps) {
  return (
    <Component
      className={cn("font-sans leading-relaxed", className)}
      {...props}
    />
  )
}

export function Mono({ as: Component = "span", className, ...props }: TypographyProps) {
  return (
    <Component
      className={cn("font-mono", className)}
      {...props}
    />
  )
}
