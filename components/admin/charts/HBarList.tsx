type Row = { label: string; value: number; detail?: string };

/** Label + proportional bar + count rows (top pages, sources, etc.). */
export function HBarList({ rows, title }: { rows: Row[]; title: string }) {
  const max = Math.max(...rows.map((r) => r.value), 1);

  return (
    <div className="rounded-lg border border-line bg-surface p-5 shadow-card">
      <h3 className="text-xs font-medium uppercase tracking-wider text-cream-faint">
        {title}
      </h3>
      {rows.length === 0 ? (
        <p className="mt-4 text-sm text-cream-faint">No data yet</p>
      ) : (
        <ul className="mt-4 space-y-2.5">
          {rows.map((row) => (
            <li key={row.label} className="text-sm">
              <div className="flex items-baseline justify-between gap-3">
                <span className="truncate text-cream-dim">{row.label}</span>
                <span className="shrink-0 text-cream">
                  {row.value.toLocaleString()}
                  {row.detail && (
                    <span className="ml-1.5 text-xs text-cream-faint">
                      {row.detail}
                    </span>
                  )}
                </span>
              </div>
              <div className="mt-1 h-1.5 rounded-full bg-raised">
                <div
                  className="h-full rounded-full bg-amber-deep"
                  style={{ width: `${Math.max((row.value / max) * 100, 2)}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
