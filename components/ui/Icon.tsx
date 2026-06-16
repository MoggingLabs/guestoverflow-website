import type { IconName } from "@/types/content";
import { cn } from "@/lib/utils";

const PATHS: Record<IconName, React.ReactNode> = {
  fork: (
    <>
      <path d="M7 3v6a2 2 0 0 0 2 2v10" />
      <path d="M5 3v4M9 3v4" />
      <path d="M17 3c-1.5 1-2.5 3-2.5 5.5 0 2 .8 3 2.5 3.5V21" />
    </>
  ),
  bed: (
    <>
      <path d="M3 7v11M3 14h18v4" />
      <path d="M3 11h7v3M21 14v-3a3 3 0 0 0-3-3h-8" />
    </>
  ),
  leaf: (
    <>
      <path d="M6 18C6 10 11 5 20 4c0 9-4 15-12 15" />
      <path d="M4 20c2-4 5-7 9-9" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5z" />
    </>
  ),
  scissors: (
    <>
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M20 4 8.12 15.88" />
      <path d="M14.8 14.8 20 20" />
      <path d="M8.12 8.12 12 12" />
    </>
  ),
  brand: (
    <>
      <path d="M12 3 4 7v6c0 4.5 3.5 7 8 8 4.5-1 8-3.5 8-8V7z" />
      <path d="M9.5 12.5 11 14l3.5-4" />
    </>
  ),
  commission: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15 9 9 15M9.5 9.5h.01M14.5 14.5h.01" />
    </>
  ),
  data: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
      <path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" />
    </>
  ),
  concierge: (
    <>
      <path d="M3 19h18M5 19a7 7 0 0 1 14 0" />
      <path d="M12 9V7M10 7h4" />
    </>
  ),
  calendar: (
    <>
      <rect x="4" y="5" width="16" height="16" rx="2" />
      <path d="M4 10h16M8 3v4M16 3v4" />
      <path d="m9.5 15 2 2 3.5-4" />
    </>
  ),
  bell: (
    <>
      <path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6" />
      <path d="M10 19a2 2 0 0 0 4 0" />
    </>
  ),
  chart: (
    <>
      <path d="M4 4v16h16" />
      <path d="m8 14 3-4 3 2 4-6" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 4 7v6c0 4.5 3.5 7 8 8 4.5-1 8-3.5 8-8V7z" />
      <path d="M12 8v4M12 15h.01" />
    </>
  ),
  widget: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M7 14h6M7 17h3" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
};

export function Icon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={cn("h-6 w-6", className)}
    >
      {PATHS[name]}
    </svg>
  );
}
