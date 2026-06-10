export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

const WEEKDAY_FORMAT = new Intl.DateTimeFormat("en-US", { weekday: "short" });
const DAY_FORMAT = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
});
const FULL_FORMAT = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
});

export function formatWeekday(date: Date): string {
  return WEEKDAY_FORMAT.format(date);
}

export function formatDayShort(date: Date): string {
  return DAY_FORMAT.format(date);
}

export function formatDateFull(date: Date): string {
  return FULL_FORMAT.format(date);
}

/** Local-timezone YYYY-MM-DD key for a date (avoids UTC off-by-one). */
export function toDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
