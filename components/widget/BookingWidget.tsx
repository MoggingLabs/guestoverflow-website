"use client";

import { useEffect, useMemo, useRef, useSyncExternalStore } from "react";
import { useBookingMachine } from "@/components/widget/useBookingMachine";
import { WidgetFrame } from "@/components/widget/WidgetFrame";
import { WidgetProgress } from "@/components/widget/WidgetProgress";
import { ThemeSwitcher } from "@/components/widget/ThemeSwitcher";
import { DateStep } from "@/components/widget/steps/DateStep";
import { PartyStep } from "@/components/widget/steps/PartyStep";
import { TimeStep } from "@/components/widget/steps/TimeStep";
import { DetailsStep } from "@/components/widget/steps/DetailsStep";
import { ConfirmationStep } from "@/components/widget/steps/ConfirmationStep";
import { getVenueTheme } from "@/content/widget-themes";
import { getSelectableDates, getSlots } from "@/lib/availability";
import { track } from "@/lib/analytics";
import type { VenueThemeId } from "@/types/content";

const emptySubscribe = () => () => {};

type BookingWidgetProps = {
  initialTheme?: VenueThemeId;
  /** Industry pages lock the widget to their vertical's theme. */
  showThemeSwitcher?: boolean;
  /** Caption shown under the switcher, e.g. "Same engine. Your brand." */
  caption?: string;
};

export function BookingWidget({
  initialTheme = "fine-dining",
  showThemeSwitcher = true,
  caption,
}: BookingWidgetProps) {
  const [state, dispatch] = useBookingMachine(initialTheme);
  const theme = getVenueTheme(state.themeId);

  // Dates depend on "today", so they're computed after mount to keep
  // server and client HTML identical.
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const dates = useMemo(
    () => (mounted ? getSelectableDates(new Date()) : null),
    [mounted],
  );

  const slots = useMemo(
    () => (state.dateKey ? getSlots(state.dateKey, theme) : []),
    [state.dateKey, theme],
  );

  // Widget telemetry: opened once per mount, then each step reached.
  const opened = useRef(false);
  useEffect(() => {
    if (state.step === "date" && state.dateKey === null) return;
    if (!opened.current) {
      opened.current = true;
      track("widget_opened", { theme: state.themeId });
    }
  }, [state.step, state.dateKey, state.themeId]);

  useEffect(() => {
    if (state.step !== "date" && state.step !== "confirmed") {
      track("widget_step", { step: state.step });
    }
  }, [state.step]);

  // The fake "confirming" beat — long enough to feel real.
  useEffect(() => {
    if (state.step !== "confirming") return;
    const t = setTimeout(() => {
      dispatch({ type: "CONFIRM_DONE" });
      track("widget_completed", { theme: state.themeId });
    }, 800);
    return () => clearTimeout(t);
  }, [state.step, state.themeId, dispatch]);

  const handleThemeChange = (id: VenueThemeId) => {
    dispatch({
      type: "SET_THEME",
      themeId: id,
      maxUnits: Math.max(...getVenueTheme(id).unitOptions),
    });
    track("widget_theme_changed", { theme: id });
  };

  return (
    <div className="mx-auto w-full max-w-xl">
      {showThemeSwitcher && (
        <div className="mb-6">
          <ThemeSwitcher active={state.themeId} onChange={handleThemeChange} />
          {caption && (
            <p className="mt-3 text-center text-xs text-cream-faint">
              {caption}
            </p>
          )}
        </div>
      )}

      <WidgetFrame theme={theme}>
        {state.step !== "confirmed" && state.step !== "confirming" && (
          <WidgetProgress step={state.step} />
        )}

        {!dates ? (
          <div className="h-40 animate-pulse rounded-md [background:var(--wg-surface)]" />
        ) : state.step === "date" ? (
          <DateStep
            dates={dates}
            selected={state.dateKey}
            onSelect={(dateKey) => dispatch({ type: "SELECT_DATE", dateKey })}
          />
        ) : state.step === "party" ? (
          <PartyStep
            theme={theme}
            selected={state.partySize}
            onSelect={(partySize) =>
              dispatch({ type: "SELECT_PARTY", partySize })
            }
            onBack={() => dispatch({ type: "BACK" })}
          />
        ) : state.step === "time" ? (
          <TimeStep
            slots={slots}
            selected={state.time}
            onSelect={(time) => dispatch({ type: "SELECT_TIME", time })}
            onBack={() => dispatch({ type: "BACK" })}
          />
        ) : state.step === "details" ? (
          <DetailsStep
            theme={theme}
            onSubmit={(name, email) =>
              dispatch({ type: "SUBMIT_DETAILS", name, email })
            }
            onBack={() => dispatch({ type: "BACK" })}
          />
        ) : state.step === "confirming" ? (
          <div
            role="status"
            aria-label="Confirming your booking"
            className="flex h-40 items-center justify-center"
          >
            <span className="h-7 w-7 animate-spin rounded-full border-2 border-transparent [border-top-color:var(--wg-accent)] [border-right-color:var(--wg-accent)]" />
          </div>
        ) : (
          <ConfirmationStep
            state={state}
            theme={theme}
            onReset={() => dispatch({ type: "RESET" })}
          />
        )}
      </WidgetFrame>
    </div>
  );
}
