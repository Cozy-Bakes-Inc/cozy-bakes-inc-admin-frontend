"use client";

import { useRef } from "react";
import { Controller } from "react-hook-form";
import type { Control, FieldErrors } from "react-hook-form";
import { FileText, Upload } from "lucide-react";
import { cn } from "@/lib";
import type { MenuFormValues } from "@/types/main/menu";

interface AddMenuFieldsProps {
  control: Control<MenuFormValues>;
  errors: FieldErrors<MenuFormValues>;
  disabled: boolean;
  pdfFile: File | null;
  existingPdfLink?: string;
}

function FieldWrapper({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-dark">{label}</label>
      {children}
      {error ? (
        <p className="text-xs font-medium text-red-500">{error}</p>
      ) : null}
    </div>
  );
}

export function AddMenuFields({
  control,
  errors,
  disabled,
  pdfFile,
  existingPdfLink,
}: AddMenuFieldsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const baseInputClass =
    "w-full rounded-[8px] border border-[#D0D5DD] bg-background px-4 py-3 text-sm font-medium text-dark outline-none placeholder:text-gray transition-colors focus:border-primary/60 disabled:cursor-not-allowed disabled:opacity-60";

  return (
    <div className="space-y-5 md:space-y-6">
      <div className="grid gap-5 md:grid-cols-2">
        <FieldWrapper label="Title" error={errors.title?.message}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                disabled={disabled}
                placeholder="e.g. Drinks Menu"
                className={cn(baseInputClass, errors.title && "border-red-400")}
              />
            )}
          />
        </FieldWrapper>

        <FieldWrapper label="Status" error={errors.isActive?.message}>
          <Controller
            name="isActive"
            control={control}
            render={({ field }) => (
              <div className="flex h-[46px] items-center justify-between">
                <span className="ml-3 text-sm font-medium text-dark">
                  {field.value ? "Active" : "Inactive"}
                </span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={field.value}
                  disabled={disabled}
                  onClick={() => field.onChange(!field.value)}
                  className={cn(
                    "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus:outline-none disabled:cursor-not-allowed disabled:opacity-60",
                    field.value ? "bg-primary" : "bg-gray-200",
                  )}
                >
                  <span
                    className={cn(
                      "pointer-events-none inline-block size-5 rounded-full bg-white shadow-lg transition-transform",
                      field.value ? "translate-x-5" : "translate-x-0",
                    )}
                  />
                </button>
              </div>
            )}
          />
        </FieldWrapper>
      </div>

      <FieldWrapper label="Description" error={errors.description?.message}>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              rows={4}
              disabled={disabled}
              placeholder="Describe this menu..."
              className={cn(
                baseInputClass,
                "resize-none",
                errors.description && "border-red-400",
              )}
            />
          )}
        />
      </FieldWrapper>

      <FieldWrapper label="PDF File" error={errors.pdfFile?.message}>
        <Controller
          name="pdfFile"
          control={control}
          render={({ field: { onChange } }) => (
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                disabled={disabled}
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0] ?? null;
                  onChange(file);
                }}
              />
              <button
                type="button"
                disabled={disabled}
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  "flex w-full items-center gap-3 rounded-[8px] border border-dashed px-4 py-4 text-sm transition-colors hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-60",
                  errors.pdfFile
                    ? "border-red-400 bg-red-50/30"
                    : "border-[#D0D5DD] bg-background",
                )}
              >
                {pdfFile ? (
                  <>
                    <FileText className="size-5 shrink-0 text-primary" strokeWidth={2} />
                    <span className="truncate font-medium text-dark">
                      {pdfFile.name}
                    </span>
                  </>
                ) : existingPdfLink ? (
                  <>
                    <FileText className="size-5 shrink-0 text-primary" strokeWidth={2} />
                    <span className="truncate font-medium text-dark">
                      Current PDF attached — click to replace
                    </span>
                  </>
                ) : (
                  <>
                    <Upload className="size-5 shrink-0 text-primary" strokeWidth={2} />
                    <span className="text-gray">Click to upload PDF (max 10MB)</span>
                  </>
                )}
              </button>
            </div>
          )}
        />
      </FieldWrapper>
    </div>
  );
}
