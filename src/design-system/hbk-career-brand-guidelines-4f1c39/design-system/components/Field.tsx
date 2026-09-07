import { type ReactNode } from "react";
import { cn } from "../lib/cn";
import { Label } from "./Label";

export interface FieldProps {
  /** Id of the control this field wraps. */
  htmlFor: string;
  /** Field label text. */
  label: string;
  /** Helper text shown below the control. */
  hint?: string;
  /** Error message; replaces the hint and colours it as an error. */
  error?: string;
  /** Mark the field as required. */
  required?: boolean;
  /** The control itself. */
  children: ReactNode;
  className?: string;
}

/** Label + control + hint/error layout for consistent form rhythm. */
export function Field({
  htmlFor,
  label,
  hint,
  error,
  required,
  children,
  className,
}: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={htmlFor} required={required}>
        {label}
      </Label>
      {children}
      {(error || hint) && (
        <p
          className={cn(
            "font-body text-caption",
            error ? "text-destructive" : "text-muted-foreground",
          )}
        >
          {error ?? hint}
        </p>
      )}
    </div>
  );
}
