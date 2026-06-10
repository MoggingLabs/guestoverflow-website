"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  drainAnalyticsQueue,
  getFormTelemetry,
  queuedEventCount,
  setAnalyticsListener,
  track,
  type QueuedEvent,
} from "@/lib/analytics";

const FLUSH_INTERVAL_MS = 5000;
const FLUSH_AT_COUNT = 10;
const SCROLL_THRESHOLDS = [25, 50, 75, 100] as const;

function sessionId(): string {
  let sid = sessionStorage.getItem("gf_sid");
  if (!sid) {
    sid = crypto.randomUUID();
    sessionStorage.setItem("gf_sid", sid);
  }
  return sid;
}

function captureUtm(): Record<string, string> {
  const stored = sessionStorage.getItem("gf_utm");
  if (stored) return JSON.parse(stored);
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const key of ["source", "medium", "campaign", "term", "content"]) {
    const value = params.get(`utm_${key}`);
    if (value) utm[key] = value.slice(0, 100);
  }
  sessionStorage.setItem("gf_utm", JSON.stringify(utm));
  return utm;
}

function send(events: QueuedEvent[], useBeacon: boolean) {
  if (events.length === 0) return;
  const body = JSON.stringify({
    sid: sessionId(),
    utm: captureUtm(),
    referrer: document.referrer || null,
    events,
  });
  if (useBeacon && navigator.sendBeacon) {
    navigator.sendBeacon("/api/t", new Blob([body], { type: "application/json" }));
  } else {
    fetch("/api/t", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  }
}

function cheapSelector(el: Element): string {
  const tag = el.tagName.toLowerCase();
  const id = el.id ? `#${el.id}` : "";
  const cls = el.classList.length ? `.${el.classList[0]}` : "";
  const text = (el.textContent ?? "").trim().slice(0, 30);
  return `${tag}${id}${cls}${text ? ` "${text}"` : ""}`;
}

/**
 * First-party analytics runtime. Mounted only in the (site) layout —
 * admin pages never load it. Renders nothing.
 */
export function AnalyticsProvider() {
  const pathname = usePathname();
  const scrollFired = useRef<Set<number>>(new Set());
  const engagedFired = useRef(false);

  // Flush loop + final beacon (registered once).
  useEffect(() => {
    const flush = () => send(drainAnalyticsQueue(), false);
    setAnalyticsListener(() => {
      if (queuedEventCount() >= FLUSH_AT_COUNT) flush();
    });
    const interval = setInterval(flush, FLUSH_INTERVAL_MS);

    const onHide = () => {
      if (document.visibilityState !== "hidden") return;
      const form = getFormTelemetry();
      if (form?.started && !form.submitted) {
        track("demo_form_abandoned", {
          last_field: form.lastField,
          fields_completed: form.fieldsCompleted,
        });
      }
      send(drainAnalyticsQueue(), true);
    };
    document.addEventListener("visibilitychange", onHide);
    window.addEventListener("pagehide", onHide);

    return () => {
      setAnalyticsListener(null);
      clearInterval(interval);
      document.removeEventListener("visibilitychange", onHide);
      window.removeEventListener("pagehide", onHide);
      flush();
    };
  }, []);

  // Page view + engagement + scroll depth, per pathname.
  useEffect(() => {
    track("page_view");
    engagedFired.current = false;
    scrollFired.current = new Set();

    const engage = (via: string) => {
      if (engagedFired.current) return;
      engagedFired.current = true;
      track("page_engaged", { via });
    };
    const timer = setTimeout(() => engage("time"), 10_000);

    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.round((window.scrollY / max) * 100) : 100;
      if (pct >= 50) engage("scroll");
      for (const threshold of SCROLL_THRESHOLDS) {
        if (pct >= threshold && !scrollFired.current.has(threshold)) {
          scrollFired.current.add(threshold);
          track("scroll_depth", { pct: threshold });
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  // Friction + error listeners (once).
  useEffect(() => {
    // Rage clicks: ≥3 clicks within 2s inside a 100px radius.
    const clicks: { x: number; y: number; t: number }[] = [];
    let lastRage = 0;
    const onClick = (e: MouseEvent) => {
      const now = Date.now();
      clicks.push({ x: e.clientX, y: e.clientY, t: now });
      while (clicks.length > 6 || (clicks.length && now - clicks[0].t > 2000)) {
        clicks.shift();
      }
      const near = clicks.filter(
        (c) => Math.hypot(c.x - e.clientX, c.y - e.clientY) <= 100,
      );
      if (near.length >= 3 && now - lastRage > 5000) {
        lastRage = now;
        const target = e.target instanceof Element ? e.target : null;
        track("rage_click", {
          selector: target ? cheapSelector(target) : "(unknown)",
        });
      }
    };
    document.addEventListener("click", onClick, true);

    // JS errors, deduped, capped per session.
    const seen = new Set<string>();
    const report = (message: string, source: string) => {
      const key = `${message}|${source}`;
      if (seen.has(key) || seen.size >= 10) return;
      seen.add(key);
      track("js_error", {
        message: message.slice(0, 300),
        source: source.slice(0, 200),
      });
    };
    const onError = (e: ErrorEvent) =>
      report(e.message ?? "unknown error", e.filename ?? "");
    const onRejection = (e: PromiseRejectionEvent) =>
      report(String(e.reason ?? "unhandled rejection").slice(0, 300), "promise");
    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);

    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, []);

  return null;
}
