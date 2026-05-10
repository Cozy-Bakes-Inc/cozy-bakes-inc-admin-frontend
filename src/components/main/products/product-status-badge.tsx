interface ProductStatusBadgeProps {
  status: number;
}

export function ProductStatusBadge({ status }: ProductStatusBadgeProps) {
  const isActive = status === 1;

  return (
    <span
      className={
        isActive
          ? "rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700"
          : "rounded-full bg-red-50 px-3 py-1 text-sm font-medium text-red-700"
      }
    >
      {isActive ? "Active" : "Inactive"}
    </span>
  );
}
