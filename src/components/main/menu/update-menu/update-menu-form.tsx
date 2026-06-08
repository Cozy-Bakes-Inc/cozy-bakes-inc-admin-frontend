"use client";

import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateMenuAPI } from "@/services/mutations/menu";
import { updateMenuSchema } from "@/schemas/main/menu";
import type { MenuFormValues } from "@/types/main/menu";
import { buildUpdateMenuPayload } from "../add-menu/add-menu-payload";
import { AddMenuFields } from "../add-menu/add-menu-fields";
import { MenuFormActions } from "../menu-form-actions";

interface UpdateMenuFormProps {
  slug: string;
  initialValues: MenuFormValues;
  existingPdfLink?: string;
  onSubmit?: () => void | Promise<void>;
  onCancel: () => void;
}

export function UpdateMenuForm({
  slug,
  initialValues,
  existingPdfLink,
  onSubmit,
  onCancel,
}: UpdateMenuFormProps) {
  const queryClient = useQueryClient();
  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting, isDirty, dirtyFields },
  } = useForm<MenuFormValues>({
    defaultValues: initialValues,
  });

  useEffect(() => {
    reset(initialValues);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues.title, reset]);

  const values = useWatch({ control }) as MenuFormValues;

  async function handleUpdateMenu(valuesToSubmit: MenuFormValues) {
    if (!isDirty) return;

    const parsed = updateMenuSchema.safeParse(valuesToSubmit);
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as keyof MenuFormValues;
        if (field) setError(field, { message: issue.message });
      }
      return;
    }

    const payload = buildUpdateMenuPayload(
      valuesToSubmit,
      dirtyFields as Partial<Record<keyof MenuFormValues, unknown>>,
    );

    const result = await updateMenuAPI(slug, payload);

    if (result?.ok) {
      toast.success(result.message || "Menu updated successfully");
      await queryClient.invalidateQueries({ queryKey: ["menu-list"] });
      await queryClient.invalidateQueries({ queryKey: ["menu-view", slug] });
      await onSubmit?.();
      return;
    }

    toast.error(result?.message || "Failed to update menu");
  }

  return (
    <form
      onSubmit={handleSubmit(handleUpdateMenu)}
      className="flex min-h-0 max-w-full flex-col overflow-x-hidden"
    >
      <div className="max-w-full space-y-5 px-4 py-5 sm:px-6 md:space-y-6 md:px-8 md:py-6">
        <AddMenuFields
          control={control}
          errors={errors}
          disabled={isSubmitting}
          pdfFile={values.pdfFile ?? null}
          existingPdfLink={existingPdfLink}
        />
      </div>

      <MenuFormActions
        disabled={isSubmitting}
        submitDisabled={!isDirty || isSubmitting}
        submitLabel="Save Changes"
        onCancel={onCancel}
      />
    </form>
  );
}
