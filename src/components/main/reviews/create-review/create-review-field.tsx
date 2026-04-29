"use client";

import InputErrorMessage from "@/components/ui/input-error-message";
import { cn } from "@/lib";

interface CreateReviewFieldProps {
  id: string;
  label: string;
  value: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  readOnly?: boolean;
  icon?: React.ReactNode;
  multiline?: boolean;
  rows?: number;
  onChange?: (value: string) => void;
}

export function CreateReviewField({
  id,
  label,
  value,
  placeholder,
  error,
  disabled = false,
  readOnly = false,
  icon,
  multiline = false,
  rows = 4,
  onChange,
}: CreateReviewFieldProps) {
  const fieldClassName = cn(
    "w-full rounded-[8px] border border-[#d0d5dd] bg-transparent px-3 text-base leading-6 font-medium text-dark outline-none transition-colors placeholder:text-[#98a2b3] focus:border-primary/70 focus:ring-2 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60",
    error && "border-destructive focus:border-destructive/70",
    readOnly && "cursor-default",
  );

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-base leading-6 font-medium text-dark"
      >
        {label}
      </label>

      <div className="relative">
        {multiline ? (
          <textarea
            id={id}
            value={value}
            rows={rows}
            disabled={disabled}
            readOnly={readOnly}
            placeholder={placeholder}
            onChange={(event) => onChange?.(event.target.value)}
            className={cn(fieldClassName, "min-h-[103px] resize-y py-3")}
          />
        ) : (
          <input
            id={id}
            type="text"
            value={value}
            disabled={disabled}
            readOnly={readOnly}
            placeholder={placeholder}
            onChange={(event) => onChange?.(event.target.value)}
            className={cn(fieldClassName, "h-[58px] py-3", icon && "pr-11")}
          />
        )}

        {icon ? (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-primary">
            {icon}
          </span>
        ) : null}
      </div>

      <InputErrorMessage msg={error} />
    </div>
  );
}
