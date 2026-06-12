"use client";

import { Controller, useForm, useWatch } from "react-hook-form";
import { Mail, Phone, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import InputErrorMessage from "@/components/ui/input-error-message";
import Loader from "@/components/ui/loader";
import { LocationPicker } from "@/components/main/settings/update-company/location-picker";
import { formatPhoneInput, stripPhoneDigits } from "@/lib/utils/phone";
import { pickupLocationSchema } from "@/schemas";
import type {
  PickupLocationFormValues,
  PickupLocationMutationPayload,
} from "@/types/main";
import { PickupLocationField } from "./pickup-location-field";

interface PickupLocationFormProps {
  initialValues: PickupLocationFormValues;
  disabled?: boolean;
  submitChangedOnly?: boolean;
  submitLabel: string;
  onCancel: () => void;
  onSubmit: (
    payload: Partial<PickupLocationMutationPayload>,
  ) => void | Promise<void>;
}

function normalizeOptionalAddressDetail(value?: string) {
  const trimmed = value?.trim();
  return !trimmed || trimmed === "$undefined" ? "" : trimmed;
}

function buildPickupLocationPayload(
  values: PickupLocationFormValues,
  dirtyFields?: Partial<Record<keyof PickupLocationFormValues, boolean>>,
): Partial<PickupLocationMutationPayload> {
  const payloadByField = {
    name: values.name.trim(),
    phone_number: stripPhoneDigits(values.phoneNumber),
    email: values.email.trim(),
    address_line: values.addressLine.trim(),
    is_active: values.isActive ? 1 : 0,
    store_description: values.storeDescription.trim(),
    latitude: (values.latitude ?? "").trim(),
    longitude: (values.longitude ?? "").trim(),
    apt_villa: normalizeOptionalAddressDetail(values.aptVilla),
    building_cluster: normalizeOptionalAddressDetail(values.buildingCluster),
    street_landmark: normalizeOptionalAddressDetail(values.streetLandmark),
  };

  if (!dirtyFields) {
    return payloadByField;
  }

  const fieldToPayloadKey = {
    name: "name",
    phoneNumber: "phone_number",
    email: "email",
    addressLine: "address_line",
    isActive: "is_active",
    storeDescription: "store_description",
    latitude: "latitude",
    longitude: "longitude",
    aptVilla: "apt_villa",
    buildingCluster: "building_cluster",
    streetLandmark: "street_landmark",
  } satisfies Record<
    Exclude<keyof PickupLocationFormValues, "mapLink">,
    keyof PickupLocationMutationPayload
  >;

  const payload = Object.entries(fieldToPayloadKey).reduce<
    Partial<PickupLocationMutationPayload>
  >((payload, [field, payloadKey]) => {
    if (dirtyFields[field as keyof PickupLocationFormValues]) {
      return {
        ...payload,
        [payloadKey]: payloadByField[payloadKey],
      };
    }
    return payload;
  }, {});

  return payload;
}

export function PickupLocationForm({
  initialValues,
  disabled,
  submitChangedOnly = false,
  submitLabel,
  onCancel,
  onSubmit,
}: PickupLocationFormProps) {
  const {
    control,
    clearErrors,
    handleSubmit,
    setError,
    setValue,
    formState: { dirtyFields, errors, isSubmitting, isDirty },
  } = useForm<PickupLocationFormValues>({
    defaultValues: initialValues,
    reValidateMode: "onChange",
  });
  const latitude = useWatch({ control, name: "latitude" });
  const longitude = useWatch({ control, name: "longitude" });
  const isBusy = disabled || isSubmitting;
  const latitudeNumber = Number(latitude) || 0;
  const longitudeNumber = Number(longitude) || 0;

  async function handleValidSubmit(values: PickupLocationFormValues) {
    const parsed = pickupLocationSchema.safeParse(values);
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as keyof PickupLocationFormValues;
        if (field) {
          setError(field, { message: issue.message });
        }
      }
      return;
    }

    const payload = buildPickupLocationPayload(
      values,
      submitChangedOnly ? dirtyFields : undefined,
    );

    if (submitChangedOnly && Object.keys(payload).length === 0) {
      return;
    }

    await onSubmit(payload);
  }

  return (
    <form
      onSubmit={handleSubmit(handleValidSubmit)}
      className="flex min-h-0 max-w-full flex-col overflow-x-hidden"
    >
      <div className="max-w-full space-y-5 px-4 py-5 sm:px-6 md:px-8 md:py-6">
        <div className="rounded-[24px] border border-primary/20 bg-background px-5 py-5 md:px-6 md:py-6">
          <div className="grid gap-5 md:grid-cols-2">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <PickupLocationField
                  id="pickupName"
                  label="Shop Name"
                  placeholder="Shop Name"
                  icon={Store}
                  disabled={isBusy}
                  error={errors.name?.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <PickupLocationField
                  id="pickupPhoneNumber"
                  label="Phone Number"
                  placeholder="(212) 555-7890"
                  icon={Phone}
                  disabled={isBusy}
                  error={errors.phoneNumber?.message}
                  {...field}
                  onChange={(event) =>
                    field.onChange(formatPhoneInput(event.target.value))
                  }
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <PickupLocationField
                  id="pickupEmail"
                  label="Email"
                  placeholder="shop@example.com"
                  type="email"
                  icon={Mail}
                  disabled={isBusy}
                  error={errors.email?.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="aptVilla"
              control={control}
              render={({ field }) => (
                <PickupLocationField
                  id="pickupAptVilla"
                  label="Apartment / Villa (optional)"
                  placeholder="Apartment / Villa"
                  disabled={isBusy}
                  error={errors.aptVilla?.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="buildingCluster"
              control={control}
              render={({ field }) => (
                <PickupLocationField
                  id="pickupBuildingCluster"
                  label="Building / Cluster (optional)"
                  placeholder="Building / Cluster"
                  disabled={isBusy}
                  error={errors.buildingCluster?.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="streetLandmark"
              control={control}
              render={({ field }) => (
                <PickupLocationField
                  id="pickupStreetLandmark"
                  label="Street / Landmark (optional)"
                  placeholder="Street / Landmark"
                  disabled={isBusy}
                  error={errors.streetLandmark?.message}
                  {...field}
                />
              )}
            />
          </div>

          <div className="mt-5">
            <Controller
              name="storeDescription"
              control={control}
              render={({ field }) => (
                <PickupLocationField
                  id="pickupDescription"
                  label="Description"
                  placeholder="Description"
                  multiline
                  rows={4}
                  disabled={isBusy}
                  error={errors.storeDescription?.message}
                  {...field}
                />
              )}
            />
          </div>

          <div className="mt-5 space-y-3">
            <div>
              <p className="text-[16px] font-medium leading-6 text-dark">
                Pickup Location Map
              </p>
              <p className="mt-1 text-xs font-medium text-muted-text">
                Search, click the map, or drag the pin to set latitude and
                longitude.
              </p>
            </div>
            <LocationPicker
              lat={latitudeNumber}
              lng={longitudeNumber}
              initialAddress={initialValues.addressLine}
              fallbackAddress={initialValues.addressLine}
              onChange={(newLat, newLng) => {
                clearErrors(["latitude", "longitude"]);
                setValue("latitude", String(newLat), {
                  shouldDirty: true,
                  shouldTouch: true,
                  shouldValidate: true,
                });
                setValue("longitude", String(newLng), {
                  shouldDirty: true,
                  shouldTouch: true,
                  shouldValidate: true,
                });
              }}
              onSearchValueChange={(address) => {
                setValue("addressLine", address, {
                  shouldDirty: true,
                  shouldTouch: true,
                  shouldValidate: true,
                });
              }}
            />
            <InputErrorMessage
              msg={errors.latitude?.message ?? errors.longitude?.message}
            />
          </div>

          <Controller
            name="isActive"
            control={control}
            render={({ field }) => (
              <div className="mt-5 flex flex-wrap items-center gap-3 rounded-[14px] bg-bg-creamy px-4 py-3">
                <span className="text-sm font-semibold text-dark">
                  {field.value ? "Active" : "Inactive"}
                </span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={field.value}
                  disabled={isBusy}
                  onClick={() => field.onChange(!field.value)}
                  className="relative h-7 w-12 rounded-full bg-[#E5E7EB] transition-colors disabled:cursor-not-allowed disabled:opacity-60 aria-checked:bg-[#D99A22]"
                >
                  <span
                    className={`absolute left-1 top-1 size-5 rounded-full bg-white shadow-[0_1px_3px_rgba(16,24,40,0.18)] transition-transform ${
                      field.value ? "translate-x-5" : ""
                    }`}
                  />
                </button>
              </div>
            )}
          />
        </div>
      </div>

      <div className="grid gap-3 border-t border-[#E4E7EC] px-4 py-4 sm:flex sm:justify-end sm:gap-4 sm:px-6 md:px-8">
        <Button
          type="button"
          variant="outline"
          disabled={isBusy}
          onClick={onCancel}
          className="h-[48px] w-full rounded-[8px] border-[#D0D5DD] bg-background text-base font-medium text-dark hover:bg-muted sm:w-auto sm:min-w-[140px]"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isBusy || !isDirty}
          className="h-[48px] w-full rounded-[8px] bg-primary px-6 text-base font-semibold text-white hover:bg-primary/90 sm:w-auto sm:min-w-[176px]"
        >
          {isSubmitting ? <Loader /> : submitLabel}
        </Button>
      </div>
    </form>
  );
}
