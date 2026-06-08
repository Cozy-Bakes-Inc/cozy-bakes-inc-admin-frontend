export function MenuTableShimmer() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/10 bg-white">
      <table className="w-full">
        <thead className="bg-bg-creamy/50">
          <tr>
            {["Title", "Description", "Status", "Actions"].map((h) => (
              <th
                key={h}
                className="px-5 py-5 text-left font-semibold text-primary"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: 4 }).map((_, index) => (
            <tr key={index} className="border-t border-border/10">
              <td className="px-5 py-5">
                <div className="h-4 w-36 animate-pulse rounded-full bg-bg-creamy" />
              </td>
              <td className="px-5 py-5">
                <div className="h-4 w-48 animate-pulse rounded-full bg-bg-creamy" />
              </td>
              <td className="px-5 py-5">
                <div className="h-7 w-20 animate-pulse rounded-full bg-bg-creamy" />
              </td>
              <td className="px-5 py-5">
                <div className="flex items-center gap-2">
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
  );
}
