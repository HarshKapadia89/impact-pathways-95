import { forwardRef, type HTMLAttributes } from "react";
import colorLogo from "../assets/logos/hbk-careers-color.png";
import purpleLogo from "../assets/logos/hbk-careers-purple.png";
import whiteLogo from "../assets/logos/hbk-careers-white.png";
import { cn } from "../lib/cn";

export interface LogotypeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Lockup scale. */
  size?: "sm" | "md" | "lg";
  /** Colour treatment. */
  tone?: "brand" | "mono" | "inverse" | "purple";
}

/**
 * Official HBK Careers logo lockup. The brand treatment automatically swaps
 * to the white-on-black artwork in dark mode.
 */
export const Logotype = forwardRef<HTMLSpanElement, LogotypeProps>(function Logotype(
  { size = "md", tone = "brand", className, ...props },
  ref,
) {
  const dimensions = {
    sm: "h-6 w-24",
    md: "h-9 w-36",
    lg: "h-14 w-56",
  }[size];

  const imageClass = cn("block h-full w-full object-contain", dimensions);

  return (
    <span ref={ref} className={cn("inline-flex shrink-0", className)} {...props}>
      {tone === "brand" ? (
        <>
          <span className="sr-only">HBK Careers</span>
          <img src={colorLogo} alt="" aria-hidden="true" className={cn(imageClass, "dark:hidden")} />
          <img src={whiteLogo} alt="" aria-hidden="true" className={cn(imageClass, "hidden dark:block")} />
        </>
      ) : (
        <img
          src={tone === "purple" ? purpleLogo : tone === "inverse" ? whiteLogo : colorLogo}
          alt="HBK Careers"
          className={imageClass}
        />
      )}
    </span>
  );
});
