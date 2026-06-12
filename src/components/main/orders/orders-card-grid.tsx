import {
  Check,
  CircleAlert,
  Clock3,
  Eye,
  Package,
  X,
} from "lucide-react";
import type { OrdersCardGridProps } from "@/interfaces/main/orders";
import type { OrderStatus } from "@/types/main/orders";
import { Button } from "@/components/ui/button";
import { OrdersStatusSelect } from "./orders-status-select";

const workflow = ["New", "Preparing", "Ready", "Delivered"] as const;

function getProgressIndex(status: OrderStatus) {
  if (status === "Cancelled") {
    return 1;
  }

  if (status === "Shipped") {
    return 2;
  }

  return workflow.indexOf(status as (typeof workflow)[number]);
}

function getStepState(status: OrderStatus, step: (typeof workflow)[number], index: number) {
  if (status === "Cancelled") {
    if (index === 0) return "done";
    if (index === 1) return "cancelled";
    return "pending";
  }

  const progressIndex = getProgressIndex(status);

  if (index < progressIndex) return "done";
  if (index === progressIndex) return "current";
  return "pending";
}

function getStepIcon(step: (typeof workflow)[number], currentStatus: OrderStatus) {
  if (currentStatus === "Cancelled" && step === "Preparing") {
    return X;
  }

  switch (step) {
    case "New":
      return CircleAlert;
    case "Preparing":
      return Clock3;
    case "Ready":
      return Package;
    case "Delivered":
      return Check;
  }
}

export function OrdersCardGrid({
  orders,
  onStatusChangeRequest,
  onViewDetails,
}: OrdersCardGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {orders.map((order) => (
        (() => {
          const isCompleted = order.status === "Delivered";

          return (
        <article
          key={order.id}
          className="overflow-hidden rounded-[16px] border border-border/15 bg-white shadow-[0_16px_36px_rgba(209,150,40,0.08)]"
        >
          <div className="border-b border-border/10 px-5 py-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 flex-1 space-y-1">
                <h3 className="truncate text-[18px] font-bold tracking-[-0.03em] text-chocolate">
                  {order.customer}
                </h3>
                <p className="truncate text-sm font-bold text-gray">{order.id}</p>
              </div>

              <div className="shrink-0 self-start">
                <OrdersStatusSelect
                  status={order.status}
                  disabled={isCompleted}
                  onChangeRequest={(status) => onStatusChangeRequest(order, status)}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 border-b border-border/10 px-5 py-5">
            {workflow.map((step, index) => {
              const state = getStepState(order.status, step, index);
              const Icon = getStepIcon(step, order.status);
              const active =
                state === "done" || state === "current" || state === "cancelled";
              const circleClass =
                state === "cancelled"
                  ? "bg-[#F04438] text-white"
                  : active
                    ? "bg-primary text-white"
                    : "bg-bg-creamy/60 text-border";
              const lineClass =
                state === "cancelled"
                  ? "bg-[#F04438]"
                  : state === "done" || state === "current"
                    ? "bg-primary"
                    : "bg-[#EAECF0]";
              const labelClass =
                state === "cancelled"
                  ? "text-[#F04438]"
                  : active
                    ? "text-primary"
                    : "text-muted-text";

              return (
                <div key={step} className="flex min-w-0 flex-1 items-center">
                  <div className="flex min-w-0 flex-col items-center gap-2">
                    <span
                      className={`inline-flex size-10 items-center justify-center rounded-full ${circleClass}`}
                    >
                      <Icon className="size-4" />
                    </span>
                    <span className={`text-[10px] font-semibold ${labelClass}`}>
                      {state === "cancelled" && step === "Preparing" ? "Cancelled" : step}
                    </span>
                  </div>

                  {index < workflow.length - 1 ? (
                    <span className={`mx-2 h-0.5 flex-1 rounded-full ${lineClass}`} />
                  ) : null}
                </div>
              );
            })}
          </div>

          <div className="space-y-4 px-5 py-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-gray">
                Order Details
              </p>
              <p className="mt-2 text-[15px] font-semibold tracking-[-0.02em] text-dark">
                {order.details}
              </p>
              <p className="mt-1 text-sm font-medium text-muted-text">
                {order.items} items • {order.date} {order.time}
              </p>
              {order.priceSnapshots && order.priceSnapshots.length > 0 ? (
                <div className="mt-3 space-y-1.5">
                  {order.priceSnapshots.map((snapshot, index) => (
                    <p
                      key={`${snapshot.productId}-${snapshot.label}-${index}`}
                      className="text-xs font-medium leading-5 text-primary"
                    >
                      {snapshot.productName}: {snapshot.label} -{" "}
                      {snapshot.unitPrice} * {snapshot.quantity}
                    </p>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="flex items-center justify-between border-y border-border/10 py-3">
              <p className="text-sm font-semibold text-muted-text">Total Amount</p>
              <p className="text-[20px] font-bold tracking-[0.02em] text-primary">
                {order.total}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 px-3 pb-3">
            <Button
              type="button"
              variant="ghost"
              aria-label={`View ${order.id}`}
              className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-[8px] bg-primary px-4 text-sm font-semibold text-white"
              onClick={() => onViewDetails(order)}
            >
              <Eye className="size-4" />
              <span>View Details</span>
            </Button>
          </div>
        </article>
          );
        })()
      ))}
    </div>
  );
}
