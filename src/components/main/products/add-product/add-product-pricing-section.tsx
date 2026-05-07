import type {
  AddProductFormValues,
  ProductDealTier,
  ProductPriceOption,
  ProductPricingType,
} from "@/types/main";
import type {
  AddProductFormErrors,
  AddProductValueUpdater,
} from "./add-product-form-types";
import { PricingTypeSelector } from "./pricing-type-selector";
import { ProductPricingFields } from "./product-pricing-fields";

interface AddProductPricingSectionProps {
  values: AddProductFormValues;
  errors: AddProductFormErrors;
  disabled: boolean;
  updateValue: AddProductValueUpdater;
}

export function AddProductPricingSection({
  values,
  errors,
  disabled,
  updateValue,
}: AddProductPricingSectionProps) {
  return (
    <>
      <div className="border-t border-[#E4E7EC] pt-6">
        <PricingTypeSelector
          value={values.pricingType}
          disabled={disabled}
          onChange={(value: ProductPricingType) =>
            updateValue("pricingType", value)
          }
        />
      </div>

      <ProductPricingFields
        pricingType={values.pricingType}
        perUnitPrice={values.perUnitPrice}
        packs={values.packs}
        sizes={values.sizes}
        weights={values.weights}
        comboDeals={values.comboDeals}
        disabled={disabled}
        onPerUnitPriceChange={(value) => updateValue("perUnitPrice", value)}
        onPacksChange={(value: ProductPriceOption[]) =>
          updateValue("packs", value)
        }
        onSizesChange={(value: ProductPriceOption[]) =>
          updateValue("sizes", value)
        }
        onWeightsChange={(value: ProductPriceOption[]) =>
          updateValue("weights", value)
        }
        onComboDealsChange={(value: ProductDealTier[]) =>
          updateValue("comboDeals", value)
        }
        errors={{
          perUnitPrice: errors.perUnitPrice?.message,
          packs: Array.isArray(errors.packs)
            ? errors.packs.map((error) => ({
                quantity: error?.quantity?.message,
                price: error?.price?.message,
              }))
            : undefined,
          sizes: Array.isArray(errors.sizes)
            ? errors.sizes.map((error) => ({
                label: error?.label?.message,
                price: error?.price?.message,
              }))
            : undefined,
          weights: Array.isArray(errors.weights)
            ? errors.weights.map((error) => ({
                quantity: error?.quantity?.message,
                price: error?.price?.message,
              }))
            : undefined,
          comboDeals: Array.isArray(errors.comboDeals)
            ? errors.comboDeals.map((error) => ({
                quantity: error?.quantity?.message,
                price: error?.price?.message,
              }))
            : undefined,
        }}
      />
    </>
  );
}
