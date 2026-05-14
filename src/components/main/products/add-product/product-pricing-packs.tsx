import { AddProductField } from "./add-product-field";
import {
  AddPricingRowButton,
  PricingMobileLabel,
  RemovePricingRowButton,
} from "./product-pricing-controls";
import {
  createPricingRowId,
  type PacksPricingProps,
} from "./product-pricing-field-types";

export function ProductPricingPacks({
  packs,
  disabled,
  errors,
  onPacksChange,
}: PacksPricingProps) {
  return (
    <div className="space-y-3">
      {packs.map((pack, packIndex) => (
        <div
          key={pack.id}
          className="grid min-w-0 grid-cols-1 items-stretch gap-3 rounded-[8px] border border-[#D0D5DD] bg-bg-creamy/55 p-3 md:grid-cols-[104px_130px_minmax(0,1fr)_56px] md:items-center"
        >
          <AddProductField
            id={`pack-quantity-${pack.id}`}
            value={pack.quantity ?? ""}
            type="number"
            placeholder="qty"
            disabled={disabled}
            error={errors?.[packIndex]?.quantity}
            onChange={(value) =>
              onPacksChange(
                packs.map((item) =>
                  item.id === pack.id ? { ...item, quantity: value } : item,
                ),
              )
            }
          />
          <PricingMobileLabel desktopText="units - Price" />
          <AddProductField
            id={`pack-price-${pack.id}`}
            value={pack.price}
            type="number"
            placeholder="Price"
            suffix="$"
            disabled={disabled}
            error={errors?.[packIndex]?.price}
            onChange={(value) =>
              onPacksChange(
                packs.map((item) =>
                  item.id === pack.id ? { ...item, price: value } : item,
                ),
              )
            }
          />
          <RemovePricingRowButton
            disabled={disabled || packs.length === 1}
            onClick={() =>
              onPacksChange(packs.filter((item) => item.id !== pack.id))
            }
          />
        </div>
      ))}
      <AddPricingRowButton
        label="Add pack size"
        disabled={disabled}
        onClick={() =>
          onPacksChange([
            ...packs,
            { id: createPricingRowId(), quantity: "", price: "" },
          ])
        }
      />
    </div>
  );
}

