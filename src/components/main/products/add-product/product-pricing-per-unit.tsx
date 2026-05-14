import { AddProductField } from "./add-product-field";

interface ProductPricingPerUnitProps {
  perUnitPrice: string;
  disabled: boolean;
  error?: string;
  onPerUnitPriceChange: (value: string) => void;
}

export function ProductPricingPerUnit({
  perUnitPrice,
  disabled,
  error,
  onPerUnitPriceChange,
}: ProductPricingPerUnitProps) {
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
          error={error}
          onChange={onPerUnitPriceChange}
          inputClassName="text-sm"
        />
      </div>
    </div>
  );
}

