export type ProductPricingType =
  | "perUnit"
  | "packs"
  | "sizes"
  | "byWeight"
  | "comboDeal";

export type ParcelDistanceUnit = "in" | "cm" | "ft" | "m";
export type ParcelMassUnit = "lb" | "oz" | "g" | "kg";

export interface ParcelDimensions {
  length: string;
  width: string;
  height: string;
  distanceUnit: ParcelDistanceUnit;
  weight: string;
  massUnit: ParcelMassUnit;
}

export interface ProductPriceOption {
  id: string;
  label?: string;
  quantity?: string;
  unit?: "OZ" | "LB" | "G" | "KG";
  price: string;
}

export interface ProductDealTier {
  id: string;
  quantity: string;
  price: string;
}

export interface AddProductFormValues {
  productName: string;
  category: string;
  description: string;
  pricingType: ProductPricingType;
  perUnitPrice: string;
  packs: ProductPriceOption[];
  sizes: ProductPriceOption[];
  weights: ProductPriceOption[];
  comboDeals: ProductDealTier[];
  hasFlavors: boolean;
  flavors: string[];
  ingredients: string;
  allergens: string;
  productImages: File[];
  parcel: ParcelDimensions;
}

export interface AddProductProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (values: AddProductFormValues) => void | Promise<void>;
  initialValues?: Partial<AddProductFormValues>;
  submitLabel?: string;
}
