import { useState, type ReactNode } from "react";
import { cn } from "../lib/cn";
import { ArrowIcon } from "./ArrowIcon";

export interface AccordionItem {
  /** Stable value identifying the item. */
  value: string;
  /** Visible trigger text. */
  title: string;
  /** Revealed content. */
  content: ReactNode;
}

export interface AccordionProps {
  /** The collapsible items. */
  items: AccordionItem[];
  /** Allow more than one item open at a time. */
  multiple?: boolean;
  /** Values open on first render. */
  defaultOpen?: string[];
  className?: string;
}

/** Progressive disclosure list, typically for FAQs. */
export function Accordion({ items, multiple, defaultOpen = [], className }: AccordionProps) {
  const [open, setOpen] = useState<string[]>(defaultOpen);

  const toggle = (value: string) => {
    setOpen((current) =>
      current.includes(value)
        ? current.filter((v) => v !== value)
        : multiple
          ? [...current, value]
          : [value],
    );
  };

  return (
    <div className={cn("divide-y divide-border border-y border-border", className)}>
      {items.map((item) => {
        const isOpen = open.includes(item.value);
        return (
          <div key={item.value}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => toggle(item.value)}
                className="hbk-focus flex w-full items-center justify-between gap-4 py-4 text-left font-display text-subheading font-semibold"
              >
                {item.title}
                <ArrowIcon
                  size={18}
                  direction={isOpen ? "down-right" : "up-right"}
                  className="text-primary transition-transform"
                />
              </button>
            </h3>
            {isOpen && (
              <div className="pb-4 font-body text-body text-muted-foreground">{item.content}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
