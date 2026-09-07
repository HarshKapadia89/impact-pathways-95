import { forwardRef, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const avatar = cva(
  "inline-flex items-center justify-center overflow-hidden rounded-xl bg-highlight text-highlight-foreground font-body font-semibold shrink-0",
  {
    variants: {
      size: {
        sm: "size-8 text-caption",
        md: "size-10 text-body",
        lg: "size-14 text-subheading",
      },
    },
    defaultVariants: { size: "md" },
  },
);

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof avatar> {
  /** Person's full name — used for initials and the image alt text. */
  name: string;
  /** Optional photo URL. Falls back to initials. */
  src?: string;
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join("");
}

/** Student or counsellor identity mark. */
export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { className, size, name, src, ...props },
  ref,
) {
  return (
    <span ref={ref} className={cn(avatar({ size }), className)} {...props}>
      {src ? (
        <img src={src} alt={name} className="size-full object-cover" />
      ) : (
        <span aria-hidden>{initials(name)}</span>
      )}
      {!src && <span className="sr-only">{name}</span>}
    </span>
  );
});
