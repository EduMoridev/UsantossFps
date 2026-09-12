"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverAnchor = PopoverPrimitive.Anchor;

export function PopoverContent({
  className,
  align = "start",
  sideOffset = 6,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "dropdown-anim glass-strong z-50 max-h-72 overflow-auto rounded-lg p-1 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] outline-none",
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}
