"use client";

import { useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { createCategorySchema } from "@/schemas";
import { createSubCategoryAPI } from "@/services/mutations";
import type { AddCategoryFormValues } from "@/types/main/categories";
import { AddCategoryField } from "./add-category-field";
import { AddCategoryUpload } from "./add-category-upload";

interface AddCategoryFormProps {
  initialValues: AddCategoryFormValues;
  onSubmit?: (values: AddCategoryFormValues) => void | Promise<void>;
  onCancel: () => void;
  submitLabel: string;
}

export function AddCategoryForm({
  initialValues,
  onSubmit,
  onCancel,
  submitLabel,
}: AddCategoryFormProps) {
  const queryClient = useQueryClient();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddCategoryFormValues>({
    defaultValues: initialValues,
    reValidateMode: "onChange",
  });

  function validateField<K extends keyof AddCategoryFormValues>(
    field: K,
    value: AddCategoryFormValues[K],
  ) {
    const result = createCategorySchema.shape[field].safeParse(value);
    return result.success || result.error.issues[0]?.message;
  }

  async function handleCreateCategory(values: AddCategoryFormValues) {
    const payload = new FormData();
    payload.append("title", values.title.trim());
    payload.append("description", values.description.trim());

    if (!values.image) {
      toast.error("Image is required");
      return;
    }

    payload.append("image", values.image);

    if (values.categoryId?.trim()) {
      payload.append("category_id", values.categoryId.trim());
    }

    const result = await createSubCategoryAPI(payload);
    if (result?.ok) {
      toast.success(result.message || "Category created successfully");
      await queryClient.invalidateQueries({ queryKey: ["sub-categories"] });
      await onSubmit?.(values);
      return;
    }

    toast.error(result?.message);
  }

  return (
    <form
      onSubmit={handleSubmit(handleCreateCategory)}
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
                  id="categoryTitle"
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
                  id="categoryDescription"
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
          disabled={isSubmitting}
          className="h-[48px] w-full rounded-[8px] bg-primary px-6 text-base font-semibold text-white hover:bg-primary/90 sm:w-auto sm:min-w-[176px]"
        >
          {isSubmitting ? <Loader /> : submitLabel}
        </Button>
      </div>
    </form>
  );
}
