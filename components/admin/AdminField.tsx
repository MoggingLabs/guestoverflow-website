import type {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

/** Compact form fields for admin panel forms (server-action friendly). */

const CLASSES =
  "w-full rounded-md border border-line bg-raised px-3 py-2 text-sm text-cream placeholder:text-cream-faint focus:border-amber-deep focus:outline-none";

export function AdminInput({
  label,
  className,
  ...props
}: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block text-xs text-cream-dim">
      {label}
      <input className={cn(CLASSES, "mt-1.5", className)} {...props} />
    </label>
  );
}

export function AdminSelect({
  label,
  className,
  children,
  ...props
}: { label: string } & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <label className="block text-xs text-cream-dim">
      {label}
      <select className={cn(CLASSES, "mt-1.5", className)} {...props}>
        {children}
      </select>
    </label>
  );
}

export function AdminTextarea({
  label,
  className,
  ...props
}: { label: string } & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <label className="block text-xs text-cream-dim">
      {label}
      <textarea
        className={cn(CLASSES, "mt-1.5 min-h-20 resize-y", className)}
        {...props}
      />
    </label>
  );
}

export function AdminSubmit({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="submit"
      className="rounded-md bg-amber px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-amber-bright"
    >
      {children}
    </button>
  );
}
