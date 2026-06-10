import type { FaqItem } from "@/types/content";

/**
 * Native details/summary accordion — keyboard accessible with zero JS.
 */
export function Accordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <details key={item.question} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-base font-medium text-cream transition-colors hover:text-amber-bright [&::-webkit-details-marker]:hidden">
            {item.question}
            <span
              aria-hidden
              className="text-cream-faint transition-transform duration-200 group-open:rotate-45"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 2v12M2 8h12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </summary>
          <p className="pb-6 pr-8 text-sm leading-relaxed text-cream-dim">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
