import type { ReactNode } from "react";
import type {
  ReviewFilter,
  ReviewListApiSortOption,
  ReviewListApiStatus,
  ReviewMetricIcon,
  ReviewMetricTrendTone,
  ReviewModerationControlType,
  ReviewStatus,
  ReviewStatusTone,
} from "@/types/main/reviews";

export interface ReviewsWorkspaceConfig {
  ariaLabel: string;
  title: string;
  description: string;
  primaryActionLabel: string;
}

export interface ReviewsShellProps {
  children: ReactNode;
}

export interface ReviewsHeaderProps {
  title: string;
  description: string;
  actionLabel: string;
  onActionClick?: () => void;
}

export interface ReviewMetric {
  label: string;
  value: string;
  subtitle: string;
  icon: ReviewMetricIcon;
  iconTone: string;
  trendLabel?: string;
  trendTone?: ReviewMetricTrendTone;
  ratingValue?: number;
}

export interface ReviewsSummaryGridProps {
  metrics: ReviewMetric[];
}

export interface ReviewMetricCardProps {
  metric: ReviewMetric;
}

export interface ReviewModerationControl {
  id: string;
  title: string;
  description: string;
  type: ReviewModerationControlType;
  enabled?: boolean;
  value?: string;
}

export interface ReviewsModerationPanelProps {
  controls: ReviewModerationControl[];
}

export interface ReviewFilterOption {
  label: string;
  value: ReviewFilter;
  count: number;
}

export interface ReviewsFilterTabsProps {
  filters: ReviewFilterOption[];
  activeFilter: ReviewFilter;
  onFilterChange: (value: ReviewFilter) => void;
}

export interface ReviewsToolbarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  sortValue: ReviewListApiSortOption;
  onSortChange: (value: ReviewListApiSortOption) => void;
}

export interface ReviewRow {
  id: string;
  slug: string;
  name: string;
  email: string;
  rating: number;
  reviewText: string;
  date: string;
  status: ReviewStatus;
}

export interface ReviewsTableProps {
  rows: ReviewRow[];
  isLoading?: boolean;
  onEditRequest: (row: ReviewRow) => void;
  onDeleteRequest: (row: ReviewRow) => void;
  onViewDetails: (row: ReviewRow) => void;
}

export interface ReviewsStatusBadgeProps {
  status: ReviewStatus;
}

export interface ReviewsRatingBadgeProps {
  rating: number;
}

export interface ReviewStatusMeta {
  tone: ReviewStatusTone;
}

export interface ReviewsTotalReviewsMetric {
  count: number;
  change_percentage: number;
}

export interface ReviewsStatsData {
  total_reviews: ReviewsTotalReviewsMetric;
  average_rating: number;
  pending_reviews: number;
  hidden_reviews: number;
}

export interface ReviewsStatsResponse {
  status: string;
  data: ReviewsStatsData;
}

export interface ReviewSettings {
  id: number;
  auto_approve: number;
  enable_reviews: number;
  show_only_5_star: number;
  minimum_rating: number;
  created_at: string;
  updated_at: string;
}

export interface UpdateReviewSettingsPayload {
  auto_approve?: boolean;
  enable_reviews?: boolean;
  show_only_5_star?: boolean;
  minimum_rating?: number;
}

export interface ReviewSettingsData {
  settings: ReviewSettings;
}

export interface ReviewSettingsResponse {
  status: string;
  data: ReviewSettingsData;
}

export interface ReviewStatusStatsData {
  all: number;
  approved: number;
  pending: number;
  hidden: number;
}

export interface ReviewStatusStatsResponse {
  status: string;
  data: ReviewStatusStatsData;
}

export interface ReviewListItem {
  id: number;
  slug: string;
  customer_name: string;
  customer_email: string;
  rating: number;
  review_text: string;
  date: string | null;
  status: string;
}

export interface ReviewListPaginationLink {
  url: string | null;
  label: string;
  page: number | null;
  active: boolean;
}

export interface ReviewListData {
  current_page: number;
  data: ReviewListItem[];
  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;
  links: ReviewListPaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
}

export interface ReviewListResponse {
  status: string;
  data: ReviewListData;
}

export interface ReviewListQueryParams {
  sort?: ReviewListApiSortOption;
  status?: ReviewListApiStatus;
  page: number;
}

export interface SingleReview {
  id: number;
  customer_name: string;
  customer_email: string;
  rating: number;
  review_text: string;
  status: string;
  date: string | null;
  created_at: string;
}

export interface SingleReviewData {
  review: SingleReview;
}

export interface SingleReviewResponse {
  status: string;
  data: SingleReviewData;
}

export type ReviewPayloadStatus = "approved" | "pending" | "rejected";

export interface ReviewPayload {
  customer_name: string;
  customer_email?: string;
  rating: number;
  review_text?: string;
  status: ReviewPayloadStatus;
}
