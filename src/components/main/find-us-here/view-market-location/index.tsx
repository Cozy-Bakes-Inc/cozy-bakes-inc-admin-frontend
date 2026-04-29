"use client";

import { format, isValid, parseISO } from "date-fns";
import Modal from "@/components/ui/modal";
import { Shimmer } from "@/components/ui/shimmer";
import { useSingleMarket } from "@/hooks/api";
import type { ViewMarketLocationProps } from "@/types/main";
import { ViewMarketLocationCoverImages } from "./view-market-location-cover-images";
import { ViewMarketLocationField } from "./view-market-location-field";

function formatMarketDate(date?: string) {
  if (!date) return "";

  const parsedDate = parseISO(date);
  return isValid(parsedDate) ? format(parsedDate, "dd MMM yyyy") : date;
}

function ViewMarketLocationSkeleton() {
  return (
    <div className="px-6 py-6 md:px-8">
      <div className="rounded-[24px] border border-primary/20 bg-background px-5 py-5 md:px-6">
        <div className="grid gap-5 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <Shimmer className="h-6 w-28 rounded-md" />
              <Shimmer className="h-[58px] w-full rounded-[8px]" />
            </div>
          ))}
        </div>
        <div className="mt-5 space-y-2">
          <Shimmer className="h-6 w-20 rounded-md" />
          <Shimmer className="h-[58px] w-full rounded-[8px]" />
        </div>
        <div className="mt-5 space-y-2">
          <Shimmer className="h-6 w-36 rounded-md" />
          <Shimmer className="h-[58px] w-full rounded-[8px]" />
        </div>
        <div className="mt-5 space-y-2">
          <Shimmer className="h-6 w-28 rounded-md" />
          <Shimmer className="h-[66px] w-full rounded-[8px]" />
        </div>
      </div>
    </div>
  );
}

function ViewMarketLocation({
  open,
  onClose,
  marketSlug,
}: ViewMarketLocationProps) {
  const { data, isLoading } = useSingleMarket(marketSlug);
  const market = data?.data;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Preview Market Details"
      contentClassName="md:max-w-[880px] gap-0 overflow-hidden rounded-[32px] border border-border/10 bg-background p-0 shadow-[0_24px_80px_rgba(61,44,30,0.18)] [&_[data-slot=dialog-header]]:border-b [&_[data-slot=dialog-header]]:border-black/6 [&_[data-slot=dialog-header]]:px-6 [&_[data-slot=dialog-header]]:pb-6 [&_[data-slot=dialog-header]]:pt-6 md:[&_[data-slot=dialog-header]]:px-8"
      titleClassName="text-[24px] font-bold leading-8 tracking-normal text-dark"
    >
      {isLoading ? (
        <ViewMarketLocationSkeleton />
      ) : (
        <div className="px-6 py-6 md:px-8">
          <div className="rounded-[24px] border border-primary/20 bg-background px-5 py-5 md:px-6">
            <div className="grid gap-5 md:grid-cols-2">
              <ViewMarketLocationField
                label="Market Name"
                value={market?.market_name}
              />
              <ViewMarketLocationField
                label="Tag/Label"
                value={market?.tag_label}
              />
              <ViewMarketLocationField
                label="Date"
                value={formatMarketDate(market?.date)}
              />
              <ViewMarketLocationField label="Day" value={market?.day} />
            </div>

            <div className="mt-5">
              <ViewMarketLocationField label="Time" value={market?.time} />
            </div>

            <div className="mt-5">
              <ViewMarketLocationField
                label="Location Address"
                value={market?.location_address}
              />
            </div>

            <div className="mt-5">
              <ViewMarketLocationField
                label="Description"
                value={market?.description}
                multiline
              />
            </div>

            <div className="mt-5">
              <ViewMarketLocationCoverImages
                images={market?.cover_images}
                marketName={market?.market_name}
              />
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}

export default ViewMarketLocation;
