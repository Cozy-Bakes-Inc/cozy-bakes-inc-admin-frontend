import type {
  ReviewSettingsResponse,
  ReviewListResponse,
  ReviewStatusStatsResponse,
  ReviewsStatsResponse,
  SingleReviewResponse,
} from "@/interfaces";
import { baseAPI } from "..";
import { PAGE_SIZE } from "@/constants";
import { ReviewListApiSortOption, ReviewListApiStatus } from "@/types";

export const reviewStatsAPI = async () =>
  await baseAPI<ReviewsStatsResponse>("GET", `/review/stats`);

export const reviewSettingsAPI = async () =>
  await baseAPI<ReviewSettingsResponse>("GET", `/review/settings`);

export const reviewStatusStatsAPI = async () =>
  await baseAPI<ReviewStatusStatsResponse>("GET", `/review/status-stats`);

export const reviewListAPI = async (
  sort: ReviewListApiSortOption = "newest",
  status: ReviewListApiStatus = "all",
  page: number,
) =>
  await baseAPI<ReviewListResponse>(
    "GET",
    `/review/list?sort=${sort}&status=${status}&page=${page}&per_page=${PAGE_SIZE}`,
  );

export const singleReviewAPI = async (slug: string) =>
  await baseAPI<SingleReviewResponse>("GET", `/review/${slug}/view`);
