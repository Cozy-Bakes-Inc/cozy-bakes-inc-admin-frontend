import { cn } from "@/lib";

interface PickupLocationStatusBadgeProps {
  isActive: number | boolean;
}

export function PickupLocationStatusBadge({
  isActive,
}: PickupLocationStatusBadgeProps) {
  const active = Boolean(isActive);

  return (
    <span
      className={cn(
        "inline-flex min-h-9 min-w-[92px] items-center justify-center rounded-[10px] px-3 py-2 text-xs font-semibold",
        active ? "bg-[#ecfdf3] text-[#12b76a]" : "bg-[#fffbfa] text-[#f04438]",
      )}
    >
      {active ? "Active" : "Inactive"}
    </span>
  );
}
