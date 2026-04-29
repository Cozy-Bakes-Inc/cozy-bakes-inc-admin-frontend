"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Clock3 } from "lucide-react";
import InputErrorMessage from "@/components/ui/input-error-message";
import { cn } from "@/lib";

interface TimePickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  id?: string;
}

const inputClassName =
  "h-[58px] w-full rounded-[10px] border border-[#D0D5DD] bg-transparent px-3 py-3 pr-11 text-xs font-medium text-dark outline-none transition-colors placeholder:text-[#98A2B3] focus:border-primary/60 focus:ring-2 focus:ring-primary/10 md:text-sm";

const hours = Array.from({ length: 12 }, (_, index) =>
  String(index + 1).padStart(2, "0"),
);

const minutes = Array.from({ length: 60 }, (_, index) =>
  String(index).padStart(2, "0"),
);

const meridiems = ["AM", "PM"] as const;
type Meridiem = (typeof meridiems)[number];
type TimeParts = {
  hour: string;
  minute: string;
  meridiem: Meridiem;
};

function parseTimeParts(value: string) {
  const matchedParts = value.match(/^(\d{2}):(\d{2})\s(AM|PM)$/i);

  if (!matchedParts) {
    return {
      hour: "01",
      minute: "00",
      meridiem: "AM" as const,
    };
  }

  return {
    hour: matchedParts[1],
    minute: matchedParts[2],
    meridiem: matchedParts[3].toUpperCase() as Meridiem,
  };
}

function formatTimeValue(hour: string, minute: string, meridiem: Meridiem) {
  return `${hour}:${minute} ${meridiem}`;
}

function PickerColumn<TValue extends string>({
  values,
  selectedValue,
  onSelect,
}: {
  values: readonly TValue[];
  selectedValue: TValue;
  onSelect: (value: TValue) => void;
}) {
  return (
    <div className="max-h-52 space-y-1 overflow-y-auto pr-1">
      {values.map((value) => {
        const isSelected = value === selectedValue;

        return (
          <button
            key={value}
            type="button"
            onClick={() => onSelect(value)}
            className={cn(
              "flex h-9 w-full min-w-12 items-center justify-center rounded-[8px] px-2 text-base font-medium leading-none transition-colors md:h-10 md:min-w-16 md:px-3 md:text-lg",
              isSelected
                ? "bg-primary text-white"
                : "text-dark hover:bg-primary/10",
            )}
          >
            {value}
          </button>
        );
      })}
    </div>
  );
}

export function TimePicker({
  label,
  value,
  onChange,
  error,
  placeholder = "Time",
  id = "time-picker",
}: TimePickerProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const timeParts = useMemo(() => parseTimeParts(value), [value]);

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

  function updateTime(nextParts: Partial<TimeParts>) {
    const hour = nextParts.hour ?? timeParts.hour;
    const minute = nextParts.minute ?? timeParts.minute;
    const meridiem = nextParts.meridiem ?? timeParts.meridiem;

    onChange(formatTimeValue(hour, minute, meridiem));
  }

  return (
    <div ref={containerRef} className="relative">
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium leading-5 text-dark md:text-[16px] md:leading-6"
      >
        {label}
      </label>

      <button
        id={id}
        type="button"
        onClick={() => setOpen((currentOpen) => !currentOpen)}
        className={cn(
          inputClassName,
          "relative flex items-center text-left",
          !value ? "text-[#98A2B3]" : "text-dark",
        )}
      >
        <span>{value || placeholder}</span>
        <Clock3
          className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-primary"
          strokeWidth={1.9}
        />
      </button>

      {open ? (
        <div className="absolute top-full z-50 mt-2 rounded-[18px] border border-primary/15 bg-background p-2 shadow-[0_20px_60px_rgba(61,44,30,0.18)]">
          <div className="grid grid-cols-3 gap-2">
            <PickerColumn
              values={hours}
              selectedValue={timeParts.hour}
              onSelect={(hour) => updateTime({ hour })}
            />
            <PickerColumn
              values={minutes}
              selectedValue={timeParts.minute}
              onSelect={(minute) => updateTime({ minute })}
            />
            <PickerColumn
              values={meridiems}
              selectedValue={timeParts.meridiem}
              onSelect={(meridiem) => {
                updateTime({ meridiem });
                setOpen(false);
              }}
            />
          </div>
        </div>
      ) : null}

      <InputErrorMessage msg={error} />
    </div>
  );
}
