import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { FindUsHereSummaryMetricIcon } from "@/types/main/find-us-here";

export interface FindUsHereWorkspaceConfig {
  title: string;
  description: string;
  primaryActionLabel: string;
}

export interface FindUsHereSummaryMetric {
  label: string;
  value: string;
  suffix: string;
  icon: FindUsHereSummaryMetricIcon;
}

export interface FindUsHereMarketLocation {
  id: string;
  title: string;
  badge: string;
  description: string;
  schedule: string;
  endDate?: string;
  address: string;
  mapLink?: string;
  imageSrc?: string;
  imageSrcs?: string[];
  imageAlt: string;
}

export interface FindUsHereMarketDay {
  id: string;
  label: string;
  scheduledSummary: string;
  defaultExpanded?: boolean;
  locations: FindUsHereMarketLocation[];
}

export interface FindUsHereHeaderProps {
  title: string;
  description: string;
  primaryActionLabel: string;
  onPrimaryActionClick?: () => void;
}

export interface FindUsHereSummaryGridProps {
  metrics: FindUsHereSummaryMetric[];
}

export interface FindUsHereSummaryCardProps {
  metric: FindUsHereSummaryMetric;
}

export interface MarketDashboardStatsData {
  total_markets: number;
  active_days: number;
  markets_this_week: number;
  avg_markets_per_day: number;
}

export interface MarketDashboardStatsResponse {
  status: string;
  data: MarketDashboardStatsData;
}

export interface FindUsHereMarketApiItem {
  id: number;
  slug: string;
  market_name: string;
  tag_label: string;
  date: string;
  end_date?: string | null;
  day: string | string[];
  time: string;
  end_time?: string | null;
  location_address: string;
  map_link?: string;
  description: string;
  cover_images: string[];
  created_at: string;
  updated_at: string;
}

export interface FindUsHereSingleMarketApiItem
  extends FindUsHereMarketApiItem {
  is_day_correct: boolean;
  correct_day: string;
  day_match_status: string;
  is_upcoming: boolean;
  is_past: boolean;
}

export interface FindUsHereMarketDayApiItem {
  day: string;
  total_markets: number;
  markets: FindUsHereMarketApiItem[];
}

export interface FindUsHereMarketsResponse {
  status: string;
  data: FindUsHereMarketDayApiItem[];
}

export interface FindUsHereSingleMarketResponse {
  status: string;
  data: FindUsHereSingleMarketApiItem;
}

export interface FindUsHereDaySectionProps {
  day: FindUsHereMarketDay;
  expanded: boolean;
  onToggle: (dayId: string) => void;
}

export interface FindUsHereMarketCardProps {
  location: FindUsHereMarketLocation;
}

export interface FindUsHereActionButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger";
  buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
}
