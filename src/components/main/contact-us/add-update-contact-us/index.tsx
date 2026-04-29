"use client";

import Modal from "@/components/ui/modal";
import { useContactDetails } from "@/hooks/api";
import { ContactInfoForm } from "./contact-info-form";
import { ContactInfoSkeleton } from "./contact-info-skeleton";

interface AddUpdateContactUsModalProps {
  open: boolean;
  onClose: () => void;
}

function AddUpdateContactUsModal({
  open,
  onClose,
}: AddUpdateContactUsModalProps) {
  const { data, isLoading } = useContactDetails();
  const contactInfo = data?.data?.contact_section ?? null;
  const hasContactData = Boolean(
    contactInfo?.contact_email ||
    contactInfo?.phone_number ||
    contactInfo?.location,
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={hasContactData ? "Edit Contact Data" : "Add Contact Data"}
      contentClassName="gap-0 overflow-hidden rounded-[32px] border border-border/10 bg-background p-0 shadow-[0_24px_80px_rgba(61,44,30,0.18)] md:max-w-3xl [&_[data-slot=dialog-header]]:border-b [&_[data-slot=dialog-header]]:border-black/6 [&_[data-slot=dialog-header]]:px-6 [&_[data-slot=dialog-header]]:pb-6 [&_[data-slot=dialog-header]]:pt-6 md:[&_[data-slot=dialog-header]]:px-8"
      titleClassName="text-[24px] font-bold leading-8 tracking-normal text-dark"
    >
      {isLoading ? (
        <ContactInfoSkeleton />
      ) : (
        <ContactInfoForm initialValues={contactInfo} onSaved={onClose} />
      )}
    </Modal>
  );
}

export default AddUpdateContactUsModal;
