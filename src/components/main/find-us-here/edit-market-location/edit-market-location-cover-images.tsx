"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";
import type { DragEvent } from "react";
import { Plus, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import InputErrorMessage from "@/components/ui/input-error-message";
import { cn } from "@/lib";

interface EditMarketLocationCoverImagesProps {
  existingImages: string[];
  files: File[];
  onExistingImagesChange: (images: string[]) => void;
  onFilesChange: (files: File[]) => void;
  error?: string;
  disabled?: boolean;
  marketName?: string;
}

export function EditMarketLocationCoverImages({
  existingImages,
  files,
  onExistingImagesChange,
  onFilesChange,
  error,
  disabled = false,
  marketName = "Market",
}: EditMarketLocationCoverImagesProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const previewUrls = useMemo(
    () => files.map((file) => URL.createObjectURL(file)),
    [files],
  );

  useEffect(() => {
    return () => {
      previewUrls.forEach((previewUrl) => URL.revokeObjectURL(previewUrl));
    };
  }, [previewUrls]);

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();

    if (disabled) {
      return;
    }

    onFilesChange([...files, ...Array.from(event.dataTransfer.files ?? [])]);
  }

  function removeFile(indexToRemove: number) {
    onFilesChange(files.filter((_, index) => index !== indexToRemove));
  }

  const totalImages = existingImages.length + files.length;
  const isEmpty = totalImages === 0;

  return (
    <div>
      <label className="mb-2 block text-[16px] font-medium leading-6 text-dark">
        Cover Images
      </label>

      {isEmpty ? (
        <div
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-disabled={disabled}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(event) => {
            if (disabled) return;
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              inputRef.current?.click();
            }
          }}
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleDrop}
          className={cn(
            "flex min-h-35 w-full cursor-pointer flex-col items-center justify-center rounded-[10px] border border-dashed border-primary bg-[rgba(250,248,243,0.35)] px-4 py-5 text-center outline-none transition-colors hover:bg-[rgba(250,248,243,0.75)] focus:border-primary/70 focus:ring-2 focus:ring-primary/10 sm:px-6",
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
            PNG, JPG (max. 5MB) - multiple allowed
          </p>
        </div>
      ) : (
        <div
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleDrop}
          className="flex flex-wrap gap-3"
        >
          {existingImages.map((image, index) => (
            <div
              key={`${image}-${index}`}
              className="relative size-37.5 shrink-0 overflow-hidden rounded-[10px] border border-border/15"
            >
              <Image
                src={image}
                alt={`${marketName} cover ${index + 1}`}
                fill
                className="object-cover"
              />
              <span className="absolute inset-0 bg-black/20" />
              <Button
                type="button"
                variant="ghost"
                disabled={disabled}
                onClick={() =>
                  onExistingImagesChange(
                    existingImages.filter(
                      (_, imageIndex) => imageIndex !== index,
                    ),
                  )
                }
                className="absolute right-1 top-1 size-6 rounded-full border border-danger bg-danger-soft p-0 text-danger hover:bg-danger-soft disabled:cursor-not-allowed disabled:opacity-60"
                aria-label={`Remove existing cover image ${index + 1}`}
              >
                <X className="size-3" />
              </Button>
            </div>
          ))}

          {previewUrls.map((previewUrl, index) => (
            <div
              key={previewUrl}
              className="relative size-37.5 shrink-0 overflow-hidden rounded-[10px] border border-border/15"
            >
              <Image
                src={previewUrl}
                alt={files[index]?.name ?? `New cover ${index + 1}`}
                fill
                className="object-cover"
              />
              <span className="absolute inset-0 bg-black/20" />
              <Button
                type="button"
                variant="ghost"
                disabled={disabled}
                onClick={() => removeFile(index)}
                className="absolute right-1 top-1 size-6 rounded-full border border-danger bg-danger-soft p-0 text-danger hover:bg-danger-soft disabled:cursor-not-allowed disabled:opacity-60"
                aria-label={`Remove cover image ${index + 1}`}
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
        onChange={(event) => {
          onFilesChange([...files, ...Array.from(event.target.files ?? [])]);
          event.target.value = "";
        }}
      />

      <InputErrorMessage msg={error} />
    </div>
  );
}
