import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-line bg-surface p-7 shadow-card",
        className,
      )}
    >
      {children}
    </div>
  );
}
