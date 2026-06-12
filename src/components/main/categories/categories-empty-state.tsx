import { SearchX } from "lucide-react";

interface CategoriesEmptyStateProps {
  searchValue: string;
}

export function CategoriesEmptyState({
  searchValue,
}: CategoriesEmptyStateProps) {
  const trimmedSearchValue = searchValue.trim();

  return (
    <div className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-border/10 bg-white px-6 py-10 text-center">
      <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <SearchX className="size-7" strokeWidth={2.1} />
      </span>
      <h2 className="mt-4 text-xl font-semibold text-dark">
        No categories found
      </h2>
      <p className="mt-2 max-w-md text-sm font-medium leading-6 text-muted-text">
        {trimmedSearchValue
          ? `No category matches "${trimmedSearchValue}". Try a different name, category ID, or description keyword.`
          : "Try a different name, category ID, or description keyword."}
      </p>
    </div>
  );
}
