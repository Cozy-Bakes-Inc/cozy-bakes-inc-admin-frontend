import type { OrderListItem, OrderRecord } from "@/interfaces";
import { formatCurrency } from "@/lib/utils/dashboard";
import type {
  ApiOrderStatus,
  OrderFilterValue,
  OrderSort,
  OrderStatus,
} from "@/types/main/orders";

export const filterSortMap: Record<OrderFilterValue, OrderSort | undefined> = {
  all: undefined,
  new: "pending",
  preparing: "processed",
  ready: "packed",
  shipped: "shipped",
  delivered: "completed",
  cancelled: "cancelled",
};

const orderStatusMap: Record<ApiOrderStatus, OrderStatus> = {
  pending: "New",
  processed: "Preparing",
  packed: "Ready",
  shipped: "Shipped",
  completed: "Delivered",
  cancelled: "Cancelled",
};

export const reverseOrderStatusMap: Record<OrderStatus, ApiOrderStatus> = {
  New: "pending",
  Preparing: "processed",
  Ready: "packed",
  Shipped: "shipped",
  Delivered: "completed",
  Cancelled: "cancelled",
};

function formatOrderDate(date: string) {
  const formattedDate = new Date(date);

  return {
    date: new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(formattedDate),
    time: new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
    }).format(formattedDate),
  };
}

export function mapOrderToRecord(order: OrderListItem): OrderRecord {
  const customer =
    order.customer_name || order.customer_email || "Guest Customer";
  const { date, time } = formatOrderDate(order.created_at);
  const priceSnapshots =
    order.items
      ?.filter((item) => item.price_snapshot)
      .map((item) => ({
        productId: String(item.product_id),
        productName: item.product_name || item.title || "Order item",
        label: item.price_snapshot?.label ?? "",
        unitPrice: formatCurrency(Number(item.price_snapshot?.unit_price ?? 0)),
        quantity: item.quantity,
      })) ?? [];

  return {
    id: `#${order.order_number}`,
    customer,
    phone: order.customer_phone || order.customer_email,
    items: Number(order.total_quantity) || 0,
    priceSnapshots,
    details: `${order.payment_method.toUpperCase()} payment - ${order.payment_status.replaceAll("_", " ")}`,
    total: formatCurrency(Number(order.total_amount)),
    status: orderStatusMap[order.status],
    date,
    time,
  };
}
