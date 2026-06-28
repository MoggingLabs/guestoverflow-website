import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<string, string> = {
  draft: "bg-surface text-cream-faint",
  active: "bg-emerald-500/15 text-emerald-300",
  paused: "bg-amber/15 text-amber",
  archived: "bg-surface text-cream-faint line-through",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "rounded px-2 py-0.5 text-xs font-medium capitalize",
        STATUS_STYLES[status] ?? "bg-surface text-cream-faint",
      )}
    >
      {status}
    </span>
  );
}
