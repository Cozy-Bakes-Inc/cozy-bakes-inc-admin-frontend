import { useReviewStats } from "@/hooks/api/reviews";
import type {
  ReviewMetric,
  ReviewsStatsData,
  ReviewsSummaryGridProps,
} from "@/interfaces/main/reviews";
import { Shimmer } from "@/components/ui/shimmer";
import { ReviewsSummaryCard } from "./reviews-summary-card";

function buildSummaryMetrics(
  metrics: ReviewMetric[],
  stats?: ReviewsStatsData,
): ReviewMetric[] {
  if (!stats) {
    return metrics.map((metric) => ({
      ...metric,
      value: metric.icon === "rating" ? "0.0" : "0",
      subtitle: "No data yet",
      trendLabel: metric.icon === "reviews" ? "0%" : undefined,
      ratingValue: metric.icon === "rating" ? 0 : undefined,
    }));
  }

  return metrics.map((metric) => {
    switch (metric.icon) {
      case "reviews":
        return {
          ...metric,
          value: String(stats.total_reviews.count),
          subtitle:
            stats.total_reviews.count > 0
              ? "last update today"
              : "No reviews yet",
          trendLabel: `${stats.total_reviews.change_percentage}%`,
        };
      case "rating":
        return {
          ...metric,
          value: stats.average_rating.toFixed(1),
          subtitle:
            stats.average_rating > 0 ? "last update today" : "No ratings yet",
          ratingValue: stats.average_rating,
        };
      case "pending":
        return {
          ...metric,
          value: String(stats.pending_reviews),
          subtitle:
            stats.pending_reviews > 0
              ? "awaiting moderation"
              : "Nothing pending",
        };
      case "hidden":
        return {
          ...metric,
          value: String(stats.hidden_reviews),
          subtitle:
            stats.hidden_reviews > 0 ? "currently hidden" : "Nothing hidden",
        };
      default:
        return metric;
    }
  });
}

export function ReviewsSummaryGrid({ metrics }: ReviewsSummaryGridProps) {
  const { data, isLoading } = useReviewStats();
  const reviewStats = data?.data;

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-border/20 bg-background p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
          >
            <div className="flex items-start justify-between gap-3">
              <Shimmer className="size-14 rounded-2xl" />
              <Shimmer className="h-7 w-16 rounded-full" />
            </div>

            <div className="mt-6 space-y-2">
              <Shimmer className="h-4 w-28 rounded-md" />
              <Shimmer className="h-10 w-16 rounded-md" />
              <Shimmer className="h-4 w-24 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  const summaryMetrics = buildSummaryMetrics(metrics, reviewStats);

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {summaryMetrics.map((metric) => (
        <ReviewsSummaryCard key={metric.label} metric={metric} />
      ))}
    </div>
  );
}
