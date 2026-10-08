import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

export function Input({ className, ...props }: ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-md border border-kia-line bg-white px-3 text-sm text-kia-black outline-none transition placeholder:text-kia-placeholder focus:border-kia-navy focus:ring-2 focus:ring-kia-navy/15",
        className,
      )}
      {...props}
    />
  )
}
