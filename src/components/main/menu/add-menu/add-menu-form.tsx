"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";
import { createMenuAPI } from "@/services/mutations/menu";
import { createMenuSchema } from "@/schemas/main/menu";
import type { MenuFormValues } from "@/types/main/menu";
import { buildCreateMenuPayload } from "./add-menu-payload";
import { AddMenuFields } from "./add-menu-fields";
import { MenuFormActions } from "../menu-form-actions";

interface AddMenuFormProps {
  initialValues: MenuFormValues;
  onSubmit?: () => void | Promise<void>;
  onCancel: () => void;
}

export function AddMenuForm({
  initialValues,
  onSubmit,
  onCancel,
}: AddMenuFormProps) {
  const queryClient = useQueryClient();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<MenuFormValues>({
    defaultValues: initialValues,
  });

  const values = useWatch({ control }) as MenuFormValues;

  async function handleCreateMenu(valuesToSubmit: MenuFormValues) {
    const parsed = createMenuSchema.safeParse(valuesToSubmit);
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as keyof MenuFormValues;
        if (field) setError(field, { message: issue.message });
      }
      return;
    }

    const result = await createMenuAPI(buildCreateMenuPayload(valuesToSubmit));

    if (result?.ok) {
      toast.success(result.message || "Menu created successfully");
      await queryClient.invalidateQueries({ queryKey: ["menu-list"] });
      await onSubmit?.();
      return;
    }

    toast.error(result?.message || "Failed to create menu");
  }

  return (
    <form
      onSubmit={handleSubmit(handleCreateMenu)}
      className="flex min-h-0 max-w-full flex-col overflow-x-hidden"
    >
      <div className="max-w-full space-y-5 px-4 py-5 sm:px-6 md:space-y-6 md:px-8 md:py-6">
        <AddMenuFields
          control={control}
          errors={errors}
          disabled={isSubmitting}
          pdfFile={values.pdfFile ?? null}
        />
      </div>

      <MenuFormActions
        disabled={isSubmitting}
        submitLabel="Add Menu"
        onCancel={onCancel}
      />
    </form>
  );
}
