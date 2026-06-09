import { z } from "zod";

const acceptedImageTypes = ["image/png", "image/jpeg", "image/jpg"];
const maxImageSizeInBytes = 2 * 1024 * 1024;
const timePattern = /^(\d{2}):(\d{2})\s(AM|PM)$/i;

function isFile(value: unknown): value is File {
  return typeof File !== "undefined" && value instanceof File;
}

function parseTimeValue(value: string) {
  const matched = value.match(timePattern);
  if (!matched) {
    return null;
  }

  const hour = Number(matched[1]) % 12;
  const minute = Number(matched[2]);
  const meridiemOffset = matched[3].toUpperCase() === "PM" ? 12 * 60 : 0;

  return hour * 60 + minute + meridiemOffset;
}

const marketDetailsSchema = z.object({
  marketName: z.string().trim().min(1, "Market name is required"),
  tagLabel: z.string().trim().min(1, "Tag/Label is required"),
  date: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  day: z.string().trim().min(1, "Day is required"),
  startTime: z
    .string()
    .trim()
    .regex(timePattern, "Start time is required"),
  endTime: z
    .string()
    .trim()
    .regex(timePattern, "End time is required"),
  locationAddress: z.string().trim().min(1, "Location address is required"),
  mapLink: z
    .string()
    .trim()
    .min(1, "Map link is required")
    .refine(
      (v) => v.startsWith("http://") || v.startsWith("https://"),
      "Map link must be a valid URL",
    ),
  description: z.string().trim().min(1, "Description is required"),
});

function validateMarketTimeRange(
  values: z.infer<typeof marketDetailsSchema>,
  context: z.RefinementCtx,
) {
  const startTime = parseTimeValue(values.startTime);
  const endTime = parseTimeValue(values.endTime);

  if (startTime === null || endTime === null) {
    return;
  }

  if (startTime >= endTime) {
    context.addIssue({
      code: "custom",
      message: "End time must be after start time",
      path: ["endTime"],
    });
  }
}

const optionalMarketCoverImageSchema = z
  .custom<File | null>((value) => value === null || isFile(value), {
    message: "Cover image must be a valid file",
  })
  .refine(
    (file) => file === null || acceptedImageTypes.includes(file.type),
    "Cover image must be PNG or JPG",
  )
  .refine(
    (file) => file === null || file.size <= maxImageSizeInBytes,
    "Cover image must be 2MB or less",
  );

export const createMarketSchema = marketDetailsSchema.extend({
  coverImage: z
    .custom<File | null>((value) => value === null || isFile(value), {
      message: "Cover image is required",
    })
    .refine((file) => file !== null, "Cover image is required")
    .refine(
      (file) => file === null || acceptedImageTypes.includes(file.type),
      "Cover image must be PNG or JPG",
    )
    .refine(
      (file) => file === null || file.size <= maxImageSizeInBytes,
      "Cover image must be 2MB or less",
    ),
}).superRefine(validateMarketTimeRange);

export const editMarketSchema = marketDetailsSchema.extend({
  coverImage: optionalMarketCoverImageSchema,
  existingImages: z.array(z.string()),
}).superRefine(validateMarketTimeRange);

export type CreateMarketSchemaValues = z.input<typeof createMarketSchema>;
export type EditMarketSchemaValues = z.input<typeof editMarketSchema>;
