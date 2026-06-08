import type { MenuFormValues } from "@/types/main/menu";

export function buildCreateMenuPayload(values: MenuFormValues): FormData {
  const form = new FormData();
  form.append("title", values.title);
  form.append("description", values.description);
  if (values.pdfFile) form.append("pdf_file", values.pdfFile);
  form.append("is_active", values.isActive ? "1" : "0");
  return form;
}

export function buildUpdateMenuPayload(
  values: MenuFormValues,
  dirtyFields: Partial<Record<keyof MenuFormValues, unknown>>,
): FormData {
  const form = new FormData();
  if (dirtyFields.title) form.append("title", values.title);
  if (dirtyFields.description) form.append("description", values.description);
  if (dirtyFields.pdfFile && values.pdfFile)
    form.append("pdf_file", values.pdfFile);
  if (dirtyFields.isActive !== undefined)
    form.append("is_active", values.isActive ? "1" : "0");
  return form;
}
