import type {
  FindUsHereSummaryMetric,
  FindUsHereWorkspaceConfig,
} from "@/interfaces/main/find-us-here";

export const findUsHereWorkspace: FindUsHereWorkspaceConfig = {
  title: "Farmer Market Management",
  description: "Manage your farmer market locations and public-facing content",
  primaryActionLabel: "Add Market Location",
};

export const findUsHereSummaryMetrics: FindUsHereSummaryMetric[] = [
  {
    label: "Total Markets",
    value: "6",
    suffix: "markets",
    icon: "store",
  },
  {
    label: "Active Days",
    value: "4",
    suffix: "days",
    icon: "calendar",
  },
  {
    label: "This Week",
    value: "4",
    suffix: "market this weak",
    icon: "clock",
  },
  {
    label: "Avg per Day",
    value: "2",
    suffix: "market per day",
    icon: "trend",
  },
];
