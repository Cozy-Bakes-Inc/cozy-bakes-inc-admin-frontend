"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";
import { Plus, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import InputErrorMessage from "@/components/ui/input-error-message";
import { cn } from "@/lib";

export interface UpdateProductUploadProps {
  files: File[];
  existingImageUrls: string[];
  onChange: (files: File[]) => void;
  onExistingUrlsChange: (urls: string[]) => void;
  error?: string;
  disabled?: boolean;
}

export function UpdateProductUpload({
  files,
  existingImageUrls,
  onChange,
  onExistingUrlsChange,
  error,
  disabled = false,
}: UpdateProductUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const blobUrls = useMemo(
    () => files.map((f) => URL.createObjectURL(f)),
    [files],
  );

  useEffect(() => {
    return () => {
      blobUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [blobUrls]);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(event.target.files ?? []);
    if (picked.length) onChange([...files, ...picked]);
    event.target.value = "";
  }

  function handleDrop(event: React.DragEvent) {
    if (disabled) return;
    event.preventDefault();
    const dropped = Array.from(event.dataTransfer.files);
    if (dropped.length) onChange([...files, ...dropped]);
  }

  function removeNewFile(index: number) {
    onChange(files.filter((_, i) => i !== index));
  }

  function removeExistingUrl(index: number) {
    onExistingUrlsChange(existingImageUrls.filter((_, i) => i !== index));
  }

  const totalImages = existingImageUrls.length + files.length;
  const isEmpty = totalImages === 0;

  return (
    <div>
      <label className="mb-2 block text-[16px] font-medium leading-6 text-dark">
        Product Images
      </label>

      {isEmpty ? (
        <div
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-disabled={disabled}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => {
            if (disabled) return;
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              inputRef.current?.click();
            }
          }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className={cn(
            "flex w-full min-h-35 cursor-pointer flex-col items-center justify-center rounded-[10px] border border-dashed border-primary bg-[rgba(250,248,243,0.35)] px-4 py-5 text-center outline-none transition-colors hover:bg-[rgba(250,248,243,0.75)] focus:border-primary/70 focus:ring-2 focus:ring-primary/10 sm:px-6",
            error ? "border-destructive bg-destructive/5" : "",
            disabled ? "cursor-not-allowed opacity-60" : "",
          )}
        >
          <Upload className="size-8 text-primary" strokeWidth={2.1} />
          <p className="mt-2 text-sm leading-5 text-dark">
            <span className="font-semibold">Click to upload</span>
            <span className="font-normal text-muted-text"> or drag & drop</span>
          </p>
          <p className="mt-1 text-sm leading-5 text-[#98A2B3]">
            PNG, JPG (max. 5MB) · multiple allowed
          </p>
        </div>
      ) : (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="flex flex-wrap gap-3"
        >
          {existingImageUrls.map((url, i) => (
            <div
              key={`existing-${i}`}
              className="relative size-37.5 shrink-0 overflow-hidden rounded-[10px] border border-border/15"
            >
              <Image
                src={url}
                alt={`Existing image ${i + 1}`}
                fill
                className="object-cover"
                unoptimized
              />
              <span className="absolute inset-0 bg-black/20" />
              <Button
                type="button"
                variant="ghost"
                disabled={disabled}
                aria-label={`Remove existing image ${i + 1}`}
                onClick={() => removeExistingUrl(i)}
                className="absolute right-1 top-1 size-6 rounded-full border border-danger bg-danger-soft p-0 text-danger hover:bg-danger-soft"
              >
                <X className="size-3" />
              </Button>
            </div>
          ))}

          {blobUrls.map((url, i) => (
            <div
              key={url}
              className="relative size-37.5 shrink-0 overflow-hidden rounded-[10px] border border-border/15"
            >
              <Image
                src={url}
                alt={files[i]?.name ?? `New image ${i + 1}`}
                fill
                className="object-cover"
              />
              <span className="absolute inset-0 bg-black/20" />
              <Button
                type="button"
                variant="ghost"
                disabled={disabled}
                aria-label={`Remove image ${i + 1}`}
                onClick={() => removeNewFile(i)}
                className="absolute right-1 top-1 size-6 rounded-full border border-danger bg-danger-soft p-0 text-danger hover:bg-danger-soft"
              >
                <X className="size-3" />
              </Button>
            </div>
          ))}

          <button
            type="button"
            disabled={disabled}
            onClick={() => inputRef.current?.click()}
            className={cn(
              "flex size-37.5 shrink-0 flex-col items-center justify-center gap-1 rounded-[10px] border border-dashed border-primary bg-[rgba(250,248,243,0.35)] text-primary transition-colors hover:bg-[rgba(250,248,243,0.75)]",
              disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
            )}
          >
            <Plus className="size-5" strokeWidth={2.1} />
            <span className="text-xs font-medium">Add more</span>
          </button>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/png,image/jpeg,image/jpg"
        className="hidden"
        disabled={disabled}
        onChange={handleInputChange}
      />

      <InputErrorMessage msg={error} />
    </div>
  );
}
