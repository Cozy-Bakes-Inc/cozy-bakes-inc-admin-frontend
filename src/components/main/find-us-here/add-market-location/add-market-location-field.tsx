import InputErrorMessage from "@/components/ui/input-error-message";
import type { ComponentType } from "react";
import { cn } from "@/lib";
import type { AddMarketLocationFieldProps } from "@/types/main";

const fieldBaseClassName =
  "block w-full rounded-[10px] border border-[#D0D5DD] bg-transparent px-3 text-base font-medium text-dark outline-none transition-colors placeholder:text-[#98A2B3] focus:border-primary/60 focus:ring-2 focus:ring-primary/10";

const iconButtonClassName =
  "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-primary";

type FieldIcon = ComponentType<{ className?: string; strokeWidth?: number }>;

function FieldLabel({ label, htmlFor }: { label: string; htmlFor: string }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-[16px] font-medium leading-6 text-dark"
    >
      {label}
    </label>
  );
}

function FieldIconAdornment({ Icon }: { Icon: FieldIcon }) {
  return <Icon className={iconButtonClassName} strokeWidth={1.9} />;
}

export function AddMarketLocationField({
  id,
  label,
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  icon: Icon,
  multiline = false,
  rows = 4,
}: AddMarketLocationFieldProps) {
  return (
    <div>
      <FieldLabel htmlFor={id} label={label} />

      <div className="relative">
        {multiline ? (
          <textarea
            id={id}
            value={value}
            rows={rows}
            disabled={disabled}
            placeholder={placeholder}
            onChange={(event) => onChange(event.target.value)}
            className={cn(
              fieldBaseClassName,
              "resize-none py-3 disabled:cursor-not-allowed disabled:opacity-60",
              error
                ? "border-destructive focus:border-destructive/70 focus:ring-destructive/10"
                : "",
            )}
          />
        ) : (
          <input
            id={id}
            type="text"
            value={value}
            disabled={disabled}
            placeholder={placeholder}
            onChange={(event) => onChange(event.target.value)}
            className={cn(
              fieldBaseClassName,
              "h-[58px] py-3 disabled:cursor-not-allowed disabled:opacity-60",
              error
                ? "border-destructive focus:border-destructive/70 focus:ring-destructive/10"
                : "",
              Icon ? "pr-11" : "",
            )}
          />
        )}

        {!multiline && Icon ? <FieldIconAdornment Icon={Icon} /> : null}
      </div>

      <InputErrorMessage msg={error} />
    </div>
  );
}
