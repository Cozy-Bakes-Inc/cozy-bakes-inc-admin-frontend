import { Shimmer } from "@/components/ui/shimmer";

export function ViewCategoryShimmer() {
  return (
    <div className="px-7 py-3 pb-6">
      <div className="space-y-5">
        <Shimmer className="size-[125px] rounded-[12px]" />

        <div className="space-y-1.5">
          <Shimmer className="h-6 w-14 rounded-lg" />
          <Shimmer className="h-[38px] w-full rounded-[6px]" />
        </div>

        <div className="space-y-1.5">
          <Shimmer className="h-6 w-24 rounded-lg" />
          <Shimmer className="h-[92px] w-full rounded-[6px]" />
        </div>
      </div>
    </div>
  );
}
