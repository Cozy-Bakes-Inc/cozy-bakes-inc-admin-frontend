import { AddProductField } from "./add-product-field";
import {
  AddPricingRowButton,
  PricingMobileLabel,
  RemovePricingRowButton,
} from "./product-pricing-controls";
import {
  createPricingRowId,
  type ComboDealsPricingProps,
} from "./product-pricing-field-types";

export function ProductPricingComboDeals({
  comboDeals,
  disabled,
  errors,
  onComboDealsChange,
}: ComboDealsPricingProps) {
  return (
    <div className="space-y-3">
      <div className="rounded-[8px] border border-[#D0D5DD] bg-bg-creamy/55 p-3">
        <div className="space-y-3">
          {comboDeals.map((deal, dealIndex) => (
            <div
              key={deal.id}
              className="grid min-w-0 grid-cols-1 items-stretch gap-3 rounded-[8px] border border-[#D0D5DD] bg-background/65 p-3 md:grid-cols-[120px_120px_minmax(0,1fr)_56px] md:items-center md:border-0 md:bg-transparent md:p-0"
            >
              <AddProductField
                id={`deal-quantity-${deal.id}`}
                value={deal.quantity}
                type="number"
                placeholder="qty"
                disabled={disabled}
                error={errors?.[dealIndex]?.quantity}
                onChange={(value) =>
                  onComboDealsChange(
                    comboDeals.map((item) =>
                      item.id === deal.id ? { ...item, quantity: value } : item,
                    ),
                  )
                }
              />
              <PricingMobileLabel desktopText="unit(s) for" />
              <AddProductField
                id={`deal-price-${deal.id}`}
                value={deal.price}
                type="number"
                placeholder="Price"
                suffix="$"
                disabled={disabled}
                error={errors?.[dealIndex]?.price}
                onChange={(value) =>
                  onComboDealsChange(
                    comboDeals.map((item) =>
                      item.id === deal.id ? { ...item, price: value } : item,
                    ),
                  )
                }
              />
              <RemovePricingRowButton
                disabled={disabled || comboDeals.length === 1}
                onClick={() =>
                  onComboDealsChange(
                    comboDeals.filter((item) => item.id !== deal.id),
                  )
                }
              />
            </div>
          ))}
        </div>
      </div>
      <AddPricingRowButton
        label="Add deal tier"
        disabled={disabled}
        onClick={() =>
          onComboDealsChange([
            ...comboDeals,
            { id: createPricingRowId(), quantity: "", price: "" },
          ])
        }
      />
    </div>
  );
}

