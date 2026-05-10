import { Loader2 } from "lucide-react";

interface ProductShowMoreButtonProps {
  isFetchingNextPage: boolean;
  onClick: () => void;
}

export function ProductShowMoreButton({
  isFetchingNextPage,
  onClick,
}: ProductShowMoreButtonProps) {
  return (
    <div className="flex justify-center pt-2">
      <button
        type="button"
        onClick={onClick}
        disabled={isFetchingNextPage}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isFetchingNextPage ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Loading...
          </>
        ) : (
          "Show More"
        )}
      </button>
    </div>
  );
}
