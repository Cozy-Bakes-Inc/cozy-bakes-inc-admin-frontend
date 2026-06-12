import type { CustomerDetailsData } from "@/interfaces/main/customers";
import type { CustomerStatus } from "@/types/main/customers";

export function formatCustomerId(id: number) {
  return `#USER-${id}`;
}

export function formatCustomerSpent(totalSpent: string) {
  return `$${totalSpent}`;
}

export function formatCustomerDaysInactive(daysInactive?: number | null) {
  if (typeof daysInactive !== "number" || daysInactive < 0) {
    return "No data";
  }

  return `${daysInactive} ${daysInactive === 1 ? "Day" : "Days"}`;
}

export function formatCustomerLastOrder(value: string) {
  if (!value) return "Never";

  const normalizedValue = value.replace(" ", "T");
  const parsedDate = new Date(normalizedValue);

  if (Number.isNaN(parsedDate.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(parsedDate);
}

export function mapApiStatusToCustomerStatus(
  status: string,
  orders: number,
): CustomerStatus {
  switch (status) {
    case "registered":
      return "Registered Only";
    case "inactive":
      return "Inactive";
    case "first_time":
      return "First-Time";
    case "vip":
      return "VIP";
    case "active":
    case "repeat":
      return orders > 1 ? "Active" : "First-Time";
    default:
      return orders > 1 ? "Active" : "Registered Only";
  }
}

export function buildCustomerDetailsViewModel(customer: CustomerDetailsData) {
  const status = mapApiStatusToCustomerStatus(
    customer.status,
    customer.orders_number,
  );

  return {
    id: formatCustomerId(customer.id),
    name: customer.name,
    email: customer.email,
    ordersNumber: customer.orders_number.toString(),
    totalSpent: formatCustomerSpent(customer.total_spent),
    lastOrder: formatCustomerLastOrder(customer.last_order),
    daysInactive: formatCustomerDaysInactive(customer.days_inactive),
    status,
  };
}
