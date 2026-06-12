"use client";

import Modal from "@/components/ui/modal";
import type { AdminSettingsShopData } from "@/interfaces/main/settings";
import { UpdateCompanyForm } from "./update-company-form";

interface UpdateCompanyDialogProps {
  open: boolean;
  shop: AdminSettingsShopData | null;
  onClose: () => void;
}

export function UpdateCompanyDialog({
  open,
  shop,
  onClose,
}: UpdateCompanyDialogProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Store Information"
      titleClassName="px-4 pt-4 text-lg font-bold"
      description="Update your store details, address, and location coordinates."
      descriptionClassName="px-4"
      contentClassName="sm:max-w-4xl p-0 gap-0 overflow-hidden"
    >
      <UpdateCompanyForm shop={shop} onUpdated={onClose} />
    </Modal>
  );
}
