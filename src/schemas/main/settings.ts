import { z } from "zod";

const optionalAddressDetailSchema = z.preprocess((value) => {
  if (value == null) {
    return "";
  }

  if (typeof value !== "string") {
    return value;
  }

  const trimmedValue = value.trim();
  return trimmedValue === "$undefined" ? "" : trimmedValue;
}, z.string());

export const updateProfileSchema = z.object({
  first_name: z.string().trim().min(1, "First name is required"),
  last_name: z.string().trim().min(1, "Last name is required"),
  email: z.email("Enter a valid email address"),
});

export type UpdateProfileSchemaValues = z.infer<typeof updateProfileSchema>;

export const updateDeliverySettingsSchema = z.object({
  fee: z.coerce
    .number({ error: "Delivery fee is required" })
    .positive("Fee must be greater than 0"),
  miles: z.coerce
    .number({ error: "Delivery radius is required" })
    .positive("Miles must be greater than 0"),
});

export type UpdateDeliverySettingsSchemaValues = z.infer<
  typeof updateDeliverySettingsSchema
>;

export const updateCompanySettingsSchema = z.object({
  name: z.string().trim().min(1, "Store name is required"),
  phone_number: z.string().trim().min(1, "Phone number is required"),
  email: z.email("Enter a valid email address"),
  store_description: z.string().trim().min(1, "Store description is required"),
  address_line: z.string().trim().min(1, "Address is required"),
  latitude: z.coerce
    .number({ error: "Latitude is required" })
    .min(-90, "Invalid latitude")
    .max(90, "Invalid latitude"),
  longitude: z.coerce
    .number({ error: "Longitude is required" })
    .min(-180, "Invalid longitude")
    .max(180, "Invalid longitude"),
  apt_villa: optionalAddressDetailSchema,
  building_cluster: optionalAddressDetailSchema,
  street_landmark: optionalAddressDetailSchema,
});

export type UpdateCompanySettingsSchemaValues = z.infer<
  typeof updateCompanySettingsSchema
>;
