import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib";
import type {
  ProductDealTier,
  ProductPriceOption,
  ProductPricingType,
} from "@/types/main";
import { AddProductField, productInputClassName } from "./add-product-field";

interface ProductPricingFieldsProps {
  pricingType: ProductPricingType;
  perUnitPrice: string;
  packs: ProductPriceOption[];
  sizes: ProductPriceOption[];
  weights: ProductPriceOption[];
  comboDeals: ProductDealTier[];
  disabled?: boolean;
  onPerUnitPriceChange: (value: string) => void;
  onPacksChange: (value: ProductPriceOption[]) => void;
  onSizesChange: (value: ProductPriceOption[]) => void;
  onWeightsChange: (value: ProductPriceOption[]) => void;
  onComboDealsChange: (value: ProductDealTier[]) => void;
  errors?: ProductPricingErrors;
}

interface ProductPricingErrors {
  perUnitPrice?: string;
  packs?: Array<Partial<Record<"quantity" | "price", string>> | undefined>;
  sizes?: Array<Partial<Record<"label" | "price", string>> | undefined>;
  weights?: Array<Partial<Record<"quantity" | "price", string>> | undefined>;
  comboDeals?: Array<Partial<Record<"quantity" | "price", string>> | undefined>;
}

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `price-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function RemoveButton({
  disabled,
  onClick,
}: {
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      disabled={disabled}
      onClick={onClick}
      className="size-[48px] rounded-[8px] border border-[#D0D5DD] bg-background text-dark hover:bg-muted"
      aria-label="Remove pricing row"
    >
      <X className="size-4" />
    </Button>
  );
}

function AddRowButton({
  label,
  disabled,
  onClick,
}: {
  label: string;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      disabled={disabled}
      onClick={onClick}
      className="h-[48px] w-full rounded-[8px] border border-[#D0D5DD] bg-background text-base font-medium text-dark hover:border-primary hover:bg-primary/5 hover:text-primary"
    >
      + {label}
    </Button>
  );
}

export function ProductPricingFields({
  pricingType,
  perUnitPrice,
  packs,
  sizes,
  weights,
  comboDeals,
  disabled = false,
  onPerUnitPriceChange,
  onPacksChange,
  onSizesChange,
  onWeightsChange,
  onComboDealsChange,
  errors,
}: ProductPricingFieldsProps) {
  const safePacks = packs ?? [];
  const safeSizes = sizes ?? [];
  const safeWeights = weights ?? [];
  const safeComboDeals = comboDeals ?? [];

  if (pricingType === "perUnit") {
    return (
      <div className="rounded-[10px] border border-[#D0D5DD] bg-bg-creamy/55 p-3 md:p-4">
        <div className="grid items-center gap-3 md:grid-cols-[64px_1fr]">
          <span className="text-base font-medium text-dark">Price</span>
          <AddProductField
            id="perUnitPrice"
            value={perUnitPrice}
            type="number"
            placeholder="Price"
            suffix="$"
            disabled={disabled}
            error={errors?.perUnitPrice}
            onChange={onPerUnitPriceChange}
            inputClassName="text-sm"
          />
        </div>
      </div>
    );
  }

  if (pricingType === "packs") {
    return (
      <div className="space-y-3">
        {safePacks.map((pack, packIndex) => (
          <div
            key={pack.id}
            className="grid items-center gap-3 rounded-[8px] border border-[#D0D5DD] bg-bg-creamy/55 p-3 md:grid-cols-[104px_130px_1fr_32px_56px]"
          >
            <AddProductField
              id={`pack-quantity-${pack.id}`}
              value={pack.quantity ?? ""}
              type="number"
              placeholder="qty"
              disabled={disabled}
              error={errors?.packs?.[packIndex]?.quantity}
              onChange={(value) =>
                onPacksChange(
                  safePacks.map((item) =>
                    item.id === pack.id ? { ...item, quantity: value } : item,
                  ),
                )
              }
            />
            <span className="text-base font-medium text-dark">
              units - Price
            </span>
            <AddProductField
              id={`pack-price-${pack.id}`}
              value={pack.price}
              type="number"
              placeholder="Price"
              disabled={disabled}
              error={errors?.packs?.[packIndex]?.price}
              onChange={(value) =>
                onPacksChange(
                  safePacks.map((item) =>
                    item.id === pack.id ? { ...item, price: value } : item,
                  ),
                )
              }
            />
            <span className="text-center text-lg font-medium text-dark">$</span>
            <RemoveButton
              disabled={disabled || safePacks.length === 1}
              onClick={() =>
                onPacksChange(safePacks.filter((item) => item.id !== pack.id))
              }
            />
          </div>
        ))}
        <AddRowButton
          label="Add pack size"
          disabled={disabled}
          onClick={() =>
            onPacksChange([
              ...safePacks,
              { id: createId(), quantity: "", price: "" },
            ])
          }
        />
      </div>
    );
  }

  if (pricingType === "sizes") {
    return (
      <div className="space-y-3">
        <div className="rounded-[8px] border border-[#D0D5DD] bg-bg-creamy/55 p-3">
          <div className="space-y-3">
            {safeSizes.map((size, sizeIndex) => (
              <div
                key={size.id}
                className="grid items-center gap-3 md:grid-cols-[180px_76px_1fr_32px_56px]"
              >
                <AddProductField
                  id={`size-label-${size.id}`}
                  value={size.label ?? ""}
                  placeholder="Size"
                  disabled={disabled}
                  error={errors?.sizes?.[sizeIndex]?.label}
                  onChange={(value) =>
                    onSizesChange(
                      safeSizes.map((item) =>
                        item.id === size.id ? { ...item, label: value } : item,
                      ),
                    )
                  }
                />
                <span className="text-base font-medium text-dark">
                  - Price
                </span>
                <AddProductField
                  id={`size-price-${size.id}`}
                  value={size.price}
                  type="number"
                  placeholder="Price"
                  disabled={disabled}
                  error={errors?.sizes?.[sizeIndex]?.price}
                  onChange={(value) =>
                    onSizesChange(
                      safeSizes.map((item) =>
                        item.id === size.id ? { ...item, price: value } : item,
                      ),
                    )
                  }
                />
                <span className="text-center text-lg font-medium text-dark">
                  $
                </span>
                <RemoveButton
                  disabled={disabled || safeSizes.length === 1}
                  onClick={() =>
                    onSizesChange(safeSizes.filter((item) => item.id !== size.id))
                  }
                />
              </div>
            ))}
          </div>
        </div>
        <AddRowButton
          label="Add size"
          disabled={disabled}
          onClick={() =>
            onSizesChange([
              ...safeSizes,
              { id: createId(), label: "", price: "" },
            ])
          }
        />
      </div>
    );
  }

  if (pricingType === "byWeight") {
    return (
      <div className="space-y-3">
        <div className="rounded-[8px] border border-[#D0D5DD] bg-bg-creamy/55 p-3">
          <div className="space-y-3">
            {safeWeights.map((weight, weightIndex) => (
              <div
                key={weight.id}
                className="grid items-center gap-3 md:grid-cols-[104px_108px_84px_1fr_32px_56px]"
              >
                <AddProductField
                  id={`weight-quantity-${weight.id}`}
                  value={weight.quantity ?? ""}
                  type="number"
                  placeholder="qty"
                  disabled={disabled}
                  error={errors?.weights?.[weightIndex]?.quantity}
                  onChange={(value) =>
                    onWeightsChange(
                      safeWeights.map((item) =>
                        item.id === weight.id
                          ? { ...item, quantity: value }
                          : item,
                      ),
                    )
                  }
                />
                <select
                  value={weight.unit ?? "OZ"}
                  disabled={disabled}
                  onChange={(event) =>
                    onWeightsChange(
                      safeWeights.map((item) =>
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
                <span className="text-base font-medium text-dark">
                  - Price
                </span>
                <AddProductField
                  id={`weight-price-${weight.id}`}
                  value={weight.price}
                  type="number"
                  placeholder="Price"
                  disabled={disabled}
                  error={errors?.weights?.[weightIndex]?.price}
                  onChange={(value) =>
                    onWeightsChange(
                      safeWeights.map((item) =>
                        item.id === weight.id ? { ...item, price: value } : item,
                      ),
                    )
                  }
                />
                <span className="text-center text-lg font-medium text-dark">
                  $
                </span>
                <RemoveButton
                  disabled={disabled || safeWeights.length === 1}
                  onClick={() =>
                    onWeightsChange(
                      safeWeights.filter((item) => item.id !== weight.id),
                    )
                  }
                />
              </div>
            ))}
          </div>
        </div>
        <AddRowButton
          label="Add weight option"
          disabled={disabled}
          onClick={() =>
            onWeightsChange([
              ...safeWeights,
              { id: createId(), quantity: "", unit: "OZ", price: "" },
            ])
          }
        />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="rounded-[8px] border border-[#D0D5DD] bg-bg-creamy/55 p-3">
        <div className="space-y-3">
          {safeComboDeals.map((deal, dealIndex) => (
            <div
              key={deal.id}
              className="grid items-center gap-3 md:grid-cols-[120px_120px_1fr_32px_56px]"
            >
              <AddProductField
                id={`deal-quantity-${deal.id}`}
                value={deal.quantity}
                type="number"
                placeholder="qty"
                disabled={disabled}
                error={errors?.comboDeals?.[dealIndex]?.quantity}
                onChange={(value) =>
                  onComboDealsChange(
                    safeComboDeals.map((item) =>
                      item.id === deal.id ? { ...item, quantity: value } : item,
                    ),
                  )
                }
              />
              <span className="text-base font-medium text-dark">
                unit(s) for
              </span>
              <AddProductField
                id={`deal-price-${deal.id}`}
                value={deal.price}
                type="number"
                placeholder="Price"
                disabled={disabled}
                error={errors?.comboDeals?.[dealIndex]?.price}
                onChange={(value) =>
                  onComboDealsChange(
                    safeComboDeals.map((item) =>
                      item.id === deal.id ? { ...item, price: value } : item,
                    ),
                  )
                }
              />
              <span className="text-center text-lg font-medium text-dark">
                $
              </span>
              <RemoveButton
                disabled={disabled || safeComboDeals.length === 1}
                onClick={() =>
                  onComboDealsChange(
                    safeComboDeals.filter((item) => item.id !== deal.id),
                  )
                }
              />
            </div>
          ))}
        </div>
      </div>
      <AddRowButton
        label="Add deal tier"
        disabled={disabled}
        onClick={() =>
          onComboDealsChange([
            ...safeComboDeals,
            {
              id: createId(),
              quantity: "",
              price: "",
            },
          ])
        }
      />
    </div>
  );
}
