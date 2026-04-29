"use client";

import Modal from "@/components/ui/modal";
import { CreateReviewForm } from "./create-review-form";

interface CreateReviewModalProps {
  open: boolean;
  onClose: () => void;
}

function CreateReviewModal({ open, onClose }: CreateReviewModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add New Review"
      contentClassName="gap-0 overflow-hidden rounded-[32px] border border-border/10 bg-[#fcfcfd] p-0 shadow-[0_24px_80px_rgba(61,44,30,0.18)] md:max-w-[880px] [&_[data-slot=dialog-header]]:border-b [&_[data-slot=dialog-header]]:border-black/6 [&_[data-slot=dialog-header]]:px-6 [&_[data-slot=dialog-header]]:pb-6 [&_[data-slot=dialog-header]]:pt-6 md:[&_[data-slot=dialog-header]]:px-8"
      titleClassName="text-[24px] font-bold leading-8 tracking-normal text-dark"
    >
      <CreateReviewForm onCreated={onClose} />
    </Modal>
  );
}

export default CreateReviewModal;
