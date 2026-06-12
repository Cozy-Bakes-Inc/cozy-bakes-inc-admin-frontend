import { z } from "zod";

const optionalUrlSchema = z
  .string()
  .trim()
  .optional()
  .or(z.literal(""))
  .refine(
    (value) =>
      !value || value.startsWith("http://") || value.startsWith("https://"),
    "Map link must be a valid URL",
  );

const coordinateSchema = z
  .string()
  .trim()
  .min(1, "Please select a pickup location on the map")
  .refine((value) => !Number.isNaN(Number(value)), {
    message: "Coordinate must be a valid number",
  });

export const pickupLocationSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  phoneNumber: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .refine(
      (value) => value.replace(/\D/g, "").length === 10,
      "Phone number must be 10 digits",
    ),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Email must be valid"),
  addressLine: z.string().trim().min(1, "Address line is required"),
  aptVilla: z.string().trim().optional(),
  buildingCluster: z.string().trim().optional(),
  streetLandmark: z.string().trim().optional(),
  storeDescription: z.string().trim().min(1, "Description is required"),
  mapLink: optionalUrlSchema,
  latitude: coordinateSchema,
  longitude: coordinateSchema,
  isActive: z.boolean(),
});

export type PickupLocationSchemaValues = z.input<typeof pickupLocationSchema>;
