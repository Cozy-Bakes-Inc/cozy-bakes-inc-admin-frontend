import {
  ArrowLeftRight,
  CircleDollarSign,
  Grid2X2,
  Scale,
  TriangleRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib";
import type { ProductPricingType } from "@/types/main";

const pricingTypes: {
  value: ProductPricingType;
  label: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}[] = [
  { value: "perUnit", label: "Per unit", icon: CircleDollarSign },
  { value: "packs", label: "Packs", icon: Grid2X2 },
  { value: "sizes", label: "Sizes", icon: TriangleRight },
  { value: "byWeight", label: "By weight", icon: Scale },
  { value: "comboDeal", label: "Combo deal", icon: ArrowLeftRight },
];

interface PricingTypeSelectorProps {
  value: ProductPricingType;
  onChange: (value: ProductPricingType) => void;
  disabled?: boolean;
}

export function PricingTypeSelector({
  value,
  onChange,
  disabled = false,
}: PricingTypeSelectorProps) {
  return (
    <div>
      <h3 className="mb-2 text-[16px] font-medium leading-6 text-dark">
        Pricing Type
      </h3>

      <div className="grid grid-cols-1 gap-3 min-[430px]:grid-cols-2 md:grid-cols-5 md:gap-4">
        {pricingTypes.map((type) => {
          const Icon = type.icon;
          const isSelected = value === type.value;

          return (
            <Button
              key={type.value}
              type="button"
              variant="ghost"
              disabled={disabled}
              onClick={() => onChange(type.value)}
              className={cn(
                "h-[78px] flex-col gap-2 rounded-[8px] border border-[#D0D5DD] bg-bg-creamy text-sm font-medium text-dark hover:bg-bg-creamy/90 sm:h-[94px] sm:text-base",
                isSelected
                  ? "border-primary bg-primary/5 text-primary shadow-[0_0_0_1px_rgba(209,150,40,0.18)]"
                  : "",
              )}
            >
              <Icon
                className={cn("size-7", isSelected ? "text-primary" : "")}
                strokeWidth={1.9}
              />
              <span>{type.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
