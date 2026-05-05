import { Shimmer } from "@/components/ui/shimmer";

export function CategoriesCardGridShimmer() {
  return (
    <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="rounded-[20px] border border-border/10 bg-white p-4 shadow-[0_18px_35px_rgba(61,44,30,0.05)]"
        >
          <div className="mb-4 flex items-start gap-4">
            <Shimmer className="size-[78px] rounded-2xl" />
            <div className="min-w-0 flex-1 space-y-3">
              <Shimmer className="h-4 w-24 rounded-md" />
              <Shimmer className="h-6 w-36 rounded-md" />
            </div>
          </div>
          <div className="space-y-2">
            <Shimmer className="h-4 w-full rounded-md" />
            <Shimmer className="h-4 w-4/5 rounded-md" />
          </div>
          <div className="mt-5 flex justify-end gap-2">
            <Shimmer className="size-9 rounded-lg" />
            <Shimmer className="size-9 rounded-lg" />
            <Shimmer className="size-9 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}
