import type { Path, UseFormSetError } from "react-hook-form";
import { createProductSchema } from "@/schemas";
import type { AddProductFormValues } from "@/types/main";

export function validateProductField<K extends keyof AddProductFormValues>(
  field: K,
  value: AddProductFormValues[K],
) {
  const result = createProductSchema.shape[field].safeParse(value);
  return result.success || result.error.issues[0]?.message;
}

export function applyProductSchemaErrors(
  valuesToValidate: AddProductFormValues,
  setError: UseFormSetError<AddProductFormValues>,
) {
  const result = createProductSchema.safeParse(valuesToValidate);
  if (result.success) {
    return result.data;
  }

  result.error.issues.forEach((issue) => {
    const fieldPath = issue.path.join(".") as Path<AddProductFormValues>;
    setError(fieldPath, {
      type: "manual",
      message: issue.message,
    });
  });

  return null;
}
