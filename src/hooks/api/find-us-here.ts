import {
  marketDashboardStatsAPI,
  marketListByDayAPI,
  singleMarketAPI,
} from "@/services/queries";
import { useCustomQuery } from "..";

export function useMarketDashboardStats() {
  return useCustomQuery(["market-dashboard-stats"], marketDashboardStatsAPI);
}

export function useMarketListByDay() {
  return useCustomQuery(["market-list-by-day"], marketListByDayAPI);
}

export function useSingleMarket(slug?: string) {
  return useCustomQuery(
    ["single-market", slug],
    () => singleMarketAPI(slug ?? ""),
    {
      enabled: Boolean(slug),
    },
  );
}
