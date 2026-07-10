"use client";

import { ArrowUpRight } from "lucide-react";
import { DashboardSectionCard } from "./dashboard-shared";
import { useTopProducts } from "@/hooks/api";
import { useMemo } from "react";
import { DashboardTopProductItem } from "@/interfaces/main/dashboard";
import { Button } from "@/components/ui/button";
import { Shimmer } from "@/components/ui/shimmer";
import { formatCurrency, formatPercentage } from "@/lib/utils/dashboard";

export function DashboardTopProducts() {
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useTopProducts();
  const topProducts: DashboardTopProductItem[] = useMemo(
    () => data?.pages?.flatMap((page) => page?.data?.data ?? []) ?? [],
    [data],
  );

  if (isLoading) {
    return (
      <DashboardSectionCard
        title="Top Products"
        description="Best performers this week"
        actionLabel="View All"
      >
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col gap-3 rounded-[18px] border border-border/20 bg-white px-4 py-3 shadow-[0_10px_22px_rgba(209,150,40,0.06)] sm:flex-row sm:items-center sm:gap-4"
            >
              <Shimmer className="h-10 w-10 rounded-[14px]" />
              <div className="flex-1 space-y-2">
                <Shimmer className="h-4 w-32" />
                <Shimmer className="h-3 w-24" />
              </div>
              <div className="space-y-2 sm:items-end">
                <Shimmer className="h-5 w-24" />
                <Shimmer className="h-3 w-16" />
              </div>
            </div>
          ))}
        </div>
      </DashboardSectionCard>
    );
  }

  if (topProducts.length === 0) {
    return (
      <DashboardSectionCard
        title="Top Products"
        description="Best performers this week"
        actionLabel="View All"
      >
        <div className="flex min-h-55 items-center justify-center rounded-[18px] border border-dashed border-border/30 bg-white/70 px-6 text-center">
          <div className="space-y-2">
            <p className="text-base font-semibold text-dark">
              No top products yet
            </p>
            <p className="text-sm text-muted-text">
              Product performance data will appear here once sales are recorded.
            </p>
          </div>
        </div>
      </DashboardSectionCard>
    );
  }

  return (
    <DashboardSectionCard
      title="Top Products"
      description="Best performers this week"
      actionLabel="View All"
    >
      <div className="space-y-3">
        {topProducts.map((product) => (
          <article
            key={product.id}
            className="flex flex-col gap-3 rounded-[18px] border border-border/20 bg-white px-4 py-3 shadow-[0_10px_22px_rgba(209,150,40,0.06)] sm:flex-row sm:items-center sm:gap-4"
          >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-[14px] bg-primary/12 text-sm font-bold text-primary">
              #{product.id}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-dark md:text-sm">
                {product.title}
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] font-medium text-gray md:text-xs">
                <span>
                  {formatCurrency(Number(product.current_revenue))} this period
                </span>
                <span className="text-border">&bull;</span>
                <span className="inline-flex items-center gap-1 font-bold text-primary">
                  <ArrowUpRight className="size-3" />
                  {formatPercentage(product.growth_percentage)}
                </span>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <p className="text-[18px] font-bold tracking-[-0.03em] text-primary md:text-[20px]">
                {formatCurrency(Number(product.total_revenue))}
              </p>
              <p className="text-[11px] font-medium text-gray md:text-xs">
                total revenue
              </p>
            </div>
          </article>
        ))}

        {isFetchingNextPage
          ? Array.from({ length: 2 }).map((_, index) => (
              <div
                key={`loading-more-${index}`}
                className="flex flex-col gap-3 rounded-[18px] border border-border/20 bg-white px-4 py-3 shadow-[0_10px_22px_rgba(209,150,40,0.06)] sm:flex-row sm:items-center sm:gap-4"
              >
                <Shimmer className="h-10 w-10 rounded-[14px]" />
                <div className="flex-1 space-y-2">
                  <Shimmer className="h-4 w-32" />
                  <Shimmer className="h-3 w-24" />
                </div>
                <div className="space-y-2 sm:items-end">
                  <Shimmer className="h-5 w-24" />
                  <Shimmer className="h-3 w-16" />
                </div>
              </div>
            ))
          : null}
      </div>

      {hasNextPage ? (
        <div className="mt-8 flex justify-center">
          <Button
            type="button"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="rounded-full bg-background px-6 text-xs font-semibold text-dark hover:bg-background/90"
          >
            {isFetchingNextPage ? "Loading products..." : "Show More"}
          </Button>
        </div>
      ) : null}
    </DashboardSectionCard>
  );
}
