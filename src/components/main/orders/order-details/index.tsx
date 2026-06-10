"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Check, CircleX, Printer } from "lucide-react";
import toast from "react-hot-toast";
import type {
  PendingOrderStatusUpdate,
  SingleOrderData,
} from "@/interfaces/main/orders";
import { useSingleOrder } from "@/hooks/api";
import { reverseOrderStatusMap } from "@/lib/utils/orders";
import { formatPhoneDisplay } from "@/lib/utils/phone";
import { updateOrderStatusAPI } from "@/services/mutations/orders";
import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils/dashboard";
import { OrdersStatusChangeModal } from "../orders-status-change-modal";
import { OrderDetailsHeader } from "./order-details-header";
import { OrderDetailsReceiverCard } from "./order-details-receiver-card";
import { OrderDetailsShimmer } from "./order-details-shimmer";
import { OrderDetailsShippingCard } from "./order-details-shipping-card";
import { OrderDetailsStatusCard } from "./order-details-status-card";
import { OrderDetailsSummaryCard } from "./order-details-summary-card";
import { formatPaymentMethod, getOrderLineTotal } from "./order-details.utils";

interface OrderDetailsProps {
  open: boolean;
  orderNo: string | null;
  onClose: () => void;
  order?: SingleOrderData;
}

function printInvoice(order: SingleOrderData) {
  const printWindow = window.open("", "_blank", "width=900,height=700");
  if (!printWindow) {
    return;
  }

  const itemsMarkup = order.items
    .map(
      (item) => `
        <tr>
          <td>${item.product_name} x ${item.quantity}</td>
          <td style="text-align:right;">${getOrderLineTotal(item.price, item.quantity, item.subtotal)}</td>
        </tr>
      `,
    )
    .join("");

  const paymentMethod = formatPaymentMethod(
    order.payment_method,
    order.cod_payment_method,
  );

  printWindow.document.write(`
    <html>
      <head>
        <title>Invoice #${order.order_number}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 32px; color: #344054; }
          h1 { margin: 0 0 8px; color: #3d2c1e; }
          p { margin: 0 0 8px; }
          .section { margin-top: 24px; }
          table { width: 100%; border-collapse: collapse; margin-top: 12px; }
          td { padding: 12px 0; border-bottom: 1px solid #e8dcc8; }
          .total-row td { font-weight: 700; font-size: 18px; color: #d19628; border-bottom: 0; }
        </style>
      </head>
      <body>
        <h1>Invoice</h1>
        <p><strong>Order Number:</strong> #${order.order_number}</p>
        <p><strong>Customer:</strong> ${order.customer.name}</p>
        <p><strong>Email:</strong> ${order.customer.email}</p>
        <p><strong>Phone:</strong> ${formatPhoneDisplay(order.customer.phone)}</p>

        <div class="section">
          <p><strong>Items</strong></p>
          <table>
            <tbody>
              ${itemsMarkup}
              <tr>
                <td>Shipping Fee</td>
                <td style="text-align:right;">${formatCurrency(Number(order.pricing.delivery_fee))}</td>
              </tr>
              <tr>
                <td>Payment Method</td>
                <td style="text-align:right;">${paymentMethod}</td>
              </tr>
              <tr class="total-row">
                <td>Total</td>
                <td style="text-align:right;">${formatCurrency(Number(order.pricing.total_amount))}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
}

function OrderDetailsActions({
  order,
  onStatusAction,
}: {
  order: SingleOrderData;
  onStatusAction: (nextStatus: "Cancelled" | "Delivered") => void;
}) {
  const isCompleted = order.order_status === "completed";
  const isCancelled = order.order_status === "cancelled";
  const canModify = !isCompleted;

  return (
    <div className="flex flex-col gap-4 pb-6 xl:flex-row xl:items-center xl:justify-between">
      <Button
        type="button"
        variant="ghost"
        className="h-13.5 justify-center rounded-[8px] bg-primary/10 px-4 text-base font-medium text-primary hover:bg-primary/15 hover:text-primary xl:min-w-50.5"
        onClick={() => printInvoice(order)}
      >
        <Printer className="size-5" />
        Print Invoice
      </Button>

      {canModify ? (
        <div className="flex flex-col gap-4 md:flex-row">
          {!isCancelled ? (
            <Button
              type="button"
              variant="ghost"
              className="h-13.5 rounded-[8px] bg-danger-soft px-6 text-base font-medium text-[#F04438] hover:bg-danger-soft/80 hover:text-[#F04438] xl:min-w-50.5"
              onClick={() => onStatusAction("Cancelled")}
            >
              <CircleX className="size-5" />
              Cancel Order
            </Button>
          ) : null}
          <Button
            type="button"
            className="h-13.5 rounded-[8px] bg-primary px-6 text-base font-medium text-white hover:bg-primary/90 hover:text-white xl:min-w-50.5"
            onClick={() => onStatusAction("Delivered")}
          >
            <Check className="size-5" />
            Mark as Delivered
          </Button>
        </div>
      ) : null}
    </div>
  );
}

function OrderDetailsContent({
  order,
  onStatusAction,
}: {
  order: SingleOrderData;
  onStatusAction: (nextStatus: "Cancelled" | "Delivered") => void;
}) {
  return (
    <div className="space-y-6 px-6 py-6 md:px-8">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_minmax(360px,0.9fr)]">
        <div className="space-y-4">
          <OrderDetailsStatusCard status={order.order_status} />
          <OrderDetailsShippingCard order={order} />
          <OrderDetailsReceiverCard order={order} />
        </div>
        <OrderDetailsSummaryCard order={order} />
      </div>

      <OrderDetailsActions order={order} onStatusAction={onStatusAction} />
    </div>
  );
}

export default function OrderDetails({
  open,
  orderNo,
  onClose,
  order,
}: OrderDetailsProps) {
  const queryClient = useQueryClient();
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [pendingStatusUpdate, setPendingStatusUpdate] =
    useState<PendingOrderStatusUpdate | null>(null);
  const { data, isLoading } = useSingleOrder(orderNo ?? "", open && !order);
  const orderDetails = order ?? data?.data;

  function handleStatusAction(nextStatus: "Cancelled" | "Delivered") {
    if (!orderDetails) {
      return;
    }

    setPendingStatusUpdate({
      orderId: `#${orderDetails.order_number}`,
      customer: orderDetails.customer.name,
      nextStatus,
    });
  }

  function closeStatusModal() {
    setPendingStatusUpdate(null);
  }

  async function confirmStatusUpdate() {
    if (!pendingStatusUpdate || !orderDetails) {
      return;
    }

    const status = reverseOrderStatusMap[pendingStatusUpdate.nextStatus];

    setIsUpdatingStatus(true);

    try {
      const result = await updateOrderStatusAPI(orderDetails.order_number, {
        status,
      });

      if (result?.ok) {
        toast.success(result?.message);
        closeStatusModal();
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: ["orders"] }),
          queryClient.invalidateQueries({
            queryKey: ["single-order", orderDetails.order_number],
          }),
        ]);
        return;
      }

      toast.error(result?.message);
    } finally {
      setIsUpdatingStatus(false);
    }
  }

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        title={
          <OrderDetailsHeader
            orderNumber={orderDetails?.order_number ?? orderNo}
          />
        }
        contentClassName="md:max-w-6xl gap-0 overflow-hidden rounded-[24px] border border-border/15 bg-background p-0 shadow-[0_24px_80px_rgba(61,44,30,0.18)] [&_[data-slot=dialog-header]]:border-b [&_[data-slot=dialog-header]]:border-border/20 [&_[data-slot=dialog-header]]:pr-20"
        titleClassName="px-6 pb-6 pt-8 md:px-8"
      >
        {isLoading || !orderDetails ? (
          <OrderDetailsShimmer />
        ) : (
          <OrderDetailsContent
            order={orderDetails}
            onStatusAction={handleStatusAction}
          />
        )}
      </Modal>

      <OrdersStatusChangeModal
        pendingUpdate={pendingStatusUpdate}
        isLoading={isUpdatingStatus}
        onClose={closeStatusModal}
        onConfirm={confirmStatusUpdate}
      />
    </>
  );
}
