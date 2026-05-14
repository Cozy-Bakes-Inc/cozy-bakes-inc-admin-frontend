import type {
  ProductDealTier,
  ProductPriceOption,
  ProductPricingType,
} from "@/types/main";
import { ProductPricingComboDeals } from "./product-pricing-combo-deals";
import type { ProductPricingErrors } from "./product-pricing-field-types";
import { ProductPricingPacks } from "./product-pricing-packs";
import { ProductPricingPerUnit } from "./product-pricing-per-unit";
import { ProductPricingSizes } from "./product-pricing-sizes";
import { ProductPricingWeights } from "./product-pricing-weights";

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
  if (pricingType === "perUnit") {
    return (
      <ProductPricingPerUnit
        perUnitPrice={perUnitPrice}
        disabled={disabled}
        error={errors?.perUnitPrice}
        onPerUnitPriceChange={onPerUnitPriceChange}
      />
    );
  }

  if (pricingType === "packs") {
    return (
      <ProductPricingPacks
        packs={packs ?? []}
        disabled={disabled}
        errors={errors?.packs}
        onPacksChange={onPacksChange}
      />
    );
  }

  if (pricingType === "sizes") {
    return (
      <ProductPricingSizes
        sizes={sizes ?? []}
        disabled={disabled}
        errors={errors?.sizes}
        onSizesChange={onSizesChange}
      />
    );
  }

  if (pricingType === "byWeight") {
    return (
      <ProductPricingWeights
        weights={weights ?? []}
        disabled={disabled}
        errors={errors?.weights}
        onWeightsChange={onWeightsChange}
      />
    );
  }

  return (
    <ProductPricingComboDeals
      comboDeals={comboDeals ?? []}
      disabled={disabled}
      errors={errors?.comboDeals}
      onComboDealsChange={onComboDealsChange}
    />
  );
}

