"use client";

import { Shimmer } from "@/components/ui/shimmer";

export function ContactInfoSkeleton() {
  return (
    <div className="px-6 py-6 md:px-8">
      <div className="rounded-[24px] border border-primary/20 bg-background px-5 py-5 md:px-6">
        <div className="grid gap-5 md:grid-cols-2">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <Shimmer className="h-6 w-32 rounded-md" />
              <Shimmer className="h-[58px] w-full rounded-[8px]" />
            </div>
          ))}
        </div>

        <div className="mt-4 space-y-2">
          <Shimmer className="h-6 w-28 rounded-md" />
          <Shimmer className="h-[58px] w-full rounded-[8px]" />
        </div>
      </div>

      <div className="mt-9 flex justify-end">
        <Shimmer className="h-[54px] w-[202px] rounded-[8px]" />
      </div>
    </div>
  );
}
