import {
  reviewListAPI,
  reviewSettingsAPI,
  reviewStatsAPI,
  reviewStatusStatsAPI,
  singleReviewAPI,
} from "@/services/queries";
import { useCustomInfiniteQuery, useCustomQuery } from "..";
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
  sort: ReviewListApiSortOption = "newest",
  status: ReviewListApiStatus = "all",
) {
  return useCustomInfiniteQuery(
    ["reviews", sort, status],
    async ({ pageParam = 1 }) => {
      return reviewListAPI(sort, status, pageParam);
    },
    {
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        const pagination = lastPage?.data;
        if (!pagination) return undefined;
        if (
          pagination.next_page_url &&
          pagination.current_page < pagination.last_page
        ) {
          return pagination.current_page + 1;
        }
        return undefined;
      },
    },
  );
}

export function useSingleReview(slug: string) {
  return useCustomQuery(["singleReview", slug], () => singleReviewAPI(slug), {
    enabled: Boolean(slug),
  });
}
