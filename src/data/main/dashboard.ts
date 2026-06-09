import {
  ChartNoAxesColumn,
  CircleAlert,
  ClipboardList,
  DollarSign,
  PackageCheck,
  PackageSearch,
} from "lucide-react";
import type {
  CategoryShare,
  DashboardAction,
  DashboardStat,
  RecentOrder,
  SalesPoint,
  TopProduct,
} from "@/interfaces/main/dashboard";


export const dashboardStats: DashboardStat[] = [
  {
    title: "Revenue Today",
    value: "$1,284",
    note: "vs yesterday",
    trend: "+12.5%",
    icon: DollarSign,
    tone: "primary",
  },
  {
    title: "Total Orders",
    value: "342",
    note: "this month",
    trend: "+8.2%",
    icon: ClipboardList,
    tone: "secondary",
  },
  {
    title: "Pending Orders",
    value: "18",
    note: "need attention",
    trend: "-3.1%",
    icon: PackageSearch,
    tone: "light",
  },
  {
    title: "Delivered Today",
    value: "24",
    note: "completed",
    trend: "+5.3%",
    icon: PackageCheck,
    tone: "gray",
  },
];

export const weeklySales: SalesPoint[] = [
  { day: "Mon", value: 2400 },
  { day: "Tue", value: 1400 },
  { day: "Wed", value: 3248 },
  { day: "Thu", value: 2800 },
  { day: "Fri", value: 4900 },
  { day: "Sat", value: 5400 },
  { day: "Sun", value: 4500 },
];

export const salesByCategory: CategoryShare[] = [
  { name: "Breads", value: 35, tone: "primary" },
  { name: "Pastries", value: 28, tone: "secondary" },
  { name: "Cakes", value: 22, tone: "light" },
  { name: "Others", value: 15, tone: "taupe" },
];

export const recentOrders: RecentOrder[] = [
  {
    id: "ORD-1245",
    customer: "Sarah Johnson",
    items: 4,
    timeAgo: "3 hours ago",
    amount: "$42.50",
    status: "Delivered",
  },
  {
    id: "ORD-1244",
    customer: "Michael Chen",
    items: 3,
    timeAgo: "3 hours ago",
    amount: "$28.00",
    status: "Preparing",
  },
  {
    id: "ORD-1243",
    customer: "Emma Wilson",
    items: 4,
    timeAgo: "3 hours ago",
    amount: "$67.25",
    status: "Ready",
  },
  {
    id: "ORD-1242",
    customer: "James Brown",
    items: 4,
    timeAgo: "3 hours ago",
    amount: "$15.50",
    status: "New Order",
  },
  {
    id: "ORD-1241",
    customer: "Lisa Anderson",
    items: 3,
    timeAgo: "3 hours ago",
    amount: "$54.00",
    status: "Preparing",
  },
];

export const topProducts: TopProduct[] = [
  { rank: 1, name: "Sourdough Bread", sold: 145, growth: "+12%", revenue: "$1232" },
  { rank: 2, name: "Croissant", sold: 132, growth: "+8%", revenue: "$924" },
  { rank: 3, name: "Baguette", sold: 98, growth: "+5%", revenue: "$735" },
  { rank: 4, name: "Chocolate Cake", sold: 87, growth: "+15%", revenue: "$2784" },
  { rank: 5, name: "Danish Pastry", sold: 76, growth: "+3%", revenue: "$608" },
];

export const dashboardActions: DashboardAction[] = [
  { label: "Add Product", icon: "plus", filled: true },
  { label: "View Orders", icon: "chart", filled: false },
];

export const actionIcons = {
  plus: CircleAlert,
  chart: ChartNoAxesColumn,
};
