import { Controller, type Control } from "react-hook-form";
import type { AddProductFormValues } from "@/types/main";
import { AddProductCategorySelect } from "./add-product-category-select";
import { AddProductField } from "./add-product-field";
import type {
  AddProductFieldValidator,
  AddProductFormErrors,
} from "./add-product-form-types";

interface AddProductBasicFieldsProps {
  control: Control<AddProductFormValues>;
  errors: AddProductFormErrors;
  disabled: boolean;
  validateField: AddProductFieldValidator;
}

export function AddProductBasicFields({
  control,
  errors,
  disabled,
  validateField,
}: AddProductBasicFieldsProps) {
  return (
    <>
      <div className="grid gap-5 md:grid-cols-2">
        <Controller
          name="productName"
          control={control}
          rules={{
            validate: (value) => validateField("productName", value),
          }}
          render={({ field }) => (
            <AddProductField
              id="productName"
              label="Product Name"
              value={field.value}
              placeholder="e.g. Sourdough Loaf"
              disabled={disabled}
              error={errors.productName?.message}
              onChange={field.onChange}
            />
          )}
        />

        <Controller
          name="category"
          control={control}
          rules={{
            validate: (value) => validateField("category", value),
          }}
          render={({ field }) => (
            <AddProductCategorySelect
              value={field.value}
              disabled={disabled}
              error={errors.category?.message}
              onChange={field.onChange}
            />
          )}
        />
      </div>

      <Controller
        name="description"
        control={control}
        rules={{
          validate: (value) => validateField("description", value),
        }}
        render={({ field }) => (
          <AddProductField
            id="description"
            label="Description"
            value={field.value}
            placeholder="Short product description..."
            multiline
            rows={4}
            disabled={disabled}
            error={errors.description?.message}
            onChange={field.onChange}
          />
        )}
      />
    </>
  );
}
