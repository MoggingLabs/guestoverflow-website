import Link from "next/link";
import { RANGE_OPTIONS, type RangeKey } from "@/lib/admin/range";
import { cn } from "@/lib/utils";

/** Link-based segmented control — zero client JS. */
export function RangePicker({
  active,
  basePath,
}: {
  active: RangeKey;
  basePath: string;
}) {
  return (
    <div className="inline-flex rounded-md border border-line bg-surface p-0.5">
      {RANGE_OPTIONS.map((option) => (
        <Link
          key={option.key}
          href={`${basePath}?range=${option.key}`}
          className={cn(
            "rounded px-3 py-1.5 text-xs transition-colors",
            option.key === active
              ? "bg-raised text-cream"
              : "text-cream-faint hover:text-cream",
          )}
        >
          {option.label}
        </Link>
      ))}
    </div>
  );
}
