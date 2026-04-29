import { Plus } from "lucide-react";
import type { FindUsHereHeaderProps } from "@/interfaces/main/find-us-here";
import { Button } from "@/components/ui/button";

export function FindUsHereHeader({
  title,
  description,
  primaryActionLabel,
  onPrimaryActionClick,
}: FindUsHereHeaderProps) {
  return (
    <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
      <div>
        <h1 className="text-[24px] font-bold tracking-[0.015em] text-dark">
          {title}
        </h1>
        <p className="mt-1 text-sm font-medium text-gray">{description}</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button
          type="button"
          variant="ghost"
          onClick={onPrimaryActionClick}
          className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
        >
          <Plus className="size-4" strokeWidth={2.2} />
          {primaryActionLabel}
        </Button>

      </div>
    </div>
  );
}
