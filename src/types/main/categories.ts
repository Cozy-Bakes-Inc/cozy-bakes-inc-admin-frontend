import type {
  CreateCategorySchemaValues,
  UpdateCategorySchemaValues,
} from "@/schemas";

export type CategoryViewMode = "table" | "card";

export type CategoryActionTone = "danger" | "info" | "primary";

export type AddCategoryFormValues = CreateCategorySchemaValues;
export type UpdateCategoryFormValues = UpdateCategorySchemaValues;

export interface AddCategoryProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (values: AddCategoryFormValues) => void | Promise<void>;
  initialValues?: Partial<AddCategoryFormValues>;
  submitLabel?: string;
}

export interface UpdateCategoryProps {
  open: boolean;
  slug: string | null;
  onClose: () => void;
  onSubmit?: (values: UpdateCategoryFormValues) => void | Promise<void>;
}
