import { type ReactNode } from "react";
import { cn } from "../lib/cn";
import { ArrowIcon } from "./ArrowIcon";

export interface HeroProps {
  /** Small line above the headline. */
  eyebrow?: string;
  /** Main headline, set in the display serif. */
  title: string;
  /** Supporting sentence under the headline. */
  subtitle?: string;
  /** Buttons or links. */
  actions?: ReactNode;
  /** Background treatment. */
  tone?: "paper" | "brand" | "ink" | "accent";
  /** Show the oversized arrow motif. */
  withArrowMotif?: boolean;
  className?: string;
}

/** Campaign-scale opening block for career pages. */
export function Hero({
  eyebrow,
  title,
  subtitle,
  actions,
  tone = "paper",
  withArrowMotif = true,
  className,
}: HeroProps) {
  const tones = {
    paper: "bg-surface text-surface-foreground",
    brand: "bg-highlight text-highlight-foreground",
    ink: "bg-foreground text-background",
    accent: "bg-accent text-accent-foreground",
  };

  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-xl px-6 py-12 sm:px-12 sm:py-16",
        tones[tone],
        className,
      )}
    >
      {withArrowMotif && (
        <ArrowIcon
          size={280}
          weight="bold"
          className="pointer-events-none absolute -right-16 -top-16 opacity-10"
        />
      )}
      <div className="relative flex max-w-2xl flex-col gap-4">
        {eyebrow && (
          <p className="font-body text-overline uppercase tracking-[0.14em] opacity-80">{eyebrow}</p>
        )}
        <h1 className="font-display text-title font-semibold sm:text-display">{title}</h1>
        {subtitle && <p className="font-body text-subheading opacity-85">{subtitle}</p>}
        {actions && <div className="mt-4 flex flex-wrap gap-3">{actions}</div>}
      </div>
    </section>
  );
}
