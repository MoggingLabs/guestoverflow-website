"use client";

import { useReducer } from "react";
import type { VenueThemeId } from "@/types/content";

export type BookingStep =
  | "date"
  | "party"
  | "time"
  | "details"
  | "confirming"
  | "confirmed";

export type BookingState = {
  step: BookingStep;
  dateKey: string | null;
  partySize: number | null;
  time: string | null;
  guest: { name: string; email: string };
  themeId: VenueThemeId;
};

export type BookingAction =
  | { type: "SELECT_DATE"; dateKey: string }
  | { type: "SELECT_PARTY"; partySize: number }
  | { type: "SELECT_TIME"; time: string }
  | { type: "SUBMIT_DETAILS"; name: string; email: string }
  | { type: "CONFIRM_DONE" }
  | { type: "BACK" }
  | { type: "RESET" }
  | { type: "SET_THEME"; themeId: VenueThemeId; maxUnits: number };

const PREVIOUS: Partial<Record<BookingStep, BookingStep>> = {
  party: "date",
  time: "party",
  details: "time",
};

function reducer(state: BookingState, action: BookingAction): BookingState {
  switch (action.type) {
    case "SELECT_DATE":
      // Changing the date invalidates a previously chosen time.
      return {
        ...state,
        dateKey: action.dateKey,
        time: state.dateKey === action.dateKey ? state.time : null,
        step: "party",
      };
    case "SELECT_PARTY":
      return { ...state, partySize: action.partySize, step: "time" };
    case "SELECT_TIME":
      return { ...state, time: action.time, step: "details" };
    case "SUBMIT_DETAILS":
      return {
        ...state,
        guest: { name: action.name, email: action.email },
        step: "confirming",
      };
    case "CONFIRM_DONE":
      return { ...state, step: "confirmed" };
    case "BACK": {
      const prev = PREVIOUS[state.step];
      return prev ? { ...state, step: prev } : state;
    }
    case "RESET":
      return initialState(state.themeId);
    case "SET_THEME": {
      // Theme changes preserve progress, but the party size may exceed
      // the new venue's options (8 dinner guests → 3 hotel rooms).
      const partySize =
        state.partySize !== null
          ? Math.min(state.partySize, action.maxUnits)
          : null;
      return { ...state, themeId: action.themeId, partySize };
    }
    default:
      return state;
  }
}

export function initialState(themeId: VenueThemeId): BookingState {
  return {
    step: "date",
    dateKey: null,
    partySize: null,
    time: null,
    guest: { name: "", email: "" },
    themeId,
  };
}

export function useBookingMachine(themeId: VenueThemeId) {
  return useReducer(reducer, themeId, initialState);
}
