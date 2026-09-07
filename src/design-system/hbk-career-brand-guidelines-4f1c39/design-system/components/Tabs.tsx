import { useId, useState, type ReactNode } from "react";
import { cn } from "../lib/cn";

export interface TabItem {
  /** Stable value identifying the tab. */
  value: string;
  /** Visible tab label. */
  label: string;
  /** Panel content. */
  content: ReactNode;
  /** Disable selection. */
  disabled?: boolean;
}

export interface TabsProps {
  /** The tabs to render. */
  items: TabItem[];
  /** Value selected on first render. Defaults to the first item. */
  defaultValue?: string;
  /** Called when the selection changes. */
  onValueChange?: (value: string) => void;
  className?: string;
}

/** Keyboard-navigable tab set for grouping related content. */
export function Tabs({ items, defaultValue, onValueChange, className }: TabsProps) {
  const base = useId();
  const [active, setActive] = useState(defaultValue ?? items[0]?.value ?? "");
  const enabled = items.filter((i) => !i.disabled);

  const select = (value: string) => {
    setActive(value);
    onValueChange?.(value);
  };

  const move = (delta: number) => {
    const index = enabled.findIndex((i) => i.value === active);
    const next = enabled[(index + delta + enabled.length) % enabled.length];
    if (next) select(next.value);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div role="tablist" className="flex gap-1 border-b border-border">
        {items.map((item) => {
          const selected = item.value === active;
          return (
            <button
              key={item.value}
              type="button"
              role="tab"
              id={`${base}-tab-${item.value}`}
              aria-selected={selected}
              aria-controls={`${base}-panel-${item.value}`}
              tabIndex={selected ? 0 : -1}
              disabled={item.disabled}
              onClick={() => select(item.value)}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight") move(1);
                if (event.key === "ArrowLeft") move(-1);
              }}
              className={cn(
                "hbk-focus -mb-px px-4 py-2 font-body text-caption font-semibold border-b-2 disabled:opacity-50",
                selected
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {items.map((item) => (
        <div
          key={item.value}
          role="tabpanel"
          id={`${base}-panel-${item.value}`}
          aria-labelledby={`${base}-tab-${item.value}`}
          hidden={item.value !== active}
          className="font-body text-body"
        >
          {item.value === active && item.content}
        </div>
      ))}
    </div>
  );
}
