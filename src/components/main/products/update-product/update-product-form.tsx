"use client";

import { useEffect } from "react";
import { PathValue, useForm, useWatch } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AddProductFormValues } from "@/types/main";
import type { Control } from "react-hook-form";
import { updateProduct } from "@/services/mutations";
import { AddProductBasicFields } from "../add-product/add-product-basic-fields";
import { AddProductFormActions } from "../add-product/add-product-form-actions";
import { AddProductPricingSection } from "../add-product/add-product-pricing-section";
import {
  applyUpdateProductSchemaErrors,
  validateUpdateProductField,
} from "./update-product-validation";
import { buildPartialUpdatePayload } from "./update-product-payload";
import { UpdateProductAdditionalFields } from "./update-product-additional-fields";
import type { UpdateProductFormValues } from "./update-product-form-types";

interface UpdateProductFormProps {
  slug: string;
  initialValues: UpdateProductFormValues;
  onSubmit?: () => void | Promise<void>;
  onCancel: () => void;
}

export function UpdateProductForm({
  slug,
  initialValues,
  onSubmit,
  onCancel,
}: UpdateProductFormProps) {
  const queryClient = useQueryClient();
  const {
    control,
    clearErrors,
    getValues,
    handleSubmit,
    reset,
    setError,
    setValue,
    formState: { errors, isDirty, dirtyFields, isSubmitting, isValid },
  } = useForm<UpdateProductFormValues>({
    defaultValues: initialValues,
    mode: "onChange",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    reset(initialValues);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues.productName, initialValues.category, reset]);

  const values = useWatch({ control }) as UpdateProductFormValues;

  function updateValue<K extends keyof UpdateProductFormValues>(
    key: K,
    value: UpdateProductFormValues[K],
  ) {
    clearErrors(key);
    setValue(key, value as PathValue<UpdateProductFormValues, K>, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  }

  async function handleUpdateProduct(valuesToSubmit: UpdateProductFormValues) {
    if (!isDirty) return;

    const validated = applyUpdateProductSchemaErrors(valuesToSubmit, setError);
    if (!validated) return;

    const payload = buildPartialUpdatePayload(
      validated,
      dirtyFields as Partial<Record<keyof UpdateProductFormValues, unknown>>,
    );

    const result = await updateProduct(slug, payload);

    if (result?.ok) {
      toast.success(result.message || "Product updated successfully");
      await queryClient.invalidateQueries({ queryKey: ["products"] });
      await queryClient.invalidateQueries({ queryKey: ["product", slug] });
      await onSubmit?.();
      return;
    }

    toast.error(result?.message || "Failed to update product");
  }

  return (
    <form
      onSubmit={handleSubmit(handleUpdateProduct, () => {
        applyUpdateProductSchemaErrors(getValues(), setError);
      })}
      className="flex min-h-0 max-w-full flex-col overflow-x-hidden"
    >
      <div className="max-w-full space-y-5 px-4 py-5 sm:px-6 md:space-y-6 md:px-8 md:py-6">
        <AddProductBasicFields
          control={control as unknown as Control<AddProductFormValues>}
          errors={errors}
          disabled={isSubmitting}
          validateField={validateUpdateProductField as Parameters<typeof AddProductBasicFields>[0]["validateField"]}
        />

        <AddProductPricingSection
          values={values}
          errors={errors}
          disabled={isSubmitting}
          updateValue={
            updateValue as unknown as (
              key: keyof AddProductFormValues,
              value: AddProductFormValues[keyof AddProductFormValues],
            ) => void
          }
        />

        <UpdateProductAdditionalFields
          control={control}
          values={values}
          errors={errors}
          disabled={isSubmitting}
          validateField={validateUpdateProductField as Parameters<typeof AddProductBasicFields>[0]["validateField"]}
          updateValue={updateValue}
        />
      </div>

      <AddProductFormActions
        disabled={isSubmitting}
        submitDisabled={!isDirty || !isValid || isSubmitting}
        submitLabel="Save Changes"
        onCancel={onCancel}
      />
    </form>
  );
}
