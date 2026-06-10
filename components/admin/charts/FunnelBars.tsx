type Stage = { label: string; value: number };

/** Horizontal funnel: absolute counts + stage-to-stage conversion %. */
export function FunnelBars({ stages }: { stages: Stage[] }) {
  if (stages.length === 0 || stages[0].value === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-md border border-dashed border-line text-sm text-cream-faint">
        No sessions in this range yet
      </div>
    );
  }

  const max = stages[0].value;

  return (
    <ol className="space-y-3">
      {stages.map((stage, i) => {
        const pctOfTop = (stage.value / max) * 100;
        const prev = i > 0 ? stages[i - 1].value : null;
        const stepPct =
          prev && prev > 0 ? Math.round((stage.value / prev) * 100) : null;
        return (
          <li key={stage.label}>
            <div className="mb-1 flex items-baseline justify-between text-xs">
              <span className="text-cream-dim">{stage.label}</span>
              <span className="text-cream">
                {stage.value.toLocaleString()}
                {stepPct !== null && (
                  <span className="ml-2 text-cream-faint">
                    {stepPct}% of previous
                  </span>
                )}
              </span>
            </div>
            <div className="h-6 rounded-sm bg-raised">
              <div
                className="h-full rounded-sm bg-amber-deep"
                style={{ width: `${Math.max(pctOfTop, 1)}%` }}
              />
            </div>
          </li>
        );
      })}
    </ol>
  );
}
