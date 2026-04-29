import type {
  CustomerDirectoryState,
  CustomerOverviewMetric,
  CustomerPerformanceMetric,
  CustomerRecord,
  CustomerSegmentOption,
  CustomerStatusMeta,
  CustomersWorkspaceConfig,
} from "@/interfaces/main/customers";

export const customersWorkspace: CustomersWorkspaceConfig = {
  ariaLabel: "Customers workspace",
  title: "Customers Overview",
  description:
    "Analyze, segment, and activate your customer base with smart insights",
} as const;

export const customerOverviewMetrics: CustomerOverviewMetric[] = [
  {
    label: "Total Customers",
    value: "160",
    subtitle: "active customers",
    trendLabel: "+12.5%",
    trendTone: "positive",
    iconTone: "lavender",
    icon: "customers",
  },
  {
    label: "Registered Only",
    value: "100",
    subtitle: "registered customers",
    trendLabel: "+8.2%",
    trendTone: "positive",
    iconTone: "secondary",
    icon: "registered",
  },
  {
    label: "Repeat Customers",
    value: "70",
    subtitle: "repeat customers",
    trendLabel: "-3.1%",
    trendTone: "negative",
    iconTone: "amber",
    icon: "repeat",
  },
  {
    label: "Inactive Customers",
    value: "7",
    subtitle: "inactive customers",
    trendLabel: "+30 Day",
    trendTone: "neutral",
    iconTone: "danger",
    icon: "inactive",
  },
  {
    label: "VIP Customers",
    value: "15",
    subtitle: "VIP customers",
    trendLabel: "Top 10",
    trendTone: "neutral",
    iconTone: "primary",
    icon: "vip",
  },
];

export const customerPerformanceMetrics: CustomerPerformanceMetric[] = [
  {
    label: "Avg Customer LTV",
    value: "$656.98",
    icon: "ltv",
  },
  {
    label: "Avg Purchase Frequency",
    value: "16.4x",
    icon: "frequency",
  },
  {
    label: "Repeat Revenue %",
    value: "99.3%",
    icon: "revenue",
  },
  {
    label: "Conversion Rate",
    value: "80.0%",
    icon: "conversion",
  },
];

export const customerSegmentOptions: CustomerSegmentOption[] = [
  { label: "All", value: "all", count: 155 },
  { label: "Registered Only", value: "registered-only", count: 100 },
  { label: "First-Time", value: "first-time", count: 25 },
  { label: "Repeat Customers", value: "repeat-customers", count: 20 },
  { label: "VIP", value: "vip", count: 10 },
  { label: "Inactive", value: "inactive", count: 5 },
  { label: "High Spenders", value: "high-spenders", count: 12 },
];

export const customerDirectoryState: CustomerDirectoryState = {
  defaultSortLabel: "Newest First",
  exportLabel: "Export Data",
  paginationPages: [1, 2, 3, 4, 5, 6, 7, 8],
};

export const customerRows: CustomerRecord[] = [
  {
    id: "#USER-1001",
    slug: "sarah-johnson",
    name: "Sarah Johnson",
    email: "sophie.t@email.com",
    orders: 16,
    totalSpent: "$1900",
    lastOrder: "01-10-2025",
    daysInactive: "6 Day",
    status: "Registered Only",
  },
  {
    id: "#USER-1002",
    slug: "michael-chen",
    name: "Michael Chen",
    email: "michael.c@email.com",
    orders: 19,
    totalSpent: "$1040",
    lastOrder: "16-10-2025",
    daysInactive: "Last 2h",
    status: "Active",
  },
  {
    id: "#USER-1003",
    slug: "emma-davis",
    name: "Emma Davis",
    email: "Emma.avis@email.com",
    orders: 0,
    totalSpent: "$0",
    lastOrder: "Never",
    daysInactive: "120 Day",
    status: "Inactive",
  },
  {
    id: "#USER-1004",
    slug: "james-wilson",
    name: "James Wilson",
    email: "james.b@email.com",
    orders: 1,
    totalSpent: "$90",
    lastOrder: "01-11-2025",
    daysInactive: "20 Day",
    status: "First-Time",
  },
  {
    id: "#USER-1006",
    slug: "olivia-brown",
    name: "Olivia Brown",
    email: "Olivia.m@email.com",
    orders: 56,
    totalSpent: "$2300",
    lastOrder: "15-12-2025",
    daysInactive: "11 Day",
    status: "Active",
  },
  {
    id: "#USER-1007",
    slug: "robert-taylor",
    name: "Robert Taylor",
    email: "Robert.w@email.com",
    orders: 70,
    totalSpent: "$9900",
    lastOrder: "5-10-2025",
    daysInactive: "30 Day",
    status: "VIP",
    isHighSpender: true,
  },
  {
    id: "#USER-1009",
    slug: "sophia-martinez",
    name: "Sophia Martinez",
    email: "Sophia.w@email.com",
    orders: 0,
    totalSpent: "$0",
    lastOrder: "Never",
    daysInactive: "920 Day",
    status: "Inactive",
  },
];

export const customerStatusMeta: Record<string, CustomerStatusMeta> = {
  "Registered Only": { tone: "secondary" },
  Active: { tone: "success" },
  Inactive: { tone: "danger" },
  "First-Time": { tone: "info" },
  VIP: { tone: "primary" },
};
