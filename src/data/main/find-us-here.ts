import type {
  FindUsHereMarketDay,
  FindUsHereSummaryMetric,
  FindUsHereWorkspaceConfig,
} from "@/interfaces/main/find-us-here";

export const findUsHereWorkspace: FindUsHereWorkspaceConfig = {
  title: "Farmer Market Management",
  description:
    "Manage your farmer market locations and public-facing content",
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

const sharedDescription =
  "We pop up at local farmers markets twice a week, bringing freshly baked goods made the same day. Limited batches, rotating locations, and everything sold fresh.";

export const findUsHereMarketDays: FindUsHereMarketDay[] = [
  {
    id: "wednesday",
    label: "Wednesday",
    scheduledSummary: "1 market scheduled",
    defaultExpanded: true,
    locations: [
      {
        id: "wednesday-downtown",
        title: "Downtown Farmer's Market",
        badge: "Freshly Stocked Today!",
        description: sharedDescription,
        schedule: "Thursday · Jan 18 · 9:00 AM - 2:00 PM",
        address: "123 Heritage Lane",
        imageSrc: "https://www.figma.com/api/mcp/asset/47740f36-ecc6-419a-8808-489bc5d518c5",
        imageAlt: "Cozy Bakes stall at a busy downtown farmer's market",
      },
    ],
  },
  {
    id: "thursday",
    label: "Thursday",
    scheduledSummary: "3 market scheduled",
    locations: [
      {
        id: "thursday-downtown",
        title: "Downtown Farmer's Market",
        badge: "Freshly Stocked Today!",
        description: sharedDescription,
        schedule: "Thursday · Jan 18 · 9:00 AM - 2:00 PM",
        address: "123 Heritage Lane",
        imageSrc: "https://www.figma.com/api/mcp/asset/47740f36-ecc6-419a-8808-489bc5d518c5",
        imageAlt: "Fresh bread and pastries at the Cozy Bakes market stand",
      },
      {
        id: "thursday-riverside",
        title: "Riverside Farmer's Market",
        badge: "Freshly Stocked Today!",
        description: sharedDescription,
        schedule: "Thursday · Jan 18 · 9:00 AM - 2:00 PM",
        address: "123 Heritage Lane",
        imageSrc: "https://www.figma.com/api/mcp/asset/86ecf803-77a5-4a6c-a36a-e217c468d57b",
        imageAlt: "Cozy Bakes packaged goods displayed on a table",
      },
      {
        id: "thursday-harbor",
        title: "Harbor Farmer's Market",
        badge: "Freshly Stocked Today!",
        description: sharedDescription,
        schedule: "Thursday · Jan 18 · 9:00 AM - 2:00 PM",
        address: "123 Heritage Lane",
        imageSrc: "https://www.figma.com/api/mcp/asset/c49fa1a8-4705-487b-ba6f-5de8533e7928",
        imageAlt: "Outdoor market cart filled with Cozy Bakes products",
      },
    ],
  },
  {
    id: "saturday",
    label: "Saturday",
    scheduledSummary: "3 market scheduled",
    defaultExpanded: true,
    locations: [
      {
        id: "saturday-downtown",
        title: "Downtown Farmer's Market",
        badge: "Freshly Stocked Today!",
        description: sharedDescription,
        schedule: "Thursday · Jan 18 · 9:00 AM - 2:00 PM",
        address: "123 Heritage Lane",
        imageSrc: "https://www.figma.com/api/mcp/asset/47740f36-ecc6-419a-8808-489bc5d518c5",
        imageAlt: "Downtown market stall with bread loaves and pastries",
      },
      {
        id: "saturday-riverside",
        title: "Downtown Farmer's Market",
        badge: "Freshly Stocked Today!",
        description: sharedDescription,
        schedule: "Thursday · Jan 18 · 9:00 AM - 2:00 PM",
        address: "123 Heritage Lane",
        imageSrc: "https://www.figma.com/api/mcp/asset/86ecf803-77a5-4a6c-a36a-e217c468d57b",
        imageAlt: "Assorted Cozy Bakes bakery packaging on a tabletop",
      },
      {
        id: "saturday-harbor",
        title: "Downtown Farmer's Market",
        badge: "Freshly Stocked Today!",
        description: sharedDescription,
        schedule: "Thursday · Jan 18 · 9:00 AM - 2:00 PM",
        address: "123 Heritage Lane",
        imageSrc: "https://www.figma.com/api/mcp/asset/c49fa1a8-4705-487b-ba6f-5de8533e7928",
        imageAlt: "Cozy Bakes cart stand at an open-air market",
      },
    ],
  },
];
