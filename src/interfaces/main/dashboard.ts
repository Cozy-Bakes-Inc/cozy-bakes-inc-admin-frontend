import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import type { PaginatedApiResponse } from "@/interfaces/pagination";
import type {
  DashboardActionIcon,
  DashboardCategoryTone,
  DashboardOrderStatus,
  DashboardStatTone,
} from "@/types/main/dashboard";

export interface DashboardStat {
  title: string;
  value: string;
  note: string;
  trend: string;
  icon: LucideIcon;
  tone: DashboardStatTone;
}

export interface SalesPoint {
  day: string;
  value: number;
}

export interface CategoryShare {
  name: string;
  value: number;
  tone: DashboardCategoryTone;
}

export interface RecentOrder {
  id: string;
  customer: string;
  items: number;
  timeAgo: string;
  amount: string;
  status: DashboardOrderStatus;
}

export interface TopProduct {
  rank: number;
  name: string;
  sold: number;
  growth: string;
  revenue: string;
}

export interface DashboardAction {
  label: string;
  icon: DashboardActionIcon;
  filled: boolean;
}

export interface DashboardSectionCardProps {
  title: string;
  description: string;
  actionLabel?: string;
  className?: string;
  children: ReactNode;
}

export interface DashboardProductThumbProps {
  label: string;
  className?: string;
}

export interface DashboardStatCardProps {
  stat: DashboardStat;
}

export interface DashboardSummaryAmountMetric {
  amount: number;
  percentage: number;
}

export interface DashboardSummaryCountMetric {
  count: number;
  percentage: number;
}

export interface DashboardSummaryData {
  revenue_today: DashboardSummaryAmountMetric;
  total_orders: DashboardSummaryCountMetric;
  pending_orders: DashboardSummaryCountMetric;
  delivered_today: DashboardSummaryCountMetric;
}

export interface DashboardSummaryApiResponse {
  status: string;
  data: DashboardSummaryData;
}

export interface DashboardSalesOverview {
  labels: string[];
  revenues: number[];
}

export interface DashboardSalesByCategory {
  labels: string[];
  percentages: number[];
}

export interface DashboardChartsData {
  sales_overview: DashboardSalesOverview;
  sales_by_category: DashboardSalesByCategory;
}

export interface DashboardChartsApiResponse {
  status: string;
  data: DashboardChartsData;
}

export interface DashboardTopProductItem {
  id: number;
  title: string;
  current_revenue: string;
  last_revenue: string;
  total_revenue: string;
  growth_percentage: number;
}

export type DashboardTopProductsApiResponse =
  PaginatedApiResponse<DashboardTopProductItem>;

