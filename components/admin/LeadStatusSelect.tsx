"use client";

import { useTransition } from "react";
import { updateLeadStatus } from "@/app/admin/(panel)/leads/actions";
import { cn } from "@/lib/utils";

const STATUSES = ["new", "contacted", "closed"] as const;

export function LeadStatusSelect({
  id,
  status,
}: {
  id: number;
  status: (typeof STATUSES)[number];
}) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      value={status}
      disabled={pending}
      onChange={(e) =>
        startTransition(() =>
          updateLeadStatus(id, e.target.value as (typeof STATUSES)[number]),
        )
      }
      className={cn(
        "rounded-md border border-line bg-raised px-2.5 py-1.5 text-xs text-cream focus:border-amber-deep focus:outline-none",
        pending && "opacity-50",
      )}
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}
