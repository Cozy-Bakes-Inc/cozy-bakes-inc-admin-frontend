import {
  FindUsHereMarketsResponse,
  FindUsHereSingleMarketResponse,
  MarketDashboardStatsResponse,
} from "@/interfaces";
import { baseAPI } from "..";

export const marketDashboardStatsAPI = async () =>
  await baseAPI<MarketDashboardStatsResponse>("GET", `/market/dashboard-stats`);

export const marketListByDayAPI = async () =>
  await baseAPI<FindUsHereMarketsResponse>("GET", `/market/list-by-day`);

export const singleMarketAPI = async (slug: string) =>
  await baseAPI<FindUsHereSingleMarketResponse>("GET", `/market/${slug}/view`);
