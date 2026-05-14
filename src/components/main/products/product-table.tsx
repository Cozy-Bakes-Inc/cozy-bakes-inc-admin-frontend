import Image from "next/image";
import { Eye, PencilLine, Trash2 } from "lucide-react";
import type {
  ProductListPrice,
  ProductRecord,
} from "@/interfaces/main/products";
import { CategoryActionButton } from "@/components/main/categories/category-action-button";

interface ProductTableProps {
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

export function ProductTable({
  items,
  onViewDetails,
  onEditDetails,
  onDeleteDetails,
}: ProductTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/10 bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0">
          <thead>
            <tr className="bg-bg-creamy">
              <th className="px-4 py-5 text-left text-base font-semibold text-dark md:px-5">
                Cover
              </th>
              <th className="px-4 py-5 text-left text-base font-semibold text-dark md:px-5">
                Name
              </th>
              <th className="px-4 py-5 text-left text-base font-semibold text-dark md:px-5">
                Category
              </th>
              <th className="px-4 py-5 text-left text-base font-semibold text-dark md:px-5">
                Price
              </th>
              <th className="px-4 py-5 text-center text-base font-semibold text-dark md:px-5">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => {
              const priceOptions = getProductPriceOptions(item.prices);

              return (
                <tr key={item.slug} className="bg-[rgba(250,248,243,0.08)]">
                  <td className="border-b border-border/15 px-4 py-4 align-middle md:px-5">
                    <Image
                      src={item.coverImage}
                      alt={`${item.name} cover`}
                      width={50}
                      height={50}
                      className="size-12.5 rounded-lg object-cover"
                      unoptimized
                    />
                  </td>

                  <td className="border-b border-border/15 px-4 py-4 align-middle text-base font-semibold text-dark md:px-5">
                    {item.name}
                  </td>

                  <td className="border-b border-border/15 px-4 py-4 align-middle text-sm font-medium text-muted-text md:px-5">
                    {item.subCategoryName}
                  </td>

                  <td className="border-b border-border/15 px-4 py-4 align-middle md:px-5">
                    {priceOptions.length === 0 ? (
                      <span className="text-sm text-muted-text">No price</span>
                    ) : (
                      <ul className="space-y-0.5">
                        {priceOptions.map((opt) => (
                          <li key={opt.id} className="text-sm text-dark">
                            {opt.label} —{" "}
                            <span className="font-medium">
                              {formatCurrency(opt.price)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </td>

                  <td className="border-b border-border/15 px-4 py-4 align-middle md:px-5">
                    <div className="flex items-center justify-center gap-2">
                      <CategoryActionButton
                        label={`Delete ${item.name}`}
                        tone="danger"
                        icon={<Trash2 className="size-4" strokeWidth={2.1} />}
                        onClick={() => onDeleteDetails(item)}
                      />
                      <CategoryActionButton
                        label={`Edit ${item.name}`}
                        tone="info"
                        icon={
                          <PencilLine className="size-4" strokeWidth={2.1} />
                        }
                        onClick={() => onEditDetails(item)}
                      />
                      <CategoryActionButton
                        label={`View ${item.name}`}
                        tone="primary"
                        icon={<Eye className="size-4" strokeWidth={2.1} />}
                        onClick={() => onViewDetails(item)}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
