export type RangeKey = "7d" | "30d" | "90d";

export const RANGE_OPTIONS: { key: RangeKey; label: string }[] = [
  { key: "7d", label: "7 days" },
  { key: "30d", label: "30 days" },
  { key: "90d", label: "90 days" },
];

const DAYS: Record<RangeKey, number> = { "7d": 7, "30d": 30, "90d": 90 };

export function parseRange(raw: string | undefined): {
  key: RangeKey;
  from: Date;
  to: Date;
} {
  const key: RangeKey = raw === "7d" || raw === "90d" ? raw : "30d";
  const to = new Date();
  const from = new Date(to.getTime() - DAYS[key] * 24 * 60 * 60 * 1000);
  return { key, from, to };
}
