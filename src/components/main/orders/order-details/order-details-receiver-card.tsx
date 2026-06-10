import type { SingleOrderData } from "@/interfaces/main/orders";
import { formatPhoneDisplay } from "@/lib/utils/phone";
import { OrderDetailsInfoField } from "./order-details-info-field";
import { formatOrderDateTime } from "./order-details.utils";

interface OrderDetailsReceiverCardProps {
  order: SingleOrderData;
}

export function OrderDetailsReceiverCard({
  order,
}: OrderDetailsReceiverCardProps) {
  const phone = formatPhoneDisplay(order.customer.phone);

  return (
    <section className="rounded-[24px] border border-border/25 bg-white px-5 py-4">
      <div className="space-y-4">
        <p className="text-xl font-medium text-primary">Receiver Details</p>

        <div className="grid gap-4 md:grid-cols-2">
          <OrderDetailsInfoField label="Name" value={order.customer.name} />
          <OrderDetailsInfoField
            label="Order Time"
            value={formatOrderDateTime(order.created_at)}
          />
          <OrderDetailsInfoField label="Email" value={order.customer.email} />
          <OrderDetailsInfoField label="Phone Number" value={phone} />
        </div>
      </div>
    </section>
  );
}
