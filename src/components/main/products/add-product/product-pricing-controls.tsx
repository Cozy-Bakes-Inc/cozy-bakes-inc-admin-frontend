import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function RemovePricingRowButton({
  disabled,
  onClick,
}: {
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      disabled={disabled}
      onClick={onClick}
      className="h-[48px] w-full rounded-[8px] border border-[#D0D5DD] bg-background text-dark hover:bg-muted md:size-[48px]"
      aria-label="Remove pricing row"
    >
      <X className="size-4" />
    </Button>
  );
}

export function AddPricingRowButton({
  label,
  disabled,
  onClick,
}: {
  label: string;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      disabled={disabled}
      onClick={onClick}
      className="h-[48px] w-full rounded-[8px] border border-[#D0D5DD] bg-background text-base font-medium text-dark hover:border-primary hover:bg-primary/5 hover:text-primary"
    >
      + {label}
    </Button>
  );
}

export function PricingMobileLabel({
  desktopText = "- Price",
}: {
  desktopText?: string;
}) {
  return (
    <span className="text-base font-medium text-dark">
      <span className="md:hidden">Price</span>
      <span className="hidden md:inline">{desktopText}</span>
    </span>
  );
}

