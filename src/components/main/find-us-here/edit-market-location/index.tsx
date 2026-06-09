"use client";

import Modal from "@/components/ui/modal";
import { useSingleMarket } from "@/hooks/api";
import type {
  EditMarketLocationFormValues,
  EditMarketLocationProps,
} from "@/types/main";
import { EditMarketLocationForm } from "./edit-market-location-form";
import { EditMarketLocationSkeleton } from "./edit-market-location-skeleton";

const defaultFormValues: EditMarketLocationFormValues = {
  marketName: "",
  tagLabel: "",
  date: "",
  day: "",
  startTime: "",
  endTime: "",
  locationAddress: "",
  mapLink: "",
  description: "",
  coverImage: null,
  existingImages: [],
};

function normalizeTimeValue(value?: string) {
  if (!value) {
    return "";
  }

  const matched = value.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!matched) {
    return value;
  }

  return `${matched[1].padStart(2, "0")}:${matched[2]} ${matched[3].toUpperCase()}`;
}

function splitMarketTime(time?: string) {
  const [startTime = "", endTime = ""] = (time ?? "").split(/\s*-\s*/);

  return {
    startTime: normalizeTimeValue(startTime),
    endTime: normalizeTimeValue(endTime),
  };
}

function EditMarketLocation({
  open,
  onClose,
  marketSlug,
  onSubmit,
}: EditMarketLocationProps) {
  const { data, isLoading } = useSingleMarket(open ? marketSlug : undefined);
  const market = data?.data;
  const marketTime = splitMarketTime(market?.time);

  const initialValues: EditMarketLocationFormValues = market
    ? {
        marketName: market.market_name,
        tagLabel: market.tag_label,
        date: market.date,
        day: market.day,
        startTime: marketTime.startTime,
        endTime: marketTime.endTime,
        locationAddress: market.location_address,
        mapLink: market.map_link ?? "",
        description: market.description,
        coverImage: null,
        existingImages: market.cover_images,
      }
    : defaultFormValues;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Edit Market Details"
      contentClassName="md:max-w-[880px] gap-0 overflow-hidden rounded-[32px] border border-border/10 bg-background p-0 shadow-[0_24px_80px_rgba(61,44,30,0.18)] [&_[data-slot=dialog-header]]:border-b [&_[data-slot=dialog-header]]:border-black/6 [&_[data-slot=dialog-header]]:px-6 [&_[data-slot=dialog-header]]:pb-6 [&_[data-slot=dialog-header]]:pt-6 md:[&_[data-slot=dialog-header]]:px-8"
      titleClassName="text-[24px] font-bold leading-8 tracking-normal text-dark"
    >
      {isLoading || !marketSlug || !market ? (
        <EditMarketLocationSkeleton />
      ) : (
        <EditMarketLocationForm
          marketSlug={marketSlug ?? ""}
          initialValues={initialValues}
          onSubmit={async (values) => {
            await onSubmit?.(values);
            onClose();
          }}
        />
      )}
    </Modal>
  );
}

export default EditMarketLocation;
