import { PackageSearch } from "lucide-react";

interface ProductEmptyStateProps {
  searchValue: string;
}

export function ProductEmptyState({ searchValue }: ProductEmptyStateProps) {
  const hasSearchValue = searchValue.trim().length > 0;

  return (
    <div className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-border/10 bg-white px-6 py-10 text-center">
      <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <PackageSearch className="size-7" strokeWidth={2.1} />
      </span>

      <h2 className="mt-4 text-xl font-semibold text-dark">
        No products found
      </h2>

      <p className="mt-2 max-w-md text-sm font-medium leading-6 text-muted-text">
        {hasSearchValue
          ? `No product matches "${searchValue.trim()}". Try a different product name, category, or description keyword.`
          : "There are no products yet. Add your first product to start managing your bakery menu."}
      </p>
    </div>
  );
}
