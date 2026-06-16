"use client";

export type CostSeries = {
  id: string;
  label: string;
  /** CSS color (token var or literal). */
  color: string;
  /** Cost at a given monthly volume. */
  valueAt: (x: number) => number;
  dashed?: boolean;
};

type Props = {
  maxX: number;
  currentX: number;
  series: CostSeries[];
  formatY: (v: number) => string;
  formatX: (v: number) => string;
};

const W = 640;
const H = 320;
const M = { top: 18, right: 16, bottom: 34, left: 16 };
const PLOT_W = W - M.left - M.right;
const PLOT_H = H - M.top - M.bottom;

export function CostCurveChart({
  maxX,
  currentX,
  series,
  formatY,
  formatX,
}: Props) {
  const maxY = Math.max(
    1,
    ...series.map((s) => s.valueAt(maxX)),
  );

  const xPos = (x: number) => M.left + (x / maxX) * PLOT_W;
  const yPos = (y: number) => M.top + (1 - Math.min(y, maxY) / maxY) * PLOT_H;

  const markerX = xPos(currentX);

  return (
    <figure className="m-0">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Flat price versus rising commission across booking volume"
      >
        {/* baseline */}
        <line
          x1={M.left}
          y1={M.top + PLOT_H}
          x2={M.left + PLOT_W}
          y2={M.top + PLOT_H}
          stroke="var(--color-line)"
          strokeWidth="1"
        />

        {/* current-volume marker */}
        <line
          x1={markerX}
          y1={M.top}
          x2={markerX}
          y2={M.top + PLOT_H}
          stroke="var(--color-amber)"
          strokeWidth="1"
          strokeDasharray="4 4"
          opacity="0.6"
        />

        {series.map((s) => {
          const y0 = yPos(s.valueAt(0));
          const y1 = yPos(s.valueAt(maxX));
          const yc = yPos(s.valueAt(currentX));
          return (
            <g key={s.id}>
              <line
                x1={xPos(0)}
                y1={y0}
                x2={xPos(maxX)}
                y2={y1}
                stroke={s.color}
                strokeWidth="2.5"
                strokeDasharray={s.dashed ? "6 5" : undefined}
                strokeLinecap="round"
              />
              <circle cx={markerX} cy={yc} r="4" fill={s.color} />
            </g>
          );
        })}

        {/* x-axis labels */}
        <text
          x={M.left}
          y={H - 10}
          fill="var(--color-cream-faint)"
          fontSize="12"
          textAnchor="start"
        >
          {formatX(0)}
        </text>
        <text
          x={M.left + PLOT_W}
          y={H - 10}
          fill="var(--color-cream-faint)"
          fontSize="12"
          textAnchor="end"
        >
          {formatX(maxX)}
        </text>
      </svg>

      <figcaption className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2">
        {series.map((s) => (
          <span
            key={s.id}
            className="inline-flex items-center gap-2 text-xs text-cream-dim"
          >
            <span
              aria-hidden
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ background: s.color }}
            />
            {s.label} · {formatY(s.valueAt(currentX))}
          </span>
        ))}
      </figcaption>
    </figure>
  );
}
