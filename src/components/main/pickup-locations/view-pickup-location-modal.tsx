"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import Modal from "@/components/ui/modal";
import { Shimmer } from "@/components/ui/shimmer";
import { useSingleShop } from "@/hooks/api";
import { formatPhoneDisplay } from "@/lib/utils/phone";
import { PickupLocationStatusBadge } from "./pickup-location-status-badge";

interface ViewPickupLocationModalProps {
  open: boolean;
  slug: string | null;
  onClose: () => void;
}

function DetailRow({ label, value }: { label: string; value?: string | null }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase text-muted-text">{label}</p>
      <p className="mt-1 text-sm font-semibold leading-6 text-dark">
        {value || "N/A"}
      </p>
    </div>
  );
}

export function ViewPickupLocationModal({
  open,
  slug,
  onClose,
}: ViewPickupLocationModalProps) {
  const { data, isLoading } = useSingleShop(slug ?? "");
  const shop = data?.data;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Pickup Location Details"
      contentClassName="gap-0 overflow-hidden rounded-[16px] border border-border/10 bg-background p-0 shadow-[0_24px_80px_rgba(61,44,30,0.18)] sm:w-full sm:max-w-[760px] md:max-w-[920px] [&_[data-slot=dialog-header]]:border-b [&_[data-slot=dialog-header]]:border-black/6 [&_[data-slot=dialog-header]]:px-4 [&_[data-slot=dialog-header]]:pb-4 [&_[data-slot=dialog-header]]:pt-5 sm:[&_[data-slot=dialog-header]]:px-6 md:[&_[data-slot=dialog-header]]:px-8"
      titleClassName="text-lg md:text-[32px] font-bold tracking-[-0.04em] text-dark"
    >
      {isLoading || !shop ? (
        <div className="space-y-4 px-4 py-5 sm:px-6 md:px-8 md:py-6">
          <Shimmer className="h-12 rounded-lg" />
          <Shimmer className="h-24 rounded-lg" />
          <Shimmer className="h-24 rounded-lg" />
        </div>
      ) : (
        <div className="space-y-5 px-4 py-5 sm:px-6 md:px-8 md:py-6">
          <div className="rounded-2xl border border-primary/20 bg-bg-creamy/30 p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-xl font-bold text-dark">{shop.name}</h3>
                <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-muted-text">
                  {shop.store_description}
                </p>
              </div>
              <PickupLocationStatusBadge isActive={shop.is_active} />
            </div>
          </div>

          <div className="grid gap-4 rounded-2xl border border-border/10 bg-white p-5 md:grid-cols-2">
            <DetailRow label="Address" value={shop.address_line} />
            <DetailRow label="Apartment / Villa" value={shop.apt_villa} />
            <DetailRow
              label="Building / Cluster"
              value={shop.building_cluster}
            />
            <DetailRow label="Street / Landmark" value={shop.street_landmark} />
          </div>

          <div className="grid gap-4 rounded-2xl border border-border/10 bg-white p-5 md:grid-cols-2">
            <div className="flex gap-3">
              <Phone className="mt-1 size-4 text-primary" />
              <DetailRow label="Phone" value={formatPhoneDisplay(shop.phone_number)} />
            </div>
            <div className="flex gap-3">
              <Mail className="mt-1 size-4 text-primary" />
              <DetailRow label="Email" value={shop.email} />
            </div>
            <div className="flex gap-3 md:col-span-2">
              <MapPin className="mt-1 size-4 text-primary" />
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase text-muted-text">
                  Map Link
                </p>
                {shop.map_link ? (
                  <a
                    href={shop.map_link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 block break-words text-sm font-semibold leading-6 text-primary underline hover:text-primary/80"
                  >
                    {shop.map_link}
                  </a>
                ) : (
                  <p className="mt-1 text-sm font-semibold leading-6 text-dark">
                    N/A
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
