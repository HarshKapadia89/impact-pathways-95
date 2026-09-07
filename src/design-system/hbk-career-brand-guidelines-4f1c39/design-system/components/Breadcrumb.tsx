import { cn } from "../lib/cn";
import { ArrowIcon } from "./ArrowIcon";

export interface BreadcrumbItem {
  /** Visible text. */
  label: string;
  /** Destination; omit on the current page. */
  href?: string;
}

export interface BreadcrumbProps {
  /** Trail from root to current page. */
  items: BreadcrumbItem[];
  className?: string;
}

/** Shows where the current page sits in the site hierarchy. */
export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("font-body text-caption", className)}>
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-2">
              {item.href && !last ? (
                <a
                  href={item.href}
                  className="hbk-focus text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                >
                  {item.label}
                </a>
              ) : (
                <span aria-current={last ? "page" : undefined} className="font-semibold">
                  {item.label}
                </span>
              )}
              {!last && <ArrowIcon size={12} direction="right" className="text-muted-foreground" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
