"use client";

import { useEffect, useRef, useState } from "react";
import { format, parse, isValid } from "date-fns";
import { CalendarDays } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import InputErrorMessage from "@/components/ui/input-error-message";
import { cn } from "@/lib";

interface AddMarketLocationDatePickerProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

const inputClassName =
  "h-[58px] w-full rounded-[10px] border border-[#D0D5DD] bg-transparent px-3 py-3 pr-11 text-base font-medium text-dark outline-none transition-colors placeholder:text-[#98A2B3] focus:border-primary/60 focus:ring-2 focus:ring-primary/10";

export function AddMarketLocationDatePicker({
  label,
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
}: AddMarketLocationDatePickerProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const selectedDate = (() => {
    if (!value) {
      return undefined;
    }

    const parsedDate = parse(value, "yyyy-MM-dd", new Date());
    return isValid(parsedDate) ? parsedDate : undefined;
  })();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <label className="mb-2 block text-[16px] font-medium leading-6 text-dark">
        {label}
      </label>

      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((currentOpen) => !currentOpen)}
        className={cn(
          inputClassName,
          "relative flex items-center text-left disabled:cursor-not-allowed disabled:opacity-60",
          !value ? "text-[#98A2B3]" : "text-dark",
          error ? "border-destructive focus:border-destructive/70 focus:ring-destructive/10" : "",
        )}
      >
        <span>{value || placeholder}</span>
        <CalendarDays
          className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-primary"
          strokeWidth={1.9}
        />
      </button>

      {open ? (
        <div className="absolute top-full z-50 mt-2 rounded-[18px] border border-primary/15 bg-background p-2 shadow-[0_20px_60px_rgba(61,44,30,0.18)]">
          <Calendar
            mode="single"
            selected={selectedDate}
            disabled={disabled}
            onSelect={(date) => {
              if (!date) {
                return;
              }

              onChange(format(date, "yyyy-MM-dd"));
              setOpen(false);
            }}
            className="rounded-[14px] bg-background"
          />
        </div>
      ) : null}

      <InputErrorMessage msg={error} />
    </div>
  );
}
