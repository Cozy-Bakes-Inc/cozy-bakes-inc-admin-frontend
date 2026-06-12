import { Eye } from "lucide-react";
import type { OrdersTableProps } from "@/interfaces/main/orders";
import { formatPhoneDisplay } from "@/lib/utils/phone";
import { Button } from "@/components/ui/button";
import { OrdersStatusSelect } from "./orders-status-select";

const tableHeaders = [
  "Order ID",
  "Customer",
  "Items",
  "Total",
  "Status",
  "Time",
  "Actions",
];

export function OrdersTable({
  orders,
  onStatusChangeRequest,
  onViewDetails,
}: OrdersTableProps) {
  return (
    <div className="overflow-hidden rounded-[12px]">
      <div className="overflow-x-auto">
        <table className="min-w-[1084px] border-separate border-spacing-0">
          <thead>
            <tr className="bg-[#FBF8EB]">
              {tableHeaders.map((header, index) => (
                <th
                  key={header}
                  className={`border-b border-border/15 px-5 py-5 text-left text-[16px] font-semibold text-dark ${
                    index === 0 ? "rounded-tl-[8px]" : ""
                  } ${index === tableHeaders.length - 1 ? "rounded-tr-[8px]" : ""}`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              (() => {
                const isCompleted = order.status === "Delivered";

                return (
              <tr key={order.id} className="bg-bg-creamy/10">
                <td className="border-b border-border/15 px-5 py-4 text-[16px] font-medium text-dark">
                  {order.id}
                </td>
                <td className="border-b border-border/15 px-5 py-4">
                  <div className="space-y-1.5">
                    <p className="text-[16px] font-semibold text-dark">{order.customer}</p>
                    <p className="text-xs font-medium text-gray">{formatPhoneDisplay(order.phone)}</p>
                  </div>
                </td>
                <td className="border-b border-border/15 px-5 py-4 text-[16px] font-medium text-dark">
                  <div className="space-y-2">
                    <p>{order.items} items</p>
                    {order.priceSnapshots && order.priceSnapshots.length > 0 ? (
                      <div className="space-y-1">
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
                </td>
                <td className="border-b border-border/15 px-5 py-4 text-[16px] font-medium text-dark">
                  {order.total}
                </td>
                <td className="border-b border-border/15 px-5 py-4">
                  <OrdersStatusSelect
                    status={order.status}
                    disabled={isCompleted}
                    onChangeRequest={(status) => onStatusChangeRequest(order, status)}
                  />
                </td>
                <td className="border-b border-border/15 px-5 py-4">
                  <div className="space-y-1.5">
                    <p className="text-[16px] font-semibold text-dark">{order.date}</p>
                    <p className="text-xs font-medium text-gray">{order.time}</p>
                  </div>
                </td>
                <td className="border-b border-border/15 px-5 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      aria-label={`View ${order.id}`}
                      className="inline-flex size-11 items-center justify-center rounded-[10px] bg-primary text-white transition-transform hover:-translate-y-0.5"
                      onClick={() => onViewDetails(order)}
                    >
                      <Eye className="size-5" />
                    </Button>
                  </div>
                </td>
              </tr>
                );
              })()
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
