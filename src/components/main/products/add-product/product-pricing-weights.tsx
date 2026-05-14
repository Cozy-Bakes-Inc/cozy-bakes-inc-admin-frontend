import { cn } from "@/lib";
import type { ProductPriceOption } from "@/types/main";
import { AddProductField, productInputClassName } from "./add-product-field";
import {
  AddPricingRowButton,
  PricingMobileLabel,
  RemovePricingRowButton,
} from "./product-pricing-controls";
import {
  createPricingRowId,
  type WeightsPricingProps,
} from "./product-pricing-field-types";

export function ProductPricingWeights({
  weights,
  disabled,
  errors,
  onWeightsChange,
}: WeightsPricingProps) {
  return (
    <div className="space-y-3">
      <div className="rounded-[8px] border border-[#D0D5DD] bg-bg-creamy/55 p-3">
        <div className="space-y-3">
          {weights.map((weight, weightIndex) => (
            <div
              key={weight.id}
              className="grid min-w-0 grid-cols-1 items-stretch gap-3 rounded-[8px] border border-[#D0D5DD] bg-background/65 p-3 md:grid-cols-[104px_108px_84px_minmax(0,1fr)_56px] md:items-center md:border-0 md:bg-transparent md:p-0"
            >
              <AddProductField
                id={`weight-quantity-${weight.id}`}
                value={weight.quantity ?? ""}
                type="number"
                placeholder="qty"
                disabled={disabled}
                error={errors?.[weightIndex]?.quantity}
                onChange={(value) => {
                  onWeightsChange(
                    weights.map((item) =>
                      item.id === weight.id
                        ? { ...item, quantity: value }
                        : item,
                    ),
                  );
                }}
              />
              <select
                value={weight.unit ?? "OZ"}
                disabled={disabled}
                onChange={(event) =>
                  onWeightsChange(
                    weights.map((item) =>
                      item.id === weight.id
                        ? {
                            ...item,
                            unit: event.target
                              .value as ProductPriceOption["unit"],
                          }
                        : item,
                    ),
                  )
                }
                className={cn(productInputClassName, "h-[56px] py-3")}
              >
                <option value="OZ">OZ</option>
                <option value="LB">LB</option>
                <option value="G">G</option>
                <option value="KG">KG</option>
              </select>
              <PricingMobileLabel />
              <AddProductField
                id={`weight-price-${weight.id}`}
                value={weight.price}
                type="number"
                placeholder="Price"
                suffix="$"
                disabled={disabled}
                error={errors?.[weightIndex]?.price}
                onChange={(value) =>
                  onWeightsChange(
                    weights.map((item) =>
                      item.id === weight.id ? { ...item, price: value } : item,
                    ),
                  )
                }
              />
              <RemovePricingRowButton
                disabled={disabled || weights.length === 1}
                onClick={() =>
                  onWeightsChange(weights.filter((item) => item.id !== weight.id))
                }
              />
            </div>
          ))}
        </div>
      </div>
      <AddPricingRowButton
        label="Add weight option"
        disabled={disabled}
        onClick={() =>
          onWeightsChange([
            ...weights,
            { id: createPricingRowId(), quantity: "", unit: "OZ", price: "" },
          ])
        }
      />
    </div>
  );
}

