import { Controller, type Control } from "react-hook-form";
import type { AddProductFormValues } from "@/types/main";
import { AddProductField } from "../add-product/add-product-field";
import type { AddProductFieldValidator } from "../add-product/add-product-form-types";
import { AddProductParcelFields } from "../add-product/add-product-parcel-fields";
import { ProductFlavorsField } from "../add-product/product-flavors-field";
import type { UpdateProductFormErrors, UpdateProductFormValues, UpdateProductValueUpdater } from "./update-product-form-types";
import { UpdateProductUpload } from "./update-product-upload";

interface UpdateProductAdditionalFieldsProps {
  control: Control<UpdateProductFormValues>;
  values: UpdateProductFormValues;
  errors: UpdateProductFormErrors;
  disabled: boolean;
  validateField: AddProductFieldValidator;
  updateValue: UpdateProductValueUpdater;
}

export function UpdateProductAdditionalFields({
  control,
  values,
  errors,
  disabled,
  validateField,
  updateValue,
}: UpdateProductAdditionalFieldsProps) {
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
        control={control as unknown as Control<AddProductFormValues>}
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
        control={control as unknown as Control<AddProductFormValues>}
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
        control={control as unknown as Control<AddProductFormValues>}
        render={({ field }) => (
          <UpdateProductUpload
            files={field.value}
            existingImageUrls={values.existingImageUrls}
            disabled={disabled}
            error={errors.productImages?.message}
            onChange={field.onChange}
            onExistingUrlsChange={(urls) => updateValue("existingImageUrls", urls)}
          />
        )}
      />

      <AddProductParcelFields
        control={control as unknown as Control<AddProductFormValues>}
        errors={errors}
        disabled={disabled}
      />
    </>
  );
}
