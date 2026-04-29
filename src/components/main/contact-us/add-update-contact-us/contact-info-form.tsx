"use client";

import { useEffect, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import type { ContactUsDetailsSectionData } from "@/interfaces";
import {
  contactInfoSchema,
  type ContactInfoSchemaValues,
} from "@/schemas/main/contact-us";
import { createUpdateContactInfo } from "@/services/mutations/contact-us";
import { ContactInfoField } from "./contact-info-field";

interface ContactInfoFormProps {
  initialValues: ContactUsDetailsSectionData | null;
  onSaved?: () => void | Promise<void>;
}

function getInitialValues(
  contactInfo: ContactUsDetailsSectionData | null,
): ContactInfoSchemaValues {
  return {
    contact_email: contactInfo?.contact_email ?? "",
    phone_number: contactInfo?.phone_number ?? "",
    location: contactInfo?.location ?? "",
  };
}

export function ContactInfoForm({
  initialValues,
  onSaved,
}: ContactInfoFormProps) {
  const queryClient = useQueryClient();
  const defaultValues = useMemo(
    () => getInitialValues(initialValues),
    [initialValues],
  );
  const submitLabel = initialValues ? "Edit Contact Data" : "Add Contact Data";
  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<ContactInfoSchemaValues>({
    defaultValues,
    reValidateMode: "onChange",
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  function validateField<K extends keyof ContactInfoSchemaValues>(
    field: K,
    value: ContactInfoSchemaValues[K],
  ) {
    const result = contactInfoSchema.shape[field].safeParse(value);
    return result.success || result.error.issues[0]?.message;
  }

  function applySchemaErrors(values: ContactInfoSchemaValues) {
    const result = contactInfoSchema.safeParse(values);
    if (result.success) {
      return result.data;
    }

    result.error.issues.forEach((issue) => {
      const fieldName = issue.path[0];
      if (typeof fieldName === "string" && fieldName in values) {
        setError(fieldName as keyof ContactInfoSchemaValues, {
          type: "manual",
          message: issue.message,
        });
      }
    });

    return null;
  }

  return (
    <form
      className="px-6 py-6 md:px-8"
      onSubmit={handleSubmit(async (values) => {
        if (!isDirty) {
          return;
        }

        const validatedValues = applySchemaErrors(values);
        if (!validatedValues) {
          return;
        }

        const payload: ContactUsDetailsSectionData = {
          contact_email: validatedValues.contact_email.trim(),
          phone_number: validatedValues.phone_number.trim(),
          location: validatedValues.location?.trim() ?? "",
        };
        const result = await createUpdateContactInfo(payload);

        if (result?.ok) {
          toast.success(result.message || "Contact data saved successfully");
          reset(payload);
          await queryClient.invalidateQueries({ queryKey: ["contactDetails"] });
          await onSaved?.();
          return;
        }

        toast.error(result?.message);
      })}
    >
      <div className="rounded-[24px] border border-primary/20 bg-background px-5 py-5 md:px-6">
        <div className="grid gap-5 md:grid-cols-2">
          <Controller
            name="contact_email"
            control={control}
            rules={{
              validate: (value) => validateField("contact_email", value),
            }}
            render={({ field }) => (
              <ContactInfoField
                id="contactEmail"
                label="Contact Email"
                placeholder="Enter contact email"
                value={field.value}
                disabled={isSubmitting}
                error={errors.contact_email?.message}
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            name="phone_number"
            control={control}
            rules={{
              validate: (value) => validateField("phone_number", value),
            }}
            render={({ field }) => (
              <ContactInfoField
                id="phoneNumber"
                label="Phone Number"
                placeholder="Enter phone number"
                value={field.value}
                disabled={isSubmitting}
                error={errors.phone_number?.message}
                onChange={field.onChange}
              />
            )}
          />
        </div>

        <div className="mt-4">
          <Controller
            name="location"
            control={control}
            rules={{
              validate: (value) => validateField("location", value),
            }}
            render={({ field }) => (
              <ContactInfoField
                id="location"
                label="Our Location"
                placeholder="Enter store location"
                value={field.value ?? ""}
                disabled={isSubmitting}
                error={errors.location?.message}
                onChange={field.onChange}
              />
            )}
          />
        </div>
      </div>

      <div className="mt-9 flex justify-end">
        <Button
          type="submit"
          disabled={isSubmitting || !isDirty}
          className="h-[54px] min-w-[202px] rounded-[8px] bg-primary px-6 text-base font-medium text-white shadow-[0_1px_2px_rgba(16,24,40,0.05)] hover:bg-primary/90"
        >
          {isSubmitting ? <Loader /> : submitLabel}
        </Button>
      </div>
    </form>
  );
}
