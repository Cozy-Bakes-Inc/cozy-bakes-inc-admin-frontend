import { Shimmer } from "@/components/ui/shimmer";

export function PickupLocationsTableShimmer() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/10 bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-[1080px] border-separate border-spacing-0 xl:min-w-full">
          <thead>
            <tr className="bg-bg-creamy">
              <th className="w-[112px] px-4 py-5 text-left md:px-5">
                <Shimmer className="h-5 w-16 rounded-md" />
              </th>
              <th className="w-[220px] px-4 py-5 text-left md:px-5">
                <Shimmer className="h-5 w-24 rounded-md" />
              </th>
              <th className="w-[280px] px-4 py-5 text-left md:px-5">
                <Shimmer className="h-5 w-24 rounded-md" />
              </th>
              <th className="w-[220px] px-4 py-5 text-left md:px-5">
                <Shimmer className="h-5 w-24 rounded-md" />
              </th>
              <th className="w-[120px] px-4 py-5 md:px-5">
                <Shimmer className="mx-auto h-5 w-20 rounded-md" />
              </th>
              <th className="w-[156px] px-4 py-5 md:px-5">
                <Shimmer className="mx-auto h-5 w-20 rounded-md" />
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({
              length: 3,
            }).map((_, index) => (
              <tr key={index} className="bg-[rgba(250,248,243,0.08)]">
                <td className="w-[112px] border-b border-border/15 px-4 py-4 align-middle md:px-5">
                  <Shimmer className="h-5 w-20 rounded-md" />
                </td>
                <td className="w-[220px] border-b border-border/15 px-4 py-4 md:px-5">
                  <div className="space-y-2">
                    <Shimmer className="h-5 w-[160px] rounded-md" />
                    <Shimmer className="h-3 w-[104px] rounded-md" />
                  </div>
                </td>
                <td className="w-[280px] border-b border-border/15 px-4 py-4 md:px-5">
                  <div className="space-y-2">
                    <Shimmer className="h-4 w-[240px] rounded-md" />
                    <Shimmer className="h-4 w-[180px] rounded-md" />
                  </div>
                </td>
                <td className="w-[220px] border-b border-border/15 px-4 py-4 md:px-5">
                  <div className="space-y-2">
                    <Shimmer className="h-4 w-[128px] rounded-md" />
                    <Shimmer className="h-4 w-[176px] rounded-md" />
                  </div>
                </td>
                <td className="w-[120px] border-b border-border/15 px-4 py-4 md:px-5">
                  <Shimmer className="mx-auto h-9 w-[92px] rounded-[10px]" />
                </td>
                <td className="w-[156px] border-b border-border/15 px-4 py-4 md:px-5">
                  <div className="flex justify-center gap-2">
                    <Shimmer className="size-9 rounded-lg" />
                    <Shimmer className="size-9 rounded-lg" />
                    <Shimmer className="size-9 rounded-lg" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
