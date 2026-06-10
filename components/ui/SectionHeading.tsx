import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subhead?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  subhead,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && (
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-amber">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl font-medium tracking-tight text-cream md:text-4xl text-balance">
        {title}
      </h2>
      {subhead && (
        <p className="mt-4 text-base leading-relaxed text-cream-dim md:text-lg">
          {subhead}
        </p>
      )}
    </div>
  );
}
