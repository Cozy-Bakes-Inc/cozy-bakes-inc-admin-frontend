import { Shimmer } from "@/components/ui/shimmer";

export function ProductDetailsShimmer() {
  return (
    <div className="max-w-full space-y-5 px-4 py-5 sm:px-6 md:space-y-6 md:px-8 md:py-6">
      <div className="grid gap-5 md:grid-cols-[360px_1fr]">
        <Shimmer className="aspect-[4/3] min-h-[220px] rounded-[10px]" />
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <Shimmer key={index} className="h-[78px] rounded-[8px]" />
            ))}
          </div>
          <Shimmer className="h-[132px] rounded-[8px]" />
        </div>
      </div>

      <div className="border-t border-[#E4E7EC] pt-6">
        <Shimmer className="mb-3 h-6 w-28 rounded-[8px]" />
        <div className="grid gap-3 md:grid-cols-2">
          {Array.from({ length: 2 }).map((_, index) => (
            <Shimmer key={index} className="h-[108px] rounded-[8px]" />
          ))}
        </div>
      </div>

      <Shimmer className="h-[94px] rounded-[8px]" />
      <Shimmer className="h-[112px] rounded-[8px]" />
      <Shimmer className="h-[112px] rounded-[8px]" />
    </div>
  );
}

