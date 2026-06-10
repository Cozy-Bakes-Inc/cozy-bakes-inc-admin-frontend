"use client";

import Modal from "@/components/ui/modal";
import { Shimmer } from "@/components/ui/shimmer";
import { useMenuView } from "@/hooks/api/menu";
import type { Menu } from "@/types/main/menu";
import type { MenuFormValues } from "@/types/main/menu";
import { UpdateMenuForm } from "./update-menu-form";

function mapMenuToFormValues(menu: Menu): MenuFormValues {
  return {
    title: menu.title,
    description: menu.description,
    pdfFile: null,
    isActive: menu.is_active === "1",
  };
}

function UpdateMenuShimmer() {
  return (
    <div className="space-y-5 px-4 py-5 sm:px-6 md:space-y-6 md:px-8 md:py-6">
      <div className="grid gap-5 md:grid-cols-2">
        <Shimmer className="h-[46px] w-full rounded-[8px]" />
        <Shimmer className="h-[46px] w-full rounded-[8px]" />
      </div>
      <Shimmer className="h-[108px] w-full rounded-[8px]" />
      <Shimmer className="h-[72px] w-full rounded-[8px]" />
    </div>
  );
}

interface UpdateMenuModalProps {
  open: boolean;
  slug: string;
  onClose: () => void;
  onSubmit?: () => void | Promise<void>;
}

export function UpdateMenuModal({
  open,
  slug,
  onClose,
  onSubmit,
}: UpdateMenuModalProps) {
  const { data, isLoading } = useMenuView(slug);
  const menu = data?.data;
  const initialValues = menu ? mapMenuToFormValues(menu) : null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Edit Menu"
      contentClassName="w-[calc(100vw-1rem)] max-w-[calc(100vw-1rem)] gap-0 overflow-hidden rounded-[16px] border border-border/10 bg-background p-0 shadow-[0_24px_80px_rgba(61,44,30,0.18)] sm:w-full sm:max-w-[640px] [&_[data-slot=dialog-header]]:border-b [&_[data-slot=dialog-header]]:border-black/6 [&_[data-slot=dialog-header]]:px-4 [&_[data-slot=dialog-header]]:pb-4 [&_[data-slot=dialog-header]]:pt-5 sm:[&_[data-slot=dialog-header]]:px-6 md:[&_[data-slot=dialog-header]]:px-8"
      titleClassName="pr-12 text-[26px] font-bold tracking-[-0.04em] text-dark"
      closeButtonClassname="right-4 top-5 size-9"
    >
      {isLoading || !initialValues ? (
        <UpdateMenuShimmer />
      ) : (
        <UpdateMenuForm
          key={slug}
          slug={slug}
          initialValues={initialValues}
          existingPdfLink={menu?.pdf_file_link}
          onSubmit={onSubmit ?? onClose}
          onCancel={onClose}
        />
      )}
    </Modal>
  );
}
