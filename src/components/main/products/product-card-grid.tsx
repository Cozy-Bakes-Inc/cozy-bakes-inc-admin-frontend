import type { ProductRecord } from "@/interfaces/main/products";
import { ProductStatusBadge } from "./product-status-badge";

interface ProductCardGridProps {
  items: ProductRecord[];
  onViewDetails: (item: ProductRecord) => void;
  onEditDetails: (item: ProductRecord) => void;
  onDeleteDetails: (item: ProductRecord) => void;
}

export function ProductCardGrid({
  items,
  onViewDetails,
  onEditDetails,
  onDeleteDetails,
}: ProductCardGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.slug}
          className="rounded-2xl border border-border/10 bg-white p-4"
        >
          <img
            src={item.coverImage}
            alt={item.name}
            className="h-40 w-full rounded-xl object-cover"
          />

          <div className="mt-4 space-y-2">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-bold text-primary">{item.name}</h3>
              <ProductStatusBadge status={item.status} />
            </div>

            <p className="line-clamp-2 text-sm text-muted-foreground">
              {item.description}
            </p>

            <p className="text-sm">
              <span className="font-semibold">Sub Category:</span>{" "}
              {item.subCategoryName}
            </p>

            <p className="text-sm">
              <span className="font-semibold">Price:</span> {item.price}
            </p>

            <div className="flex items-center gap-2 pt-2">
              <button onClick={() => onDeleteDetails(item)}>Delete</button>
              <button onClick={() => onEditDetails(item)}>Edit</button>
              <button onClick={() => onViewDetails(item)}>View</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
