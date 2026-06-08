"use client";

import { FileText } from "lucide-react";
import Modal from "@/components/ui/modal";
import { Shimmer } from "@/components/ui/shimmer";
import { useMenuView } from "@/hooks/api/menu";
import { MenuStatusBadge } from "../list-menu/menu-status-badge";

interface MenuViewModalProps {
  slug: string | null;
  isOpen: boolean;
  onClose: () => void;
}

function MenuViewShimmer() {
  return (
    <div className="space-y-5 px-4 py-5 sm:px-6 md:space-y-6 md:px-8 md:py-6">
      <div className="grid gap-5 md:grid-cols-2">
        <Shimmer className="h-11.5 w-full rounded-[8px]" />
        <Shimmer className="h-6 w-24 rounded-full" />
      </div>
      <Shimmer className="h-22 w-full rounded-[8px]" />
      <Shimmer className="h-12 w-40 rounded-[8px]" />
    </div>
  );
}

function LabeledField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-text">
        {label}
      </p>
      <div className="text-sm font-medium text-dark">{children}</div>
    </div>
  );
}

export function MenuViewModal({ slug, isOpen, onClose }: MenuViewModalProps) {
  const querySlug = isOpen ? (slug ?? "") : "";
  const { data, isLoading } = useMenuView(querySlug);
  const menu = querySlug ? data?.data : undefined;

  if (!isOpen) return null;

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title="Menu Details"
      contentClassName="w-[calc(100vw-1rem)] max-w-[calc(100vw-1rem)] gap-0 overflow-hidden rounded-[16px] border border-border/10 bg-background p-0 shadow-[0_24px_80px_rgba(61,44,30,0.18)] sm:w-full sm:max-w-[640px] [&_[data-slot=dialog-header]]:border-b [&_[data-slot=dialog-header]]:border-black/6 [&_[data-slot=dialog-header]]:px-4 [&_[data-slot=dialog-header]]:pb-4 [&_[data-slot=dialog-header]]:pt-5 sm:[&_[data-slot=dialog-header]]:px-6 md:[&_[data-slot=dialog-header]]:px-8"
      titleClassName="pr-12 text-[26px] font-bold tracking-[-0.04em] text-dark"
    >
      {isLoading ? (
        <MenuViewShimmer />
      ) : menu ? (
        <div className="space-y-5 px-4 py-5 sm:px-6 md:space-y-6 md:px-8 md:py-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <LabeledField label="Title">{menu.title}</LabeledField>
            <LabeledField label="Status">
              <MenuStatusBadge isActive={menu.is_active as 0 | 1} />
            </LabeledField>
          </div>

          <LabeledField label="Description">
            <p className="leading-relaxed text-muted-text">{menu.description}</p>
          </LabeledField>

          <LabeledField label="PDF File">
            {menu.pdf_file_link ? (
              <a
                href={menu.pdf_file_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-[8px] border border-primary/30 bg-primary/5 px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
              >
                <FileText className="size-4" strokeWidth={2} />
                Open PDF
              </a>
            ) : (
              <span className="text-muted-text">No PDF attached</span>
            )}
          </LabeledField>

          <div className="border-t border-border/10 pt-4">
            <p className="text-xs text-muted-text">
              Created:{" "}
              {new Date(menu.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      ) : (
        <div className="px-4 py-10 text-center sm:px-6 md:px-8">
          <p className="text-base font-medium text-muted-text">
            Menu details not available.
          </p>
        </div>
      )}
    </Modal>
  );
}
