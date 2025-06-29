"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import clsx from "clsx";
import { cn } from "@/lib/utils";

function Progress({
  className,
  value,
  indicatorColor,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={clsx(" h-full w-full flex-1 transition-all`", {
          "bg-[#1CB385]": indicatorColor === "green",
          "bg-[#FF5252]": indicatorColor === "red",
          "bg-[#43FFC7]": indicatorColor === "green2",
          "bg-orange-400": indicatorColor === "orange",
          "bg-blue-400": indicatorColor === "blue",
        })}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
