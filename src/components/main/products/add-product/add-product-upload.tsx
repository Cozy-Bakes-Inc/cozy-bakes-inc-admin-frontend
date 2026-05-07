"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import InputErrorMessage from "@/components/ui/input-error-message";
import { cn } from "@/lib";

interface AddProductUploadProps {
  file: File | null;
  onChange: (file: File | null) => void;
  error?: string;
  disabled?: boolean;
}

export function AddProductUpload({
  file,
  onChange,
  error,
  disabled = false,
}: AddProductUploadProps) {
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

  return (
    <div>
      <label className="mb-2 block text-[16px] font-medium leading-6 text-dark">
        Product Image
      </label>

      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(event) => {
          if (disabled) {
            return;
          }

          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          if (disabled) {
            return;
          }

          event.preventDefault();
          onChange(event.dataTransfer.files?.[0] ?? null);
        }}
        className={cn(
          "relative flex min-h-[140px] cursor-pointer flex-col items-center justify-center whitespace-normal rounded-[10px] border border-dashed border-primary bg-[rgba(250,248,243,0.35)] px-4 py-5 text-center outline-none transition-colors hover:bg-[rgba(250,248,243,0.75)] focus:border-primary/70 focus:ring-2 focus:ring-primary/10 sm:px-6",
          previewUrl ? "aspect-[4/3] w-full max-w-[260px] p-0" : "w-full",
          error ? "border-destructive bg-destructive/5" : "",
          disabled ? "cursor-not-allowed opacity-60" : "",
        )}
      >
        {previewUrl ? (
          <>
            <Image
              src={previewUrl}
              alt={file?.name ?? "Uploaded product image"}
              fill
              className="rounded-[10px] object-cover"
            />
            <span className="absolute inset-0 rounded-[10px] bg-black/25" />
            <Button
              type="button"
              variant="ghost"
              disabled={disabled}
              aria-label="Remove selected product image"
              onClick={(event) => {
                event.stopPropagation();
                onChange(null);
              }}
              className="absolute right-3 top-3 size-8 rounded-full border border-danger bg-danger-soft text-danger hover:bg-danger-soft"
            >
              <X className="size-4" />
            </Button>
          </>
        ) : (
          <>
            <Upload className="size-8 text-primary" strokeWidth={2.1} />
            <p className="mt-2 text-sm leading-5 text-dark">
              <span className="font-semibold">Click to upload</span>
              <span className="font-normal text-muted-text">
                {" "}
                or drag & drop
              </span>
            </p>
            <p className="mt-1 text-sm leading-5 text-[#98A2B3]">
              PNG, JPG (max. 5MB)
            </p>
          </>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg"
        className="hidden"
        disabled={disabled}
        onChange={(event) => onChange(event.target.files?.[0] ?? null)}
      />

      <InputErrorMessage msg={error} />
    </div>
  );
}
