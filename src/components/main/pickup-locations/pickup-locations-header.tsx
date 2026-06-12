import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PickupLocationsHeaderProps {
  onAddClick: () => void;
}

export function PickupLocationsHeader({
  onAddClick,
}: PickupLocationsHeaderProps) {
  return (
    <header className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
      <div className="space-y-0.5">
        <h1 className="text-[28px] font-bold tracking-[-0.03em] text-dark md:text-[32px]">
          Pickup Locations
        </h1>
        <p className="text-sm font-medium text-gray md:text-base">
          Manage shops customers can select for order pickup.
        </p>
      </div>

      <Button
        type="button"
        variant="ghost"
        onClick={onAddClick}
        className="inline-flex h-10 w-fit items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
      >
        <Plus className="size-4" strokeWidth={2.4} />
        <span>Add Pickup Location</span>
      </Button>
    </header>
  );
}
