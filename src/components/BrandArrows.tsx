import type { SVGProps } from "react";

/**
 * HBK four-arrow brand lockup — FIXED artwork.
 *
 * Order, directions and colours are locked to the brand reference and must never
 * be reordered, rotated, mirrored or recoloured:
 *   1. paper (pale)  up-right
 *   2. magenta       down-right
 *   3. orange        up-left
 *   4. lime          down-left
 *
 * Decorative only; place on purple (highlight) surfaces.
 */
type BrandArrowsProps = Omit<SVGProps<SVGSVGElement>, "children" | "fill" | "transform" | "viewBox"> & {
  /** Rendered width in px; height follows the fixed 4:1 ratio. */
  width?: number;
};

// Diagonal arrow (square shaft + solid triangular head) pointing up-right in a 100x100 cell.
const ARROW_UP_RIGHT =
  "M30 78 L62 46 L44 46 L44 30 L78 30 L78 64 L62 64 L62 46 L30 78 Z M22 70 L54 38 L62 46 L30 78 Z";

const LOCKUP = [
  { x: 0, rotate: 0, fill: "var(--hbk-paper)" }, // up-right
  { x: 106, rotate: 90, fill: "var(--hbk-magenta)" }, // down-right
  { x: 212, rotate: 270, fill: "var(--hbk-orange)" }, // up-left
  { x: 318, rotate: 180, fill: "var(--hbk-lime)" }, // down-left
] as const;

export function BrandArrows({ width = 320, className, ...props }: BrandArrowsProps) {
  return (
    <svg
      width={width}
      height={width / 4}
      viewBox="0 0 424 106"
      role="presentation"
      aria-hidden="true"
      className={className}
      {...props}
    >
      {LOCKUP.map((a) => (
        <g key={a.x} transform={`translate(${a.x} 3)`}>
          <path d={ARROW_UP_RIGHT} fill={a.fill} transform={`rotate(${a.rotate} 50 50)`} />
        </g>
      ))}
    </svg>
  );
}
