import type { ReactNode } from "react";
import type {
  CustomerMetricIconTone,
  CustomerMetricTrendTone,
  CustomerSegmentFilter,
  CustomerSortOption,
  CustomerStatus,
  CustomerStatusTone,
  CustomersCanvasVariant,
} from "@/types/main/customers";

export interface CustomersWorkspaceConfig {
  ariaLabel: string;
  title: string;
  description: string;
}

export interface CustomersShellProps {
  children: ReactNode;
}

export interface CustomersCanvasProps {
  ariaLabel: string;
  variant?: CustomersCanvasVariant;
  children: ReactNode;
}

export interface CustomerOverviewMetric {
  label: string;
  value: string;
  subtitle: string;
  trendLabel: string;
  trendTone: CustomerMetricTrendTone;
  iconTone: CustomerMetricIconTone;
  icon: "customers" | "registered" | "repeat" | "inactive" | "vip";
}

export interface CustomerPerformanceMetric {
  label: string;
  value: string;
  icon: "ltv" | "frequency" | "revenue" | "conversion";
}

export interface CustomerSegmentOption {
  label: string;
  value: CustomerSegmentFilter;
  count: number;
}

export interface CustomerRecord {
  id: string;
  slug: string;
  name: string;
  email: string;
  orders: number;
  totalSpent: string;
  lastOrder: string;
  daysInactive: string;
  status: CustomerStatus;
  isHighSpender?: boolean;
}

export interface CustomersHeaderProps {
  title: string;
  description: string;
}

export interface CustomersSummaryGridProps {
  metrics: CustomerOverviewMetric[];
}

export interface CustomersPerformanceOverviewProps {
  metrics: CustomerPerformanceMetric[];
}

export interface CustomersSegmentTabsProps {
  filters: CustomerSegmentOption[];
  activeFilter: CustomerSegmentFilter;
  onFilterChange: (value: CustomerSegmentFilter) => void;
}

export interface CustomersToolbarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  sortValue: CustomerSortOption;
  onSortChange: (value: CustomerSortOption) => void;
  exportLabel: string;
  onExport: () => void;
}

export interface CustomersTableProps {
  rows: CustomerRecord[];
  isLoading?: boolean;
  onViewDetails: (customer: CustomerRecord) => void;
}

export interface CustomersPaginationProps {
  pages: number[];
  currentPage: number;
}

export interface CustomersStatusBadgeProps {
  status: CustomerStatus;
}

export interface CustomerStatusMeta {
  tone: CustomerStatusTone;
}

export interface CustomerDirectoryState {
  defaultSortLabel: string;
  exportLabel: string;
  paginationPages: number[];
}

export interface CustomerOverviewCountMetric {
  count: number;
  growth_percentage: number;
}

export interface CustomerOverviewNoteMetric {
  count: number;
  note: string;
}

export interface CustomersOverviewStatsData {
  total_customers: CustomerOverviewCountMetric;
  registered_only: CustomerOverviewCountMetric;
  repeat_customers: CustomerOverviewCountMetric;
  inactive_customers: CustomerOverviewNoteMetric;
  vip_customers: CustomerOverviewNoteMetric;
}

export interface CustomersOverviewStatsResponse {
  status: string;
  message: string;
  data: CustomersOverviewStatsData;
}

export interface CustomerCurrencyValueMetric {
  value: number;
  currency: string;
}

export interface CustomerValueMetric {
  value: number;
}

export interface CustomerPercentageMetric {
  percentage: number;
}

export interface CustomersPerformanceOverviewStatsData {
  avg_customer_ltv: CustomerCurrencyValueMetric;
  avg_purchase_frequency: CustomerValueMetric;
  repeat_revenue: CustomerPercentageMetric;
  conversion_rate: CustomerPercentageMetric;
}

export interface CustomersPerformanceOverviewStatsResponse {
  status: string;
  message: string;
  data: CustomersPerformanceOverviewStatsData;
}

export interface CustomersListTabsData {
  all: number;
  registered: number;
  first_time: number;
  repeat: number;
  vip: number;
  inactive: number;
  high_spenders: number;
}

export interface CustomersListItem {
  id: number;
  slug: string;
  name: string;
  email: string;
  orders: number;
  total_spent: string;
  last_order: string;
  days_inactive: number;
  status: string;
}

export interface CustomersListPaginationLink {
  url: string | null;
  label: string;
  page: number | null;
  active: boolean;
}

export interface CustomersListPaginationData {
  current_page: number;
  data: CustomersListItem[];
  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;
  links: CustomersListPaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
}

export interface CustomersListData {
  tabs: CustomersListTabsData;
  customers: CustomersListPaginationData;
}

export interface CustomersListResponse {
  status: string;
  message: string;
  data: CustomersListData;
}

export interface CustomerDetailsData {
  id: number;
  slug: string;
  name: string;
  email: string;
  orders_number: number;
  total_spent: string;
  last_order: string;
  days_inactive: number;
  status: string;
}

export interface CustomerDetailsResponse {
  status: string;
  message: string;
  data: CustomerDetailsData;
}
