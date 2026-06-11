import { cn } from "@/lib/utils";

/**
 * Guest Overflow mark: three flowing place-setting lines converging into a
 * point — "guests flowing in". Wordmark set in the display serif.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        aria-hidden
        className="text-amber"
      >
        <path
          d="M4 7c8 0 14 3 18 7-4 4-10 7-18 7"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        <path
          d="M4 11.5c5.5 0 9.5 1 13 2.5-3.5 1.5-7.5 2.5-13 2.5"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          opacity="0.55"
        />
        <circle cx="24" cy="14" r="1.75" fill="currentColor" />
      </svg>
      <span className="whitespace-nowrap font-display text-xl font-medium tracking-tight text-cream">
        Guest Overflow
      </span>
    </span>
  );
}
