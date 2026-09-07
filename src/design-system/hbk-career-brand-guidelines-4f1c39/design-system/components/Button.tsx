import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";
import { ArrowIcon } from "./ArrowIcon";

const button = cva(
  "hbk-focus inline-flex items-center justify-center gap-2 font-body font-semibold whitespace-nowrap transition-[background-color,color,border-color,box-shadow] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground rounded-md hover:brightness-95 active:brightness-90",
        accent:
          "bg-accent text-accent-foreground rounded-md hover:brightness-95 active:brightness-90",
        highlight:
          "bg-highlight text-highlight-foreground rounded-md hover:brightness-110 active:brightness-95",
        outline:
          "border border-border bg-transparent text-foreground rounded-md hover:bg-muted",
        ghost: "bg-transparent text-foreground rounded-md hover:bg-muted",
        link: "bg-transparent text-highlight underline underline-offset-4 hover:opacity-80",
        destructive:
          "bg-destructive text-destructive-foreground rounded-md hover:brightness-95",
      },
      size: {
        sm: "h-8 px-3 text-caption",
        md: "h-10 px-4 text-body",
        lg: "h-12 px-6 text-subheading",
      },
      fullWidth: { true: "w-full", false: "" },
    },
    defaultVariants: { variant: "primary", size: "md", fullWidth: false },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  /** Append the brand arrow after the label — use for forward-moving actions. */
  withArrow?: boolean;
  /** Show a spinner and block interaction. */
  loading?: boolean;
}

/** The primary action control of the HBK Careers system. */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, fullWidth, withArrow, loading, children, disabled, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(button({ variant, size, fullWidth }), className)}
      {...props}
    >
      {loading && (
        <span
          aria-hidden
          className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      )}
      {children}
      {withArrow && !loading && <ArrowIcon size={size === "sm" ? 14 : 16} />}
    </button>
  );
});
