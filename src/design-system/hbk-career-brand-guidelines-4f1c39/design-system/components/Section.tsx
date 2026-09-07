import { type ReactNode } from "react";
import { cn } from "../lib/cn";

export interface SectionProps {
  /** Small line above the heading. */
  eyebrow?: string;
  /** Section heading. */
  title?: string;
  /** Supporting sentence under the heading. */
  description?: string;
  /** Section body. */
  children?: ReactNode;
  /** Vertical rhythm of the section. */
  spacing?: "sm" | "md" | "lg";
  className?: string;
}

/** Page section with consistent heading block and vertical rhythm. */
export function Section({
  eyebrow,
  title,
  description,
  children,
  spacing = "md",
  className,
}: SectionProps) {
  const pad = { sm: "py-6", md: "py-10", lg: "py-16" }[spacing];

  return (
    <section className={cn("flex flex-col gap-6", pad, className)}>
      {(eyebrow || title || description) && (
        <header className="flex max-w-2xl flex-col gap-2">
          {eyebrow && (
            <p className="font-body text-overline uppercase tracking-[0.14em] text-primary">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="font-display text-title font-semibold text-foreground">{title}</h2>
          )}
          {description && (
            <p className="font-body text-body text-muted-foreground">{description}</p>
          )}
        </header>
      )}
      {children}
    </section>
  );
}
