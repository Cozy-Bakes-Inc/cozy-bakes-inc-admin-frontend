import { Shimmer } from "@/components/ui/shimmer";

export function OrdersCardGridShimmer() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-[16px] border border-border/15 bg-white p-5 shadow-[0_16px_36px_rgba(209,150,40,0.08)]"
        >
          <div className="space-y-3 border-b border-border/10 pb-5">
            <Shimmer className="h-6 w-32 rounded-xl" />
            <Shimmer className="h-4 w-24 rounded-xl" />
          </div>

          <div className="flex items-center gap-2 border-b border-border/10 py-5">
            {Array.from({ length: 4 }).map((_, stepIndex) => (
              <div key={stepIndex} className="flex flex-1 items-center gap-2">
                <Shimmer className="size-10 rounded-full" />
                {stepIndex < 3 ? (
                  <Shimmer className="h-1 flex-1 rounded-full" />
                ) : null}
              </div>
            ))}
          </div>

          <div className="space-y-4 py-5">
            <Shimmer className="h-4 w-24 rounded-xl" />
            <Shimmer className="h-5 w-full rounded-xl" />
            <Shimmer className="h-4 w-40 rounded-xl" />
            <div className="flex items-center justify-between border-y border-border/10 py-3">
              <Shimmer className="h-4 w-24 rounded-xl" />
              <Shimmer className="h-6 w-20 rounded-xl" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Shimmer className="h-11 flex-1 rounded-[8px]" />
            <Shimmer className="size-11 rounded-[8px]" />
          </div>
        </div>
      ))}
    </div>
  );
}
