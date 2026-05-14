import Image from "next/image";
import { Eye, PencilLine, Trash2 } from "lucide-react";
import type {
  ProductListPrice,
  ProductRecord,
} from "@/interfaces/main/products";
import { CategoryActionButton } from "@/components/main/categories/category-action-button";

interface ProductCardGridProps {
  items: ProductRecord[];
  onViewDetails: (item: ProductRecord) => void;
  onEditDetails: (item: ProductRecord) => void;
  onDeleteDetails: (item: ProductRecord) => void;
}

function formatCurrency(price: string): string {
  const num = parseFloat(price);
  return isNaN(num) ? price : `$${num.toFixed(2)}`;
}

function getProductPriceOptions(
  prices: Record<string, ProductListPrice[]>,
): ProductListPrice[] {
  return Object.values(prices ?? {}).flat();
}

export function ProductCardGrid({
  items,
  onViewDetails,
  onEditDetails,
  onDeleteDetails,
}: ProductCardGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
      {items.map((item) => {
        const priceOptions = getProductPriceOptions(item.prices);

        return (
          <article
            key={item.slug}
            className="rounded-[20px] border border-border/10 bg-white p-4 shadow-[0_18px_35px_rgba(61,44,30,0.05)]"
          >
            <div className="mb-4 flex items-start gap-4">
              <Image
                src={item.coverImage}
                alt={`${item.name} cover`}
                width={78}
                height={78}
                className="size-19.5 shrink-0 rounded-2xl object-cover"
                unoptimized
              />

              <div className="min-w-0 space-y-1">
                <h2 className="text-lg font-semibold text-dark">{item.name}</h2>
                <p className="text-sm font-medium text-muted-text">
                  {item.subCategoryName}
                </p>
              </div>
            </div>

            <p className="mb-3 line-clamp-2 min-h-10 text-sm leading-5 text-muted-text">
              {item.description}
            </p>

            <div className="mb-4 space-y-0.5">
              {priceOptions.length === 0 ? (
                <p className="text-sm text-muted-text">No price</p>
              ) : (
                priceOptions.map((opt) => (
                  <p key={opt.id} className="text-sm text-dark">
                    {opt.label} —{" "}
                    <span className="font-medium">
                      {formatCurrency(opt.price)}
                    </span>
                  </p>
                ))
              )}
            </div>

            <div className="flex items-center justify-end gap-2">
              <CategoryActionButton
                label={`Delete ${item.name}`}
                tone="danger"
                icon={<Trash2 className="size-4" strokeWidth={2.1} />}
                onClick={() => onDeleteDetails(item)}
              />
              <CategoryActionButton
                label={`Edit ${item.name}`}
                tone="info"
                icon={<PencilLine className="size-4" strokeWidth={2.1} />}
                onClick={() => onEditDetails(item)}
              />
              <CategoryActionButton
                label={`View ${item.name}`}
                tone="primary"
                icon={<Eye className="size-4" strokeWidth={2.1} />}
                onClick={() => onViewDetails(item)}
              />
            </div>
          </article>
        );
      })}
    </div>
  );
}
