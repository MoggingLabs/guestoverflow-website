"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?:
    | "primary"
    | "secondary"
    | "ghost"
    | "tertiary"
    | "inverse"
    | "inverseSecondary";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
  /** When set, clicking fires a cta_clicked analytics event with this label. */
  analyticsLabel?: string;
};

const VARIANTS = {
  primary:
    "bg-[linear-gradient(180deg,#213145,#0f1c2c)] text-white font-medium shadow-[0_2px_10px_-2px_rgb(15_28_44/0.45)] hover:bg-[linear-gradient(180deg,#27384f,#13243a)] hover:-translate-y-px hover:shadow-[0_9px_24px_-6px_rgb(15_28_44/0.55)] active:translate-y-0 active:scale-[0.98]",
  secondary:
    "border border-navy/80 text-navy shadow-[0_1px_2px_rgb(15_28_44/0.08)] hover:-translate-y-px hover:bg-navy hover:text-white hover:shadow-[0_9px_22px_-8px_rgb(15_28_44/0.4)] active:translate-y-0",
  tertiary:
    "bg-mint text-mint-deep font-medium shadow-[0_2px_10px_-2px_rgb(134_211_213/0.5)] hover:-translate-y-px hover:bg-mint/85 hover:shadow-[0_9px_22px_-6px_rgb(134_211_213/0.6)] active:translate-y-0 active:scale-[0.98]",
  ghost: "text-cream-dim hover:text-amber",
  inverse:
    "bg-white text-navy font-medium shadow-[0_4px_14px_-2px_rgb(0_0_0/0.25)] hover:-translate-y-px hover:shadow-[0_10px_26px_-4px_rgb(0_0_0/0.35)] active:translate-y-0 active:scale-[0.98]",
  inverseSecondary:
    "border border-white/40 text-white hover:-translate-y-px hover:border-white/70 hover:bg-white/10 active:translate-y-0",
} as const;

const SIZES = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
} as const;

export function Button({
  children,
  href,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  className,
  disabled,
  analyticsLabel,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-md transition-all duration-200 ease-out will-change-transform",
    "disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none disabled:hover:translate-y-0",
    VARIANTS[variant],
    SIZES[size],
    className,
  );

  const handleClick = () => {
    if (analyticsLabel) track("cta_clicked", { label: analyticsLabel });
    onClick?.();
  };

  if (href) {
    return (
      <Link href={href} className={classes} onClick={handleClick}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
