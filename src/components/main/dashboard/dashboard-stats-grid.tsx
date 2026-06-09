"use client";

import { DashboardStatCard } from "./dashboard-stat-card";
import { useSummaryDataSets } from "@/hooks/api";
import { buildDashboardStats } from "@/lib";
import { GridShimmer } from "@/components/ui/shimmer";

export function DashboardStatsGrid() {
  const { data, isLoading } = useSummaryDataSets();
  const stats = buildDashboardStats(data?.data);

  return (
    <section
      className={isLoading ? "" : "grid gap-4 md:grid-cols-2 2xl:grid-cols-4"}
    >
      {isLoading ? (
        <GridShimmer
          count={4}
          className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4 mt-0"
          cardClassName="h-32"
        />
      ) : (
        stats.map((stat) => <DashboardStatCard key={stat.title} stat={stat} />)
      )}
    </section>
  );
}
