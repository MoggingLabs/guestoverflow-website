import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Shared motion language — every reveal in the site uses these. */
export const REVEAL = {
  y: 24,
  duration: 0.8,
  ease: "power3.out",
  stagger: 0.08,
  start: "top 85%",
} as const;

export { gsap, ScrollTrigger };
