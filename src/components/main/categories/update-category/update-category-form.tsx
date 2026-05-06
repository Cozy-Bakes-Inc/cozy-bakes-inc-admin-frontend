"use client";

import Image from "next/image";
import { useEffect } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import type { SubCategoryDetailsItem } from "@/interfaces/main/categories";
import { updateCategorySchema } from "@/schemas";
import { updateSubCategoryAPI } from "@/services/mutations";
import type { UpdateCategoryFormValues } from "@/types/main/categories";
import { AddCategoryField } from "../add-category/add-category-field";
import { AddCategoryUpload } from "../add-category/add-category-upload";

interface UpdateCategoryFormProps {
  slug: string;
  category: SubCategoryDetailsItem;
  onCancel: () => void;
  onSubmit?: (values: UpdateCategoryFormValues) => void | Promise<void>;
}

const defaultFormValues: UpdateCategoryFormValues = {
  title: "",
  description: "",
  image: null,
};

export function UpdateCategoryForm({
  slug,
  category,
  onCancel,
  onSubmit,
}: UpdateCategoryFormProps) {
  const queryClient = useQueryClient();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<UpdateCategoryFormValues>({
    defaultValues: defaultFormValues,
    reValidateMode: "onChange",
  });
  const selectedImage = useWatch({ control, name: "image" });

  useEffect(() => {
    reset({
      title: category.title,
      description: category.description,
      image: null,
    });
  }, [category, reset]);

  function validateField<K extends keyof UpdateCategoryFormValues>(
    field: K,
    value: UpdateCategoryFormValues[K],
  ) {
    const result = updateCategorySchema.shape[field].safeParse(value);
    return result.success || result.error.issues[0]?.message;
  }

  async function handleUpdateCategory(values: UpdateCategoryFormValues) {
    if (!isDirty) {
      return;
    }

    const payload = new FormData();
    payload.append("title", values.title.trim());
    payload.append("description", values.description.trim());

    if (values.image) {
      payload.append("image", values.image);
    }

    const result = await updateSubCategoryAPI(slug, payload);

    if (result?.ok) {
      toast.success(result.message || "Category updated successfully");
      await queryClient.invalidateQueries({ queryKey: ["sub-categories"] });
      await queryClient.invalidateQueries({ queryKey: ["sub-category", slug] });
      await onSubmit?.(values);
      return;
    }

    toast.error(result?.message);
  }

  return (
    <form
      onSubmit={handleSubmit(handleUpdateCategory)}
      className="flex min-h-0 max-w-full flex-col overflow-x-hidden"
    >
      <div className="max-w-full space-y-5 px-4 py-5 sm:px-6 md:px-8 md:py-6">
        <div className="rounded-[24px] border border-primary/20 bg-background px-5 py-5 md:px-6 md:py-6">
          <div className="space-y-5">
            <Controller
              name="title"
              control={control}
              rules={{
                validate: (value) => validateField("title", value),
              }}
              render={({ field }) => (
                <AddCategoryField
                  id="updateCategoryTitle"
                  label="Title"
                  placeholder="Title"
                  value={field.value}
                  disabled={isSubmitting}
                  error={errors.title?.message}
                  onChange={field.onChange}
                />
              )}
            />

            <Controller
              name="description"
              control={control}
              rules={{
                validate: (value) => validateField("description", value),
              }}
              render={({ field }) => (
                <AddCategoryField
                  id="updateCategoryDescription"
                  label="Description"
                  placeholder="Description"
                  value={field.value}
                  multiline
                  rows={4}
                  disabled={isSubmitting}
                  error={errors.description?.message}
                  onChange={field.onChange}
                />
              )}
            />

            {category.image && !selectedImage ? (
              <div>
                <p className="mb-2 block text-[16px] font-medium leading-6 text-dark">
                  Current Image
                </p>
                <div className="size-[150px] overflow-hidden rounded-[24px] border border-dashed border-primary bg-bg-creamy">
                  <Image
                    src={category.image}
                    alt={`${category.title} current image`}
                    width={150}
                    height={150}
                    className="size-full object-cover"
                    unoptimized
                  />
                </div>
              </div>
            ) : null}

            <Controller
              name="image"
              control={control}
              rules={{
                validate: (value) => validateField("image", value),
              }}
              render={({ field }) => (
                <AddCategoryUpload
                  file={field.value}
                  disabled={isSubmitting}
                  error={errors.image?.message}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        </div>
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
          disabled={isSubmitting || !isDirty}
          className="h-[48px] w-full rounded-[8px] bg-primary px-6 text-base font-semibold text-white hover:bg-primary/90 sm:w-auto sm:min-w-[176px]"
        >
          {isSubmitting ? <Loader /> : "Update Category"}
        </Button>
      </div>
    </form>
  );
}
