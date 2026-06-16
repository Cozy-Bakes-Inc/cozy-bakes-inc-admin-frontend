"use client";

import { useEffect, useState } from "react";
import { PathValue, useForm, useWatch } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AddProductFormValues } from "@/types/main";
import type { Control } from "react-hook-form";
import { deleteProductImage, updateProduct } from "@/services/mutations";
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
  const [deletingExistingImageIndex, setDeletingExistingImageIndex] = useState<
    number | null
  >(null);
  const [isProductImageRequiredAfterDelete, setIsProductImageRequiredAfterDelete] =
    useState(false);
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

  useEffect(() => {
    if (!isProductImageRequiredAfterDelete) return;

    if (values.existingImages.length === 0 && values.productImages.length === 0) {
      setError("productImages", {
        type: "manual",
        message: "At least one image is required",
      });
    }
  }, [
    clearErrors,
    isProductImageRequiredAfterDelete,
    setError,
    values.existingImages.length,
    values.productImages.length,
  ]);

  function updateValue<K extends keyof UpdateProductFormValues>(
    key: K,
    value: UpdateProductFormValues[K],
  ) {
    if (key === "productImages" && (value as File[]).length > 0) {
      setIsProductImageRequiredAfterDelete(false);
    }
    clearErrors(key);
    setValue(key, value as PathValue<UpdateProductFormValues, K>, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  }

  function syncProductImageRequiredError(existingImageCount: number) {
    if (existingImageCount === 0 && getValues("productImages").length === 0) {
      setIsProductImageRequiredAfterDelete(true);
      setError("productImages", {
        type: "manual",
        message: "At least one image is required",
      });
      return;
    }

    setIsProductImageRequiredAfterDelete(false);
    clearErrors("productImages");
  }

  async function handleRemoveExistingImage(index: number) {
    if (deletingExistingImageIndex !== null || isSubmitting) return;

    const image = getValues("existingImages")[index];
    if (!image) return;

    setDeletingExistingImageIndex(index);
    const result = await deleteProductImage(slug, image.id);
    setDeletingExistingImageIndex(null);

    if (result?.ok) {
      const nextImages = getValues("existingImages").filter(
        (item) => item.id !== image.id,
      );

      setValue("existingImages", nextImages, {
        shouldDirty: false,
        shouldTouch: true,
        shouldValidate: true,
      });
      toast.success(result.message || "Product image deleted successfully");
      await queryClient.invalidateQueries({ queryKey: ["products"] });
      await queryClient.invalidateQueries({ queryKey: ["product", slug] });
      syncProductImageRequiredError(nextImages.length);
      return;
    }

    toast.error(result?.message || "Failed to delete product image");
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
          disabled={isSubmitting || deletingExistingImageIndex !== null}
          deletingExistingImageIndex={deletingExistingImageIndex}
          validateField={validateUpdateProductField as Parameters<typeof AddProductBasicFields>[0]["validateField"]}
          updateValue={updateValue}
          onExistingImageRemove={handleRemoveExistingImage}
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
