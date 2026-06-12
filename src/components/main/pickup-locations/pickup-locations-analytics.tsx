import { MapPin, Store, ToggleLeft, ToggleRight } from "lucide-react";
import { Shimmer } from "@/components/ui/shimmer";
import type { PickupLocationsAnalytics as PickupLocationsAnalyticsData } from "@/types/main";

interface PickupLocationsAnalyticsProps {
  data?: PickupLocationsAnalyticsData;
  isLoading?: boolean;
}

export function PickupLocationsAnalytics({
  data,
  isLoading,
}: PickupLocationsAnalyticsProps) {
  if (isLoading) {
    return (
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-border/10 bg-white px-4 py-4"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-2">
                <Shimmer className="h-3 w-24 rounded-md" />
                <Shimmer className="h-8 w-16 rounded-md" />
              </div>
              <Shimmer className="size-11 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  const items = [
    {
      label: "Total Shops",
      value: data?.data?.total_shops ?? 0,
      icon: Store,
    },
    {
      label: "Active Shops",
      value: data?.data?.active_shops ?? 0,
      icon: ToggleRight,
    },
    {
      label: "Inactive Shops",
      value: data?.data?.inactive_shops ?? 0,
      icon: ToggleLeft,
    },
    {
      label: "Active Rate",
      value: `${data?.data?.active_percentage ?? 0}%`,
      icon: MapPin,
    },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.label}
            className="rounded-2xl border border-border/10 bg-white px-4 py-4"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase text-muted-text">
                  {item.label}
                </p>
                <p className="mt-1 text-2xl font-bold text-dark">
                  {item.value}
                </p>
              </div>
              <span className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-5" strokeWidth={2.1} />
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
