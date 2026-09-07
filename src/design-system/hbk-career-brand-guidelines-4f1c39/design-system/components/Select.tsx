import { forwardRef, type SelectHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const select = cva(
  "hbk-focus w-full appearance-none font-body bg-background text-foreground border rounded-md pr-9 disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      size: { sm: "h-8 pl-2 text-caption", md: "h-10 pl-3 text-body", lg: "h-12 pl-4 text-body" },
      state: { default: "border-input", invalid: "border-destructive", valid: "border-success" },
    },
    defaultVariants: { size: "md", state: "default" },
  },
);

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size">,
    VariantProps<typeof select> {}

/** Native single-choice dropdown. */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, size, state, children, ...props },
  ref,
) {
  return (
    <span className="relative block w-full">
      <select
        ref={ref}
        aria-invalid={state === "invalid" || undefined}
        className={cn(select({ size, state }), className)}
        {...props}
      >
        {children}
      </select>
      <span
        aria-hidden
        className="pointer-events-none absolute right-3 top-1/2 size-2 -translate-y-2/3 rotate-135 border-b-2 border-r-2 border-muted-foreground"
      />
    </span>
  );
});
