import type {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

const FIELD_CLASSES =
  "w-full rounded-md border border-line bg-raised px-4 py-3 text-sm text-cream placeholder:text-cream-faint transition-colors focus:border-amber-deep focus:outline-none";

type WrapperProps = {
  label: string;
  name: string;
  error?: string;
  optional?: boolean;
};

function FieldWrapper({
  label,
  name,
  error,
  optional,
  children,
}: WrapperProps & { children: React.ReactNode }) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 flex items-baseline justify-between text-sm font-medium text-cream"
      >
        {label}
        {optional && (
          <span className="text-xs font-normal text-cream-faint">Optional</span>
        )}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-1.5 text-xs text-error">
          {error}
        </p>
      )}
    </div>
  );
}

export function Input({
  label,
  name,
  error,
  optional,
  className,
  ...props
}: WrapperProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <FieldWrapper label={label} name={name} error={error} optional={optional}>
      <input
        id={name}
        name={name}
        aria-invalid={error ? true : undefined}
        className={cn(FIELD_CLASSES, error && "border-error", className)}
        {...props}
      />
    </FieldWrapper>
  );
}

export function Select({
  label,
  name,
  error,
  optional,
  className,
  children,
  ...props
}: WrapperProps & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <FieldWrapper label={label} name={name} error={error} optional={optional}>
      <select
        id={name}
        name={name}
        aria-invalid={error ? true : undefined}
        className={cn(
          FIELD_CLASSES,
          "appearance-none",
          error && "border-error",
          className,
        )}
        {...props}
      >
        {children}
      </select>
    </FieldWrapper>
  );
}

export function Textarea({
  label,
  name,
  error,
  optional,
  className,
  ...props
}: WrapperProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <FieldWrapper label={label} name={name} error={error} optional={optional}>
      <textarea
        id={name}
        name={name}
        aria-invalid={error ? true : undefined}
        className={cn(
          FIELD_CLASSES,
          "min-h-28 resize-y",
          error && "border-error",
          className,
        )}
        {...props}
      />
    </FieldWrapper>
  );
}
