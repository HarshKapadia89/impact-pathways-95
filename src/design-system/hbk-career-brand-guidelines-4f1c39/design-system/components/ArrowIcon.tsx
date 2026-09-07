import { forwardRef, type SVGProps } from "react";
import { cn } from "../lib/cn";

export type ArrowDirection = "up-right" | "right" | "up" | "down" | "down-right" | "left";

const ROTATION: Record<ArrowDirection, number> = {
  "up-right": 0,
  right: 45,
  "down-right": 90,
  down: 135,
  left: 225,
  up: 315,
};

export interface ArrowIconProps extends Omit<SVGProps<SVGSVGElement>, "children"> {
  /** Which way the arrow points. Defaults to the brand's signature up-right. */
  direction?: ArrowDirection;
  /** Pixel size of the square icon. */
  size?: number;
  /** Stroke thickness; use the heavier weight for display-scale usage. */
  weight?: "regular" | "bold";
  /** Accessible label. Omit for decorative arrows. */
  label?: string;
}

/**
 * The HBK Careers arrow — the brand's core symbol of direction and progress.
 */
export const ArrowIcon = forwardRef<SVGSVGElement, ArrowIconProps>(function ArrowIcon(
  { direction = "up-right", size = 24, weight = "regular", label, className, ...props },
  ref,
) {
  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={weight === "bold" ? 3 : 2}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? "img" : "presentation"}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn("shrink-0", className)}
      style={{ transform: `rotate(${ROTATION[direction]}deg)`, ...props.style }}
      {...props}
    >
      <path d="M6 18 18 6" />
      <path d="M9 6h9v9" />
    </svg>
  );
});
