"use client";

import Modal from "@/components/ui/modal";
import type { AddProductFormValues, AddProductProps } from "@/types/main";
import { AddProductForm } from "./add-product-form";

const defaultFormValues: AddProductFormValues = {
  productName: "",
  category: "",
  description: "",
  pricingType: "perUnit",
  perUnitPrice: "",
  packs: [
    { id: "pack-1", quantity: "", price: "" },
    { id: "pack-2", quantity: "", price: "" },
  ],
  sizes: [
    { id: "size-1", label: "Small", price: "" },
    { id: "size-2", label: "Medium", price: "" },
    { id: "size-3", label: "Large", price: "" },
  ],
  weights: [
    { id: "weight-1", quantity: "", unit: "OZ", price: "" },
    { id: "weight-2", quantity: "", unit: "OZ", price: "" },
  ],
  comboDeals: [
    { id: "deal-1", quantity: "", price: "" },
    { id: "deal-2", quantity: "", price: "" },
  ],
  hasFlavors: false,
  flavors: [],
  ingredients: "",
  allergens: "",
  productImages: [],
};

function resolveInitialValues(
  initialValues?: Partial<AddProductFormValues>,
): AddProductFormValues {
  return {
    ...defaultFormValues,
    ...initialValues,
    packs: initialValues?.packs ?? defaultFormValues.packs,
    sizes: initialValues?.sizes ?? defaultFormValues.sizes,
    weights: initialValues?.weights ?? defaultFormValues.weights,
    comboDeals: initialValues?.comboDeals ?? defaultFormValues.comboDeals,
    hasFlavors: initialValues?.hasFlavors ?? defaultFormValues.hasFlavors,
    flavors: initialValues?.flavors ?? defaultFormValues.flavors,
  };
}

export default function AddProductModal({
  open,
  onClose,
  onSubmit,
  initialValues,
  submitLabel = "Add Product",
}: AddProductProps) {
  const resolvedInitialValues = resolveInitialValues(initialValues);
  const formResetKey = [
    resolvedInitialValues.productName,
    resolvedInitialValues.category,
    resolvedInitialValues.description,
    resolvedInitialValues.pricingType,
    resolvedInitialValues.productImages.map((f) => f.name).join(","),
  ].join("|");

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add New Product"
      contentClassName="w-[calc(100vw-1rem)] max-w-[calc(100vw-1rem)] gap-0 overflow-hidden rounded-[16px] border border-border/10 bg-background p-0 shadow-[0_24px_80px_rgba(61,44,30,0.18)] sm:w-full sm:max-w-[640px] md:max-w-[1080px] [&_[data-slot=dialog-header]]:border-b [&_[data-slot=dialog-header]]:border-black/6 [&_[data-slot=dialog-header]]:px-4 [&_[data-slot=dialog-header]]:pb-4 [&_[data-slot=dialog-header]]:pt-5 sm:[&_[data-slot=dialog-header]]:px-6 md:[&_[data-slot=dialog-header]]:px-8"
      titleClassName="pr-12 text-[26px] font-bold tracking-[-0.04em] text-dark md:text-[32px]"
      closeButtonClassname="right-4 top-5 size-9 md:right-6 md:top-6 md:size-10"
    >
      <AddProductForm
        key={formResetKey}
        initialValues={resolvedInitialValues}
        onSubmit={onSubmit}
        onCancel={onClose}
        submitLabel={submitLabel}
      />
    </Modal>
  );
}

export type { AddProductFormValues, AddProductProps } from "@/types/main";
