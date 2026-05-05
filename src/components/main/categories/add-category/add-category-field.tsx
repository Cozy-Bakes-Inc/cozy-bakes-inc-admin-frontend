import InputErrorMessage from "@/components/ui/input-error-message";
import { cn } from "@/lib";

interface AddCategoryFieldProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  multiline?: boolean;
  rows?: number;
}

const categoryInputClassName =
  "block w-full rounded-[10px] border border-[#D0D5DD] bg-background px-4 text-base font-medium text-dark outline-none transition-colors placeholder:text-[#98A2B3] focus:border-primary/70 focus:ring-2 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60";

export function AddCategoryField({
  id,
  label,
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  multiline = false,
  rows = 4,
}: AddCategoryFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[16px] font-medium leading-6 text-dark"
      >
        {label}
      </label>

      {multiline ? (
        <textarea
          id={id}
          value={value}
          rows={rows}
          disabled={disabled}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          className={cn(
            categoryInputClassName,
            "min-h-[128px] resize-none py-3",
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
            categoryInputClassName,
            "h-[56px] py-3",
            error
              ? "border-destructive focus:border-destructive/70 focus:ring-destructive/10"
              : "",
          )}
        />
      )}

      <InputErrorMessage msg={error} />
    </div>
  );
}
