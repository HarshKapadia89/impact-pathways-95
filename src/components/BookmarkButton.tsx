import { useEffect, useState } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { toast } from "sonner";
import {
  getCurrentToken,
  toggleSavedCareer,
  toggleSavedCollege,
  isCareerSaved,
  isCollegeSaved,
} from "@/lib/dashboardStore";

type CareerProps = {
  kind: "career";
  stream: string;
  pathKey: string;
  title: string;
};

type CollegeProps = {
  kind: "college";
  id: string;
  name: string;
  city?: string;
  district?: string;
};

type Props = (CareerProps | CollegeProps) & {
  size?: "sm" | "md";
  variant?: "ghost" | "outline";
  label?: boolean;
};

export function BookmarkButton(props: Props) {
  const { size = "md", variant = "outline", label = true } = props;
  const [token, setToken] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const t = getCurrentToken();
    setToken(t);
    if (!t) return;
    if (props.kind === "career") setSaved(isCareerSaved(t, props.stream, props.pathKey));
    else setSaved(isCollegeSaved(t, props.id));
  }, [props]);

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!token) {
      toast.error("Take the test first to start your dashboard", {
        description: "Your shortlists save once you've generated a report.",
        action: { label: "Take test", onClick: () => (window.location.href = "/test") },
      });
      return;
    }
    let nowSaved: boolean;
    if (props.kind === "career") {
      nowSaved = toggleSavedCareer(token, {
        stream: props.stream,
        pathKey: props.pathKey,
        title: props.title,
      });
      toast.success(nowSaved ? `Saved "${props.title}"` : `Removed "${props.title}"`);
    } else {
      nowSaved = toggleSavedCollege(token, {
        id: props.id,
        name: props.name,
        city: props.city,
        district: props.district,
      });
      toast.success(nowSaved ? `Saved "${props.name}"` : `Removed "${props.name}"`);
    }
    setSaved(nowSaved);
  };

  const Icon = saved ? BookmarkCheck : Bookmark;
  const txt = saved ? "Saved" : "Save";
  const base =
    "inline-flex items-center gap-1.5 rounded-md font-medium transition select-none";
  const sizing = size === "sm" ? "px-2 py-1 text-xs" : "px-3 py-1.5 text-sm";
  const variants =
    variant === "ghost"
      ? saved
        ? "text-primary hover:bg-accent/10"
        : "text-muted-foreground hover:text-primary hover:bg-accent/10"
      : saved
      ? "border border-primary/40 bg-primary/10 text-primary"
      : "border border-border bg-card hover:bg-muted text-foreground";

  return (
    <button onClick={onClick} className={`${base} ${sizing} ${variants}`} aria-pressed={saved}>
      <Icon className={size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"} />
      {label && <span>{txt}</span>}
    </button>
  );
}
