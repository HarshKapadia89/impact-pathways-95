import { type ReactNode } from "react";
import { cn } from "../lib/cn";
import { ArrowIcon } from "./ArrowIcon";

export interface CalloutProps {
  /** Emphasis treatment. */
  variant?: "quote" | "brand" | "accent";
  /** Attribution line for quotes. */
  attribution?: string;
  /** The quoted or highlighted text. */
  children: ReactNode;
  className?: string;
}

/** Pull-quote or highlighted statement for campaign and guidance copy. */
export function Callout({ variant = "quote", attribution, children, className }: CalloutProps) {
  const tone = {
    quote: "border-l-4 border-primary bg-surface text-surface-foreground",
    brand: "bg-highlight text-highlight-foreground",
    accent: "bg-accent text-accent-foreground",
  }[variant];

  return (
    <figure className={cn("rounded-lg p-6", tone, className)}>
      <ArrowIcon size={20} weight="bold" className="mb-3 opacity-70" />
      <blockquote className="font-display text-heading leading-snug">{children}</blockquote>
      {attribution && (
        <figcaption className="mt-4 font-body text-caption opacity-80">{attribution}</figcaption>
      )}
    </figure>
  );
}
