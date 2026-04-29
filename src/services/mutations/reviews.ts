"use server";

import type {
  ReviewSettingsResponse,
  SingleReviewResponse,
  ReviewPayload,
  UpdateReviewSettingsPayload,
} from "@/interfaces";
import { safeApi } from "..";

export const createReview = async (payload: ReviewPayload) =>
  await safeApi<SingleReviewResponse>("POST", `/review/create`, payload);

export const updateReview = async (slug: string, payload: ReviewPayload) =>
  await safeApi<SingleReviewResponse>("POST", `/review/${slug}/update`, payload);

export const deleteReviewAPI = async (slug: string) =>
  await safeApi("DELETE", `/review/${slug}/delete`);

export const updateReviewSettings = async (
  payload: UpdateReviewSettingsPayload,
) => await safeApi<ReviewSettingsResponse>("POST", "/review/settings", payload);
