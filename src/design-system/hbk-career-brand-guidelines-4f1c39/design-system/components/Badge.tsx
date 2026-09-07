import { forwardRef, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";
import { ArrowIcon } from "./ArrowIcon";

const badge = cva(
  "inline-flex items-center gap-1 font-body font-semibold rounded-sm border border-transparent",
  {
    variants: {
      variant: {
        neutral: "bg-muted !text-muted-foreground",
        primary: "bg-primary !text-primary-foreground",
        accent: "bg-accent !text-accent-foreground",
        highlight: "bg-highlight !text-highlight-foreground",
        success: "bg-success !text-success-foreground",
        warning: "bg-warning !text-warning-foreground",
        info: "bg-info !text-info-foreground",
        outline: "border-border !text-foreground",
      },
      size: {
        sm: "h-5 px-2 text-overline uppercase tracking-[0.14em]",
        md: "h-6 px-2 text-caption",
      },
    },
    defaultVariants: { variant: "neutral", size: "md" },
  },
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badge> {
  /** Prefix the label with the brand arrow. */
  withArrow?: boolean;
}

/** Compact label for statuses, programme categories and tags. */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { className, variant, size, withArrow, children, ...props },
  ref,
) {
  return (
    <span ref={ref} className={cn(badge({ variant, size }), className)} {...props}>
      {withArrow && <ArrowIcon size={12} weight="bold" />}
      {children}
    </span>
  );
});
