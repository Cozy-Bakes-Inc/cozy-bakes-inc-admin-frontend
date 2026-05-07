import { Controller, type Control } from "react-hook-form";
import type { AddProductFormValues } from "@/types/main";
import { AddProductField } from "./add-product-field";
import type {
  AddProductFieldValidator,
  AddProductFormErrors,
  AddProductValueUpdater,
} from "./add-product-form-types";
import { AddProductUpload } from "./add-product-upload";
import { ProductFlavorsField } from "./product-flavors-field";

interface AddProductAdditionalFieldsProps {
  control: Control<AddProductFormValues>;
  values: AddProductFormValues;
  errors: AddProductFormErrors;
  disabled: boolean;
  validateField: AddProductFieldValidator;
  updateValue: AddProductValueUpdater;
}

export function AddProductAdditionalFields({
  control,
  values,
  errors,
  disabled,
  validateField,
  updateValue,
}: AddProductAdditionalFieldsProps) {
  return (
    <>
      <ProductFlavorsField
        enabled={values.hasFlavors}
        flavors={values.flavors}
        disabled={disabled}
        error={errors.flavors?.message}
        onEnabledChange={(value) => updateValue("hasFlavors", value)}
        onFlavorsChange={(value) => updateValue("flavors", value)}
      />

      <Controller
        name="ingredients"
        control={control}
        rules={{
          validate: (value) => validateField("ingredients", value),
        }}
        render={({ field }) => (
          <AddProductField
            id="ingredients"
            label="Ingredients"
            value={field.value}
            placeholder="Add ingredients..."
            multiline
            rows={2}
            disabled={disabled}
            error={errors.ingredients?.message}
            onChange={field.onChange}
          />
        )}
      />

      <Controller
        name="allergens"
        control={control}
        rules={{
          validate: (value) => validateField("allergens", value),
        }}
        render={({ field }) => (
          <AddProductField
            id="allergens"
            label="Allergens"
            value={field.value}
            placeholder="Add allergens..."
            multiline
            rows={2}
            disabled={disabled}
            error={errors.allergens?.message}
            onChange={field.onChange}
          />
        )}
      />

      <Controller
        name="productImage"
        control={control}
        rules={{
          validate: (value) => validateField("productImage", value),
        }}
        render={({ field }) => (
          <AddProductUpload
            file={field.value}
            disabled={disabled}
            error={errors.productImage?.message}
            onChange={field.onChange}
          />
        )}
      />
    </>
  );
}
