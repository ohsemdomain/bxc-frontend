//src\components\ui\input.tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-sm border border-slate-200 px-3 hover:border-primary/50 active:bg-primary/5 focus:bg-primary/5 active:border-primary/50 focus:border-primary/50 transition duration-200 ease-in-out disabled:cursor-not-allowed focus:outline-none",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }