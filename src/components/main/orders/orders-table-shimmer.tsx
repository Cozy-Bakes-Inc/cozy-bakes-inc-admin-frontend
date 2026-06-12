import { Shimmer } from "@/components/ui/shimmer";

export function OrdersTableShimmer() {
  return (
    <div className="overflow-hidden rounded-[12px] border border-border/15 bg-white">
      <div className="overflow-x-auto">
        <div className="min-w-[1084px]">
          <div className="grid grid-cols-7 gap-4 bg-[#FBF8EB] px-5 py-5">
            {Array.from({ length: 3 }).map((_, index) => (
              <Shimmer key={index} className="h-5 w-20 rounded-xl" />
            ))}
          </div>

          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-7 gap-4 border-b border-border/15 px-5 py-4"
            >
              <Shimmer className="h-5 w-24 rounded-xl" />
              <div className="space-y-2">
                <Shimmer className="h-5 w-28 rounded-xl" />
                <Shimmer className="h-4 w-32 rounded-xl" />
              </div>
              <Shimmer className="h-5 w-16 rounded-xl" />
              <Shimmer className="h-5 w-20 rounded-xl" />
              <Shimmer className="h-8 w-24 rounded-full" />
              <div className="space-y-2">
                <Shimmer className="h-5 w-24 rounded-xl" />
                <Shimmer className="h-4 w-16 rounded-xl" />
              </div>
              <div className="flex items-center justify-center gap-2">
                <Shimmer className="size-11 rounded-[10px]" />
                <Shimmer className="size-11 rounded-[10px]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
