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
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  className?: string;
  disabled?: boolean;
  /** When set, clicking fires a cta_clicked analytics event with this label. */
  analyticsLabel?: string;
};

const VARIANTS = {
  primary:
    "bg-amber text-ink hover:bg-amber-bright shadow-glow font-medium",
  secondary:
    "border border-line text-cream hover:border-amber-deep hover:text-amber-bright",
  ghost: "text-cream-dim hover:text-cream",
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
    "inline-flex items-center justify-center gap-2 rounded-md transition-colors duration-200",
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
