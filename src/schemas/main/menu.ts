import { z } from "zod";

const acceptedPdfTypes = ["application/pdf"];
const maxFileSizeInBytes = 10 * 1024 * 1024;

function isFile(value: unknown): value is File {
  return typeof File !== "undefined" && value instanceof File;
}

export const createMenuSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  description: z.string().trim().min(1, "Description is required"),
  pdfFile: z
    .custom<File>((v) => isFile(v), { message: "PDF file is required" })
    .refine(
      (f) => acceptedPdfTypes.includes(f.type),
      "File must be a PDF",
    )
    .refine(
      (f) => f.size <= maxFileSizeInBytes,
      "File must be 10MB or less",
    ),
  isActive: z.boolean(),
});

export const updateMenuSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  description: z.string().trim().min(1, "Description is required"),
  pdfFile: z
    .custom<File | null>(
      (v) => v === null || isFile(v),
      { message: "Invalid file" },
    )
    .refine(
      (f) => f === null || acceptedPdfTypes.includes(f.type),
      "File must be a PDF",
    )
    .refine(
      (f) => f === null || f.size <= maxFileSizeInBytes,
      "File must be 10MB or less",
    )
    .nullable(),
  isActive: z.boolean(),
});

export type CreateMenuSchemaValues = z.infer<typeof createMenuSchema>;
export type UpdateMenuSchemaValues = z.infer<typeof updateMenuSchema>;
