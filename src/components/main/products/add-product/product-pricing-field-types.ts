import type { ProductDealTier, ProductPriceOption } from "@/types/main";

export interface ProductPricingErrors {
  perUnitPrice?: string;
  packs?: Array<Partial<Record<"quantity" | "price", string>> | undefined>;
  sizes?: Array<Partial<Record<"label" | "price", string>> | undefined>;
  weights?: Array<Partial<Record<"quantity" | "price", string>> | undefined>;
  comboDeals?: Array<Partial<Record<"quantity" | "price", string>> | undefined>;
}

export interface PricingRowsProps {
  disabled: boolean;
}

export interface PacksPricingProps extends PricingRowsProps {
  packs: ProductPriceOption[];
  errors?: ProductPricingErrors["packs"];
  onPacksChange: (value: ProductPriceOption[]) => void;
}

export interface SizesPricingProps extends PricingRowsProps {
  sizes: ProductPriceOption[];
  errors?: ProductPricingErrors["sizes"];
  onSizesChange: (value: ProductPriceOption[]) => void;
}

export interface WeightsPricingProps extends PricingRowsProps {
  weights: ProductPriceOption[];
  errors?: ProductPricingErrors["weights"];
  onWeightsChange: (value: ProductPriceOption[]) => void;
}

export interface ComboDealsPricingProps extends PricingRowsProps {
  comboDeals: ProductDealTier[];
  errors?: ProductPricingErrors["comboDeals"];
  onComboDealsChange: (value: ProductDealTier[]) => void;
}

export function createPricingRowId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `price-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

