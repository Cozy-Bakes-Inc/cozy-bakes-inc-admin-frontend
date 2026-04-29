"use client";

import { useQueryClient } from "@tanstack/react-query";
import { CalendarDays } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import type { ReviewPayload } from "@/interfaces";
import {
  createReviewSchema,
  type CreateReviewSchemaValues,
} from "@/schemas";
import { createReview } from "@/services/mutations";
import { CreateReviewField } from "./create-review-field";
import { CreateReviewRating } from "./create-review-rating";
import { CreateReviewStatusSelect } from "./create-review-status-select";

interface CreateReviewFormProps {
  onCreated?: () => void | Promise<void>;
}

const defaultValues: CreateReviewSchemaValues = {
  customer_name: "",
  customer_email: "",
  rating: 2,
  review_text: "",
  status: "",
};

export function CreateReviewForm({ onCreated }: CreateReviewFormProps) {
  const queryClient = useQueryClient();
  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<CreateReviewSchemaValues>({
    defaultValues,
    reValidateMode: "onChange",
  });

  function validateField<K extends keyof CreateReviewSchemaValues>(
    field: K,
    value: CreateReviewSchemaValues[K],
  ) {
    const result = createReviewSchema.shape[field].safeParse(value);
    return result.success || result.error.issues[0]?.message;
  }

  function applySchemaErrors(values: CreateReviewSchemaValues) {
    const result = createReviewSchema.safeParse(values);
    if (result.success) {
      return result.data;
    }

    result.error.issues.forEach((issue) => {
      const fieldName = issue.path[0];
      if (typeof fieldName === "string" && fieldName in values) {
        setError(fieldName as keyof CreateReviewSchemaValues, {
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

        const payload: ReviewPayload = {
          customer_name: validatedValues.customer_name.trim(),
          customer_email:
            validatedValues.customer_email?.trim() || undefined,
          rating: validatedValues.rating,
          review_text: validatedValues.review_text?.trim() || undefined,
          status: validatedValues.status,
        };
        const result = await createReview(payload);

        if (result?.ok) {
          toast.success(result.message || "Review created successfully");
          reset(defaultValues);
          await queryClient.invalidateQueries({ queryKey: ["reviews"] });
          await onCreated?.();
          return;
        }

        toast.error(result?.message);
      })}
    >
      <div className="rounded-[24px] border border-primary/20 bg-background px-5 py-5 md:px-6">
        <div className="grid gap-5 md:grid-cols-2">
          <Controller
            name="customer_name"
            control={control}
            rules={{
              validate: (value) => validateField("customer_name", value),
            }}
            render={({ field }) => (
              <CreateReviewField
                id="createCustomerName"
                label="Customer Name"
                placeholder="Enter customer name..."
                value={field.value}
                disabled={isSubmitting}
                error={errors.customer_name?.message}
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            name="customer_email"
            control={control}
            rules={{
              validate: (value) => validateField("customer_email", value),
            }}
            render={({ field }) => (
              <CreateReviewField
                id="createCustomerEmail"
                label="Customer Email"
                placeholder="Enter customer email..."
                value={field.value ?? ""}
                disabled={isSubmitting}
                error={errors.customer_email?.message}
                onChange={field.onChange}
              />
            )}
          />
        </div>

        <div className="mt-5">
          <Controller
            name="rating"
            control={control}
            rules={{
              validate: (value) => validateField("rating", value),
            }}
            render={({ field }) => (
              <CreateReviewRating
                value={field.value}
                disabled={isSubmitting}
                error={errors.rating?.message}
                onChange={field.onChange}
              />
            )}
          />
        </div>

        <div className="mt-5">
          <Controller
            name="review_text"
            control={control}
            rules={{
              validate: (value) => validateField("review_text", value),
            }}
            render={({ field }) => (
              <CreateReviewField
                id="createReviewText"
                label="Review Text"
                placeholder="Enter customer review..."
                value={field.value ?? ""}
                multiline
                rows={4}
                disabled={isSubmitting}
                error={errors.review_text?.message}
                onChange={field.onChange}
              />
            )}
          />
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <CreateReviewField
            id="createReviewDate"
            label="Date"
            value=""
            placeholder="Date"
            readOnly
            disabled={isSubmitting}
            icon={<CalendarDays className="size-6" strokeWidth={1.8} />}
          />

          <Controller
            name="status"
            control={control}
            rules={{
              validate: (value) => validateField("status", value),
            }}
            render={({ field }) => (
              <CreateReviewStatusSelect
                value={field.value}
                disabled={isSubmitting}
                error={errors.status?.message}
                onChange={field.onChange}
              />
            )}
          />
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            type="submit"
            disabled={isSubmitting || !isDirty}
            className="h-[54px] min-w-[202px] rounded-[8px] bg-primary px-6 text-base font-medium text-white shadow-[0_1px_2px_rgba(16,24,40,0.05)] hover:bg-primary/90"
          >
            {isSubmitting ? <Loader /> : "Add Review"}
          </Button>
        </div>
      </div>
    </form>
  );
}
