"use client";

import Modal from "@/components/ui/modal";
import type { AdminSettingsUserData } from "@/interfaces/main/settings";
import { UpdateAccountForm } from "./update-account-form";

interface UpdateAccountDialogProps {
  open: boolean;
  user: AdminSettingsUserData | null;
  onClose: () => void;
}

export function UpdateAccountDialog({
  open,
  user,
  onClose,
}: UpdateAccountDialogProps) {
  if (!user) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Account Information"
      description="Update your personal account details below."
      contentClassName="sm:max-w-lg"
    >
      <UpdateAccountForm user={user} onUpdated={onClose} />
    </Modal>
  );
}
