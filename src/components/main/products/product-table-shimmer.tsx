export function ProductTableShimmer() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/10 bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0">
          <thead className="bg-bg-creamy">
            <tr>
              <th className="px-4 py-5 md:px-5">
                <div className="h-4 w-12 animate-pulse rounded-full bg-bg-creamy/80" />
              </th>
              <th className="px-4 py-5 md:px-5">
                <div className="h-4 w-16 animate-pulse rounded-full bg-bg-creamy/80" />
              </th>
              <th className="px-4 py-5 md:px-5">
                <div className="h-4 w-20 animate-pulse rounded-full bg-bg-creamy/80" />
              </th>
              <th className="px-4 py-5 md:px-5">
                <div className="h-4 w-12 animate-pulse rounded-full bg-bg-creamy/80" />
              </th>
              <th className="px-4 py-5 md:px-5">
                <div className="h-4 w-16 animate-pulse rounded-full bg-bg-creamy/80" />
              </th>
            </tr>
          </thead>

          <tbody>
            {Array.from({ length: 4 }).map((_, index) => (
              <tr key={index} className="bg-[rgba(250,248,243,0.08)]">
                <td className="border-b border-border/15 px-4 py-4 align-middle md:px-5">
                  <div className="size-12.5 animate-pulse rounded-lg bg-bg-creamy" />
                </td>

                <td className="border-b border-border/15 px-4 py-4 align-middle md:px-5">
                  <div className="h-4 w-32 animate-pulse rounded-full bg-bg-creamy" />
                </td>

                <td className="border-b border-border/15 px-4 py-4 align-middle md:px-5">
                  <div className="h-4 w-28 animate-pulse rounded-full bg-bg-creamy" />
                </td>

                <td className="border-b border-border/15 px-4 py-4 align-middle md:px-5">
                  <div className="h-4 w-20 animate-pulse rounded-full bg-bg-creamy" />
                </td>

                <td className="border-b border-border/15 px-4 py-4 align-middle md:px-5">
                  <div className="flex items-center justify-center gap-2">
                    <div className="size-10 animate-pulse rounded-xl bg-bg-creamy" />
                    <div className="size-10 animate-pulse rounded-xl bg-bg-creamy" />
                    <div className="size-10 animate-pulse rounded-xl bg-bg-creamy" />
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
