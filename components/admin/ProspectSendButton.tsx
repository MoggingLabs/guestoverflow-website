"use client";

import { cn } from "@/lib/utils";

/**
 * Submit button that fires a (bound) server action to send a prospect's cold
 * email, guarded by a native confirm so a real email never goes out by accident.
 */
export function ProspectSendButton({
  action,
  confirmText,
  label = "Send Prospect Email",
  disabled = false,
  small = false,
}: {
  action: (formData: FormData) => void | Promise<void>;
  confirmText: string;
  label?: string;
  disabled?: boolean;
  small?: boolean;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!window.confirm(confirmText)) e.preventDefault();
      }}
    >
      <button
        type="submit"
        disabled={disabled}
        className={cn(
          "rounded-md font-medium transition-colors",
          small ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm",
          disabled
            ? "cursor-not-allowed bg-surface text-cream-faint"
            : "bg-amber text-ink hover:bg-amber-bright",
        )}
      >
        {label}
      </button>
    </form>
  );
}
