import { cn } from "../lib/cn";

export interface DividerProps {
  /** Layout direction of the rule. */
  orientation?: "horizontal" | "vertical";
  /** Optional centred label. Horizontal only. */
  label?: string;
  /** Emphasis of the rule. */
  tone?: "subtle" | "strong" | "brand";
  className?: string;
}

/** Rule that separates sections of content. */
export function Divider({
  orientation = "horizontal",
  label,
  tone = "subtle",
  className,
}: DividerProps) {
  const color =
    tone === "brand" ? "bg-primary" : tone === "strong" ? "bg-foreground" : "bg-border";

  if (orientation === "vertical") {
    return <span role="separator" aria-orientation="vertical" className={cn("w-px self-stretch", color, className)} />;
  }

  if (!label) {
    return <hr className={cn("h-px border-0", color, className)} />;
  }

  return (
    <div className={cn("flex items-center gap-4", className)}>
      <span className={cn("h-px flex-1", color)} />
      <span className="font-body text-overline uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </span>
      <span className={cn("h-px flex-1", color)} />
    </div>
  );
}
