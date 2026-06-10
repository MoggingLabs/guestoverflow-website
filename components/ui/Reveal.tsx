"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, REVEAL } from "@/lib/gsap";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Animate direct children with a stagger instead of the wrapper. */
  stagger?: boolean;
  delay?: number;
};

/**
 * Scroll-triggered fade-up used across the whole site. Content renders
 * visible by default (no-JS and reduced-motion safe); the tween only
 * runs when motion is allowed.
 */
export function Reveal({
  children,
  className,
  stagger = false,
  delay = 0,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(stagger ? Array.from(el.children) : el, {
          y: REVEAL.y,
          opacity: 0,
          duration: REVEAL.duration,
          ease: REVEAL.ease,
          delay,
          stagger: stagger ? REVEAL.stagger : 0,
          scrollTrigger: { trigger: el, start: REVEAL.start, once: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
