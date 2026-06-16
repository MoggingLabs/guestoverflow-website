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
  size?: "md" | "lg";
  className?: string;
  disabled?: boolean;
  /** When set, clicking fires a cta_clicked analytics event with this label. */
  analyticsLabel?: string;
};

const VARIANTS = {
  primary: "bg-navy text-white hover:bg-navy-soft font-medium",
  secondary: "border border-navy text-navy hover:bg-navy/5",
  tertiary: "bg-mint text-mint-deep hover:bg-mint/80 font-medium",
  ghost: "text-cream-dim hover:text-amber",
  inverse: "bg-white text-navy hover:bg-white/90 font-medium",
  inverseSecondary: "border border-white/30 text-white hover:bg-white/10",
} as const;

const SIZES = {
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
    "inline-flex items-center justify-center gap-2 rounded transition-colors duration-200",
    "disabled:cursor-not-allowed disabled:opacity-50",
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
