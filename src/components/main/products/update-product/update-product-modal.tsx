"use client";

import Modal from "@/components/ui/modal";
import { Shimmer } from "@/components/ui/shimmer";
import { useProduct } from "@/hooks/api";
import { mapProductToFormValues } from "./update-product-validation";
import { UpdateProductForm } from "./update-product-form";

interface UpdateProductModalProps {
  open: boolean;
  slug: string;
  onClose: () => void;
  onSubmit?: () => void | Promise<void>;
}

function UpdateProductShimmer() {
  return (
    <div className="space-y-5 px-4 py-5 sm:px-6 md:space-y-6 md:px-8 md:py-6">
      <div className="grid gap-5 md:grid-cols-2">
        <Shimmer className="h-[56px] w-full rounded-[8px]" />
        <Shimmer className="h-[56px] w-full rounded-[8px]" />
      </div>
      <Shimmer className="h-[108px] w-full rounded-[8px]" />
      <div className="border-t border-[#E4E7EC] pt-6">
        <Shimmer className="mb-3 h-5 w-32 rounded-[6px]" />
        <div className="grid grid-cols-1 gap-3 min-[430px]:grid-cols-2 md:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Shimmer key={i} className="h-[78px] rounded-[8px] sm:h-[94px]" />
          ))}
        </div>
      </div>
      <Shimmer className="h-[72px] w-full rounded-[8px]" />
      <Shimmer className="h-[72px] w-full rounded-[8px]" />
      <Shimmer className="h-[72px] w-full rounded-[8px]" />
      <Shimmer className="h-[72px] w-full rounded-[8px]" />
      <Shimmer className="aspect-[4/3] max-w-[260px] rounded-[10px]" />
    </div>
  );
}

export function UpdateProductModal({
  open,
  slug,
  onClose,
  onSubmit,
}: UpdateProductModalProps) {
  const { data, isLoading } = useProduct(slug);

  const initialValues = data?.data ? mapProductToFormValues(data.data) : null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Edit Product"
      contentClassName="max-h-[calc(100svh-1rem)] w-[calc(100vw-1rem)] max-w-[calc(100vw-1rem)] gap-0 overflow-hidden rounded-[16px] border border-border/10 bg-background p-0 shadow-[0_24px_80px_rgba(61,44,30,0.18)] sm:w-full sm:max-h-[calc(100svh-2rem)] sm:max-w-[640px] md:max-w-[1080px] [&_[data-slot=dialog-header]]:border-b [&_[data-slot=dialog-header]]:border-black/6 [&_[data-slot=dialog-header]]:px-4 [&_[data-slot=dialog-header]]:pb-4 [&_[data-slot=dialog-header]]:pt-5 [&_[data-slot=scroll-area]]:max-h-[calc(100svh-6rem)] sm:[&_[data-slot=dialog-header]]:px-6 sm:[&_[data-slot=scroll-area]]:max-h-[calc(100svh-8rem)] md:[&_[data-slot=dialog-header]]:px-8"
      titleClassName="pr-12 text-[26px] font-bold tracking-[-0.04em] text-dark md:text-[32px]"
    >
      {isLoading || !initialValues ? (
        <UpdateProductShimmer />
      ) : (
        <UpdateProductForm
          key={slug}
          slug={slug}
          initialValues={initialValues}
          onSubmit={onSubmit ?? onClose}
          onCancel={onClose}
        />
      )}
    </Modal>
  );
}
