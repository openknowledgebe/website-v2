import * as React from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-3 rounded-button whitespace-nowrap transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border border-neutral-darkest bg-neutral-darkest text-white hover:bg-brand-600 hover:border-brand-600",
        primary:
          "border border-electric bg-electric text-white hover:bg-electric-600 hover:border-electric-600",
        alternate: "border border-white bg-white text-neutral-darkest hover:bg-white/90",
        secondary:
          "border border-scheme-border text-scheme-text hover:bg-neutral-darkest hover:text-white",
        "secondary-alt": "border border-white text-white hover:bg-white hover:text-neutral-darkest",
        link: "gap-2 text-scheme-text hover:text-electric",
        "link-alt": "gap-2 text-white",
        ghost: "hover:bg-neutral-darkest hover:text-white",
        none: "",
      },
      size: {
        default: "px-6 py-3",
        sm: "px-5 py-2",
        link: "p-0",
        icon: "size-10",
        none: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    title?: string;
  };

function Button({
  className,
  variant,
  size,
  asChild = false,
  iconLeft,
  iconRight,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {iconLeft && iconLeft}
      <Slottable>{children}</Slottable>
      {iconRight && iconRight}
    </Comp>
  );
}

export { Button, buttonVariants };
export type { ButtonProps };
