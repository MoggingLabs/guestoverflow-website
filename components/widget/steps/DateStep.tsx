"use client";

import { WG } from "@/components/widget/wgStyles";
import { formatDayShort, formatWeekday, toDateKey } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function DateStep({
  dates,
  selected,
  onSelect,
}: {
  dates: Date[];
  selected: string | null;
  onSelect: (dateKey: string) => void;
}) {
  return (
    <div>
      <p className={WG.heading}>Choose a date</p>
      <div
        role="listbox"
        aria-label="Available dates"
        className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-7"
      >
        {dates.map((date) => {
          const key = toDateKey(date);
          const isSelected = key === selected;
          return (
            <button
              key={key}
              type="button"
              role="option"
              aria-selected={isSelected}
              onClick={() => onSelect(key)}
              className={cn(
                isSelected ? WG.chipSelected : WG.chip,
                "flex flex-col items-center gap-0.5 px-2",
              )}
            >
              <span
                className={cn(
                  "text-[10px] uppercase tracking-wider",
                  !isSelected && "[color:var(--wg-muted)]",
                )}
              >
                {formatWeekday(date)}
              </span>
              <span className="text-sm font-medium">
                {formatDayShort(date)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
