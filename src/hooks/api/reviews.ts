import {
  reviewListAPI,
  reviewSettingsAPI,
  reviewStatsAPI,
  reviewStatusStatsAPI,
  singleReviewAPI,
} from "@/services/queries";
import { useCustomQuery } from "..";
import { ReviewListApiSortOption, ReviewListApiStatus } from "@/types";

export function useReviewStats() {
  return useCustomQuery(["reviewStats"], reviewStatsAPI);
}

export function useReviewSettings() {
  return useCustomQuery(["reviewSettings"], reviewSettingsAPI);
}

export function useReviewStatusStats() {
  return useCustomQuery(["reviewStatusStats"], reviewStatusStatsAPI);
}

export function useReviewList(
  page: number,
  sort: ReviewListApiSortOption = "newest",
  status: ReviewListApiStatus = "all",
) {
  return useCustomQuery(["reviews", page, sort, status], () =>
    reviewListAPI(sort, status, page),
  );
}

export function useSingleReview(slug: string) {
  return useCustomQuery(["singleReview", slug], () => singleReviewAPI(slug), {
    enabled: Boolean(slug),
  });
}
