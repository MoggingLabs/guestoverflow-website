"use client";

import { WG } from "@/components/widget/wgStyles";
import type { VenueTheme } from "@/types/content";
import { cn } from "@/lib/utils";

export function PartyStep({
  theme,
  selected,
  onSelect,
  onBack,
}: {
  theme: VenueTheme;
  selected: number | null;
  onSelect: (size: number) => void;
  onBack: () => void;
}) {
  return (
    <div>
      <button type="button" onClick={onBack} className={WG.backButton}>
        ← Back
      </button>
      <p className={WG.heading}>{theme.unitLabel}</p>
      <div
        role="listbox"
        aria-label={theme.unitLabel}
        className="mt-4 grid grid-cols-4 gap-2"
      >
        {theme.unitOptions.map((n) => {
          const isSelected = n === selected;
          return (
            <button
              key={n}
              type="button"
              role="option"
              aria-selected={isSelected}
              onClick={() => onSelect(n)}
              className={cn(isSelected ? WG.chipSelected : WG.chip)}
            >
              {n}
            </button>
          );
        })}
      </div>
    </div>
  );
}
