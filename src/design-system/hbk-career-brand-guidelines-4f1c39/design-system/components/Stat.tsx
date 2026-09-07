import { cn } from "../lib/cn";
import { ArrowIcon } from "./ArrowIcon";

export interface StatProps {
  /** Short description of what is measured. */
  label: string;
  /** The headline figure. */
  value: string;
  /** Optional change note, e.g. "+12% this term". */
  change?: string;
  /** Direction the change moves in; drives colour and arrow. */
  trend?: "up" | "down" | "flat";
  className?: string;
}

/** Single headline figure with an optional trend note. */
export function Stat({ label, value, change, trend = "up", className }: StatProps) {
  const tone =
    trend === "down" ? "text-destructive" : trend === "flat" ? "text-muted-foreground" : "text-success";

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <p className="font-body text-overline uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </p>
      <p className="font-display text-title font-semibold text-foreground">{value}</p>
      {change && (
        <p className={cn("flex items-center gap-1 font-body text-caption", tone)}>
          <ArrowIcon size={14} direction={trend === "down" ? "down-right" : "up-right"} />
          {change}
        </p>
      )}
    </div>
  );
}
