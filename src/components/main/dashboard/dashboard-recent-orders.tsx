"use client";

import { useMemo } from "react";
import { OrderListItem } from "@/interfaces";
import { useInfiniteOrders } from "@/hooks/api";
import { formatCurrency } from "@/lib/utils/dashboard";
import { Button } from "@/components/ui/button";
import { Shimmer } from "@/components/ui/shimmer";
import { DashboardSectionCard } from "./dashboard-shared";

const statusClasses: Record<OrderListItem["status"], string> = {
  pending: "bg-gray/15 text-muted-text",
  processed: "bg-bg-creamy text-heading-2",
  packed: "bg-secondary/10 text-secondary",
  shipped: "bg-[#EEF4FF] text-[#175CD3]",
  completed: "bg-primary/10 text-primary",
  cancelled: "bg-[#FEF3F2] text-[#F04438]",
};

function formatOrderStatus(status: OrderListItem["status"]) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function formatOrderDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

function RecentOrdersShimmerList({ count }: { count: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col gap-3 rounded-[18px] border border-border/20 bg-white px-4 py-3 shadow-[0_10px_22px_rgba(209,150,40,0.06)] sm:flex-row sm:items-start sm:justify-between sm:gap-4"
        >
          <div className="min-w-0 flex-1 space-y-2">
            <Shimmer className="h-4 w-20 rounded-xl" />
            <Shimmer className="h-4 w-36 rounded-xl" />
            <Shimmer className="h-3 w-28 rounded-xl" />
          </div>
          <div className="space-y-2 sm:items-end">
            <Shimmer className="h-5 w-24 rounded-xl" />
            <Shimmer className="h-6 w-20 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function DashboardRecentOrders() {
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteOrders("latest");
  const recentOrders: OrderListItem[] = useMemo(
    () => data?.pages?.flatMap((page) => page?.data?.data ?? []) ?? [],
    [data],
  );

  if (isLoading) {
    return (
      <DashboardSectionCard
        title="Recent Orders"
        description="Latest customer transactions"
        actionLabel="View All"
      >
        <RecentOrdersShimmerList count={4} />
      </DashboardSectionCard>
    );
  }

  if (recentOrders.length === 0) {
    return (
      <DashboardSectionCard
        title="Recent Orders"
        description="Latest customer transactions"
        actionLabel="View All"
      >
        <div className="flex min-h-[220px] items-center justify-center rounded-[18px] border border-dashed border-border/30 bg-white/70 px-6 text-center">
          <div className="space-y-2">
            <p className="text-base font-semibold text-dark">No recent orders yet</p>
            <p className="text-sm text-muted-text">
              New customer orders will appear here once they are created.
            </p>
          </div>
        </div>
      </DashboardSectionCard>
    );
  }

  return (
    <DashboardSectionCard
      title="Recent Orders"
      description="Latest customer transactions"
      actionLabel="View All"
    >
      <div className="max-h-[420px] space-y-3 overflow-y-auto pr-2">
        {recentOrders.map((order) => (
          <article
            key={order.id}
            className="flex flex-col gap-3 rounded-[18px] border border-border/20 bg-white px-4 py-3 shadow-[0_10px_22px_rgba(209,150,40,0.06)] sm:flex-row sm:items-start sm:justify-between sm:gap-4"
          >
            <div className="min-w-0">
              <p className="text-xs font-bold text-primary md:text-sm">
                #{order.order_number}
              </p>
              <p className="mt-1 truncate text-xs font-medium text-dark md:text-sm">
                {order.customer_name || order.customer_email}
              </p>
              <p className="mt-1 text-[11px] font-medium text-gray md:text-xs">
                {order.total_quantity} items
                <span className="px-1.5 text-border">&bull;</span>
                {formatOrderDate(order.created_at)}
              </p>
            </div>

            <div className="text-left sm:text-right">
              <p className="text-base font-bold tracking-[-0.02em] text-dark md:text-lg">
                {formatCurrency(Number(order.total_amount))}
              </p>
              <span
                className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ${statusClasses[order.status]}`}
              >
                {formatOrderStatus(order.status)}
              </span>
            </div>
          </article>
        ))}

        {isFetchingNextPage ? <RecentOrdersShimmerList count={2} /> : null}
      </div>

      {hasNextPage ? (
        <div className="mt-8 flex justify-center">
          <Button
            type="button"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="rounded-full bg-primary px-6 text-xs font-semibold text-white hover:bg-primary/90"
          >
            {isFetchingNextPage ? "Loading orders..." : "Show More"}
          </Button>
        </div>
      ) : null}
    </DashboardSectionCard>
  );
}
