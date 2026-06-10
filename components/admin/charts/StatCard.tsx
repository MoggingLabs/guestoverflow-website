import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  delta,
  hint,
}: {
  label: string;
  value: string | number;
  /** Percentage change vs the previous period; omit to hide. */
  delta?: number | null;
  hint?: string;
}) {
  return (
    <div className="rounded-lg border border-line bg-surface p-5 shadow-card">
      <p className="text-xs font-medium uppercase tracking-wider text-cream-faint">
        {label}
      </p>
      <div className="mt-2 flex items-baseline gap-2">
        <p className="font-display text-3xl font-medium text-cream">{value}</p>
        {delta !== undefined && delta !== null && (
          <span
            className={cn(
              "text-xs font-medium",
              delta >= 0 ? "text-success" : "text-error",
            )}
          >
            {delta >= 0 ? "▲" : "▼"} {Math.abs(delta).toFixed(0)}%
          </span>
        )}
      </div>
      {hint && <p className="mt-1 text-xs text-cream-faint">{hint}</p>}
    </div>
  );
}
