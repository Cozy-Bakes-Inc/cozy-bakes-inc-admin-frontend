import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib";
import { AddProductField } from "./add-product-field";

interface ProductVariantsFieldProps {
  enabled: boolean;
  variants: string[];
  onEnabledChange: (enabled: boolean) => void;
  onVariantsChange: (variants: string[]) => void;
  disabled?: boolean;
}

export function ProductVariantsField({
  enabled,
  variants,
  onEnabledChange,
  onVariantsChange,
  disabled = false,
}: ProductVariantsFieldProps) {
  const [draftVariant, setDraftVariant] = useState("");

  function addVariant() {
    const nextVariant = draftVariant.trim();
    if (!nextVariant) {
      return;
    }

    onVariantsChange([...variants, nextVariant]);
    setDraftVariant("");
  }

  return (
    <div className="rounded-[8px] border border-[#D0D5DD] bg-bg-creamy/55 p-3 md:p-4">
      <div className="flex items-center justify-between gap-4">
        <p className="text-base font-medium text-dark">Flavors</p>

        <button
          type="button"
          disabled={disabled}
          aria-pressed={enabled}
          onClick={() => onEnabledChange(!enabled)}
          className={cn(
            "relative inline-flex h-7 w-12 shrink-0 items-center overflow-hidden rounded-full bg-[#E4E7EC] p-1 transition-colors disabled:cursor-not-allowed disabled:opacity-60",
            enabled ? "bg-primary" : "",
          )}
        >
          <span
            className={cn(
              "block size-5 rounded-full bg-white shadow-sm transition-transform",
              enabled ? "translate-x-5" : "translate-x-0",
            )}
          />
        </button>
      </div>

      {enabled ? (
        <div className="mt-3 grid gap-3 md:grid-cols-[1fr_108px]">
          <AddProductField
            id="productVariant"
            value={draftVariant}
            placeholder="Type custom flavor and press Enter..."
            disabled={disabled}
            onChange={setDraftVariant}
            inputClassName="h-[48px]"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                addVariant();
              }
            }}
          />
          <Button
            type="button"
            variant="ghost"
            disabled={disabled}
            onClick={addVariant}
            className="h-[48px] rounded-[8px] border border-primary bg-background text-base font-medium text-primary hover:bg-primary/5"
          >
            + Add
          </Button>

          {variants.length > 0 ? (
            <div className="flex flex-wrap gap-2 md:col-span-2">
              {variants.map((variant) => (
                <button
                  key={variant}
                  type="button"
                  disabled={disabled}
                  onClick={() =>
                    onVariantsChange(
                      variants.filter((item) => item !== variant),
                    )
                  }
                  className="rounded-full border border-primary/25 bg-primary/5 px-3 py-1 text-sm font-medium text-primary"
                >
                  {variant}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
