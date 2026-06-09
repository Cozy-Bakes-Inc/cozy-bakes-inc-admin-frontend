"use client";

import type { DashboardCategoryTone } from "@/types/main/dashboard";
import { useSaleOverviewChart } from "@/hooks/api";
import { Shimmer } from "@/components/ui/shimmer";
import { DashboardSectionCard } from "./dashboard-shared";

const tones: DashboardCategoryTone[] = ["primary", "secondary", "light", "taupe"];

const toneClassMap: Record<DashboardCategoryTone, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  light: "text-light-chocolate",
  taupe: "text-taupe-brown",
};

const segmentColors: Record<DashboardCategoryTone, string> = {
  primary: "var(--color-primary)",
  secondary: "var(--color-secondary)",
  light: "var(--color-light-chocolate)",
  taupe: "var(--color-taupe-brown)",
};

export function DashboardCategoryChart() {
  const { data, isLoading } = useSaleOverviewChart();
  const salesByCategory = data?.data?.sales_by_category;
  const labels = salesByCategory?.labels ?? [];
  const percentages = salesByCategory?.percentages ?? [];

  const segments = labels.map((label, index) => ({
    name: label,
    value: percentages[index] ?? 0,
    tone: tones[index % tones.length],
  }));

  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const chartSegments = segments.reduce<
    Array<{ dash: number; name: string; strokeDashoffset: number; tone: DashboardCategoryTone }>
  >((acc, segment) => {
    const dash = (segment.value / 100) * circumference;
    const previousOffset = acc.at(-1)?.strokeDashoffset ?? 0;
    acc.push({ dash, name: segment.name, strokeDashoffset: previousOffset - dash, tone: segment.tone });
    return acc;
  }, []);

  const topSegment = segments[0];

  return (
    <DashboardSectionCard
      title="Sales by Category"
      description="This month&apos;s distribution"
      className="min-h-80 md:min-h-107.5"
    >
      {isLoading ? (
        <Shimmer className="mt-3 h-65 w-full rounded-[20px] md:h-87.5" />
      ) : segments.length === 0 ? (
        <div className="mt-3 flex h-65 items-center justify-center rounded-[20px] bg-bg-creamy text-sm font-medium text-gray md:h-87.5">
          No category data available.
        </div>
      ) : (
        <>
          <div className="relative mx-auto mt-2 flex w-full max-w-62.5 justify-center sm:max-w-72.5">
            <svg
              viewBox="0 0 180 180"
              className="size-45 sm:size-55"
              role="img"
              aria-label="Sales by category chart"
            >
              <circle
                cx="90"
                cy="90"
                r={radius}
                fill="none"
                stroke="var(--color-bg-creamy)"
                strokeWidth="22"
              />

              <g transform="rotate(-90 90 90)">
                {chartSegments.map((segment) => (
                  <circle
                    key={segment.name}
                    cx="90"
                    cy="90"
                    r={radius}
                    fill="none"
                    stroke={segmentColors[segment.tone]}
                    strokeWidth="22"
                    strokeDasharray={`${segment.dash} ${circumference - segment.dash}`}
                    strokeDashoffset={segment.strokeDashoffset + segment.dash}
                    strokeLinecap="butt"
                  />
                ))}
              </g>

              <circle cx="90" cy="90" r="38" className="fill-white" />
            </svg>

            {topSegment && (
              <div className="absolute right-0 top-3 rounded-[14px] bg-bg-creamy px-2.5 py-1.5 text-[11px] shadow-[0_10px_24px_rgba(209,150,40,0.12)] sm:top-4 sm:rounded-[16px] sm:px-3 sm:py-2 sm:text-xs">
                <p className="text-[11px] font-bold text-dark md:text-xs">{topSegment.name}</p>
                <p className="mt-0.5 text-[11px] font-semibold text-primary md:text-xs">
                  Sales: {topSegment.value}%
                </p>
              </div>
            )}
          </div>

          <div className="mt-3 space-y-2.5 sm:space-y-3">
            {segments.map((segment) => (
              <div key={segment.name} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className={`size-2.5 rounded-full ${toneClassMap[segment.tone]} bg-current`} />
                  <span className="text-xs font-medium text-taupe-brown md:text-sm">
                    {segment.name}
                  </span>
                </div>
                <span className="text-xs font-semibold text-gray md:text-sm">{segment.value}%</span>
              </div>
            ))}
          </div>
        </>
      )}
    </DashboardSectionCard>
  );
}
