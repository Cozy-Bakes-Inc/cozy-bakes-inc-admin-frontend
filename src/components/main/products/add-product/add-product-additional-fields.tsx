import { Controller, type Control } from "react-hook-form";
import type { AddProductFormValues } from "@/types/main";
import { AddProductField } from "./add-product-field";
import type {
  AddProductFieldValidator,
  AddProductFormErrors,
  AddProductValueUpdater,
} from "./add-product-form-types";
import { AddProductParcelFields } from "./add-product-parcel-fields";
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
        name="productImages"
        control={control}
        rules={{
          validate: (value) => validateField("productImages", value),
        }}
        render={({ field }) => (
          <AddProductUpload
            files={field.value}
            disabled={disabled}
            error={errors.productImages?.message}
            onChange={field.onChange}
          />
        )}
      />

      <AddProductParcelFields
        control={control}
        errors={errors}
        disabled={disabled}
      />
    </>
  );
}
