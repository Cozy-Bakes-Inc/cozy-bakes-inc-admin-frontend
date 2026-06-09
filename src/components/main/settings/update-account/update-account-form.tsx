"use client";

import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import InputErrorMessage from "@/components/ui/input-error-message";
import type { AdminSettingsUserData } from "@/interfaces/main/settings";
import {
  updateProfileSchema,
  type UpdateProfileSchemaValues,
} from "@/schemas/main/settings";
import { updateProfileAPI } from "@/services/mutations/settings";

interface UpdateAccountFormProps {
  user: AdminSettingsUserData;
  onUpdated?: () => void;
}

function getInitialValues(user: AdminSettingsUserData): UpdateProfileSchemaValues {
  return {
    first_name: user.first_name ?? "",
    last_name: user.last_name ?? "",
    email: user.email ?? "",
  };
}

function validateField<K extends keyof UpdateProfileSchemaValues>(
  field: K,
  value: UpdateProfileSchemaValues[K],
) {
  const result = updateProfileSchema.shape[field].safeParse(value);
  return result.success || result.error.issues[0]?.message;
}

export function UpdateAccountForm({ user, onUpdated }: UpdateAccountFormProps) {
  const queryClient = useQueryClient();
  const initialValues = useMemo(() => getInitialValues(user), [user]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<UpdateProfileSchemaValues>({ defaultValues: initialValues });

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  async function onSubmit(values: UpdateProfileSchemaValues) {
    if (!isDirty) return;

    const result = await updateProfileAPI({
      first_name: values.first_name.trim(),
      last_name: values.last_name.trim(),
      email: values.email.trim(),
    });

    if (result?.ok) {
      toast.success(result.message || "Account updated successfully");
      reset(values);
      await queryClient.invalidateQueries({ queryKey: ["adminSettings"] });
      onUpdated?.();
      return;
    }

    toast.error(result?.message || "Failed to update account");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-1">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <div className="space-y-2">
            <label htmlFor="first_name" className="block text-sm font-medium text-dark">
              First Name
            </label>
            <Controller
              name="first_name"
              control={control}
              rules={{ validate: (v) => validateField("first_name", v) }}
              render={({ field }) => (
                <input
                  {...field}
                  id="first_name"
                  placeholder="Enter first name"
                  disabled={isSubmitting}
                  className="min-h-12 w-full rounded-lg border border-primary bg-[#fbf8eb]/8 px-3 py-2 text-sm font-medium text-dark outline-none placeholder:text-[#98A2B3] focus:border-primary/70 disabled:opacity-60"
                />
              )}
            />
          </div>
          <InputErrorMessage msg={errors.first_name?.message} />
        </div>

        <div>
          <div className="space-y-2">
            <label htmlFor="last_name" className="block text-sm font-medium text-dark">
              Last Name
            </label>
            <Controller
              name="last_name"
              control={control}
              rules={{ validate: (v) => validateField("last_name", v) }}
              render={({ field }) => (
                <input
                  {...field}
                  id="last_name"
                  placeholder="Enter last name"
                  disabled={isSubmitting}
                  className="min-h-12 w-full rounded-lg border border-primary bg-[#fbf8eb]/8 px-3 py-2 text-sm font-medium text-dark outline-none placeholder:text-[#98A2B3] focus:border-primary/70 disabled:opacity-60"
                />
              )}
            />
          </div>
          <InputErrorMessage msg={errors.last_name?.message} />
        </div>
      </div>

      <div>
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-dark">
            Email Address
          </label>
          <Controller
            name="email"
            control={control}
            rules={{ validate: (v) => validateField("email", v) }}
            render={({ field }) => (
              <input
                {...field}
                id="email"
                type="email"
                placeholder="Enter email address"
                disabled={isSubmitting}
                className="min-h-12 w-full rounded-lg border border-primary bg-[#fbf8eb]/8 px-3 py-2 text-sm font-medium text-dark outline-none placeholder:text-[#98A2B3] focus:border-primary/70 disabled:opacity-60"
              />
            )}
          />
        </div>
        <InputErrorMessage msg={errors.email?.message} />
      </div>

      <div className="flex justify-end pt-2">
        <Button
          type="submit"
          disabled={isSubmitting || !isDirty}
          className="h-11 min-w-[160px] rounded-full bg-primary px-6 text-sm font-semibold text-white hover:bg-primary/90 disabled:opacity-60"
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
