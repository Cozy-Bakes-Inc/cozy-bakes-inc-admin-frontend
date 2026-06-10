import Image from "next/image";
import type { SingleOrderItem } from "@/interfaces/main/orders";
import { formatCurrency } from "@/lib/utils/dashboard";

interface OrderDetailsItemCardProps {
  item: SingleOrderItem;
  orderNumber: string;
}

function getImageUrl(images: SingleOrderItem["images"]): string | null {
  if (!images || images.length === 0) return null;
  const first = images[0];
  if (typeof first === "string") return first;
  return first.url ?? null;
}

export function OrderDetailsItemCard({
  item,
  orderNumber,
}: OrderDetailsItemCardProps) {
  const imageUrl = getImageUrl(item.images);
  const subtotalNumber =
    item.subtotal != null
      ? Number(item.subtotal)
      : Number(item.price) * Number(item.quantity);

  return (
    <div className="rounded-[16px] border border-[#E8DCC8] bg-white p-4">
      <div className="flex gap-3">
        {imageUrl && (
          <div className="relative size-16 shrink-0 overflow-hidden rounded-[10px] bg-bg-creamy">
            <Image
              src={imageUrl}
              alt={item.product_name}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="min-w-0 flex-1 space-y-0.5">
          <p className="text-xs font-medium text-primary">
            Order #{orderNumber}
          </p>
          <p className="text-base font-semibold text-dark">
            {item.product_name}
          </p>
          {item.price_snapshot && (
            <p className="text-xs font-medium text-primary">
              {item.price_snapshot.label} &mdash;{" "}
              {formatCurrency(Number(item.price_snapshot.unit_price))}
            </p>
          )}
          {item.flavors?.flavors?.map((flavor) => (
            <p key={flavor.name} className="text-xs font-medium text-muted-text">
              {flavor.qty}x {flavor.name}
            </p>
          ))}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-[#E8DCC8] pt-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-text">
            Total Price
          </p>
          <p className="text-lg font-bold text-primary">
            {formatCurrency(subtotalNumber)}
          </p>
        </div>

        {item.price_snapshot && (
          <span className="rounded-full border border-[#E8DCC8] bg-bg-creamy px-3 py-1.5 text-sm font-medium text-dark">
            {item.price_snapshot.label} * {item.quantity}
          </span>
        )}
      </div>
    </div>
  );
}
