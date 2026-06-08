"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Controller, type Control } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib";
import type { AddProductFormValues } from "@/types/main";
import type { ParcelDistanceUnit, ParcelMassUnit } from "@/types/main";
import { AddProductField } from "./add-product-field";
import type { AddProductFormErrors } from "./add-product-form-types";

const distanceUnitOptions: { value: ParcelDistanceUnit; label: string }[] = [
  { value: "in", label: "in" },
  { value: "cm", label: "cm" },
  { value: "ft", label: "ft" },
  { value: "m", label: "m" },
];

const massUnitOptions: { value: ParcelMassUnit; label: string }[] = [
  { value: "lb", label: "lb" },
  { value: "oz", label: "oz" },
  { value: "g", label: "g" },
  { value: "kg", label: "kg" },
];

interface ParcelUnitSelectProps<T extends string> {
  id: string;
  label: string;
  value: T;
  options: { value: T; label: string }[];
  disabled?: boolean;
  onChange: (value: T) => void;
}

function ParcelUnitSelect<T extends string>({
  id,
  label,
  value,
  options,
  disabled = false,
  onChange,
}: ParcelUnitSelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <label
        htmlFor={id}
        className="mb-2 block text-[16px] font-medium leading-6 text-dark"
      >
        {label}
      </label>

      <Button
        id={id}
        type="button"
        variant="ghost"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((v) => !v)}
        className={cn(
          "h-14 w-full justify-between rounded-[8px] border border-[#D0D5DD] bg-background px-4 text-left text-base font-medium text-dark hover:bg-background focus:border-primary/70 focus:ring-2 focus:ring-primary/10",
          isOpen ? "border-primary/70 ring-2 ring-primary/10" : "",
        )}
      >
        <span>{selectedOption?.label ?? "Select..."}</span>
        <ChevronDown
          className={cn(
            "size-4 text-dark transition-transform",
            isOpen ? "rotate-180" : "",
          )}
        />
      </Button>

      {isOpen ? (
        <div
          role="listbox"
          className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 max-h-22 overflow-y-auto overflow-x-hidden rounded-[10px] border border-primary/20 bg-background p-1 shadow-[0_16px_40px_rgba(61,44,30,0.16)]"
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={cn(
                  "flex h-10 w-full items-center justify-between rounded-[8px] px-3 text-left text-sm font-medium text-dark transition-colors hover:bg-primary/10 hover:text-primary",
                  isSelected ? "bg-primary/10 text-primary" : "",
                )}
              >
                <span>{option.label}</span>
                {isSelected ? <Check className="size-4" /> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

interface AddProductParcelFieldsProps {
  control: Control<AddProductFormValues>;
  errors: AddProductFormErrors;
  disabled: boolean;
}

export function AddProductParcelFields({
  control,
  errors,
  disabled,
}: AddProductParcelFieldsProps) {
  const parcelErrors = errors.parcel;

  return (
    <div className="space-y-4">
      <h3 className="text-[16px] font-medium leading-6 text-dark">
        Shipping Dimensions
      </h3>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Controller
          name="parcel.length"
          control={control}
          render={({ field }) => (
            <AddProductField
              id="parcel-length"
              label="Length"
              type="number"
              placeholder="0"
              value={field.value}
              disabled={disabled}
              error={parcelErrors?.length?.message}
              onChange={field.onChange}
            />
          )}
        />

        <Controller
          name="parcel.width"
          control={control}
          render={({ field }) => (
            <AddProductField
              id="parcel-width"
              label="Width"
              type="number"
              placeholder="0"
              value={field.value}
              disabled={disabled}
              error={parcelErrors?.width?.message}
              onChange={field.onChange}
            />
          )}
        />

        <Controller
          name="parcel.height"
          control={control}
          render={({ field }) => (
            <AddProductField
              id="parcel-height"
              label="Height"
              type="number"
              placeholder="0"
              value={field.value}
              disabled={disabled}
              error={parcelErrors?.height?.message}
              onChange={field.onChange}
            />
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Controller
          name="parcel.distanceUnit"
          control={control}
          render={({ field }) => (
            <ParcelUnitSelect<ParcelDistanceUnit>
              id="parcel-distance-unit"
              label="Distance Unit"
              value={field.value}
              options={distanceUnitOptions}
              disabled={disabled}
              onChange={field.onChange}
            />
          )}
        />

        <Controller
          name="parcel.weight"
          control={control}
          render={({ field }) => (
            <AddProductField
              id="parcel-weight"
              label="Weight"
              type="number"
              placeholder="0"
              value={field.value}
              disabled={disabled}
              error={parcelErrors?.weight?.message}
              onChange={field.onChange}
            />
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Controller
          name="parcel.massUnit"
          control={control}
          render={({ field }) => (
            <ParcelUnitSelect<ParcelMassUnit>
              id="parcel-mass-unit"
              label="Mass Unit"
              value={field.value}
              options={massUnitOptions}
              disabled={disabled}
              onChange={field.onChange}
            />
          )}
        />
      </div>
    </div>
  );
}
