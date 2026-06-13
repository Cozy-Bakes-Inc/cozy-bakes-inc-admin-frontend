import { z } from "zod";

const acceptedImageTypes = ["image/png", "image/jpeg", "image/jpg"];
const maxImageSizeInBytes = 5 * 1024 * 1024;
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
  endDate: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "End date must be in YYYY-MM-DD format"),
  day: z
    .array(z.string().trim().min(1, "Day is required"))
    .min(1, "Select at least one market day"),
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
  const startDate = new Date(values.date);
  const endDate = new Date(values.endDate);

  if (
    !Number.isNaN(startDate.getTime()) &&
    !Number.isNaN(endDate.getTime()) &&
    endDate < startDate
  ) {
    context.addIssue({
      code: "custom",
      message: "Start date must be on or before end date",
      path: ["date"],
    });
    context.addIssue({
      code: "custom",
      message: "End date must be on or after start date",
      path: ["endDate"],
    });
  }

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

const marketCoverImageSchema = z
  .custom<File>((value) => isFile(value), {
    message: "Cover image must be a valid file",
  })
  .refine(
    (file) => acceptedImageTypes.includes(file.type),
    "Cover image must be PNG or JPG",
  )
  .refine(
    (file) => file.size <= maxImageSizeInBytes,
    "Each cover image must be 5MB or less",
  );

const optionalMarketCoverImagesSchema = z.array(marketCoverImageSchema);

export const createMarketSchema = marketDetailsSchema.extend({
  coverImages: z
    .array(marketCoverImageSchema)
    .min(1, "At least one cover image is required"),
}).superRefine(validateMarketTimeRange);

export const editMarketSchema = marketDetailsSchema.extend({
  coverImages: optionalMarketCoverImagesSchema,
  existingImages: z.array(z.string()),
}).superRefine(validateMarketTimeRange);

export type CreateMarketSchemaValues = z.input<typeof createMarketSchema>;
export type EditMarketSchemaValues = z.input<typeof editMarketSchema>;
