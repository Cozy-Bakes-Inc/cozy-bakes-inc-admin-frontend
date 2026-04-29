"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";
import type { DragEvent } from "react";
import { ImageUp, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import InputErrorMessage from "@/components/ui/input-error-message";
import { cn } from "@/lib";

interface EditMarketLocationCoverImagesProps {
  existingImages: string[];
  file: File | null;
  onExistingImagesChange: (images: string[]) => void;
  onFileChange: (file: File | null) => void;
  error?: string;
  disabled?: boolean;
  marketName?: string;
}

export function EditMarketLocationCoverImages({
  existingImages,
  file,
  onExistingImagesChange,
  onFileChange,
  error,
  disabled = false,
  marketName = "Market",
}: EditMarketLocationCoverImagesProps) {
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

  function handleDrop(event: DragEvent<HTMLButtonElement>) {
    event.preventDefault();

    if (disabled) {
      return;
    }

    onFileChange(event.dataTransfer.files?.[0] ?? null);
  }

  return (
    <div>
      <label className="mb-2 block text-[16px] font-medium leading-6 text-dark">
        Cover Image
      </label>

      <div className="space-y-3">
        <Button
          type="button"
          variant="ghost"
          disabled={disabled}
          onClick={() => inputRef.current?.click()}
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleDrop}
          className={cn(
            "flex h-[150px] w-full flex-col items-center justify-center rounded-[24px] border border-dashed border-primary bg-[rgba(250,248,243,0.7)] px-6 text-center transition-colors hover:bg-[rgba(250,248,243,0.9)]",
            disabled ? "cursor-not-allowed opacity-60" : "",
            error ? "border-destructive bg-destructive/5" : "",
          )}
        >
          <ImageUp className="size-8 text-primary" strokeWidth={2.2} />
          <p className="mt-3 text-sm leading-5 tracking-[-0.01em] text-muted-text">
            <span className="font-semibold text-muted-text">
              Click to upload
            </span>
            {" or drag and drop"}
          </p>
          <p className="mt-1 text-xs leading-4 text-[#98A2B3]">
            PNG, JPG (MAX. 5MB)
          </p>
        </Button>

        {existingImages.length > 0 || previewUrl ? (
          <div className="flex flex-wrap gap-3">
            {existingImages.map((image, index) => (
              <div
                key={`${image}-${index}`}
                className="relative size-[150px] overflow-visible rounded-[24px] border border-dashed border-primary bg-[#fbf8eb14]"
              >
                <Image
                  src={image}
                  alt={`${marketName} cover ${index + 1}`}
                  width={150}
                  height={150}
                  className="size-full rounded-[24px] object-cover"
                />
                <Button
                  type="button"
                  variant="ghost"
                  disabled={disabled}
                  onClick={() =>
                    onExistingImagesChange(
                      existingImages.filter(
                        (currentImage) => currentImage !== image,
                      ),
                    )
                  }
                  className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full border border-danger bg-danger-soft text-danger shadow-[0_1px_2px_rgba(16,24,40,0.05)] disabled:cursor-not-allowed disabled:opacity-60"
                  aria-label={`Remove cover image ${index + 1}`}
                >
                  <X className="size-[14px]" strokeWidth={2.2} />
                </Button>
              </div>
            ))}

            {previewUrl ? (
              <div className="relative size-[150px] overflow-visible rounded-[24px] border border-dashed border-primary bg-[#fbf8eb14]">
                <Image
                  src={previewUrl}
                  alt={file?.name ?? "New cover preview"}
                  width={150}
                  height={150}
                  className="size-full rounded-[24px] object-cover"
                />
                <Button
                  type="button"
                  variant="ghost"
                  disabled={disabled}
                  onClick={() => onFileChange(null)}
                  className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full border border-danger bg-danger-soft text-danger shadow-[0_1px_2px_rgba(16,24,40,0.05)] disabled:cursor-not-allowed disabled:opacity-60"
                  aria-label="Remove selected cover image"
                >
                  <X className="size-[14px]" strokeWidth={2.2} />
                </Button>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg"
        className="hidden"
        disabled={disabled}
        onChange={(event) => onFileChange(event.target.files?.[0] ?? null)}
      />

      <InputErrorMessage msg={error} />
    </div>
  );
}
