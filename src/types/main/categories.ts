import type { CreateCategorySchemaValues } from "@/schemas";

export type CategoryViewMode = "table" | "card";

export type CategoryActionTone = "danger" | "info" | "primary";

export type AddCategoryFormValues = CreateCategorySchemaValues;

export interface AddCategoryProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (values: AddCategoryFormValues) => void | Promise<void>;
  initialValues?: Partial<AddCategoryFormValues>;
  submitLabel?: string;
}
