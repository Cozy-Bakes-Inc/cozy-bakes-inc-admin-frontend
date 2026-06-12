"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import InputErrorMessage from "@/components/ui/input-error-message";
import { useInfiniteSubCategoriesList } from "@/hooks/api";
import { cn } from "@/lib";

interface AddProductCategorySelectProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: string;
}

export function AddProductCategorySelect({
  value,
  onChange,
  disabled = false,
  error,
}: AddProductCategorySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteSubCategoriesList();
  const categoryOptions =
    data?.pages
      ?.flatMap((page) => page?.data?.data ?? [])
      .map((item) => ({
        value: String(item.id),
        label: item.title,
      })) ?? [];
  const selectedOption = categoryOptions.find((option) => option.value === value);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <label
        htmlFor="productCategory"
        className="mb-2 block text-[16px] font-medium leading-6 text-dark"
      >
        Category
      </label>

      <Button
        id="productCategory"
        type="button"
        variant="ghost"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        className={cn(
          "h-[56px] w-full justify-between rounded-[8px] border border-[#D0D5DD] bg-background px-4 text-left text-base font-medium text-dark hover:bg-background focus:border-primary/70 focus:ring-2 focus:ring-primary/10",
          !selectedOption ? "text-[#98A2B3]" : "",
          isOpen ? "border-primary/70 ring-2 ring-primary/10" : "",
          error ? "border-destructive focus:border-destructive/70" : "",
        )}
      >
        <span>{selectedOption?.label ?? "Select category..."}</span>
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
          aria-label="Product category"
          className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 max-h-[280px] overflow-y-auto overscroll-contain rounded-[10px] border border-primary/20 bg-background p-1 shadow-[0_16px_40px_rgba(61,44,30,0.16)]"
        >
          {isLoading ? (
            <div className="px-3 py-3 text-sm font-medium text-muted-text">
              Loading categories...
            </div>
          ) : categoryOptions.length === 0 ? (
            <div className="px-3 py-3 text-sm font-medium text-muted-text">
              No categories found
            </div>
          ) : null}

          {categoryOptions.map((option) => {
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
                  "flex h-11 w-full items-center justify-between rounded-[8px] px-3 text-left text-sm font-medium text-dark transition-colors hover:bg-primary/10 hover:text-primary",
                  isSelected ? "bg-primary/10 text-primary" : "",
                )}
              >
                <span>{option.label}</span>
                {isSelected ? <Check className="size-4" /> : null}
              </button>
            );
          })}

          {hasNextPage ? (
            <button
              type="button"
              disabled={isFetchingNextPage}
              onClick={() => fetchNextPage()}
              className="mt-1 h-10 w-full rounded-[8px] px-3 text-left text-sm font-medium text-primary transition-colors hover:bg-primary/10 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isFetchingNextPage ? "Loading..." : "Load more"}
            </button>
          ) : null}
        </div>
      ) : null}

      <InputErrorMessage msg={error} />
    </div>
  );
}
