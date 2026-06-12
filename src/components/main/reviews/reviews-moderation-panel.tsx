"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import toast from "react-hot-toast";
import type {
  ReviewSettings,
  UpdateReviewSettingsPayload,
  ReviewsModerationPanelProps,
} from "@/interfaces/main/reviews";
import { cn } from "@/lib/utils";
import { Shimmer } from "@/components/ui/shimmer";
import { useReviewSettings } from "@/hooks/api";
import { updateReviewSettings } from "@/services/mutations";

const reviewSettingsKeysByControlId = {
  "auto-approve": "auto_approve",
  "website-section": "enable_reviews",
  "homepage-five-star": "show_only_5_star",
  "minimum-rating": "minimum_rating",
} as const satisfies Record<
  string,
  keyof UpdateReviewSettingsPayload
>;

type ReviewSettingsControlId = keyof typeof reviewSettingsKeysByControlId;

function isReviewSettingsControlId(id: string): id is ReviewSettingsControlId {
  return id in reviewSettingsKeysByControlId;
}

function ReviewsModerationToggle({ enabled }: { enabled: boolean }) {
  return (
    <span
      className={cn(
        "relative inline-flex h-7 w-14 shrink-0 rounded-full p-0.5 transition-colors duration-300",
        enabled ? "bg-primary" : "bg-[#dfe5ef]",
      )}
      aria-hidden="true"
    >
      <span
        className={cn(
          "inline-block h-6 w-6 rounded-full bg-white shadow-[0_4px_6px_rgba(0,0,0,0.1),0_2px_4px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-in-out",
          enabled ? "translate-x-7" : "translate-x-0",
        )}
      />
    </span>
  );
}

function buildReviewSettingsControls(
  controls: ReviewsModerationPanelProps["controls"],
  settings: ReviewSettings,
) {
  const isEnabled = (value: string | number) => String(value) === "1";

  return controls.map((control) => {
    if (control.type === "toggle") {
      if (control.id === "auto-approve") {
        return { ...control, enabled: isEnabled(settings.auto_approve) };
      }

      if (control.id === "website-section") {
        return { ...control, enabled: isEnabled(settings.enable_reviews) };
      }

      if (control.id === "homepage-five-star") {
        return { ...control, enabled: isEnabled(settings.show_only_5_star) };
      }
    }

    if (control.type === "select") {
      return {
        ...control,
        value: `${String(settings.minimum_rating)} star`,
      };
    }

    return control;
  });
}

export function ReviewsModerationPanel({
  controls,
}: ReviewsModerationPanelProps) {
  const queryClient = useQueryClient();
  const [updatingControlId, setUpdatingControlId] = useState<string | null>(
    null,
  );
  const [isRatingDropdownOpen, setIsRatingDropdownOpen] = useState(false);
  const { data, isLoading } = useReviewSettings();
  const reviewSettings = data?.data?.settings;

  const handleSettingsUpdate = async (
    control: ReviewsModerationPanelProps["controls"][number],
    rating?: number,
  ) => {
    if (!reviewSettings || updatingControlId) {
      return;
    }

    if (!isReviewSettingsControlId(control.id)) {
      return;
    }

    const settingsKey = reviewSettingsKeysByControlId[control.id];

    const currentRating = Number(reviewSettings.minimum_rating);
    const nextPayload: UpdateReviewSettingsPayload =
      settingsKey === "minimum_rating"
        ? {
            minimum_rating:
              rating ?? (Number.isFinite(currentRating) ? currentRating : 1),
          }
        : {
            [settingsKey]: String(reviewSettings[settingsKey]) !== "1",
          };

    setUpdatingControlId(control.id);
    setIsRatingDropdownOpen(false);
    const result = await updateReviewSettings(nextPayload);

    if (result?.ok) {
      toast.success(result?.message || "Review settings updated");
      await queryClient.invalidateQueries({ queryKey: ["reviewSettings"] });
      setUpdatingControlId(null);
      return;
    }

    toast.error(result?.message);
    setUpdatingControlId(null);
  };

  if (isLoading) {
    return (
      <section className="rounded-3xl border border-border/15 bg-background/80 p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] md:p-6">
        <div className="mb-5 flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-bg-creamy">
            <Shimmer className="size-5 rounded-xl" />
          </div>

          <div className="flex-1 space-y-3">
            <Shimmer className="h-5 w-52 rounded-md" />
            <Shimmer className="h-4 w-72 rounded-md" />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {controls.map((control) => (
            <article
              key={control.id}
              className="rounded-[24px] border border-border/10 bg-white/80 px-4 py-4 shadow-sm"
            >
              <div className="space-y-2">
                <Shimmer className="h-4 w-32 rounded-md" />
                <Shimmer className="h-3 w-56 rounded-md" />
              </div>
              <div className="mt-4 flex justify-end">
                <Shimmer className="h-9 w-16 rounded-full" />
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (!reviewSettings) {
    return (
      <section className="rounded-3xl border border-border/15 bg-background/80 p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] md:p-6">
        <div className="mb-5 flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-primary text-white">
            <SlidersHorizontal className="size-5" strokeWidth={2.1} />
          </div>

          <div>
            <h2 className="text-lg font-bold tracking-[0.015em] text-gray-700">
              Reviews Moderation Settings
            </h2>
            <p className="mt-1 text-sm font-medium text-gray-400">
              No moderation settings are available right now.
            </p>
          </div>
        </div>

        <div className="rounded-[24px] border border-border/10 bg-white/80 px-4 py-10 text-center text-sm font-medium text-gray shadow-sm">
          Review moderation settings could not be loaded. Please try again
          later.
        </div>
      </section>
    );
  }

  const settingsControls = buildReviewSettingsControls(
    controls,
    reviewSettings,
  );

  return (
    <section className="rounded-3xl border border-border/15 bg-background/80 p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] md:p-6">
      <div className="mb-5 flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-primary text-white">
          <SlidersHorizontal className="size-5" strokeWidth={2.1} />
        </div>

        <div>
          <h2 className="text-lg font-bold tracking-[0.015em] text-gray-700">
            Reviews Moderation Settings
          </h2>
          <p className="mt-1 text-sm font-medium text-gray-400">
            Monitor, moderate, and control customer feedback
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {settingsControls.map((control) => (
          <article
            key={control.id}
            className="flex items-center justify-between gap-4 rounded-[24px] border border-border/10 bg-white/90 px-4 py-4 shadow-sm"
          >
            <div>
              <h3 className="text-sm font-semibold text-dark">
                {control.title}
              </h3>
              <p className="mt-1 text-xs font-medium text-gray">
                {control.description}
              </p>
            </div>

            {control.type === "toggle" ? (
              <button
                type="button"
                className="disabled:cursor-not-allowed disabled:opacity-60"
                disabled={updatingControlId === control.id}
                aria-pressed={Boolean(control.enabled)}
                onClick={() => handleSettingsUpdate(control)}
              >
                <ReviewsModerationToggle enabled={Boolean(control.enabled)} />
              </button>
            ) : (
              <div className="relative">
                <button
                  type="button"
                  className="inline-flex min-w-27 items-center justify-center gap-2 rounded-full border border-primary/30 bg-background px-3 py-2 text-xs font-medium text-dark transition-colors hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={updatingControlId === control.id}
                  aria-expanded={isRatingDropdownOpen}
                  onClick={() =>
                    setIsRatingDropdownOpen((isOpen) => !isOpen)
                  }
                >
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <span className="text-[10px] leading-none">★</span>
                  </span>
                  {control.value}
                  <ChevronDown
                    className={cn(
                      "size-3.5 text-primary transition-transform",
                      isRatingDropdownOpen ? "rotate-180" : "rotate-0",
                    )}
                    strokeWidth={2}
                  />
                </button>

                {isRatingDropdownOpen ? (
                  <div className="absolute right-0 z-20 mt-2 w-full min-w-27 overflow-hidden rounded-2xl border border-primary/15 bg-white p-1 shadow-[0_18px_40px_rgba(61,44,30,0.14)]">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        className={cn(
                          "flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-dark transition-colors hover:bg-primary/5",
                          control.value === `${rating} star` &&
                            "bg-primary/10 text-primary",
                        )}
                        onClick={() => handleSettingsUpdate(control, rating)}
                      >
                        <span className="text-primary">★</span>
                        {rating} star
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
