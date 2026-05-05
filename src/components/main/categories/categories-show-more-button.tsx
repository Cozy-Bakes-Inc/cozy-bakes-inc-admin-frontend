import { Button } from "@/components/ui/button";

interface CategoriesShowMoreButtonProps {
  isFetchingNextPage: boolean;
  onClick: () => void;
}

export function CategoriesShowMoreButton({
  isFetchingNextPage,
  onClick,
}: CategoriesShowMoreButtonProps) {
  return (
    <div className="flex justify-center pt-2">
      <Button
        type="button"
        onClick={onClick}
        disabled={isFetchingNextPage}
        className="rounded-full bg-primary px-6 text-sm font-semibold text-white hover:bg-primary/90"
      >
        {isFetchingNextPage ? "Loading categories..." : "Show More"}
      </Button>
    </div>
  );
}
