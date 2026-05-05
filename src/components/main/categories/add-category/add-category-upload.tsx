"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";
import { ImageUp, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import InputErrorMessage from "@/components/ui/input-error-message";
import { cn } from "@/lib";

interface AddCategoryUploadProps {
  file: File | null;
  onChange: (file: File | null) => void;
  error?: string;
  disabled?: boolean;
}

export function AddCategoryUpload({
  file,
  onChange,
  error,
  disabled = false,
}: AddCategoryUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const previewUrl = useMemo(
    () => (file ? URL.createObjectURL(file) : null),
    [file],
  );

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  function handleFileSelection(nextFile: File | null) {
    onChange(nextFile);
  }

  return (
    <div>
      <label className="mb-2 block text-[16px] font-medium leading-6 text-dark">
        Image
      </label>

      <div className="space-y-3">
        <Button
          type="button"
          variant="ghost"
          disabled={disabled}
          onClick={() => inputRef.current?.click()}
          onDragOver={(event) => {
            event.preventDefault();
          }}
          onDrop={(event) => {
            if (disabled) {
              return;
            }

            event.preventDefault();
            handleFileSelection(event.dataTransfer.files?.[0] ?? null);
          }}
          className={cn(
            "flex min-h-[150px] w-full flex-col items-center justify-center rounded-[24px] border border-dashed border-primary bg-bg-creamy px-6 py-8 text-center transition-colors hover:bg-bg-creamy/80",
            file ? "border-primary/70" : "border-primary/85",
            disabled ? "cursor-not-allowed opacity-60" : "",
            error ? "border-destructive bg-destructive/5" : "",
          )}
        >
          <span className="inline-flex items-center justify-center text-primary">
            <ImageUp className="size-8" strokeWidth={2.2} />
          </span>

          <p className="mt-3 text-sm leading-5 tracking-[-0.01em] text-muted-text">
            <span className="font-semibold text-muted-text">
              Click to upload
            </span>
            {" or drag and drop"}
          </p>

          <p className="mt-1 text-xs leading-4 text-gray">
            PNG, JPG (MAX. 5MB)
          </p>
        </Button>

        {previewUrl ? (
          <div className="relative size-[150px] overflow-visible rounded-[24px] border border-dashed border-primary bg-bg-creamy">
            <Image
              src={previewUrl}
              alt={file?.name ?? "Uploaded category preview"}
              width={150}
              height={150}
              className="size-full rounded-[24px] object-cover"
            />
            <Button
              type="button"
              variant="ghost"
              disabled={disabled}
              onClick={() => handleFileSelection(null)}
              className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full border border-danger bg-danger-soft text-danger shadow-[0_1px_2px_rgba(16,24,40,0.05)] disabled:cursor-not-allowed disabled:opacity-60"
              aria-label="Remove selected category image"
            >
              <X className="size-[14px]" strokeWidth={2.2} />
            </Button>
          </div>
        ) : null}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg"
        className="hidden"
        disabled={disabled}
        onChange={(event) => {
          handleFileSelection(event.target.files?.[0] ?? null);
        }}
      />

      <InputErrorMessage msg={error} />
    </div>
  );
}
