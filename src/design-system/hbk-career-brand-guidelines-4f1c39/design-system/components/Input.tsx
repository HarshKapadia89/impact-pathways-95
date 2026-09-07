import { forwardRef, type InputHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const input = cva(
  "hbk-focus w-full font-body bg-background text-foreground border rounded-md placeholder:text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      size: { sm: "h-8 px-2 text-caption", md: "h-10 px-3 text-body", lg: "h-12 px-4 text-body" },
      state: { default: "border-input", invalid: "border-destructive", valid: "border-success" },
    },
    defaultVariants: { size: "md", state: "default" },
  },
);

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof input> {}

/** Single-line text field. */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, size, state, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      aria-invalid={state === "invalid" || undefined}
      className={cn(input({ size, state }), className)}
      {...props}
    />
  );
});
