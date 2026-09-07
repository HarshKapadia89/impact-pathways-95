import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../lib/cn";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Text shown beside the box. Omit and use an external Label if needed. */
  label?: string;
  /** Supporting text under the label. */
  description?: string;
}

/** Multi-select control for options and consent. */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { className, label, description, id, ...props },
  ref,
) {
  const control = (
    <input
      ref={ref}
      id={id}
      type="checkbox"
      className={cn(
        "hbk-focus size-4 shrink-0 rounded-xs border border-input accent-primary disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );

  if (!label) return control;

  return (
    <span className="flex items-start gap-2">
      <span className="mt-0.5">{control}</span>
      <label htmlFor={id} className="font-body text-caption text-foreground">
        {label}
        {description && <span className="block text-muted-foreground">{description}</span>}
      </label>
    </span>
  );
});
