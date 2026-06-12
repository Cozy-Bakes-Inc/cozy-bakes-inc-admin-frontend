"use client";

import Modal from "@/components/ui/modal";
import type { AdminDeliverySettingsData } from "@/interfaces/main/settings";
import { UpdateDeliveryForm } from "./update-delivery-form";

interface UpdateDeliveryDialogProps {
  open: boolean;
  delivery: AdminDeliverySettingsData | null | undefined;
  onClose: () => void;
}

export function UpdateDeliveryDialog({
  open,
  delivery,
  onClose,
}: UpdateDeliveryDialogProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Delivery Settings"
      titleClassName="font-bold text-lg"
      description="Set the delivery fee and maximum delivery radius."
      contentClassName="sm:max-w-md"
    >
      <UpdateDeliveryForm delivery={delivery ?? null} onUpdated={onClose} />
    </Modal>
  );
}
