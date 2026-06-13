"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { format, isValid, parse } from "date-fns";
import { Link, MapPin } from "lucide-react";
import { Controller, useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { TimePicker } from "@/components/ui/time-picker";
import { editMarketSchema } from "@/schemas";
import { updateMarketAPI } from "@/services/mutations";
import type { EditMarketLocationFormValues } from "@/types/main";
import { AddMarketLocationDatePicker } from "../add-market-location/add-market-location-date-picker";
import { AddMarketLocationField } from "../add-market-location/add-market-location-field";
import { MarketDaySelector } from "../market-day-selector";
import { EditMarketLocationCoverImages } from "./edit-market-location-cover-images";

interface EditMarketLocationFormProps {
  marketSlug: string;
  initialValues: EditMarketLocationFormValues;
  onSubmit?: (
    values: EditMarketLocationFormValues,
  ) => void | Promise<void>;
}

function parseTimeValue(value: string) {
  const matched = value.match(/^(\d{2}):(\d{2})\s(AM|PM)$/i);
  if (!matched) {
    return null;
  }

  const hour = Number(matched[1]) % 12;
  const minute = Number(matched[2]);
  const meridiemOffset = matched[3].toUpperCase() === "PM" ? 12 * 60 : 0;

  return hour * 60 + minute + meridiemOffset;
}

export function EditMarketLocationForm({
  marketSlug,
  initialValues,
  onSubmit,
}: EditMarketLocationFormProps) {
  const queryClient = useQueryClient();
  const {
    control,
    getValues,
    handleSubmit,
    reset,
    setError,
    setValue,
    trigger,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<EditMarketLocationFormValues>({
    defaultValues: initialValues,
    reValidateMode: "onChange",
  });
  const existingImages = useWatch({
    control,
    name: "existingImages",
  });
  const marketName = useWatch({
    control,
    name: "marketName",
  });

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  function validateField<K extends keyof EditMarketLocationFormValues>(
    field: K,
    value: EditMarketLocationFormValues[K],
  ) {
    const result = editMarketSchema.shape[field].safeParse(value);
    return result.success || result.error.issues[0]?.message;
  }

  function applySchemaErrors(values: EditMarketLocationFormValues) {
    const result = editMarketSchema.safeParse(values);
    if (result.success) {
      return true;
    }

    result.error.issues.forEach((issue) => {
      const fieldName = issue.path[0];
      if (typeof fieldName === "string" && fieldName in values) {
        setError(fieldName as keyof EditMarketLocationFormValues, {
          type: "manual",
          message: issue.message,
        });
      }
    });

    return false;
  }

  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        if (!isDirty) {
          return;
        }

        if (!applySchemaErrors(values)) {
          return;
        }

        if (
          values.existingImages.length === 0 &&
          values.coverImages.length === 0
        ) {
          setError("coverImages", {
            type: "manual",
            message: "At least one cover image is required",
          });
          return;
        }

        const payload = new FormData();
        payload.append("market_name", values.marketName);
        payload.append("tag_label", values.tagLabel);
        payload.append("date", values.date);
        payload.append("end_date", values.endDate);
        values.day.forEach((day) => {
          payload.append("day[]", day);
        });
        payload.append("time", values.startTime);
        payload.append("end_time", values.endTime);
        payload.append("location_address", values.locationAddress);
        payload.append("map_link", values.mapLink);
        payload.append("description", values.description);

        values.existingImages.forEach((image) => {
          payload.append("existing_images[]", image);
        });

        values.coverImages.forEach((image) => {
          payload.append("images[]", image);
        });

        const result = await updateMarketAPI(marketSlug, payload);

        if (result?.ok) {
          toast.success(result.message || "Market updated successfully");
          await Promise.all([
            queryClient.invalidateQueries({ queryKey: ["market-list-by-day"] }),
            queryClient.invalidateQueries({
              queryKey: ["market-dashboard-stats"],
            }),
            queryClient.invalidateQueries({
              queryKey: ["single-market", marketSlug],
            }),
          ]);
          await onSubmit?.(values);
          return;
        }

        toast.error(result?.message);
      })}
      className="px-6 py-6 md:px-8"
    >
      <div className="rounded-[24px] border border-primary/20 bg-background px-5 py-5 md:px-6">
        <div className="grid gap-5 md:grid-cols-2">
          <Controller
            name="marketName"
            control={control}
            rules={{
              validate: (value) => validateField("marketName", value),
            }}
            render={({ field }) => (
              <AddMarketLocationField
                id="marketName"
                label="Market Name"
                placeholder="Market Name"
                value={field.value}
                disabled={isSubmitting}
                error={errors.marketName?.message}
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            name="tagLabel"
            control={control}
            rules={{
              validate: (value) => validateField("tagLabel", value),
            }}
            render={({ field }) => (
              <AddMarketLocationField
                id="tagLabel"
                label="Tag/Label"
                placeholder="Tag/Label"
                value={field.value}
                disabled={isSubmitting}
                error={errors.tagLabel?.message}
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            name="date"
            control={control}
            rules={{
              validate: (value) => {
                const fieldValidation = validateField("date", value);
                if (fieldValidation !== true) {
                  return fieldValidation;
                }

                const startDate = new Date(value);
                const endDate = new Date(getValues("endDate"));

                if (
                  Number.isNaN(startDate.getTime()) ||
                  Number.isNaN(endDate.getTime())
                ) {
                  return true;
                }

                return (
                  startDate <= endDate ||
                  "Start date must be on or before end date"
                );
              },
            }}
            render={({ field }) => (
              <AddMarketLocationDatePicker
                label="Start Date"
                placeholder="Start Date"
                value={field.value}
                disabled={isSubmitting}
                error={errors.date?.message}
                onChange={(value) => {
                  setValue("date", value, {
                    shouldDirty: true,
                    shouldTouch: true,
                    shouldValidate: true,
                  });
                  const parsedDate = parse(value, "yyyy-MM-dd", new Date());
                  const currentDays = getValues("day");

                  if (currentDays.length === 0) {
                    setValue(
                      "day",
                      isValid(parsedDate) ? [format(parsedDate, "EEEE")] : [],
                      {
                        shouldDirty: true,
                        shouldValidate: true,
                      },
                    );
                  }
                }}
              />
            )}
          />

          <Controller
            name="endDate"
            control={control}
            rules={{
              validate: (value) => {
                const fieldValidation = validateField("endDate", value);
                if (fieldValidation !== true) {
                  return fieldValidation;
                }

                const startDate = new Date(getValues("date"));
                const endDate = new Date(value);

                if (
                  Number.isNaN(startDate.getTime()) ||
                  Number.isNaN(endDate.getTime())
                ) {
                  return true;
                }

                return (
                  endDate >= startDate ||
                  "End date must be on or after start date"
                );
              },
            }}
            render={({ field }) => (
              <AddMarketLocationDatePicker
                label="End Date"
                placeholder="End Date"
                value={field.value}
                disabled={isSubmitting}
                error={errors.endDate?.message}
                onChange={(value) => {
                  setValue("endDate", value, {
                    shouldDirty: true,
                    shouldTouch: true,
                    shouldValidate: true,
                  });
                }}
              />
            )}
          />

          <Controller
            name="day"
            control={control}
            rules={{
              validate: (value) => validateField("day", value),
            }}
            render={({ field }) => (
              <div className="md:col-span-2">
                <MarketDaySelector
                  id="day"
                  label="Days"
                  value={field.value ?? []}
                  disabled={isSubmitting}
                  error={errors.day?.message}
                  onChange={(value) => {
                    setValue("day", value, {
                      shouldDirty: true,
                      shouldTouch: true,
                      shouldValidate: true,
                    });
                  }}
                />
              </div>
            )}
          />
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <Controller
            name="startTime"
            control={control}
            rules={{
              validate: (value) => validateField("startTime", value),
            }}
            render={({ field }) => (
              <TimePicker
                label="Start Time"
                value={field.value}
                error={errors.startTime?.message}
                onChange={(value) => {
                  setValue("startTime", value, {
                    shouldDirty: true,
                    shouldTouch: true,
                    shouldValidate: true,
                  });
                  if (getValues("endTime")) {
                    void trigger("endTime");
                  }
                }}
              />
            )}
          />

          <Controller
            name="endTime"
            control={control}
            rules={{
              validate: (value) => {
                const fieldValidation = validateField("endTime", value);
                if (fieldValidation !== true) {
                  return fieldValidation;
                }

                const startTime = parseTimeValue(getValues("startTime"));
                const endTime = parseTimeValue(value);

                if (startTime === null || endTime === null) {
                  return true;
                }

                return (
                  endTime > startTime || "End time must be after start time"
                );
              },
            }}
            render={({ field }) => (
              <TimePicker
                label="End Time"
                value={field.value}
                error={errors.endTime?.message}
                onChange={(value) => {
                  setValue("endTime", value, {
                    shouldDirty: true,
                    shouldTouch: true,
                    shouldValidate: true,
                  });
                }}
              />
            )}
          />
        </div>

        <div className="mt-5">
          <Controller
            name="locationAddress"
            control={control}
            rules={{
              validate: (value) => validateField("locationAddress", value),
            }}
            render={({ field }) => (
              <AddMarketLocationField
                id="locationAddress"
                label="Location Address"
                placeholder="Location Address"
                value={field.value}
                icon={MapPin}
                disabled={isSubmitting}
                error={errors.locationAddress?.message}
                onChange={field.onChange}
              />
            )}
          />
        </div>

        <div className="mt-5">
          <Controller
            name="mapLink"
            control={control}
            rules={{
              validate: (value) => validateField("mapLink", value),
            }}
            render={({ field }) => (
              <AddMarketLocationField
                id="mapLink"
                label="Map Link"
                placeholder="https://maps.google.com/..."
                value={field.value}
                icon={Link}
                disabled={isSubmitting}
                error={errors.mapLink?.message}
                onChange={field.onChange}
              />
            )}
          />
        </div>

        <div className="mt-5">
          <Controller
            name="description"
            control={control}
            rules={{
              validate: (value) => validateField("description", value),
            }}
            render={({ field }) => (
              <AddMarketLocationField
                id="description"
                label="Description"
                placeholder="Description"
                value={field.value}
                multiline
                rows={3}
                disabled={isSubmitting}
                error={errors.description?.message}
                onChange={field.onChange}
              />
            )}
          />
        </div>

        <div className="mt-5">
          <Controller
            name="coverImages"
            control={control}
            rules={{
              validate: (value) => validateField("coverImages", value),
            }}
            render={({ field }) => (
              <EditMarketLocationCoverImages
                files={field.value}
                existingImages={existingImages ?? []}
                disabled={isSubmitting}
                error={errors.coverImages?.message}
                marketName={marketName ?? "Market"}
                onFilesChange={field.onChange}
                onExistingImagesChange={(images) => {
                  setValue("existingImages", images, {
                    shouldDirty: true,
                    shouldTouch: true,
                    shouldValidate: true,
                  });
                }}
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
            {isSubmitting ? <Loader /> : "Edit Market"}
          </Button>
        </div>
      </div>
    </form>
  );
}
