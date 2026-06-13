import { Check } from "lucide-react";
import InputErrorMessage from "@/components/ui/input-error-message";
import { cn } from "@/lib";

const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

interface MarketDaySelectorProps {
  id: string;
  label: string;
  value: string[];
  disabled?: boolean;
  error?: string;
  onChange: (value: string[]) => void;
}

export function MarketDaySelector({
  id,
  label,
  value,
  disabled = false,
  error,
  onChange,
}: MarketDaySelectorProps) {
  const selectedDays = new Set(value);

  function toggleDay(day: string) {
    if (disabled) {
      return;
    }

    onChange(
      selectedDays.has(day)
        ? value.filter((selectedDay) => selectedDay !== day)
        : [...value, day],
    );
  }

  return (
    <div>
      <p
        id={`${id}-label`}
        className="mb-2 text-[16px] font-medium leading-6 text-dark"
      >
        {label}
      </p>

      <div
        role="group"
        aria-labelledby={`${id}-label`}
        className={cn(
          "grid grid-cols-2 gap-2 rounded-[10px] border border-[#D0D5DD] bg-transparent p-2 sm:grid-cols-4 lg:grid-cols-7",
          error ? "border-destructive" : "",
          disabled ? "opacity-60" : "",
        )}
      >
        {weekDays.map((day) => {
          const isSelected = selectedDays.has(day);

          return (
            <button
              key={day}
              type="button"
              disabled={disabled}
              aria-pressed={isSelected}
              onClick={() => toggleDay(day)}
              className={cn(
                "flex h-10 items-center justify-center gap-2 rounded-[8px] border px-3 text-sm font-semibold transition-colors disabled:cursor-not-allowed",
                isSelected
                  ? "border-primary bg-primary text-white"
                  : "border-primary/15 bg-[#fbf8eb66] text-dark hover:bg-[#fbf8eb]",
              )}
            >
              {isSelected ? (
                <Check className="size-4" strokeWidth={2.2} />
              ) : null}
              {day.slice(0, 3)}
            </button>
          );
        })}
      </div>

      <InputErrorMessage msg={error} />
    </div>
  );
}
