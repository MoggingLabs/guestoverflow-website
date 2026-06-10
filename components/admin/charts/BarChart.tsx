type Bar = { label: string; value: number };
type Marker = { label: string; afterIndex: number };

/**
 * Server-rendered bar chart with optional vertical markers — used for
 * the bookings-per-month chart with implementation ship dates drawn on
 * it ("did the change work?").
 */
export function BarChart({
  bars,
  markers = [],
  height = 200,
}: {
  bars: Bar[];
  /** Dashed amber lines drawn before the bar at afterIndex. */
  markers?: Marker[];
  height?: number;
}) {
  if (bars.length === 0) {
    return (
      <div
        style={{ height }}
        className="flex items-center justify-center rounded-md border border-dashed border-line text-sm text-cream-faint"
      >
        No data yet
      </div>
    );
  }

  const width = 720;
  const padX = 8;
  const padTop = 18;
  const padBottom = 26;
  const innerW = width - padX * 2;
  const innerH = height - padTop - padBottom;
  const max = Math.max(...bars.map((b) => b.value), 1);
  const slot = innerW / bars.length;
  const barW = Math.min(slot * 0.6, 48);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full"
      role="img"
      aria-label="Bar chart"
    >
      {bars.map((bar, i) => {
        const h = (bar.value / max) * innerH;
        const x = padX + i * slot + (slot - barW) / 2;
        const y = padTop + innerH - h;
        return (
          <g key={bar.label}>
            <rect
              x={x}
              y={y}
              width={barW}
              height={Math.max(h, 1)}
              rx="3"
              fill="var(--color-amber-deep)"
            >
              <title>{`${bar.label}: ${bar.value}`}</title>
            </rect>
            <text
              x={x + barW / 2}
              y={height - 8}
              textAnchor="middle"
              fontSize="10"
              fill="var(--color-cream-faint)"
            >
              {bar.label}
            </text>
            <text
              x={x + barW / 2}
              y={y - 4}
              textAnchor="middle"
              fontSize="10"
              fill="var(--color-cream-dim)"
            >
              {bar.value}
            </text>
          </g>
        );
      })}
      {markers.map((marker) => {
        const x = padX + marker.afterIndex * slot;
        return (
          <g key={`${marker.label}-${marker.afterIndex}`}>
            <line
              x1={x}
              y1={padTop - 6}
              x2={x}
              y2={padTop + innerH}
              stroke="var(--color-amber)"
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />
            <text
              x={x + 4}
              y={padTop}
              fontSize="9"
              fill="var(--color-amber)"
            >
              {marker.label.slice(0, 28)}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
