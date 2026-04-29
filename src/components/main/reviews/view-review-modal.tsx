"use client";

import { format, isValid, parseISO } from "date-fns";
import { CalendarDays, Star } from "lucide-react";
import Modal from "@/components/ui/modal";
import { Shimmer } from "@/components/ui/shimmer";
import { useSingleReview } from "@/hooks/api";
import { cn } from "@/lib/utils";

type ViewReviewModalProps = {
  open: boolean;
  onClose: () => void;
  reviewSlug: string;
};

type ViewReviewFieldProps = {
  label: string;
  value?: string | number | null;
  className?: string;
  trailingIcon?: React.ReactNode;
  multiline?: boolean;
};

function formatReviewDate(date?: string | null) {
  if (!date) return "";

  const parsedDate = parseISO(date);
  return isValid(parsedDate) ? format(parsedDate, "dd MMM yyyy") : date;
}

function formatReviewStatus(status?: string) {
  if (!status) return "";

  return status
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function ViewReviewField({
  label,
  value,
  className,
  trailingIcon,
  multiline,
}: ViewReviewFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <p className="text-base leading-6 font-medium text-dark">{label}</p>
      <div
        className={cn(
          "flex w-full items-center gap-2.5 rounded-[8px] border border-primary bg-[#fbf8eb]/10 px-3 text-sm leading-5 font-medium text-dark",
          multiline ? "min-h-[66px] py-3" : "h-[58px]",
        )}
      >
        <p className={cn("min-w-0 flex-1", multiline && "whitespace-pre-wrap")}>
          {value || "-"}
        </p>
        {trailingIcon}
      </div>
    </div>
  );
}

function ViewReviewRating({ rating }: { rating: number }) {
  const safeRating = Number.isFinite(rating)
    ? Math.max(0, Math.min(5, rating))
    : 0;

  return (
    <div className="space-y-2">
      <p className="text-base leading-6 font-medium text-dark">Rating</p>
      <div className="flex h-10 items-center gap-2">
        {Array.from({ length: 5 }).map((_, index) => {
          const isFilled = index < Math.round(safeRating);

          return (
            <Star
              key={index}
              className={cn(
                "size-10",
                isFilled ? "text-[#fdb022]" : "text-[#e4e7ec]",
              )}
              fill="currentColor"
              strokeWidth={1.8}
            />
          );
        })}
        <span className="ml-0.5 text-[18px] leading-7 font-bold text-[#3d2c1e]">
          {safeRating.toFixed(1)}
        </span>
      </div>
    </div>
  );
}

function ViewReviewSkeleton() {
  return (
    <div className="px-6 py-6 md:px-8">
      <div className="rounded-[24px] border border-primary/20 bg-background px-5 py-5 md:px-6">
        <div className="grid gap-5 md:grid-cols-2">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <Shimmer className="h-6 w-36 rounded-md" />
              <Shimmer className="h-[58px] w-full rounded-[8px]" />
            </div>
          ))}
        </div>

        <div className="mt-5 space-y-2">
          <Shimmer className="h-6 w-20 rounded-md" />
          <Shimmer className="h-10 w-72 rounded-md" />
        </div>

        <div className="mt-5 space-y-2">
          <Shimmer className="h-6 w-28 rounded-md" />
          <Shimmer className="h-[66px] w-full rounded-[8px]" />
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <Shimmer className="h-6 w-20 rounded-md" />
              <Shimmer className="h-[58px] w-full rounded-[8px]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ViewReviewModal({ open, onClose, reviewSlug }: ViewReviewModalProps) {
  const { data, isLoading } = useSingleReview(reviewSlug);
  const review = data?.data?.review;
  const rating = Number(review?.rating ?? 0);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="View Review"
      contentClassName="gap-0 overflow-hidden rounded-[32px] border border-border/10 bg-background p-0 shadow-[0_24px_80px_rgba(61,44,30,0.18)] md:max-w-[880px] [&_[data-slot=dialog-header]]:border-b [&_[data-slot=dialog-header]]:border-black/6 [&_[data-slot=dialog-header]]:px-6 [&_[data-slot=dialog-header]]:pb-6 [&_[data-slot=dialog-header]]:pt-6 md:[&_[data-slot=dialog-header]]:px-8"
      titleClassName="text-[24px] font-bold leading-8 tracking-normal text-dark"
    >
      {isLoading ? (
        <ViewReviewSkeleton />
      ) : (
        <div className="px-6 py-6 md:px-8">
          <div className="rounded-[24px] border border-primary/20 bg-background px-5 py-5 md:px-6">
            <div className="grid gap-5 md:grid-cols-2">
              <ViewReviewField
                label="Customer Name"
                value={review?.customer_name}
              />
              <ViewReviewField
                label="Customer Email"
                value={review?.customer_email}
              />
            </div>

            <div className="mt-5">
              <ViewReviewRating rating={rating} />
            </div>

            <div className="mt-5">
              <ViewReviewField
                label="Review Text"
                value={review?.review_text}
                multiline
              />
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <ViewReviewField
                label="Date"
                value={formatReviewDate(review?.date ?? review?.created_at)}
                trailingIcon={
                  <CalendarDays
                    className="size-6 shrink-0 text-primary"
                    strokeWidth={1.8}
                  />
                }
              />
              <ViewReviewField
                label="Status"
                value={formatReviewStatus(review?.status)}
              />
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}

export default ViewReviewModal;
