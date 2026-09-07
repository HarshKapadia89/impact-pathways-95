import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const textarea = cva(
  "hbk-focus w-full font-body bg-background text-foreground border rounded-md p-3 text-body placeholder:text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      state: { default: "border-input", invalid: "border-destructive", valid: "border-success" },
      resize: { none: "resize-none", vertical: "resize-y" },
    },
    defaultVariants: { state: "default", resize: "vertical" },
  },
);

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textarea> {}

/** Multi-line text field for longer answers and notes. */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, state, resize, rows = 4, ...props },
  ref,
) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      aria-invalid={state === "invalid" || undefined}
      className={cn(textarea({ state, resize }), className)}
      {...props}
    />
  );
});
