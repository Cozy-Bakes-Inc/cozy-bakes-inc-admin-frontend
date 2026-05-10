export function ProductCardGridShimmer() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="rounded-2xl border border-border/10 bg-white p-4"
        >
          <div className="h-40 w-full animate-pulse rounded-xl bg-bg-creamy" />

          <div className="mt-4 space-y-3">
            <div className="h-5 w-40 animate-pulse rounded-full bg-bg-creamy" />

            <div className="space-y-2">
              <div className="h-3 w-full animate-pulse rounded-full bg-bg-creamy" />
              <div className="h-3 w-3/4 animate-pulse rounded-full bg-bg-creamy" />
            </div>

            <div className="h-4 w-32 animate-pulse rounded-full bg-bg-creamy" />
            <div className="h-4 w-24 animate-pulse rounded-full bg-bg-creamy" />

            <div className="flex items-center gap-2 pt-2">
              <div className="h-10 w-20 animate-pulse rounded-xl bg-bg-creamy" />
              <div className="h-10 w-20 animate-pulse rounded-xl bg-bg-creamy" />
              <div className="h-10 w-20 animate-pulse rounded-xl bg-bg-creamy" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
