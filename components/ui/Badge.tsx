import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border border-amber-deep/60 bg-amber/10 px-2.5 py-1 text-xs font-medium tracking-wide text-amber",
        className,
      )}
    >
      {children}
    </span>
  );
}
