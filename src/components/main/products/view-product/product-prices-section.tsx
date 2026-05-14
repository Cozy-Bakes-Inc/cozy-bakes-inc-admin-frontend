import type { ProductPrices } from "@/interfaces/main/products";
import {
  flattenProductPrices,
  formatCurrency,
  formatPriceGroupLabel,
} from "./product-details.helpers";

interface ProductPricesSectionProps {
  prices: ProductPrices;
}

export function ProductPricesSection({ prices }: ProductPricesSectionProps) {
  const priceItems = flattenProductPrices(prices);
  const priceGroups = Object.entries(prices ?? {}).filter(
    ([, items]) => items.length > 0,
  );
  const hasSingleGroup = priceGroups.length === 1;

  return (
    <section className="min-w-0 max-w-full border-t border-[#E4E7EC] pt-6">
      <h3 className="mb-3 min-w-0 max-w-full break-words text-[16px] font-medium leading-6 text-dark [overflow-wrap:anywhere]">
        Pricing
        {hasSingleGroup ? (
          <span className="text-muted-text">
            {" "}
            &mdash; {formatPriceGroupLabel(priceGroups[0][0])}
          </span>
        ) : null}
      </h3>

      {priceItems.length === 0 ? (
        <p className="min-w-0 max-w-full break-words rounded-[8px] border border-[#D0D5DD] bg-bg-creamy/55 px-4 py-3 text-sm font-medium text-muted-text [overflow-wrap:anywhere]">
          No prices available
        </p>
      ) : (
        <div className="min-w-0 max-w-full space-y-5">
          {priceGroups.map(([group, items]) => (
            <div key={group} className="min-w-0 max-w-full space-y-3">
              {!hasSingleGroup ? (
                <p className="min-w-0 max-w-full break-words text-sm font-semibold text-primary [overflow-wrap:anywhere]">
                  {formatPriceGroupLabel(group)}
                </p>
              ) : null}

              <div className="grid min-w-0 max-w-full gap-3 md:grid-cols-2">
                {items.map((item) => (
                  <article
                    key={item.slug}
                    className="min-w-0 max-w-full rounded-[8px] border border-[#D0D5DD] bg-bg-creamy/55 p-4"
                  >
                    <div className="flex min-w-0 items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <p className="min-w-0 max-w-full break-words text-base font-semibold text-dark [overflow-wrap:anywhere]">
                          {item.label}
                        </p>
                        {item.quantity !== null && item.quantity !== "" ? (
                          <p className="mt-1 min-w-0 max-w-full break-words text-sm font-medium text-muted-text [overflow-wrap:anywhere]">
                            Quantity: {item.quantity}
                          </p>
                        ) : null}
                      </div>
                      <p className="max-w-[45%] shrink-0 break-words text-right text-lg font-bold text-primary [overflow-wrap:anywhere]">
                        {formatCurrency(item.price)}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
