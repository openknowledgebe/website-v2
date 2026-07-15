import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const cardVariants = cva("overflow-hidden rounded-card", {
  variants: {
    variant: {
      default: "border border-scheme-border bg-scheme-foreground text-scheme-text",
      transparent: "border border-white bg-transparent text-white",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

function Card({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof cardVariants>) {
  return (
    <div
      data-slot="card"
      className={cn(
        cardVariants({
          variant,
          className,
        }),
      )}
      {...props}
    />
  );
}

function BackgroundCard({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="bg-card" className={cn("overflow-hidden rounded-card", className)} {...props} />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("flex flex-col gap-1.5 p-6 pb-0", className)}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="card-title" className={cn("leading-none font-semibold", className)} {...props} />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="card-description" className={cn("text-sm text-neutral", className)} {...props} />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-content" className={cn("p-6 pb-0", className)} {...props} />;
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="card-footer" className={cn("flex items-center p-6", className)} {...props} />
  );
}

export { Card, BackgroundCard, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
