import { Eye, X } from "lucide-react";
import { isPreviewMode, exitPreviewMode } from "@/lib/teacherPreview";

export function PreviewBanner() {
  if (!isPreviewMode()) return null;

  const handleExit = () => {
    exitPreviewMode();
    window.location.href = "/";
  };

  return (
    <div className="bg-chart-2/15 border-b border-chart-2/30 text-foreground">
      <div className="max-w-2xl mx-auto px-3 py-1.5 flex items-center justify-between gap-2 text-[11px]">
        <div className="flex items-center gap-1.5 min-w-0">
          <Eye className="h-3 w-3 text-chart-2 shrink-0" />
          <span className="truncate">
            Preview mode — sample data, no changes are saved
          </span>
        </div>
        <button
          onClick={handleExit}
          className="inline-flex items-center gap-1 text-primary font-medium hover:underline shrink-0"
        >
          Exit <X className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
