import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";
import { ArrowIcon } from "./ArrowIcon";

const alert = cva("font-body rounded-md border p-4 flex gap-3", {
  variants: {
    variant: {
      info: "border-info/40 bg-info/10 text-foreground",
      success: "border-success/40 bg-success/10 text-foreground",
      warning: "border-warning/50 bg-warning/15 text-foreground",
      danger: "border-destructive/40 bg-destructive/10 text-foreground",
      neutral: "border-border bg-muted text-foreground",
    },
  },
  defaultVariants: { variant: "info" },
});

export interface AlertProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof alert> {
  /** Bold leading line. */
  title?: string;
  /** Optional custom leading icon; defaults to the brand arrow. */
  icon?: ReactNode;
}

/** Inline message about the state of a task or form. */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { className, variant, title, icon, children, ...props },
  ref,
) {
  return (
    <div ref={ref} role="status" className={cn(alert({ variant }), className)} {...props}>
      <span className="mt-0.5 shrink-0">{icon ?? <ArrowIcon size={16} weight="bold" />}</span>
      <div className="flex flex-col gap-1">
        {title && <p className="font-display text-subheading font-semibold">{title}</p>}
        {children && <div className="text-caption text-muted-foreground">{children}</div>}
      </div>
    </div>
  );
});
