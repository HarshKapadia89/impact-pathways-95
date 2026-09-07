import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../lib/cn";

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Text shown beside the switch. */
  label?: string;
}

/** Toggle for settings that apply immediately. */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { className, label, id, ...props },
  ref,
) {
  const control = (
    <span className="relative inline-flex">
      <input
        ref={ref}
        id={id}
        type="checkbox"
        role="switch"
        className={cn(
          "hbk-focus peer h-6 w-10 shrink-0 cursor-pointer appearance-none rounded-xl bg-muted transition-colors checked:bg-primary disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute left-1 top-1 size-4 rounded-lg bg-background transition-transform peer-checked:translate-x-4"
      />
    </span>
  );

  if (!label) return control;

  return (
    <span className="inline-flex items-center gap-3">
      {control}
      <label htmlFor={id} className="font-body text-caption text-foreground">
        {label}
      </label>
    </span>
  );
});
