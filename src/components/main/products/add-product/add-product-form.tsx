"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import type {
  AddProductFormValues,
  ProductDealTier,
  ProductPriceOption,
  ProductPricingType,
} from "@/types/main";
import { AddProductCategorySelect } from "./add-product-category-select";
import { AddProductField } from "./add-product-field";
import { AddProductUpload } from "./add-product-upload";
import { PricingTypeSelector } from "./pricing-type-selector";
import { ProductPricingFields } from "./product-pricing-fields";
import { ProductVariantsField } from "./product-variants-field";

interface AddProductFormProps {
  initialValues: AddProductFormValues;
  onSubmit?: (values: AddProductFormValues) => void | Promise<void>;
  onCancel: () => void;
  submitLabel: string;
}

export function AddProductForm({
  initialValues,
  onSubmit,
  onCancel,
  submitLabel,
}: AddProductFormProps) {
  const [values, setValues] = useState<AddProductFormValues>(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateValue<K extends keyof AddProductFormValues>(
    key: K,
    value: AddProductFormValues[K],
  ) {
    setValues((currentValues) => ({
      ...currentValues,
      [key]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit?.(values);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex min-h-0 max-w-full flex-col overflow-x-hidden"
    >
      <div className="max-w-full space-y-5 px-4 py-5 sm:px-6 md:space-y-6 md:px-8 md:py-6">
        <div className="grid gap-5 md:grid-cols-2">
          <AddProductField
            id="productName"
            label="Product Name"
            value={values.productName}
            placeholder="e.g. Sourdough Loaf"
            disabled={isSubmitting}
            onChange={(value) => updateValue("productName", value)}
          />

          <AddProductCategorySelect
            value={values.category}
            disabled={isSubmitting}
            onChange={(value) => updateValue("category", value)}
          />
        </div>

        <AddProductField
          id="description"
          label="Description"
          value={values.description}
          placeholder="Short product description..."
          multiline
          rows={4}
          disabled={isSubmitting}
          onChange={(value) => updateValue("description", value)}
        />

        <div className="border-t border-[#E4E7EC] pt-6">
          <PricingTypeSelector
            value={values.pricingType}
            disabled={isSubmitting}
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
          disabled={isSubmitting}
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
        />

        <ProductVariantsField
          enabled={values.hasVariants}
          variants={values.variants}
          disabled={isSubmitting}
          onEnabledChange={(value) => updateValue("hasVariants", value)}
          onVariantsChange={(value) => updateValue("variants", value)}
        />

        <AddProductField
          id="ingredients"
          label="Ingredients"
          value={values.ingredients}
          placeholder="Add ingredients..."
          multiline
          rows={2}
          disabled={isSubmitting}
          onChange={(value) => updateValue("ingredients", value)}
        />

        <AddProductField
          id="allergens"
          label="Allergens"
          value={values.allergens}
          placeholder="Add allergens..."
          multiline
          rows={2}
          disabled={isSubmitting}
          onChange={(value) => updateValue("allergens", value)}
        />

        <AddProductUpload
          file={values.productImage}
          disabled={isSubmitting}
          onChange={(value) => updateValue("productImage", value)}
        />
      </div>

      <div className="grid gap-3 border-t border-[#E4E7EC] px-4 py-4 sm:flex sm:justify-end sm:gap-4 sm:px-6 md:px-8">
        <Button
          type="button"
          variant="outline"
          disabled={isSubmitting}
          onClick={onCancel}
          className="h-[48px] w-full rounded-[8px] border-[#D0D5DD] bg-background text-base font-medium text-dark hover:bg-muted sm:w-auto sm:min-w-[140px]"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-[48px] w-full rounded-[8px] bg-primary px-6 text-base font-semibold text-white hover:bg-primary/90 sm:w-auto sm:min-w-[176px]"
        >
          {isSubmitting ? <Loader /> : submitLabel}
        </Button>
      </div>
    </form>
  );
}
