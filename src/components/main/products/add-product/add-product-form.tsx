"use client";

import { useQueryClient } from "@tanstack/react-query";
import {
  PathValue,
  useForm,
  useWatch,
} from "react-hook-form";
import toast from "react-hot-toast";
import { createProduct } from "@/services/mutations";
import type { AddProductFormValues } from "@/types/main";
import { AddProductAdditionalFields } from "./add-product-additional-fields";
import { AddProductBasicFields } from "./add-product-basic-fields";
import { AddProductFormActions } from "./add-product-form-actions";
import { buildProductPayload } from "./add-product-payload";
import { AddProductPricingSection } from "./add-product-pricing-section";
import {
  applyProductSchemaErrors,
  validateProductField,
} from "./add-product-validation";

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
  const queryClient = useQueryClient();
  const {
    control,
    clearErrors,
    getValues,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<AddProductFormValues>({
    defaultValues: initialValues,
    reValidateMode: "onChange",
  });

  const values = useWatch({ control }) as AddProductFormValues;

  function updateValue<K extends keyof AddProductFormValues>(
    key: K,
    value: AddProductFormValues[K],
  ) {
    clearErrors(key);
    setValue(key, value as PathValue<AddProductFormValues, K>, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  }

  async function handleCreateProduct(valuesToSubmit: AddProductFormValues) {
    const validatedValues = applyProductSchemaErrors(valuesToSubmit, setError);
    if (!validatedValues) {
      return;
    }
    const result = await createProduct(buildProductPayload(validatedValues));

    if (result?.ok) {
      toast.success(result.message || "Product created successfully");
      await queryClient.invalidateQueries({ queryKey: ["products"] });
      await onSubmit?.(validatedValues);
      return;
    }

    toast.error(result?.message);
  }

  return (
    <form
      onSubmit={handleSubmit(handleCreateProduct, () => {
        applyProductSchemaErrors(getValues(), setError);
      })}
      className="flex min-h-0 max-w-full flex-col overflow-x-hidden"
    >
      <div className="max-w-full space-y-5 px-4 py-5 sm:px-6 md:space-y-6 md:px-8 md:py-6">
        <AddProductBasicFields
          control={control}
          errors={errors}
          disabled={isSubmitting}
          validateField={validateProductField}
        />

        <AddProductPricingSection
          values={values}
          errors={errors}
          disabled={isSubmitting}
          updateValue={updateValue}
        />

        <AddProductAdditionalFields
          control={control}
          values={values}
          errors={errors}
          disabled={isSubmitting}
          validateField={validateProductField}
          updateValue={updateValue}
        />
      </div>

      <AddProductFormActions
        disabled={isSubmitting}
        submitLabel={submitLabel}
        onCancel={onCancel}
      />
    </form>
  );
}
