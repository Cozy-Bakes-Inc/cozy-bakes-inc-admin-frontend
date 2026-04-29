import { MessageSquarePlus } from "lucide-react";
import type { ReviewsHeaderProps } from "@/interfaces/main/reviews";
import { Button } from "@/components/ui/button";

export function ReviewsHeader({
  title,
  description,
  actionLabel,
  onActionClick,
}: ReviewsHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <div>
        <h1 className="text-[24px] font-bold tracking-[0.015em] text-dark">{title}</h1>
        <p className="mt-1 text-sm font-medium text-gray">{description}</p>
      </div>

      <Button
        type="button"
        variant="ghost"
        className="inline-flex h-10 items-center gap-2 self-start rounded-full bg-primary px-5 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
        onClick={onActionClick}
      >
        <MessageSquarePlus className="size-4" strokeWidth={2.1} />
        {actionLabel}
      </Button>
    </div>
  );
}
