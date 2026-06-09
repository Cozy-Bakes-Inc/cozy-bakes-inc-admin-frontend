"use client";

import { cn } from "@/lib/utils";
import { categoryShares, segmentToneMeta } from "./reports-data";
import { ReportsDonutChart } from "./reports-donut-chart";
import { ReportsSalesOverviewChart } from "./reports-sales-overview-chart";
import { ReportsSection } from "./reports-section";
import { useReportsSaleOverviewChart } from "@/hooks/api/reports";
import { Shimmer } from "@/components/ui/shimmer";

const TONES = Object.keys(segmentToneMeta) as Array<keyof typeof segmentToneMeta>;

export function ReportsOverviewRow() {
  const { data, isLoading } = useReportsSaleOverviewChart();

  const salesByCategory = data?.data?.sales_by_category;
  const hasCategoryData =
    salesByCategory !== undefined &&
    salesByCategory.labels.length > 0 &&
    salesByCategory.labels.length === salesByCategory.percentages.length;

  const categoryItems = hasCategoryData
    ? salesByCategory.labels.map((label: string, index: number) => ({
        label,
        value: salesByCategory.percentages[index] ?? 0,
        tone: TONES[index % TONES.length],
      }))
    : categoryShares;

  const topCategory = categoryItems[0];
  const innerLabel = topCategory
    ? `${topCategory.label} ${topCategory.value}%`
    : "Breads 35%";

  return (
    <div className="grid gap-4 2xl:grid-cols-[minmax(0,1.8fr)_minmax(280px,0.8fr)]">
      <div className="min-w-0">
        <ReportsSection
          title="Sales Overview"
          description="Daily performance this week"
          actions={
            <div className="inline-flex items-center gap-2 rounded-full bg-[#FFF7E7] px-3 py-1.5 text-xs font-semibold text-chocolate">
              <span className="size-2 rounded-full bg-primary" />
              Revenue
            </div>
          }
        >
          <ReportsSalesOverviewChart />
        </ReportsSection>
      </div>

      <div className="min-w-0">
        <ReportsSection
          title="Sales by Category"
          description="This month's distribution"
        >
          {isLoading ? (
            <Shimmer className="h-[280px] w-full rounded-2xl" />
          ) : (
            <div className="flex flex-col items-center gap-5 sm:gap-6">
              <ReportsDonutChart
                items={categoryItems.map((item) => ({
                  value: item.value,
                  color: segmentToneMeta[item.tone].color,
                }))}
                innerLabel={innerLabel}
                size={164}
              />

              <div className="w-full space-y-3">
                {categoryItems.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "size-2.5 rounded-full",
                          segmentToneMeta[item.tone].bulletClassName,
                        )}
                      />
                      <span className="text-sm font-medium text-dark">
                        {item.label}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-muted-text">
                      {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </ReportsSection>
      </div>
    </div>
  );
}
