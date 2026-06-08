export function MenuCardGridShimmer() {
  return (
    <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="rounded-2xl border border-border/10 bg-white p-5"
        >
          <div className="mb-3 h-5 w-40 animate-pulse rounded-full bg-bg-creamy" />
          <div className="mb-5 space-y-2">
            <div className="h-3 w-full animate-pulse rounded-full bg-bg-creamy" />
            <div className="h-3 w-3/4 animate-pulse rounded-full bg-bg-creamy" />
          </div>
          <div className="mb-4 h-7 w-20 animate-pulse rounded-full bg-bg-creamy" />
          <div className="flex items-center justify-end gap-2 pt-2">
            <div className="size-10 animate-pulse rounded-xl bg-bg-creamy" />
            <div className="size-10 animate-pulse rounded-xl bg-bg-creamy" />
            <div className="size-10 animate-pulse rounded-xl bg-bg-creamy" />
          </div>
        </div>
      ))}
    </div>
  );
}
