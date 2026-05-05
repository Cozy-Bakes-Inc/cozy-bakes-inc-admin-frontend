import { Shimmer } from "@/components/ui/shimmer";

export function CategoriesTableShimmer() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/10 bg-white">
      <div className="space-y-3 p-4 md:p-5">
        <Shimmer className="h-12 w-full rounded-lg" />
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-[120px_64px_1fr_2fr_140px] items-center gap-4"
          >
            <Shimmer className="h-5 rounded-md" />
            <Shimmer className="size-[50px] rounded-lg" />
            <Shimmer className="h-5 rounded-md" />
            <Shimmer className="h-4 rounded-md" />
            <div className="flex justify-center gap-2">
              <Shimmer className="size-9 rounded-lg" />
              <Shimmer className="size-9 rounded-lg" />
              <Shimmer className="size-9 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
