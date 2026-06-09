"use client";

import { DashboardSectionCard } from "./dashboard-shared";
import { useSaleOverviewChart } from "@/hooks/api";
import { DashboardChartsData } from "@/interfaces";
import { Shimmer } from "@/components/ui/shimmer";

const chartHeight = 280;
const chartWidth = 560;
const padding = { top: 22, right: 18, bottom: 42, left: 44 };
const defaultYTicks = 5;

function getPointX(index: number, pointsCount: number) {
  const usableWidth = chartWidth - padding.left - padding.right;
  if (pointsCount <= 1) {
    return padding.left + usableWidth / 2;
  }

  return padding.left + (usableWidth / (pointsCount - 1)) * index;
}

function getPointY(value: number, maxValue: number) {
  const usableHeight = chartHeight - padding.top - padding.bottom;
  if (maxValue <= 0) {
    return padding.top + usableHeight;
  }

  return padding.top + usableHeight - (value / maxValue) * usableHeight;
}

export function DashboardSalesOverview() {
  const { data, isLoading } = useSaleOverviewChart();
  const chartData: DashboardChartsData | undefined = data?.data;
  const salesOverview = chartData?.sales_overview;
  const labels = salesOverview?.labels ?? [];
  const revenues = salesOverview?.revenues ?? [];
  const pointsCount = Math.min(labels.length, revenues.length);
  console.log(data);
  const maxRevenue = pointsCount
    ? Math.max(...revenues.slice(0, pointsCount), 0)
    : 0;
  const chartMaxValue = maxRevenue > 0 ? Math.ceil(maxRevenue * 1.1) : 100;
  const yTicks = Array.from({ length: defaultYTicks }, (_, index) =>
    Math.round((chartMaxValue / (defaultYTicks - 1)) * index),
  );

  const chartPoints = Array.from({ length: pointsCount }, (_, index) => ({
    day: labels[index],
    value: revenues[index],
    x: getPointX(index, pointsCount),
    y: getPointY(revenues[index], chartMaxValue),
  }));

  const chartPath = chartPoints
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  const highlightedIndex = chartPoints.findLastIndex(
    (point) => point.value > 0,
  );
  const safeHighlightedIndex =
    highlightedIndex >= 0 ? highlightedIndex : Math.floor(pointsCount / 2);
  const highlightedPoint = chartPoints[safeHighlightedIndex];

  return (
    <DashboardSectionCard
      title="Sales Overview"
      description="Daily performance this week"
      className="min-h-80 md:min-h-107.5"
    >
      <div className="flex justify-start sm:justify-end">
        <div className="inline-flex items-center gap-2 rounded-full bg-bg-creamy px-3 py-1.5 text-xs font-semibold text-chocolate">
          <span className="size-2 rounded-full bg-primary" />
          Revenue
        </div>
      </div>

      {isLoading ? (
        <Shimmer className="mt-3 h-55 w-full rounded-[20px] sm:h-65 md:h-75" />
      ) : chartPoints.length > 0 ? (
        <div className="-mx-1 mt-3 overflow-x-auto px-1">
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="h-55 min-w-90 w-full sm:h-65 sm:min-w-105 md:h-75 md:min-w-130"
            role="img"
            aria-label="Weekly sales overview chart"
          >
            {yTicks.map((tick) => {
              const y = getPointY(tick, chartMaxValue);
              return (
                <g key={tick}>
                  <line
                    x1={padding.left}
                    y1={y}
                    x2={chartWidth - padding.right}
                    y2={y}
                    className="stroke-border/60"
                    strokeDasharray="4 5"
                  />
                  <text
                    x={padding.left - 14}
                    y={y + 4}
                    textAnchor="end"
                    className="fill-gray text-[11px] font-semibold"
                  >
                    {tick}
                  </text>
                </g>
              );
            })}

            {highlightedPoint ? (
              <>
                <line
                  x1={highlightedPoint.x}
                  y1={highlightedPoint.y}
                  x2={highlightedPoint.x}
                  y2={chartHeight - padding.bottom}
                  className="stroke-primary/60"
                  strokeDasharray="4 5"
                />

                <g
                  transform={`translate(${highlightedPoint.x - 58} ${highlightedPoint.y - 66})`}
                >
                  <rect
                    width="116"
                    height="48"
                    rx="14"
                    className="fill-bg-creamy stroke-primary/15"
                    strokeWidth="1"
                  />
                  <text
                    x="12"
                    y="20"
                    className="fill-dark text-[11px] font-bold"
                  >
                    {highlightedPoint.day}
                  </text>
                  <text
                    x="12"
                    y="36"
                    className="fill-primary text-[11px] font-semibold"
                  >
                    {`Revenue: $${highlightedPoint.value}`}
                  </text>
                </g>
              </>
            ) : null}

            <path
              d={chartPath}
              fill="none"
              className="stroke-primary"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {chartPoints.map((point) => (
              <g key={`${point.day}-${point.x}`}>
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="5.5"
                  className="fill-primary stroke-white"
                  strokeWidth="3"
                />
                <text
                  x={point.x}
                  y={chartHeight - 12}
                  textAnchor="middle"
                  className="fill-gray text-[11px] font-semibold"
                >
                  {point.day}
                </text>
              </g>
            ))}
          </svg>
        </div>
      ) : (
        <div className="mt-3 flex h-55 items-center justify-center rounded-[20px] bg-bg-creamy text-sm font-medium text-gray sm:h-65 md:h-75">
          No sales data available.
        </div>
      )}
    </DashboardSectionCard>
  );
}
