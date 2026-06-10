import { cn } from "@/lib/utils";

const COLORS = {
  green: "bg-success",
  amber: "bg-amber",
  red: "bg-error",
} as const;

export function RagDot({
  rag,
  className,
}: {
  rag: "green" | "amber" | "red";
  className?: string;
}) {
  return (
    <span
      title={rag}
      className={cn(
        "inline-block h-2.5 w-2.5 shrink-0 rounded-full",
        COLORS[rag],
        className,
      )}
    />
  );
}
