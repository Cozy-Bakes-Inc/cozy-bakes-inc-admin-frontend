"use client";

import InputErrorMessage from "@/components/ui/input-error-message";
import { cn } from "@/lib";

interface ContactInfoFieldProps {
  id: string;
  label: string;
  value: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}

export function ContactInfoField({
  id,
  label,
  value,
  placeholder,
  error,
  disabled = false,
  onChange,
}: ContactInfoFieldProps) {
  return (
    <div>
      <div className="space-y-2">
        {" "}
        <label
          htmlFor={id}
          className="block text-base leading-6 font-medium text-dark"
        >
          {label}
        </label>
        <input
          id={id}
          type="text"
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
          className={cn(
            "h-[58px] w-full rounded-[8px] border border-primary bg-[#fbf8eb]/10 px-3 py-3 text-sm leading-5 font-medium text-dark outline-none transition-colors placeholder:text-[#98a2b3] focus:ring-2 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60",
            error && "border-destructive focus:border-destructive/70",
          )}
        />
      </div>

      <InputErrorMessage msg={error} />
    </div>
  );
}
