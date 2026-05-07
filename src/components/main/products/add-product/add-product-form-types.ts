import type { FieldErrors } from "react-hook-form";
import type { AddProductFormValues } from "@/types/main";

export type AddProductFieldValidator = <
  K extends keyof AddProductFormValues,
>(
  field: K,
  value: AddProductFormValues[K],
) => string | boolean;

export type AddProductValueUpdater = <K extends keyof AddProductFormValues>(
  key: K,
  value: AddProductFormValues[K],
) => void;

export type AddProductFormErrors = FieldErrors<AddProductFormValues>;
