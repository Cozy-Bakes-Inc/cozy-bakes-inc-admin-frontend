import InputErrorMessage from "@/components/ui/input-error-message";
import { cn } from "@/lib";

interface AddProductFieldProps {
  id: string;
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  type?: "text" | "number";
  multiline?: boolean;
  rows?: number;
  className?: string;
  inputClassName?: string;
  suffix?: string;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
}

export const productInputClassName =
  "block w-full rounded-[8px] border border-[#D0D5DD] bg-background px-4 text-base font-medium text-dark outline-none transition-colors placeholder:text-[#98A2B3] focus:border-primary/70 focus:ring-2 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60";

export function AddProductField({
  id,
  label,
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  type = "text",
  multiline = false,
  rows = 4,
  className,
  inputClassName,
  suffix,
  onKeyDown,
}: AddProductFieldProps) {
  return (
    <div className={className}>
      {label ? (
        <label
          htmlFor={id}
          className="mb-2 block text-[16px] font-medium leading-6 text-dark"
        >
          {label}
        </label>
      ) : null}

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
              productInputClassName,
              "min-h-[108px] resize-none py-3",
              error
                ? "border-destructive focus:border-destructive/70 focus:ring-destructive/10"
                : "",
              inputClassName,
            )}
          />
        ) : (
          <input
            id={id}
            type={type}
            value={value}
            disabled={disabled}
            placeholder={placeholder}
            onChange={(event) => onChange(event.target.value)}
            onKeyDown={onKeyDown}
            className={cn(
              productInputClassName,
              "h-[56px] py-3",
              suffix ? "pr-10" : "",
              error
                ? "border-destructive focus:border-destructive/70 focus:ring-destructive/10"
                : "",
              inputClassName,
            )}
          />
        )}

        {suffix ? (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-base font-semibold text-dark">
            {suffix}
          </span>
        ) : null}
      </div>

      <InputErrorMessage msg={error} className="whitespace-nowrap" />
    </div>
  );
}
