"use client";

import Modal from "@/components/ui/modal";
import { useSingleReview } from "@/hooks/api";
import { EditReviewForm } from "./edit-review-form";
import { EditReviewSkeleton } from "./edit-review-skeleton";

interface EditReviewModalProps {
  open: boolean;
  onClose: () => void;
  reviewSlug: string;
}

function EditReviewModal({ open, onClose, reviewSlug }: EditReviewModalProps) {
  const { data, isLoading } = useSingleReview(reviewSlug);
  const review = data?.data?.review;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Edit Review"
      contentClassName="gap-0 overflow-hidden rounded-[32px] border border-border/10 bg-background p-0 shadow-[0_24px_80px_rgba(61,44,30,0.18)] md:max-w-[880px] [&_[data-slot=dialog-header]]:border-b [&_[data-slot=dialog-header]]:border-black/6 [&_[data-slot=dialog-header]]:px-6 [&_[data-slot=dialog-header]]:pb-6 [&_[data-slot=dialog-header]]:pt-6 md:[&_[data-slot=dialog-header]]:px-8"
      titleClassName="text-[24px] font-bold leading-8 tracking-normal text-dark"
    >
      {isLoading || !review ? (
        <EditReviewSkeleton />
      ) : (
        <EditReviewForm
          reviewSlug={reviewSlug}
          review={review}
          onUpdated={onClose}
        />
      )}
    </Modal>
  );
}

export default EditReviewModal;
