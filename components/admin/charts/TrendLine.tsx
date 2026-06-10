type Point = { label: string; value: number };

/**
 * Server-rendered area/line chart. No client JS — hover values via
 * native <title>.
 */
export function TrendLine({
  points,
  height = 160,
}: {
  points: Point[];
  height?: number;
}) {
  if (points.length === 0) {
    return <Empty height={height} />;
  }

  const width = 720;
  const pad = 8;
  const max = Math.max(...points.map((p) => p.value), 1);
  const stepX =
    points.length > 1 ? (width - pad * 2) / (points.length - 1) : 0;
  const y = (v: number) => height - pad - (v / max) * (height - pad * 2);
  const coords = points.map((p, i) => ({
    x: pad + i * stepX,
    y: y(p.value),
    ...p,
  }));
  const line = coords.map((c) => `${c.x},${c.y}`).join(" ");
  const area = `${pad},${height - pad} ${line} ${pad + (points.length - 1) * stepX},${height - pad}`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full"
      role="img"
      aria-label="Daily visitors trend"
    >
      <defs>
        <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-amber)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--color-amber)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill="url(#trendFill)" />
      <polyline
        points={line}
        fill="none"
        stroke="var(--color-amber)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {coords.map((c) => (
        <circle key={c.label} cx={c.x} cy={c.y} r="6" fill="transparent">
          <title>{`${c.label}: ${c.value}`}</title>
        </circle>
      ))}
    </svg>
  );
}

function Empty({ height }: { height: number }) {
  return (
    <div
      style={{ height }}
      className="flex items-center justify-center rounded-md border border-dashed border-line text-sm text-cream-faint"
    >
      No data yet
    </div>
  );
}
