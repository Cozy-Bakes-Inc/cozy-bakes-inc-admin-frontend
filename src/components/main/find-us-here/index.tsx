"use client";

import { Store } from "lucide-react";
import { useMemo, useState } from "react";
import {
  findUsHereSummaryMetrics,
  findUsHereWorkspace,
} from "@/data/main/find-us-here";
import type {
  FindUsHereMarketApiItem,
  FindUsHereMarketDay,
  FindUsHereMarketDayApiItem,
} from "@/interfaces/main/find-us-here";
import { useMarketListByDay } from "@/hooks/api";
import { Shimmer } from "@/components/ui/shimmer";
import AddMarketLocation from "./add-market-location";
import { FindUsHereDaySection } from "./find-us-here-day-section";
import { FindUsHereHeader } from "./find-us-here-header";
import { FindUsHereSummaryGrid } from "./find-us-here-summary-grid";

function formatMarketSchedule(market: FindUsHereMarketApiItem) {
  const parsedDate = new Date(market.date);

  if (Number.isNaN(parsedDate.getTime())) {
    return `${market.day} · ${market.time}`;
  }

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(parsedDate);

  return `${market.day} · ${formattedDate} · ${market.time}`;
}

function mapMarketDayToUiDay(
  day: FindUsHereMarketDayApiItem,
  index: number,
): FindUsHereMarketDay {
  return {
    id: day.day.toLowerCase(),
    label: day.day,
    scheduledSummary: `${day.total_markets} market${day.total_markets === 1 ? "" : "s"} scheduled`,
    defaultExpanded: index === 0,
    locations: day.markets.map((market) => ({
      id: market.slug,
      title: market.market_name,
      badge: market.tag_label,
      description: market.description,
      schedule: formatMarketSchedule(market),
      address: market.location_address,
      imageSrc: market.cover_images[0] ?? "",
      imageAlt: market.market_name,
    })),
  };
}

function FindUsHere() {
  const { data, isLoading } = useMarketListByDay();
  const marketDays = useMemo(() => {
    const apiDays = data?.data;
    if (!apiDays) return [];
    return apiDays.map(mapMarketDayToUiDay);
  }, [data]);
  const defaultExpandedDayIds = useMemo(
    () => marketDays.filter((day) => day.defaultExpanded).map((day) => day.id),
    [marketDays],
  );
  const [expandedDayIds, setExpandedDayIds] = useState<string[] | null>(null);
  const [isAddMarketLocationOpen, setIsAddMarketLocationOpen] = useState(false);
  const resolvedExpandedDayIds = expandedDayIds ?? defaultExpandedDayIds;

  const handleToggleDay = (dayId: string) => {
    setExpandedDayIds((currentDayIds) =>
      (currentDayIds ?? defaultExpandedDayIds).includes(dayId)
        ? (currentDayIds ?? defaultExpandedDayIds).filter(
            (currentDayId) => currentDayId !== dayId,
          )
        : [...(currentDayIds ?? defaultExpandedDayIds), dayId],
    );
  };

  return (
    <section className="space-y-4 md:space-y-6">
      <FindUsHereHeader
        title={findUsHereWorkspace.title}
        description={findUsHereWorkspace.description}
        primaryActionLabel={findUsHereWorkspace.primaryActionLabel}
        onPrimaryActionClick={() => setIsAddMarketLocationOpen(true)}
      />

      <FindUsHereSummaryGrid metrics={findUsHereSummaryMetrics} />

      <div className="space-y-4">
        {isLoading
          ? Array.from({ length: 2 }).map((_, index) => (
              <div
                key={index}
                className="rounded-2xl border border-primary/15 bg-[#fbf8eb4d] p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)]"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <Shimmer className="size-12 rounded-[14px]" />
                    <div className="space-y-2">
                      <Shimmer className="h-7 w-36 rounded-md" />
                      <Shimmer className="h-5 w-32 rounded-md" />
                    </div>
                  </div>
                  <Shimmer className="size-9 rounded-[10px]" />
                </div>

                <div className="mt-6 space-y-6">
                  <Shimmer className="h-[420px] w-full rounded-2xl" />
                </div>
              </div>
            ))
          : marketDays.length === 0
            ? (
                <div className="flex min-h-[170px] flex-col items-center justify-center rounded-2xl border border-primary/15 bg-[#fbf8eb4d] p-10 text-center shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
                  <span className="inline-flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Store className="size-8" strokeWidth={2} />
                  </span>
                  <p className="mt-4 text-xl font-semibold text-dark">
                    No markets scheduled yet
                  </p>
                  <p className="mt-2 text-sm font-medium text-muted-text">
                    Add a market location to start organizing your weekly schedule.
                  </p>
                </div>
              )
            : marketDays.map((day) => (
                <FindUsHereDaySection
                  key={day.id}
                  day={day}
                  expanded={resolvedExpandedDayIds.includes(day.id)}
                  onToggle={handleToggleDay}
                />
              ))}
      </div>

      <AddMarketLocation
        open={isAddMarketLocationOpen}
        onClose={() => setIsAddMarketLocationOpen(false)}
        onSubmit={async () => {
          setIsAddMarketLocationOpen(false);
        }}
      />
    </section>
  );
}

export default FindUsHere;
