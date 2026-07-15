import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex size-full min-h-11 bg-white px-3 py-2 text-medium text-neutral-darkest",
        "rounded-form border border-scheme-border align-middle",
        "placeholder:text-neutral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
