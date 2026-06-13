"use client";

import Modal from "@/components/ui/modal";
import type {
  AddMarketLocationFormValues,
  AddMarketLocationProps,
} from "@/types/main";
import { AddMarketLocationForm } from "./add-market-location-form";

const defaultFormValues: AddMarketLocationFormValues = {
  marketName: "",
  tagLabel: "",
  date: "",
  endDate: "",
  day: [],
  startTime: "",
  endTime: "",
  locationAddress: "",
  mapLink: "",
  description: "",
  coverImages: [],
};

function resolveInitialValues(
  initialValues?: Partial<AddMarketLocationFormValues>,
): AddMarketLocationFormValues {
  return {
    ...defaultFormValues,
    ...initialValues,
  };
}

export default function AddMarketLocation({
  open,
  onClose,
  onSubmit,
  submitLabel = "Add Market",
  initialValues,
}: AddMarketLocationProps) {
  const resolvedInitialValues = resolveInitialValues(initialValues);
  const formResetKey = [
    resolvedInitialValues.marketName,
    resolvedInitialValues.tagLabel,
    resolvedInitialValues.date,
    resolvedInitialValues.endDate,
    resolvedInitialValues.day.join(","),
    resolvedInitialValues.startTime,
    resolvedInitialValues.endTime,
    resolvedInitialValues.locationAddress,
    resolvedInitialValues.mapLink ?? "",
    resolvedInitialValues.description,
    resolvedInitialValues.coverImages.map((image) => image.name).join(","),
  ].join("|");

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add Market Location"
      contentClassName="md:max-w-[880px] gap-0 overflow-hidden rounded-[32px] border border-border/10 bg-background p-0 shadow-[0_24px_80px_rgba(61,44,30,0.18)] [&_[data-slot=dialog-header]]:border-b [&_[data-slot=dialog-header]]:border-black/6 [&_[data-slot=dialog-header]]:px-6 [&_[data-slot=dialog-header]]:pb-6 [&_[data-slot=dialog-header]]:pt-6 md:[&_[data-slot=dialog-header]]:px-8"
      titleClassName="text-lg md:text-[32px] font-bold tracking-[-0.04em] text-dark"
    >
      <AddMarketLocationForm
        key={formResetKey}
        initialValues={resolvedInitialValues}
        onSubmit={onSubmit}
        submitLabel={submitLabel}
      />
    </Modal>
  );
}
