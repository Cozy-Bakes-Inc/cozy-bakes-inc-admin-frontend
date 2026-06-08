"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { TriangleAlert } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import Modal from "@/components/ui/modal";
import { deleteMenuAPI } from "@/services/mutations/menu";

interface DeleteMenuModalProps {
  open: boolean;
  slug: string | null;
  title: string;
  onClose: () => void;
  onDeleted?: () => void | Promise<void>;
}

export function DeleteMenuModal({
  open,
  slug,
  title,
  onClose,
  onDeleted,
}: DeleteMenuModalProps) {
  const queryClient = useQueryClient();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (!slug || isDeleting) return;

    setIsDeleting(true);
    const result = await deleteMenuAPI(slug);
    setIsDeleting(false);

    if (result?.ok) {
      toast.success(result.message || "Menu deleted successfully");
      await queryClient.invalidateQueries({ queryKey: ["menu-list"] });
      await onDeleted?.();
      return;
    }

    toast.error(result?.message || "Failed to delete menu");
  }

  return (
    <Modal
      open={open}
      onClose={isDeleting ? () => undefined : onClose}
      contentClassName="w-[calc(100vw-1rem)] max-w-[calc(100vw-1rem)] gap-0 overflow-hidden rounded-[20px] border-0 bg-background p-0 shadow-[0_24px_80px_rgba(16,24,40,0.18)] sm:w-full sm:max-w-[537px]"
    >
      <div className="flex flex-col items-center justify-center px-7 py-10 text-center">
        <div className="mb-8 flex size-25 items-center justify-center rounded-full">
          <TriangleAlert className="size-19.5 text-primary" strokeWidth={1.9} />
        </div>

        <h2 className="text-[24px] font-semibold leading-8 text-dark">
          Delete Menu
        </h2>

        <p className="mt-2 max-w-115.75 text-[16px] font-medium leading-6 text-muted-text">
          Are you sure you want to delete menu{" "}
          <span className="font-semibold text-primary">{title}</span>? This
          action is permanent and cannot be undone.
        </p>

        <div className="mt-6 grid w-full gap-4 sm:grid-cols-2">
          <Button
            type="button"
            variant="ghost"
            disabled={isDeleting}
            onClick={onClose}
            className="h-13.5 rounded-[8px] bg-[#FFFCF5] text-[16px] font-medium text-primary shadow-[0_1px_2px_rgba(16,24,40,0.05)] hover:bg-[#FFFCF5]/80"
          >
            Close
          </Button>
          <Button
            type="button"
            disabled={isDeleting || !slug}
            onClick={handleDelete}
            className="h-13.5 rounded-[8px] bg-[#F04438] text-[16px] font-medium text-white shadow-[0_1px_2px_rgba(16,24,40,0.05)] hover:bg-[#F04438]/90"
          >
            {isDeleting ? <Loader /> : "Delete Menu"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
