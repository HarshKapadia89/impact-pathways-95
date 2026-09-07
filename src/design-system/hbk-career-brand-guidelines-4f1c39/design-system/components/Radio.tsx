import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "../lib/cn";

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Text shown beside the control. */
  label?: string;
  /** Supporting text under the label. */
  description?: string;
}

/** Single-choice control. Group radios by sharing one `name`. */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { className, label, description, id, ...props },
  ref,
) {
  const control = (
    <input
      ref={ref}
      id={id}
      type="radio"
      className={cn(
        "hbk-focus size-4 shrink-0 border border-input accent-highlight disabled:opacity-50",
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

export interface RadioGroupProps {
  /** Accessible group name. */
  legend: string;
  /** Radio controls. */
  children: ReactNode;
  /** Hide the legend visually while keeping it for screen readers. */
  hideLegend?: boolean;
  className?: string;
}

/** Fieldset wrapper that names a set of radios for assistive technology. */
export function RadioGroup({ legend, children, hideLegend, className }: RadioGroupProps) {
  return (
    <fieldset className={cn("flex flex-col gap-3", className)}>
      <legend
        className={cn(
          "font-body text-caption font-semibold text-foreground",
          hideLegend && "sr-only",
        )}
      >
        {legend}
      </legend>
      {children}
    </fieldset>
  );
}
