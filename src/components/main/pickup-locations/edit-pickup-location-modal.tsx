"use client";

import { useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Modal from "@/components/ui/modal";
import { Shimmer } from "@/components/ui/shimmer";
import { useSingleShop } from "@/hooks/api";
import { formatPhoneInput } from "@/lib/utils/phone";
import { updateShop } from "@/services/mutations";
import type {
  PickupLocationFormValues,
  PickupLocationMutationPayload,
  PickupLocationShopDetails,
} from "@/types/main";
import { PickupLocationForm } from "./pickup-location-form";

interface EditPickupLocationModalProps {
  open: boolean;
  slug: string | null;
  onClose: () => void;
}

function mapShopToFormValues(
  shop: PickupLocationShopDetails,
): PickupLocationFormValues {
  return {
    name: shop.name,
    phoneNumber: formatPhoneInput(shop.phone_number),
    email: shop.email,
    addressLine: shop.address_line,
    aptVilla: shop.apt_villa ?? "",
    buildingCluster: shop.building_cluster ?? "",
    streetLandmark: shop.street_landmark ?? "",
    storeDescription: shop.store_description,
    mapLink: shop.map_link ?? "",
    latitude: shop.latitude ?? "",
    longitude: shop.longitude ?? "",
    isActive: Boolean(shop.is_active),
  };
}

export function EditPickupLocationModal({
  open,
  slug,
  onClose,
}: EditPickupLocationModalProps) {
  const queryClient = useQueryClient();
  const { data, isLoading } = useSingleShop(slug ?? "");
  const shop = data?.data;
  const initialValues = useMemo(
    () => (shop ? mapShopToFormValues(shop) : null),
    [shop],
  );

  async function handleUpdate(payload: Partial<PickupLocationMutationPayload>) {
    if (!slug) {
      return;
    }

    const result = await updateShop(slug, payload);

    if (result?.ok) {
      toast.success(result.message || "Pickup location updated successfully");
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["pickup-locations"] }),
        queryClient.invalidateQueries({ queryKey: ["pickup-location", slug] }),
        queryClient.invalidateQueries({ queryKey: ["pickup-analytics"] }),
      ]);
      onClose();
      return;
    }

    toast.error(result?.message || "Failed to update pickup location");
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Edit Pickup Location"
      contentClassName="gap-0 overflow-hidden rounded-[16px] border border-border/10 bg-background p-0 shadow-[0_24px_80px_rgba(61,44,30,0.18)] sm:w-full sm:max-w-[760px] md:max-w-[920px] [&_[data-slot=dialog-header]]:border-b [&_[data-slot=dialog-header]]:border-black/6 [&_[data-slot=dialog-header]]:px-4 [&_[data-slot=dialog-header]]:pb-4 [&_[data-slot=dialog-header]]:pt-5 sm:[&_[data-slot=dialog-header]]:px-6 md:[&_[data-slot=dialog-header]]:px-8"
      titleClassName="text-lg md:text-[32px] font-bold tracking-[-0.04em] text-dark"
    >
      {isLoading || !initialValues ? (
        <div className="space-y-4 px-4 py-5 sm:px-6 md:px-8 md:py-6">
          <Shimmer className="h-12 rounded-lg" />
          <Shimmer className="h-12 rounded-lg" />
          <Shimmer className="h-28 rounded-lg" />
        </div>
      ) : (
        <PickupLocationForm
          key={slug ?? "edit-pickup-location"}
          initialValues={initialValues}
          submitChangedOnly
          submitLabel="Edit Pickup Location"
          onCancel={onClose}
          onSubmit={handleUpdate}
        />
      )}
    </Modal>
  );
}
