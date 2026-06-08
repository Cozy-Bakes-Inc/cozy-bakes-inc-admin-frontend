"use client";

import Modal from "@/components/ui/modal";
import type { MenuFormValues } from "@/types/main/menu";
import { AddMenuForm } from "./add-menu-form";

const defaultFormValues: MenuFormValues = {
  title: "",
  description: "",
  pdfFile: null,
  isActive: true,
};

interface AddMenuModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: () => void | Promise<void>;
}

export function AddMenuModal({ open, onClose, onSubmit }: AddMenuModalProps) {
  const formResetKey = open ? "open" : "closed";

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add New Menu"
      contentClassName="w-[calc(100vw-1rem)] max-w-[calc(100vw-1rem)] gap-0 overflow-hidden rounded-[16px] border border-border/10 bg-background p-0 shadow-[0_24px_80px_rgba(61,44,30,0.18)] sm:w-full sm:max-w-[640px] [&_[data-slot=dialog-header]]:border-b [&_[data-slot=dialog-header]]:border-black/6 [&_[data-slot=dialog-header]]:px-4 [&_[data-slot=dialog-header]]:pb-4 [&_[data-slot=dialog-header]]:pt-5 sm:[&_[data-slot=dialog-header]]:px-6 md:[&_[data-slot=dialog-header]]:px-8"
      titleClassName="pr-12 text-[26px] font-bold tracking-[-0.04em] text-dark"
      closeButtonClassname="right-4 top-5 size-9"
    >
      <AddMenuForm
        key={formResetKey}
        initialValues={defaultFormValues}
        onSubmit={onSubmit ?? onClose}
        onCancel={onClose}
      />
    </Modal>
  );
}
