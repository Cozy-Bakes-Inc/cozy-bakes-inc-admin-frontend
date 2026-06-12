"use client";

import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Modal from "@/components/ui/modal";
import { createShop } from "@/services/mutations";
import type {
  PickupLocationFormValues,
  PickupLocationMutationPayload,
} from "@/types/main";
import { PickupLocationForm } from "./pickup-location-form";

interface AddPickupLocationModalProps {
  open: boolean;
  onClose: () => void;
}

const defaultFormValues: PickupLocationFormValues = {
  name: "",
  phoneNumber: "",
  email: "",
  addressLine: "",
  aptVilla: "",
  buildingCluster: "",
  streetLandmark: "",
  storeDescription: "",
  mapLink: "",
  latitude: "",
  longitude: "",
  isActive: true,
};

export function AddPickupLocationModal({
  open,
  onClose,
}: AddPickupLocationModalProps) {
  const queryClient = useQueryClient();

  async function handleCreate(payload: Partial<PickupLocationMutationPayload>) {
    const createPayload = { ...payload };

    for (const key of [
      "apt_villa",
      "building_cluster",
      "street_landmark",
    ] satisfies Array<keyof PickupLocationMutationPayload>) {
      if (!createPayload[key]?.trim()) {
        delete createPayload[key];
      }
    }

    const result = await createShop(
      createPayload as PickupLocationMutationPayload,
    );

    if (result?.ok) {
      toast.success(result.message || "Pickup location created successfully");
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["pickup-locations"] }),
        queryClient.invalidateQueries({ queryKey: ["pickup-analytics"] }),
      ]);
      onClose();
      return;
    }

    toast.error(result?.message || "Failed to create pickup location");
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add Pickup Location"
      contentClassName="gap-0 overflow-hidden rounded-[16px] border border-border/10 bg-background p-0 shadow-[0_24px_80px_rgba(61,44,30,0.18)] sm:w-full sm:max-w-[760px] md:max-w-[920px] [&_[data-slot=dialog-header]]:border-b [&_[data-slot=dialog-header]]:border-black/6 [&_[data-slot=dialog-header]]:px-4 [&_[data-slot=dialog-header]]:pb-4 [&_[data-slot=dialog-header]]:pt-5 sm:[&_[data-slot=dialog-header]]:px-6 md:[&_[data-slot=dialog-header]]:px-8"
      titleClassName="text-lg md:text-[32px] font-bold tracking-[-0.04em] text-dark"
    >
      <PickupLocationForm
        key={open ? "open" : "closed"}
        initialValues={defaultFormValues}
        submitLabel="Add Pickup Location"
        onCancel={onClose}
        onSubmit={handleCreate}
      />
    </Modal>
  );
}
