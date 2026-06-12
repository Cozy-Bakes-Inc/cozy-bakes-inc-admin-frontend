"use client";

import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import InputErrorMessage from "@/components/ui/input-error-message";
import type { AdminDeliverySettingsData } from "@/interfaces/main/settings";
import {
  updateDeliverySettingsSchema,
  type UpdateDeliverySettingsSchemaValues,
} from "@/schemas/main/settings";
import { updateDeliverySettingsAPI } from "@/services/mutations/settings";

interface UpdateDeliveryFormProps {
  delivery: AdminDeliverySettingsData | null;
  onUpdated?: () => void;
}

function getInitialValues(
  delivery: AdminDeliverySettingsData | null,
): UpdateDeliverySettingsSchemaValues {
  return {
    fee: Number(delivery?.fee ?? 0),
    miles: Number(delivery?.miles ?? 0),
  };
}

function validateField<K extends keyof UpdateDeliverySettingsSchemaValues>(
  field: K,
  value: UpdateDeliverySettingsSchemaValues[K],
) {
  const result = updateDeliverySettingsSchema.shape[field].safeParse(value);
  return result.success || result.error.issues[0]?.message;
}

export function UpdateDeliveryForm({
  delivery,
  onUpdated,
}: UpdateDeliveryFormProps) {
  const queryClient = useQueryClient();
  const initialValues = useMemo(() => getInitialValues(delivery), [delivery]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<UpdateDeliverySettingsSchemaValues>({
    defaultValues: initialValues,
  });

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  async function onSubmit(values: UpdateDeliverySettingsSchemaValues) {
    if (!isDirty) return;

    const result = await updateDeliverySettingsAPI({
      fee: values.fee,
      miles: values.miles,
    });

    if (result?.ok) {
      toast.success(result.message || "Delivery settings updated successfully");
      reset(values);
      await queryClient.invalidateQueries({ queryKey: ["adminSettings"] });
      onUpdated?.();
      return;
    }

    toast.error(result?.message || "Failed to update delivery settings");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-1">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <div className="space-y-2">
            <label htmlFor="fee" className="block text-sm font-medium text-dark">
              Delivery Fee ($)
            </label>
            <Controller
              name="fee"
              control={control}
              rules={{ validate: (v) => validateField("fee", v) }}
              render={({ field }) => (
                <input
                  {...field}
                  id="fee"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="e.g. 25"
                  disabled={isSubmitting}
                  className="min-h-12 w-full rounded-lg border border-primary bg-[#fbf8eb]/8 px-3 py-2 text-sm font-medium text-dark outline-none placeholder:text-[#98A2B3] focus:border-primary/70 disabled:opacity-60"
                />
              )}
            />
          </div>
          <InputErrorMessage msg={errors.fee?.message} />
        </div>

        <div>
          <div className="space-y-2">
            <label htmlFor="miles" className="block text-sm font-medium text-dark">
              Delivery Radius (miles)
            </label>
            <Controller
              name="miles"
              control={control}
              rules={{ validate: (v) => validateField("miles", v) }}
              render={({ field }) => (
                <input
                  {...field}
                  id="miles"
                  type="number"
                  min="0"
                  step="1"
                  placeholder="e.g. 20"
                  disabled={isSubmitting}
                  className="min-h-12 w-full rounded-lg border border-primary bg-[#fbf8eb]/8 px-3 py-2 text-sm font-medium text-dark outline-none placeholder:text-[#98A2B3] focus:border-primary/70 disabled:opacity-60"
                />
              )}
            />
          </div>
          <InputErrorMessage msg={errors.miles?.message} />
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <Button
          type="submit"
          disabled={isSubmitting || !isDirty}
          className="h-11 min-w-40 rounded-full bg-primary px-6 text-sm font-semibold text-white hover:bg-primary/90 disabled:opacity-60"
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
