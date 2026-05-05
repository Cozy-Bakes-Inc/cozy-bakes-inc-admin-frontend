"use client";

import Modal from "@/components/ui/modal";
import type { AddCategoryFormValues, AddCategoryProps } from "@/types/main";
import { AddCategoryForm } from "./add-category-form";

const defaultFormValues: AddCategoryFormValues = {
  title: "",
  description: "",
  image: null,
  categoryId: "",
};

function resolveInitialValues(
  initialValues?: Partial<AddCategoryFormValues>,
): AddCategoryFormValues {
  return {
    ...defaultFormValues,
    ...initialValues,
  };
}

export default function AddCategory({
  open,
  onClose,
  onSubmit,
  initialValues,
  submitLabel = "Add Category",
}: AddCategoryProps) {
  const resolvedInitialValues = resolveInitialValues(initialValues);
  const formResetKey = [
    resolvedInitialValues.title,
    resolvedInitialValues.description,
    resolvedInitialValues.image?.name ?? "",
    resolvedInitialValues.categoryId ?? "",
  ].join("|");

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add Category"
      contentClassName="w-[calc(100vw-1rem)] max-w-[calc(100vw-1rem)] gap-0 overflow-hidden rounded-[16px] border border-border/10 bg-background p-0 shadow-[0_24px_80px_rgba(61,44,30,0.18)] sm:w-full sm:max-w-[640px] md:max-w-[760px] [&_[data-slot=dialog-header]]:border-b [&_[data-slot=dialog-header]]:border-black/6 [&_[data-slot=dialog-header]]:px-4 [&_[data-slot=dialog-header]]:pb-4 [&_[data-slot=dialog-header]]:pt-5 sm:[&_[data-slot=dialog-header]]:px-6 md:[&_[data-slot=dialog-header]]:px-8"
      titleClassName="text-lg md:text-[32px] font-bold tracking-[-0.04em] text-dark"
    >
      <AddCategoryForm
        key={formResetKey}
        initialValues={resolvedInitialValues}
        onSubmit={onSubmit}
        onCancel={onClose}
        submitLabel={submitLabel}
      />
    </Modal>
  );
}

export type { AddCategoryFormValues, AddCategoryProps } from "@/types/main";
