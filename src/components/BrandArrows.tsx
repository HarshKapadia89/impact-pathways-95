import type { SVGProps } from "react";

/**
 * HBK four-arrow brand lockup — lime, orange, magenta and paper block arrows
 * pointing in four directions, drawn as crisp vector geometry (no blur).
 * Decorative only; place on purple (highlight) surfaces.
 */
export function BrandArrows({ size = 120, className, ...props }: SVGProps<SVGSVGElement> & { size?: number }) {
  // Chunky right-pointing block arrow inside a 100x100 cell; rotated per direction.
  const arrow = "M10 42 H52 V26 L90 50 L52 74 V58 H10 Z";
  const cell = (x: number, y: number, rotate: number, fill: string) => (
    <g transform={`translate(${x} ${y})`}>
      <path d={arrow} fill={fill} transform={`rotate(${rotate} 50 50)`} />
    </g>
  );
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 212 212"
      role="presentation"
      aria-hidden="true"
      className={className}
      {...props}
    >
      {cell(0, 0, -135, "var(--hbk-orange)")} {/* up-left */}
      {cell(112, 0, -45, "var(--hbk-paper)")} {/* up-right */}
      {cell(0, 112, 135, "var(--hbk-lime)")} {/* down-left */}
      {cell(112, 112, 45, "var(--hbk-magenta)")} {/* down-right */}
    </svg>
  );
}
