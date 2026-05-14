import { AddProductField } from "./add-product-field";
import {
  AddPricingRowButton,
  PricingMobileLabel,
  RemovePricingRowButton,
} from "./product-pricing-controls";
import {
  createPricingRowId,
  type SizesPricingProps,
} from "./product-pricing-field-types";

export function ProductPricingSizes({
  sizes,
  disabled,
  errors,
  onSizesChange,
}: SizesPricingProps) {
  return (
    <div className="space-y-3">
      <div className="rounded-[8px] border border-[#D0D5DD] bg-bg-creamy/55 p-3">
        <div className="space-y-3">
          {sizes.map((size, sizeIndex) => (
            <div
              key={size.id}
              className="grid min-w-0 grid-cols-1 items-stretch gap-3 rounded-[8px] border border-[#D0D5DD] bg-background/65 p-3 md:grid-cols-[180px_76px_minmax(0,1fr)_56px] md:items-center md:border-0 md:bg-transparent md:p-0"
            >
              <AddProductField
                id={`size-label-${size.id}`}
                value={size.label ?? ""}
                placeholder="Size"
                disabled={disabled}
                error={errors?.[sizeIndex]?.label}
                onChange={(value) =>
                  onSizesChange(
                    sizes.map((item) =>
                      item.id === size.id ? { ...item, label: value } : item,
                    ),
                  )
                }
              />
              <PricingMobileLabel />
              <AddProductField
                id={`size-price-${size.id}`}
                value={size.price}
                type="number"
                placeholder="Price"
                suffix="$"
                disabled={disabled}
                error={errors?.[sizeIndex]?.price}
                onChange={(value) =>
                  onSizesChange(
                    sizes.map((item) =>
                      item.id === size.id ? { ...item, price: value } : item,
                    ),
                  )
                }
              />
              <RemovePricingRowButton
                disabled={disabled || sizes.length === 1}
                onClick={() =>
                  onSizesChange(sizes.filter((item) => item.id !== size.id))
                }
              />
            </div>
          ))}
        </div>
      </div>
      <AddPricingRowButton
        label="Add size"
        disabled={disabled}
        onClick={() =>
          onSizesChange([
            ...sizes,
            { id: createPricingRowId(), label: "", price: "" },
          ])
        }
      />
    </div>
  );
}

