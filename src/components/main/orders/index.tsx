"use client";

import { useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { OrderRecord } from "@/interfaces";
import type { PendingOrderStatusUpdate } from "@/interfaces/main/orders";
import { orderFilters } from "@/data/main/orders";
import { useOrders } from "@/hooks/api";
import {
  filterSortMap,
  mapOrderToRecord,
  reverseOrderStatusMap,
} from "@/lib/utils/orders";
import { updateOrderStatusAPI } from "@/services/mutations/orders";
import type { OrderFilterValue, OrderViewMode } from "@/types/main/orders";
import OrderDetails from "./order-details";
import { OrdersCardGrid } from "./orders-card-grid";
import { OrdersCardGridShimmer } from "./orders-card-grid-shimmer";
import { OrdersEmptyState } from "./orders-empty-state";
import { OrdersFilterTabs } from "./orders-filter-tabs";
import { OrdersHeader } from "./orders-header";
import { OrdersStatusChangeModal } from "./orders-status-change-modal";
import { OrdersShowMoreButton } from "./orders-show-more-button";
import { OrdersTable } from "./orders-table";
import { OrdersTableShimmer } from "./orders-table-shimmer";
import { OrdersToolbar } from "./orders-toolbar";

function Orders() {
  const queryClient = useQueryClient();
  const [activeFilter, setActiveFilter] = useState<OrderFilterValue>("all");
  const [searchValue, setSearchValue] = useState("");
  const [viewMode, setViewMode] = useState<OrderViewMode>("card");
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [selectedOrderNo, setSelectedOrderNo] = useState<string | null>(null);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  const [statusOverrides, setStatusOverrides] = useState<
    Record<string, OrderRecord["status"]>
  >({});
  const [pendingStatusUpdate, setPendingStatusUpdate] =
    useState<PendingOrderStatusUpdate | null>(null);
  const sort = filterSortMap[activeFilter];
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useOrders(sort);
  const orders = useMemo(
    () =>
      data?.pages
        ?.flatMap((page) => page?.data?.data ?? [])
        .map(mapOrderToRecord) ?? [],
    [data],
  );
  const hydratedOrders = useMemo(
    () =>
      orders.map((order) => ({
        ...order,
        status: statusOverrides[order.id] ?? order.status,
      })),
    [orders, statusOverrides],
  );
  console.log(data);
  const normalizedSearch = searchValue.trim().toLowerCase();
  const visibleOrders = useMemo(() => {
    if (!normalizedSearch) {
      return hydratedOrders;
    }

    return hydratedOrders.filter((order) => {
      return (
        order.customer.toLowerCase().includes(normalizedSearch) ||
        order.id.toLowerCase().includes(normalizedSearch) ||
        order.phone.toLowerCase().includes(normalizedSearch)
      );
    });
  }, [hydratedOrders, normalizedSearch]);

  const hasEmptyState = !isLoading && visibleOrders.length === 0;

  function handleStatusChangeRequest(
    order: OrderRecord,
    nextStatus: OrderRecord["status"],
  ) {
    if (order.status === nextStatus) {
      return;
    }

    setPendingStatusUpdate({
      orderId: order.id,
      customer: order.customer,
      nextStatus,
    });
  }

  function closeStatusModal() {
    setPendingStatusUpdate(null);
  }

  function handleViewDetails(order: OrderRecord) {
    setSelectedOrderNo(order.id.replace(/^#/, ""));
    setIsOrderDetailsOpen(true);
  }

  function closeOrderDetails() {
    setIsOrderDetailsOpen(false);
    setSelectedOrderNo(null);
  }

  async function confirmStatusUpdate() {
    if (!pendingStatusUpdate) {
      return;
    }

    const orderNo = pendingStatusUpdate.orderId.replace(/^#/, "");
    const status = reverseOrderStatusMap[pendingStatusUpdate.nextStatus];

    setIsUpdatingStatus(true);
    const result = await updateOrderStatusAPI(orderNo, { status });

    if (result?.ok) {
      setStatusOverrides((current) => ({
        ...current,
        [pendingStatusUpdate.orderId]: pendingStatusUpdate.nextStatus,
      }));
      toast.success(result?.message);
      closeStatusModal();
      setIsUpdatingStatus(false);
      await queryClient.invalidateQueries({ queryKey: ["orders"] });
      return;
    }

    toast.error(result?.message);
    setIsUpdatingStatus(false);
  }

  return (
    <>
      <section className="space-y-4 md:space-y-6">
        <OrdersHeader
          title="Orders Management"
          description="Track and manage all customer orders"
        />

        <OrdersFilterTabs
          filters={orderFilters}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        <OrdersToolbar
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {isLoading ? (
          viewMode === "table" ? (
            <OrdersTableShimmer />
          ) : (
            <OrdersCardGridShimmer />
          )
        ) : hasEmptyState ? (
          <OrdersEmptyState
            hasSearch={normalizedSearch.length > 0}
            hasFilteredStatus={activeFilter !== "all"}
            viewMode={viewMode}
            onClearSearch={() => setSearchValue("")}
            onResetFilters={() => {
              setActiveFilter("all");
              setSearchValue("");
            }}
          />
        ) : viewMode === "table" ? (
          <OrdersTable
            orders={visibleOrders}
            onStatusChangeRequest={handleStatusChangeRequest}
            onViewDetails={handleViewDetails}
          />
        ) : (
          <OrdersCardGrid
            orders={visibleOrders}
            onStatusChangeRequest={handleStatusChangeRequest}
            onViewDetails={handleViewDetails}
          />
        )}

        {!isLoading && !hasEmptyState && hasNextPage ? (
          <OrdersShowMoreButton
            isFetchingNextPage={isFetchingNextPage}
            onClick={() => fetchNextPage()}
          />
        ) : null}
      </section>

      <OrdersStatusChangeModal
        pendingUpdate={pendingStatusUpdate}
        isLoading={isUpdatingStatus}
        onClose={closeStatusModal}
        onConfirm={confirmStatusUpdate}
      />

      <OrderDetails
        open={isOrderDetailsOpen}
        orderNo={selectedOrderNo}
        onClose={closeOrderDetails}
      />
    </>
  );
}

export default Orders;
