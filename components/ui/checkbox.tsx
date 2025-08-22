"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox@1.1.4";
import { CheckIcon } from "lucide-react@0.487.0";

import { cn } from "./utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    data-slot="checkbox"
    className={cn(
      "peer size-4 shrink-0 rounded-[4px] border border-border bg-card shadow-xs transition-all duration-200 outline-none",
      "hover:border-chart-1/50 hover:shadow-sm",
      "focus-visible:border-chart-1 focus-visible:ring-2 focus-visible:ring-chart-1/20",
      "data-[state=checked]:bg-chart-1 data-[state=checked]:text-white data-[state=checked]:border-chart-1",
      "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-border disabled:hover:shadow-xs",
      "aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      data-slot="checkbox-indicator"
      className="flex items-center justify-center text-current transition-all duration-200"
    >
      <CheckIcon className="size-3.5" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };