import type { FieldErrors } from "react-hook-form";
import type { AddProductFormValues } from "@/types/main";

export interface UpdateProductFormValues extends AddProductFormValues {
  existingImageUrls: string[];
}

export type UpdateProductFieldValidator = <
  K extends keyof UpdateProductFormValues,
>(
  field: K,
  value: UpdateProductFormValues[K],
) => string | boolean;

export type UpdateProductValueUpdater = <K extends keyof UpdateProductFormValues>(
  key: K,
  value: UpdateProductFormValues[K],
) => void;

export type UpdateProductFormErrors = FieldErrors<UpdateProductFormValues>;
