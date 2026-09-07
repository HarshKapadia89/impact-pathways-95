import { forwardRef, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const card = cva("font-body", {
  variants: {
    variant: {
      plain: "bg-background text-foreground border border-border rounded-lg",
      surface: "bg-surface text-surface-foreground rounded-lg",
      lifted: "bg-background text-foreground rounded-lg shadow-soft border border-border",
      arrow: "bg-surface text-surface-foreground rounded-lg hbk-arrow-frame",
      highlight: "bg-highlight text-highlight-foreground rounded-lg",
    },
    padding: { none: "", sm: "p-4", md: "p-6", lg: "p-8" },
  },
  defaultVariants: { variant: "plain", padding: "md" },
});

export interface CardProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof card> {}

/** Content container. The `arrow` variant carries the brand corner motif. */
export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { className, variant, padding, ...props },
  ref,
) {
  return <div ref={ref} className={cn(card({ variant, padding }), className)} {...props} />;
});

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardHeader({ className, ...props }, ref) {
    return <div ref={ref} className={cn("mb-4 flex flex-col gap-1", className)} {...props} />;
  },
);

export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  function CardTitle({ className, ...props }, ref) {
    return (
      <h3
        ref={ref}
        className={cn("font-display text-heading font-semibold", className)}
        {...props}
      />
    );
  },
);

export const CardDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(function CardDescription({ className, ...props }, ref) {
  return <p ref={ref} className={cn("text-caption text-muted-foreground", className)} {...props} />;
});

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardFooter({ className, ...props }, ref) {
    return <div ref={ref} className={cn("mt-6 flex items-center gap-3", className)} {...props} />;
  },
);
