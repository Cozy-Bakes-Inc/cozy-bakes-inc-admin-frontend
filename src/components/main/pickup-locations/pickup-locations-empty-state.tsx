import { SearchX } from "lucide-react";

interface PickupLocationsEmptyStateProps {
  searchValue: string;
}

export function PickupLocationsEmptyState({
  searchValue,
}: PickupLocationsEmptyStateProps) {
  const hasSearch = searchValue.trim().length > 0;

  return (
    <div className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-border/10 bg-white px-6 py-10 text-center">
      <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <SearchX className="size-7" strokeWidth={2.1} />
      </span>
      <h2 className="mt-4 text-xl font-semibold text-dark">
        No pickup locations found
      </h2>
      <p className="mt-2 max-w-md text-sm font-medium leading-6 text-muted-text">
        {hasSearch
          ? `No pickup location matches "${searchValue.trim()}". Try a different name, email, phone, or address keyword.`
          : "Add your first pickup location to make it available for orders."}
      </p>
    </div>
  );
}
