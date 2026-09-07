import { forwardRef, type LabelHTMLAttributes } from "react";
import { cn } from "../lib/cn";

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  /** Mark the associated field as required. */
  required?: boolean;
}

/** Form field label. Always wire `htmlFor` to the field's id. */
export const Label = forwardRef<HTMLLabelElement, LabelProps>(function Label(
  { className, required, children, ...props },
  ref,
) {
  return (
    <label
      ref={ref}
      className={cn("font-body text-caption font-semibold text-foreground", className)}
      {...props}
    >
      {children}
      {required && (
        <span className="text-destructive" aria-hidden>
          {" *"}
        </span>
      )}
    </label>
  );
});
