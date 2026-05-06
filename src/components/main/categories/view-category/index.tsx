"use client";

import Modal from "@/components/ui/modal";
import { useSubCategory } from "@/hooks/api";
import { ViewCategoryContent } from "./view-category-content";
import { ViewCategoryShimmer } from "./view-category-shimmer";

interface ViewCategoryProps {
  open: boolean;
  slug: string | null;
  onClose: () => void;
}

export default function ViewCategory({
  open,
  slug,
  onClose,
}: ViewCategoryProps) {
  const { data, isLoading } = useSubCategory(slug ?? "");
  const category = data?.data?.sub_category;
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Category Details"
      contentClassName="gap-0 overflow-hidden rounded-[16px] border border-border/10 bg-background p-0 shadow-[0_24px_80px_rgba(61,44,30,0.18)] sm:w-full sm:max-w-[640px] [&_[data-slot=dialog-header]]:border-b [&_[data-slot=dialog-header]]:border-black/6 [&_[data-slot=dialog-header]]:px-4 [&_[data-slot=dialog-header]]:pb-4 [&_[data-slot=dialog-header]]:pt-5 sm:[&_[data-slot=dialog-header]]:px-6 md:[&_[data-slot=dialog-header]]:px-8"
      titleClassName="text-lg md:text-[32px] font-bold tracking-[-0.04em] text-dark"
    >
      {isLoading || !category ? (
        <ViewCategoryShimmer />
      ) : (
        <ViewCategoryContent category={category} />
      )}
    </Modal>
  );
}
