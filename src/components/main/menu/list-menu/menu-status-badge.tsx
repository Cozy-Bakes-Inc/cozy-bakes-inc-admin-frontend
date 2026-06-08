import { cn } from "@/lib";

interface MenuStatusBadgeProps {
  isActive: 0 | 1;
}

export function MenuStatusBadge({ isActive }: MenuStatusBadgeProps) {
  const active = isActive === 1;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500",
      )}
    >
      {active ? "Active" : "Inactive"}
    </span>
  );
}
