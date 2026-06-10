export type AnalyticsEvent =
  | "page_view"
  | "page_engaged"
  | "scroll_depth"
  | "cta_clicked"
  | "widget_opened"
  | "widget_step"
  | "widget_completed"
  | "widget_theme_changed"
  | "demo_form_started"
  | "form_field_completed"
  | "demo_form_abandoned"
  | "demo_form_submitted"
  | "demo_form_error"
  | "rage_click"
  | "js_error";

export type AnalyticsProps = Record<string, string | number | boolean>;

export type QueuedEvent = {
  event: AnalyticsEvent;
  props: AnalyticsProps;
  path: string;
  ts: number;
};

/** State the provider reads on pagehide to emit demo_form_abandoned. */
export type FormTelemetry = {
  started: boolean;
  submitted: boolean;
  lastField: string;
  fieldsCompleted: number;
};

let queue: QueuedEvent[] = [];
let onEnqueue: (() => void) | null = null;
let formState: FormTelemetry | null = null;

/**
 * First-party event tracking. Events are queued module-side and drained
 * by AnalyticsProvider (mounted only in the public (site) layout), so
 * admin pages emit nothing — plus an explicit path guard here as
 * belt-and-braces for shared components rendered under /admin.
 */
export function track(event: AnalyticsEvent, props?: AnalyticsProps): void {
  if (typeof window === "undefined") return;
  if (window.location.pathname.startsWith("/admin")) return;
  queue.push({
    event,
    props: props ?? {},
    path: window.location.pathname,
    ts: Date.now(),
  });
  onEnqueue?.();
}

export function drainAnalyticsQueue(): QueuedEvent[] {
  const drained = queue;
  queue = [];
  return drained;
}

export function setAnalyticsListener(fn: (() => void) | null): void {
  onEnqueue = fn;
}

export function queuedEventCount(): number {
  return queue.length;
}

export function setFormTelemetry(state: FormTelemetry | null): void {
  formState = state;
}

export function getFormTelemetry(): FormTelemetry | null {
  return formState;
}
