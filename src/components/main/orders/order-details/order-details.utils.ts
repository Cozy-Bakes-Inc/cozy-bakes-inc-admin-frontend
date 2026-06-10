import type { SingleOrderData } from "@/interfaces/main/orders";
import type { ApiOrderStatus, OrderPaymentMethod } from "@/types/main/orders";
import { formatCurrency } from "@/lib/utils/dashboard";

export function formatOrderStatus(status: ApiOrderStatus) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export function formatOrderDateTime(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })
    .format(new Date(value))
    .replace(",", "");
}

export function formatPaymentMethod(
  paymentMethod: OrderPaymentMethod,
  codPaymentMethod: string | null,
) {
  if (paymentMethod === "cod") {
    return codPaymentMethod?.replaceAll("_", " ") || "Cash on Delivery";
  }

  return "Stripe";
}

export function getOrderLineTotal(price: string, quantity: string | number, subtotal: string | number | null) {
  const numericSubtotal = subtotal != null ? Number(subtotal) : Number(price) * Number(quantity);
  return formatCurrency(numericSubtotal);
}

export function getShippingTitle(order: SingleOrderData) {
  return order.shipping.fulfillment_type === "delivery" ? "Deliver to" : "Pickup from";
}

export function getShippingPrimaryText(order: SingleOrderData) {
  if (order.shipping.shop?.name) {
    return order.shipping.shop.name;
  }

  return order.shipping.fulfillment_type === "delivery" ? "Delivery Address" : "Pickup Location";
}

export function getShippingSecondaryText(order: SingleOrderData) {
  if (order.shipping.address_line) {
    return order.shipping.address_line;
  }

  if (order.shipping.shop?.address) {
    return order.shipping.shop.address;
  }

  return order.shipping.note || "No shipping details provided.";
}
