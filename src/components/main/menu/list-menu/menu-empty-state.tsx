import { BookOpen } from "lucide-react";

interface MenuEmptyStateProps {
  searchValue: string;
}

export function MenuEmptyState({ searchValue }: MenuEmptyStateProps) {
  const hasSearchValue = searchValue.trim().length > 0;

  return (
    <div className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-border/10 bg-white px-6 py-10 text-center">
      <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <BookOpen className="size-7" strokeWidth={2.1} />
      </span>

      <h2 className="mt-4 text-xl font-semibold text-dark">No menus found</h2>

      <p className="mt-2 max-w-md text-sm font-medium leading-6 text-muted-text">
        {hasSearchValue
          ? `No menu matches "${searchValue.trim()}". Try a different title or description keyword.`
          : "There are no menus yet. Add your first menu to start managing your bakery menus."}
      </p>
    </div>
  );
}
