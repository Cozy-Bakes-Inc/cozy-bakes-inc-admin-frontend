import { ChevronLeft, ChevronRight } from "lucide-react";
import type { CustomersPaginationProps } from "@/interfaces/main/customers";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function buildPageNumbers(currentPage: number, lastPage: number) {
  const start = Math.max(1, Math.min(currentPage - 2, lastPage - 4));
  const end = Math.min(lastPage, start + 4);

  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

export function CustomersPagination({
  currentPage,
  lastPage,
  onPageChange,
}: CustomersPaginationProps) {
  if (lastPage <= 1) {
    return null;
  }

  const pages = buildPageNumbers(currentPage, lastPage);

  return (
    <div className="inline-flex max-w-full items-center gap-2 rounded-[15px] border border-border/10 bg-bg-creamy/32 px-3 py-3 sm:gap-4 sm:px-5 sm:py-3.5">
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label="Previous page"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="text-primary hover:bg-transparent"
      >
        <ChevronLeft className="size-4" strokeWidth={2.2} />
      </Button>

      <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
        {pages.map((page) => {
          const isActive = page === currentPage;

          return (
            <Button
              key={page}
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={`Go to page ${page}`}
              onClick={() => onPageChange(page)}
              className={cn(
                "inline-flex size-7 items-center justify-center rounded-full text-xs font-medium text-dark sm:size-8",
                isActive && "bg-primary text-white",
              )}
            >
              {page}
            </Button>
          );
        })}
      </div>

      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label="Next page"
        disabled={currentPage >= lastPage}
        onClick={() => onPageChange(currentPage + 1)}
        className="text-primary hover:bg-transparent"
      >
        <ChevronRight className="size-4" strokeWidth={2.2} />
      </Button>
    </div>
  );
}
