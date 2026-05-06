import { Shimmer } from "@/components/ui/shimmer";

export function UpdateCategoryFormShimmer() {
  return (
    <div className="flex min-h-0 max-w-full flex-col overflow-x-hidden">
      <div className="max-w-full px-4 py-5 sm:px-6 md:px-8 md:py-6">
        <div className="rounded-[24px] border border-primary/20 bg-background px-5 py-5 md:px-6 md:py-6">
          <div className="space-y-5">
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="space-y-2">
                <Shimmer className="h-6 w-28 rounded-lg" />
                <Shimmer
                  className={
                    index === 0
                      ? "h-[56px] w-full rounded-[10px]"
                      : "h-[128px] w-full rounded-[10px]"
                  }
                />
              </div>
            ))}

            <div className="space-y-2">
              <Shimmer className="h-6 w-20 rounded-lg" />
              <Shimmer className="h-[150px] w-full rounded-[24px]" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-3 border-t border-[#E4E7EC] px-4 py-4 sm:flex sm:justify-end sm:gap-4 sm:px-6 md:px-8">
        <Shimmer className="h-[48px] w-full rounded-[8px] sm:w-[140px]" />
        <Shimmer className="h-[48px] w-full rounded-[8px] sm:w-[176px]" />
      </div>
    </div>
  );
}
