"use client";

import { useEffect, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { format, isValid, parseISO } from "date-fns";
import { CalendarDays } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import type { SingleReview, ReviewPayload } from "@/interfaces";
import { editReviewSchema, type EditReviewSchemaValues } from "@/schemas";
import { updateReview } from "@/services/mutations";
import { EditReviewField } from "./edit-review-field";
import { EditReviewRating } from "./edit-review-rating";
import { EditReviewStatusSelect } from "./edit-review-status-select";

interface EditReviewFormProps {
  reviewSlug: string;
  review: SingleReview;
  onUpdated?: () => void | Promise<void>;
}

const reviewStatusValues = ["approved", "pending", "rejected"] as const;

function normalizeStatus(status?: string): ReviewPayload["status"] {
  return reviewStatusValues.includes(status as ReviewPayload["status"])
    ? (status as ReviewPayload["status"])
    : "pending";
}

function getInitialValues(review: SingleReview): EditReviewSchemaValues {
  return {
    customer_name: review.customer_name ?? "",
    customer_email: review.customer_email ?? "",
    rating: Number(review.rating ?? 0),
    review_text: review.review_text ?? "",
    status: normalizeStatus(review.status),
  };
}

function formatReviewDate(date?: string | null) {
  if (!date) return "";

  const parsedDate = parseISO(date);
  return isValid(parsedDate) ? format(parsedDate, "dd MMM yyyy") : date;
}

export function EditReviewForm({
  reviewSlug,
  review,
  onUpdated,
}: EditReviewFormProps) {
  const queryClient = useQueryClient();
  const initialValues = useMemo(() => getInitialValues(review), [review]);
  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<EditReviewSchemaValues>({
    defaultValues: initialValues,
    reValidateMode: "onChange",
  });

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  function validateField<K extends keyof EditReviewSchemaValues>(
    field: K,
    value: EditReviewSchemaValues[K],
  ) {
    const result = editReviewSchema.shape[field].safeParse(value);
    return result.success || result.error.issues[0]?.message;
  }

  function applySchemaErrors(values: EditReviewSchemaValues) {
    const result = editReviewSchema.safeParse(values);
    if (result.success) {
      return true;
    }

    result.error.issues.forEach((issue) => {
      const fieldName = issue.path[0];
      if (typeof fieldName === "string" && fieldName in values) {
        setError(fieldName as keyof EditReviewSchemaValues, {
          type: "manual",
          message: issue.message,
        });
      }
    });

    return false;
  }

  return (
    <form
      className="px-6 py-6 md:px-8"
      onSubmit={handleSubmit(async (values) => {
        if (!isDirty) {
          return;
        }

        if (!applySchemaErrors(values)) {
          return;
        }

        const payload: ReviewPayload = {
          customer_name: values.customer_name.trim(),
          customer_email: values.customer_email?.trim() || undefined,
          rating: values.rating,
          review_text: values.review_text?.trim() || undefined,
          status: values.status,
        };
        const result = await updateReview(reviewSlug, payload);

        if (result?.ok) {
          toast.success(result.message || "Review updated successfully");
          reset(values);
          await Promise.all([
            queryClient.invalidateQueries({ queryKey: ["reviews"] }),
            queryClient.invalidateQueries({
              queryKey: ["singleReview", reviewSlug],
            }),
          ]);
          await onUpdated?.();
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
              <EditReviewField
                id="customerName"
                label="Customer Name"
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
              <EditReviewField
                id="customerEmail"
                label="Customer Email"
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
              <EditReviewRating
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
              <EditReviewField
                id="reviewText"
                label="Review Text"
                value={field.value ?? ""}
                multiline
                rows={5}
                disabled={isSubmitting}
                error={errors.review_text?.message}
                onChange={field.onChange}
              />
            )}
          />
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <EditReviewField
            id="reviewDate"
            label="Date"
            value={formatReviewDate(review.date ?? review.created_at)}
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
              <EditReviewStatusSelect
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
            {isSubmitting ? <Loader /> : "Edit Review"}
          </Button>
        </div>
      </div>
    </form>
  );
}
