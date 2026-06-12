"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import InputErrorMessage from "@/components/ui/input-error-message";
import { cn } from "@/lib";
import type { ReviewPayload } from "@/interfaces";

type ReviewEditStatus = ReviewPayload["status"];

const statusOptions: Array<{ label: string; value: ReviewEditStatus }> = [
  { label: "Approved", value: "approved" },
  { label: "Pending", value: "pending" },
  { label: "Rejected", value: "rejected" },
];

interface EditReviewStatusSelectProps {
  value: ReviewEditStatus;
  error?: string;
  disabled?: boolean;
  onChange: (value: ReviewEditStatus) => void;
}

export function EditReviewStatusSelect({
  value,
  error,
  disabled = false,
  onChange,
}: EditReviewStatusSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const selectedOption =
    statusOptions.find((option) => option.value === value) ?? statusOptions[0];

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  return (
    <div className="space-y-2" ref={wrapperRef}>
      <label
        htmlFor="reviewStatus"
        className="block text-base leading-6 font-medium text-dark"
      >
        Status
      </label>

      <div className="relative">
        <button
          id="reviewStatus"
          type="button"
          disabled={disabled}
          aria-expanded={isOpen}
          className={cn(
            "flex h-[58px] w-full items-center gap-2.5 rounded-[8px] border border-primary bg-[#fbf8eb]/10 px-3 text-left text-sm leading-5 font-medium text-dark outline-none transition-colors focus:ring-2 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60",
            error && "border-destructive focus:border-destructive/70",
          )}
          onClick={() => setIsOpen((current) => !current)}
        >
          <span className="min-w-0 flex-1">{selectedOption.label}</span>
          <ChevronDown
            className={cn(
              "size-5 shrink-0 text-primary transition-transform",
              isOpen && "rotate-180",
            )}
            strokeWidth={1.9}
          />
        </button>

        {isOpen ? (
          <div className="absolute left-0 right-0 z-30 mt-2 max-h-[75px] overflow-y-auto rounded-2xl border border-primary/15 bg-white p-1 shadow-[0_18px_40px_rgba(61,44,30,0.14)]">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                className={cn(
                  "flex w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-dark transition-colors hover:bg-primary/5",
                  option.value === value && "bg-primary/10 text-primary",
                )}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <InputErrorMessage msg={error} />
    </div>
  );
}
