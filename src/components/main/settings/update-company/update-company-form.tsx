"use client";

import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import InputErrorMessage from "@/components/ui/input-error-message";
import type {
  AdminSettingsResponse,
  AdminSettingsShopData,
} from "@/interfaces/main/settings";
import {
  updateCompanySettingsSchema,
  type UpdateCompanySettingsSchemaValues,
} from "@/schemas/main/settings";
import { formatPhoneInput, normalizePhoneForBackend } from "@/lib/utils/phone";
import { updateCompanySettingsAPI } from "@/services/mutations/settings";
import { LocationPicker } from "./location-picker";

interface UpdateCompanyFormProps {
  shop: AdminSettingsShopData | null;
  onUpdated?: () => void;
}

function getInitialValues(
  shop: AdminSettingsShopData | null,
): UpdateCompanySettingsSchemaValues {
  return {
    name: shop?.name ?? "",
    phone_number: formatPhoneInput(shop?.phone_number ?? ""),
    email: shop?.email ?? "",
    store_description: shop?.store_description ?? "",
    address_line: shop?.address_line ?? "",
    latitude: shop?.latitude ?? 0,
    longitude: shop?.longitude ?? 0,
    apt_villa: normalizeOptionalAddressDetail(shop?.apt_villa),
    building_cluster: normalizeOptionalAddressDetail(shop?.building_cluster),
    street_landmark: normalizeOptionalAddressDetail(shop?.street_landmark),
  };
}

function validateField<K extends keyof UpdateCompanySettingsSchemaValues>(
  field: K,
  value: UpdateCompanySettingsSchemaValues[K],
) {
  const result = updateCompanySettingsSchema.shape[field].safeParse(value);
  return result.success || result.error.issues[0]?.message;
}

const inputClass =
  "min-h-[48px] w-full rounded-lg border border-primary bg-[#fbf8eb]/8 px-3 py-2 text-sm font-medium text-dark outline-none placeholder:text-[#98A2B3] focus:border-primary/70 disabled:opacity-60";

function normalizeOptionalAddressDetail(value?: string | null) {
  const trimmedValue = value?.trim() ?? "";
  return trimmedValue === "$undefined" ? "" : trimmedValue;
}

function updateAdminSettingsShopCache(
  current: AdminSettingsResponse | undefined,
  shopPayload: Partial<UpdateCompanySettingsSchemaValues>,
): AdminSettingsResponse {
  const currentShop = current?.data?.shop ?? null;

  return {
    status: current?.status ?? "success",
    message: current?.message,
    data: {
      user: current?.data?.user ?? null,
      notification_preferences: current?.data?.notification_preferences ?? null,
      delivery_fee: current?.data?.delivery_fee,
      delivery_settings: current?.data?.delivery_settings,
      shop: {
        id: currentShop?.id ?? 0,
        slug: currentShop?.slug ?? "",
        store_description:
          shopPayload.store_description ?? currentShop?.store_description ?? "",
        name: shopPayload.name ?? currentShop?.name ?? "",
        phone_number: shopPayload.phone_number ?? currentShop?.phone_number ?? "",
        email: shopPayload.email ?? currentShop?.email ?? "",
        address_line: shopPayload.address_line ?? currentShop?.address_line ?? "",
        is_active: currentShop?.is_active ?? 1,
        latitude: shopPayload.latitude ?? currentShop?.latitude,
        longitude: shopPayload.longitude ?? currentShop?.longitude,
        apt_villa: shopPayload.apt_villa ?? currentShop?.apt_villa,
        building_cluster:
          shopPayload.building_cluster ?? currentShop?.building_cluster,
        street_landmark:
          shopPayload.street_landmark ?? currentShop?.street_landmark,
        map_link: currentShop?.map_link ?? null,
      },
    },
  };
}

function syncShopSettingsCache(
  queryClient: ReturnType<typeof useQueryClient>,
  payload: Partial<UpdateCompanySettingsSchemaValues>,
) {
  queryClient.setQueryData<AdminSettingsResponse>(
    ["adminSettings"],
    (current) => updateAdminSettingsShopCache(current, payload),
  );
  queryClient.setQueryData<AdminSettingsResponse>(
    ["authenticatedUser"],
    (current) => updateAdminSettingsShopCache(current, payload),
  );
}

export function UpdateCompanyForm({ shop, onUpdated }: UpdateCompanyFormProps) {
  const queryClient = useQueryClient();
  const initialValues = useMemo(() => getInitialValues(shop), [shop]);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { dirtyFields, errors, isDirty, isSubmitting },
  } = useForm<UpdateCompanySettingsSchemaValues>({
    defaultValues: initialValues,
  });

  const lat = watch("latitude");
  const lng = watch("longitude");

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  async function onSubmit(values: UpdateCompanySettingsSchemaValues) {
    if (!isDirty) return;

    const payload: Partial<UpdateCompanySettingsSchemaValues> = {};
    if (dirtyFields.name) payload.name = values.name.trim();
    if (dirtyFields.phone_number)
      payload.phone_number = normalizePhoneForBackend(values.phone_number);
    if (dirtyFields.email) payload.email = values.email.trim();
    if (dirtyFields.store_description)
      payload.store_description = values.store_description.trim();
    if (dirtyFields.address_line)
      payload.address_line = values.address_line.trim();
    if (dirtyFields.latitude) payload.latitude = values.latitude;
    if (dirtyFields.longitude) payload.longitude = values.longitude;
    if (dirtyFields.apt_villa)
      payload.apt_villa = normalizeOptionalAddressDetail(values.apt_villa);
    if (dirtyFields.building_cluster)
      payload.building_cluster = normalizeOptionalAddressDetail(
        values.building_cluster,
      );
    if (dirtyFields.street_landmark)
      payload.street_landmark = normalizeOptionalAddressDetail(
        values.street_landmark,
      );

    const result = await updateCompanySettingsAPI(payload);

    if (result?.ok) {
      toast.success(result.message || "Store information updated successfully");
      syncShopSettingsCache(queryClient, payload);
      reset(values);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["adminSettings"] }),
        queryClient.invalidateQueries({ queryKey: ["authenticatedUser"] }),
      ]);
      syncShopSettingsCache(queryClient, payload);
      onUpdated?.();
      return;
    }

    toast.error(result?.message || "Failed to update store information");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-dark">
              Store Name
            </label>
            <Controller
              name="name"
              control={control}
              rules={{ validate: (v) => validateField("name", v) }}
              render={({ field }) => (
                <input
                  {...field}
                  id="name"
                  placeholder="e.g. Downtown Store"
                  disabled={isSubmitting}
                  className={inputClass}
                />
              )}
            />
          </div>
          <InputErrorMessage msg={errors.name?.message} />
        </div>

        <div>
          <div className="space-y-2">
            <label
              htmlFor="company_phone"
              className="block text-sm font-medium text-dark"
            >
              Phone Number
            </label>
            <Controller
              name="phone_number"
              control={control}
              rules={{ validate: (v) => validateField("phone_number", v) }}
              render={({ field }) => (
                <input
                  {...field}
                  id="company_phone"
                  placeholder="(212) 555-7890"
                  disabled={isSubmitting}
                  className={inputClass}
                  onChange={(e) => field.onChange(formatPhoneInput(e.target.value))}
                />
              )}
            />
          </div>
          <InputErrorMessage msg={errors.phone_number?.message} />
        </div>

        <div>
          <div className="space-y-2">
            <label
              htmlFor="company_email"
              className="block text-sm font-medium text-dark"
            >
              Email Address
            </label>
            <Controller
              name="email"
              control={control}
              rules={{ validate: (v) => validateField("email", v) }}
              render={({ field }) => (
                <input
                  {...field}
                  id="company_email"
                  type="email"
                  placeholder="e.g. shop@example.com"
                  disabled={isSubmitting}
                  className={inputClass}
                />
              )}
            />
          </div>
          <InputErrorMessage msg={errors.email?.message} />
        </div>

        <div className="sm:col-span-2">
          <div className="space-y-2">
            <label
              htmlFor="store_description"
              className="block text-sm font-medium text-dark"
            >
              Store Description
            </label>
            <Controller
              name="store_description"
              control={control}
              rules={{ validate: (v) => validateField("store_description", v) }}
              render={({ field }) => (
                <textarea
                  {...field}
                  id="store_description"
                  rows={3}
                  placeholder="Describe your store..."
                  disabled={isSubmitting}
                  className="w-full rounded-lg border border-primary bg-[#fbf8eb]/8 px-3 py-2 text-sm font-medium text-dark outline-none placeholder:text-[#98A2B3] focus:border-primary/70 disabled:opacity-60"
                />
              )}
            />
          </div>
          <InputErrorMessage msg={errors.store_description?.message} />
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-semibold text-dark">Address Details</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="apt_villa"
              className="block text-sm font-medium text-dark"
            >
              Apt / Villa
              <span className="ml-1 text-xs font-normal text-gray">
                (optional)
              </span>
            </label>
            <Controller
              name="apt_villa"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id="apt_villa"
                  placeholder="e.g. Apt 4B"
                  disabled={isSubmitting}
                  className={inputClass}
                />
              )}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="building_cluster"
              className="block text-sm font-medium text-dark"
            >
              Building / Cluster
              <span className="ml-1 text-xs font-normal text-gray">
                (optional)
              </span>
            </label>
            <Controller
              name="building_cluster"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id="building_cluster"
                  placeholder="e.g. Sunrise Apartments"
                  disabled={isSubmitting}
                  className={inputClass}
                />
              )}
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <label
              htmlFor="street_landmark"
              className="block text-sm font-medium text-dark"
            >
              Street / Landmark
              <span className="ml-1 text-xs font-normal text-gray">
                (optional)
              </span>
            </label>
            <Controller
              name="street_landmark"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id="street_landmark"
                  placeholder="e.g. Near City Mall"
                  disabled={isSubmitting}
                  className={inputClass}
                />
              )}
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-semibold text-dark">Store Location</p>
        <p className="text-xs text-gray">
          Click the map or drag the pin to set your store location.
        </p>
        <LocationPicker
          lat={lat}
          lng={lng}
          initialAddress={initialValues.address_line}
          fallbackAddress={initialValues.address_line}
          onChange={(newLat, newLng) => {
            setValue("latitude", newLat, { shouldDirty: true });
            setValue("longitude", newLng, { shouldDirty: true });
          }}
          onAddressChange={(address) => {
            setValue("address_line", address, { shouldDirty: true });
          }}
        />
        <InputErrorMessage
          msg={errors.latitude?.message ?? errors.longitude?.message}
        />
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
