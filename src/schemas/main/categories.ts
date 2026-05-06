import { z } from "zod";

const acceptedImageTypes = ["image/png", "image/jpeg", "image/jpg"];
const maxImageSizeInBytes = 5 * 1024 * 1024;

function isFile(value: unknown): value is File {
  return typeof File !== "undefined" && value instanceof File;
}

export const createCategorySchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  description: z.string().trim().min(1, "Description is required"),
  image: z
    .custom<File | null>((value) => value === null || isFile(value), {
      message: "Image is required",
    })
    .refine((file) => file !== null, "Image is required")
    .refine(
      (file) => file === null || acceptedImageTypes.includes(file.type),
      "Image must be PNG or JPG",
    )
    .refine(
      (file) => file === null || file.size <= maxImageSizeInBytes,
      "Image must be 5MB or less",
    ),
  categoryId: z.string().trim().optional(),
});

export const updateCategorySchema = createCategorySchema.extend({
  image: z
    .custom<File | null>((value) => value === null || isFile(value), {
      message: "Image must be PNG or JPG",
    })
    .refine(
      (file) => file === null || acceptedImageTypes.includes(file.type),
      "Image must be PNG or JPG",
    )
    .refine(
      (file) => file === null || file.size <= maxImageSizeInBytes,
      "Image must be 5MB or less",
    ),
});

export type CreateCategorySchemaValues = z.input<typeof createCategorySchema>;
export type UpdateCategorySchemaValues = z.input<typeof updateCategorySchema>;
