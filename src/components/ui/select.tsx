import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown } from "lucide-react"
import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

export const Select = SelectPrimitive.Root
export const SelectValue = SelectPrimitive.Value

export function SelectTrigger({
  className,
  children,
  ...props
}: ComponentProps<typeof SelectPrimitive.Trigger>) {
  return (
    <SelectPrimitive.Trigger
      className={cn(
        "flex h-11 w-full items-center justify-between gap-2 rounded-md border border-kia-line bg-white px-3 text-left text-sm text-kia-black outline-none transition focus:border-kia-navy focus:ring-2 focus:ring-kia-navy/15 disabled:cursor-not-allowed disabled:bg-[#f7f7f7] disabled:text-kia-placeholder data-placeholder:text-kia-placeholder",
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="size-4 shrink-0 text-kia-muted" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

export function SelectContent({
  className,
  children,
  ...props
}: ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        position="popper"
        sideOffset={6}
        className={cn(
          "z-50 max-h-72 w-[var(--radix-select-trigger-width)] overflow-hidden rounded-md border border-kia-line bg-white shadow-lg",
          className,
        )}
        {...props}
      >
        <SelectPrimitive.Viewport className="p-1">{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

export function SelectItem({
  className,
  children,
  ...props
}: ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      className={cn(
        "relative flex cursor-pointer items-center rounded-sm py-2 pr-8 pl-3 text-sm text-kia-black outline-none select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-highlighted:bg-[#f6f6f6]",
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="absolute right-2">
        <Check className="size-4 text-kia-navy" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}

export function DealerSelectItem({
  name,
  detail,
  ...props
}: ComponentProps<typeof SelectPrimitive.Item> & {
  name: string
  detail: string
}) {
  return (
    <SelectPrimitive.Item
      className="relative cursor-pointer rounded-sm py-2 pr-8 pl-3 text-sm text-kia-black outline-none select-none data-highlighted:bg-[#f6f6f6]"
      {...props}
    >
      <SelectPrimitive.ItemText>{name}</SelectPrimitive.ItemText>
      <span className="mt-0.5 block text-xs leading-4 text-kia-muted">{detail}</span>
      <SelectPrimitive.ItemIndicator className="absolute top-2.5 right-2">
        <Check className="size-4 text-kia-navy" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}
