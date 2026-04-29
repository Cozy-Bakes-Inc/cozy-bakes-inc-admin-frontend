import type { ComponentType } from "react";
import type {
  CreateMarketSchemaValues,
  EditMarketSchemaValues,
} from "@/schemas";

export type FindUsHereSummaryMetricIcon =
  | "store"
  | "calendar"
  | "clock"
  | "trend";

export type AddMarketLocationFormValues = CreateMarketSchemaValues;
export type EditMarketLocationFormValues = EditMarketSchemaValues;

export interface AddMarketLocationProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (values: AddMarketLocationFormValues) => void | Promise<void>;
  submitLabel?: string;
  initialValues?: Partial<AddMarketLocationFormValues>;
}

export interface ViewMarketLocationProps {
  open: boolean;
  onClose: () => void;
  marketSlug: string;
}

export interface EditMarketLocationProps {
  open: boolean;
  onClose: () => void;
  marketSlug?: string;
  onSubmit?: (values: EditMarketLocationFormValues) => void | Promise<void>;
}

export interface AddMarketLocationFieldProps {
  id: keyof Omit<AddMarketLocationFormValues, "coverImage">;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  icon?: ComponentType<{ className?: string; strokeWidth?: number }>;
  multiline?: boolean;
  rows?: number;
}
