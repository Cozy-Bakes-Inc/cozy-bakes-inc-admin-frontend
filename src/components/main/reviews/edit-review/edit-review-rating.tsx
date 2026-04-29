"use client";

import { Star } from "lucide-react";
import InputErrorMessage from "@/components/ui/input-error-message";
import { cn } from "@/lib";

interface EditReviewRatingProps {
  value: number;
  error?: string;
  disabled?: boolean;
  onChange: (value: number) => void;
}

export function EditReviewRating({
  value,
  error,
  disabled = false,
  onChange,
}: EditReviewRatingProps) {
  const safeValue = Number.isFinite(value)
    ? Math.max(0, Math.min(5, value))
    : 0;

  return (
    <div className="space-y-2">
      <p className="text-base leading-6 font-medium text-dark">Rating</p>

      <div className="flex h-10 items-center gap-2">
        {Array.from({ length: 5 }).map((_, index) => {
          const rating = index + 1;
          const isFilled = rating <= Math.round(safeValue);

          return (
            <button
              key={rating}
              type="button"
              disabled={disabled}
              className="rounded-md outline-none transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-60"
              aria-label={`Set rating to ${rating}`}
              onClick={() => onChange(rating)}
            >
              <Star
                className={cn(
                  "size-10",
                  isFilled ? "text-[#fdb022]" : "text-[#e4e7ec]",
                )}
                fill="currentColor"
                strokeWidth={1.8}
              />
            </button>
          );
        })}
        <span className="ml-0.5 text-[18px] leading-7 font-bold text-[#3d2c1e]">
          {safeValue.toFixed(1)}
        </span>
      </div>

      <InputErrorMessage msg={error} />
    </div>
  );
}
