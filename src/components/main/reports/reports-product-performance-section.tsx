"use client";

import { useSalesPerformance } from "@/hooks/api";
import { Shimmer } from "@/components/ui/shimmer";
import { productPerformanceRows } from "./reports-data";
import { ReportsSection } from "./reports-section";
import type { ReportProductPerformance } from "@/interfaces/main/reports";
import { useMemo } from "react";

export function ReportsProductPerformanceSection() {
  const { data, isLoading } = useSalesPerformance();
  const salesPerformanceData = useMemo(
    () => data?.pages?.flatMap((page) => page?.data?.data ?? []) ?? [],
    [data],
  );
  const resolvedRows: ReportProductPerformance[] =
    salesPerformanceData.length > 0
      ? salesPerformanceData.map((row) => ({
          productName: row.product_name,
          unitsSold: `${row.units_sold} units`,
          totalRevenue: `$${row.total_revenue}`,
          avgPrice: `$${row.avg_price}`,
          performance: row.performance_percentage,
        }))
      : productPerformanceRows;

  return (
    <ReportsSection
      title="Sales Product Performance Details"
      description="Product-level sales contribution"
    >
      <div className="overflow-x-auto rounded-[12px] border border-border/10">
        <table className="min-w-[760px] w-full border-separate border-spacing-0 text-left">
          <thead>
            <tr className="bg-[#FFF8E8] text-dark">
              <th className="px-4 py-4 text-xs font-semibold">Product Name</th>
              <th className="px-4 py-4 text-xs font-semibold">Units Sold</th>
              <th className="px-4 py-4 text-xs font-semibold">Total Revenue</th>
              <th className="px-4 py-4 text-xs font-semibold">Avg. Price</th>
              <th className="px-4 py-4 text-xs font-semibold">Performance</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={index} className="border-t border-border/10 bg-white">
                  <td className="px-4 py-4">
                    <Shimmer className="h-4 w-32 rounded-md" />
                  </td>
                  <td className="px-4 py-4">
                    <Shimmer className="h-4 w-20 rounded-md" />
                  </td>
                  <td className="px-4 py-4">
                    <Shimmer className="h-4 w-24 rounded-md" />
                  </td>
                  <td className="px-4 py-4">
                    <Shimmer className="h-4 w-20 rounded-md" />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <Shimmer className="h-2 w-28 rounded-full" />
                      <Shimmer className="h-4 w-10 rounded-md" />
                    </div>
                  </td>
                </tr>
              ))
            ) : salesPerformanceData.length === 0 ? (
              <tr className="border-t border-border/10 bg-white">
                <td colSpan={5} className="px-4 py-14 text-center">
                  <div className="mx-auto max-w-md space-y-2">
                    <p className="text-base font-semibold text-[#2C4B7A]">
                      No product performance data available.
                    </p>
                    <p className="text-sm text-[#6B5B4C] opacity-80">
                      Product performance data will appear here once sales are
                      recorded.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              resolvedRows.map((row) => (
                <tr
                  key={row.productName}
                  className="border-t border-border/10 bg-white"
                >
                  <td className="px-4 py-4 text-sm font-medium text-muted-text">
                    {row.productName}
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-muted-text">
                    {row.unitsSold}
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-muted-text">
                    {row.totalRevenue}
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-muted-text">
                    {row.avgPrice}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-28 rounded-full bg-[#EAECF0]">
                        <div
                          className="h-2 rounded-full bg-primary"
                          style={{ width: `${row.performance}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-muted-text">
                        {row.performance}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </ReportsSection>
  );
}
